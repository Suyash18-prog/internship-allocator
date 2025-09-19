import fs from 'fs';
import path from 'path';

export function loadCompaniesFromCSV(csvPath) {
  try {
    if (!fs.existsSync(csvPath)) return [];
    const text = fs.readFileSync(csvPath, 'utf8');
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length === 0) return [];
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
      const cols = line.split(',').map(c => c.replace(/^"|"$/g, '').trim());
      const obj = {};
      headers.forEach((h, i) => obj[h] = cols[i] || '');
      return obj;
    });
  } catch (e) {
    console.error('Failed to read CSV', e);
    return [];
  }
}

export function writeCompaniesToCSV(csvPath, companies) {
  try {
    if (!Array.isArray(companies)) companies = [];
    const headers = companies.length > 0 ? Object.keys(companies[0]) : ['Name','Domain','Capacity','Stipend'];
    const rows = [headers.join(',')].concat(companies.map(c => headers.map(h => `"${String(c[h]||'').replace(/"/g,'""')}"`).join(',')));
    fs.writeFileSync(csvPath, rows.join('\n'), 'utf8');
  } catch (e) {
    console.error('Failed to write CSV', e);
  }
}
