import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadCompaniesFromCSV, writeCompaniesToCSV } from './loadCompaniesFromCSV.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const FASTAPI_BASE = process.env.FASTAPI_BASE || 'http://localhost:8000';

// In-memory demo data
let internships = [];
let students = [
    { id: 1, name: 'Alice', college: 'Example University', skills: ['React','JavaScript'] },
    { id: 2, name: 'Bob', college: 'Business School', skills: ['Marketing','Communication'] }
];

// Load companies from CSV at startup
let companies = loadCompaniesFromCSV(path.resolve(__dirname, 'companies.csv'));

// Helper: safe fetch using global fetch
async function tryFetch(url, options) {
    try {
        const res = await fetch(url, options);
        return res;
    } catch (err) {
        return null;
    }
}

// Proxy companies endpoints to FastAPI with CSV fallback
app.get('/api/companies', async (req, res) => {
    const r = await tryFetch(`${FASTAPI_BASE}/companies`);
    if (r && r.ok) {
        const data = await r.json(); companies = Array.isArray(data) ? data : companies; return res.json(data);
    }
    companies = loadCompaniesFromCSV(path.resolve(__dirname, 'companies.csv'));
    res.json(companies);
});

app.post('/api/companies', async (req, res) => {
    const r = await tryFetch(`${FASTAPI_BASE}/companies`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(req.body) });
    if (r && r.ok) { const data = await r.json(); companies.push(data); return res.status(201).json(data); }
    // fallback: append locally
    companies.push(req.body);
    writeCompaniesToCSV(path.resolve(__dirname, 'companies.csv'), companies);
    res.status(201).json(req.body);
});

app.put('/api/companies/:name', async (req, res) => {
    const name = req.params.name;
    const r = await tryFetch(`${FASTAPI_BASE}/companies/${encodeURIComponent(name)}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(req.body) });
    if (r && r.ok) { const data = await r.json(); companies = companies.map(c => (c.Name === name ? data : c)); return res.json(data); }
    companies = companies.map(c => (c.Name === name ? req.body : c));
    writeCompaniesToCSV(path.resolve(__dirname, 'companies.csv'), companies);
    res.json(req.body);
});

app.delete('/api/companies/:name', async (req, res) => {
    const name = req.params.name;
    const r = await tryFetch(`${FASTAPI_BASE}/companies/${encodeURIComponent(name)}`, { method: 'DELETE' });
    if (r && r.ok) { companies = companies.filter(c => c.Name !== name); return res.json({ detail: 'Company deleted' }); }
    companies = companies.filter(c => c.Name !== name);
    writeCompaniesToCSV(path.resolve(__dirname, 'companies.csv'), companies);
    res.json({ detail: 'Company deleted (local)' });
});

// Recommender proxy: POST /api/industry/recommendations
app.post('/api/industry/recommendations', async (req, res) => {
    const { internshipId, skills } = req.body || {};
    let required = [];
    if (internshipId) {
        const intern = internships.find(i => Number(i.id) === Number(internshipId));
        if (!intern) return res.status(404).json({ message: 'Internship not found' });
        required = intern.requiredSkills || (intern.requirements ? String(intern.requirements).split(/[;,]/).map(s=>s.trim()) : []);
    } else if (skills) {
        required = Array.isArray(skills) ? skills : String(skills).split(',').map(s=>s.trim());
    } else {
        return res.status(400).json({ message: 'Provide internshipId or skills' });
    }

    // Try FastAPI recommender
    const r = await tryFetch(`${FASTAPI_BASE}/recommend`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ skills: required }) });
    if (r && r.ok) {
        try { const data = await r.json(); return res.json(data); } catch(e) { console.warn('Failed parse FastAPI JSON', e); }
    }

    // Fallback: simple skill-match scoring
    const ranked = students.map(s => {
        const sSkills = Array.isArray(s.skills) ? s.skills.map(x=>String(x).toLowerCase()) : [];
        const matched = required.filter(r => sSkills.includes(String(r).toLowerCase()));
        const score = required.length > 0 ? Math.round((matched.length / required.length) * 100) : 0;
        return { id: s.id, name: s.name, college: s.college || s.education || 'Unknown', skills: s.skills || [], score, matchedSkills: matched };
    }).sort((a,b)=>b.score - a.score);
    res.json(ranked);
});

// Simple internships endpoints (in-memory)
app.post('/api/industry/internships', (req, res) => {
    const { title, requiredSkills, capacity, location, stipend, sector, duration, company } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });
    const newPost = { id: Date.now(), title, requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : (requiredSkills ? String(requiredSkills).split(',').map(s=>s.trim()) : []), capacity: Number(capacity)||1, filled:0, location, stipend: Number(stipend)||0, sector, duration, company, postedAt: new Date().toISOString() };
    internships.push(newPost);
    res.status(201).json(newPost);
});

app.get('/api/industry/internships', (req, res) => {
    const { company } = req.query;
    if (company) return res.json(internships.filter(i => i.company && String(i.company).toLowerCase().includes(String(company).toLowerCase())));
    res.json(internships);
});

// Basic students list
app.get('/api/students', (req, res) => { res.json(students); });

app.listen(PORT, () => console.log(`Backend (Node) running on port ${PORT}`));
