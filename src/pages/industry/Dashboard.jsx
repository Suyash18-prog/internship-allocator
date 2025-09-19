import React, { useEffect, useState } from 'react';

export default function IndustryDashboard() {
  const [company, setCompany] = useState({});
  const [postings, setPostings] = useState([]);
  const [shortlisted, setShortlisted] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const industry = JSON.parse(localStorage.getItem('industry') || '{}');
    setCompany(industry);
    const interns = JSON.parse(localStorage.getItem('industry_internships') || '[]');
    const safeInterns = Array.isArray(interns) ? interns : [];
    setPostings(safeInterns);
    if (safeInterns.length > 0) setSelectedPost(Number(safeInterns[0].id) || safeInterns[0].id);
  }, []);

  useEffect(() => {
    if (!selectedPost) return;
    // Request recommendations from backend (which proxies to FastAPI)
    fetch('/api/industry/recommendations', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ internshipId: selectedPost })
    }).then(r => r.json()).then(data => {
      setCandidates(data);
    }).catch(err => {
      console.error('Failed to fetch recommendations', err);
    });
  }, [selectedPost]);

  const handleShortlist = (studentId) => {
    if (!shortlisted.includes(studentId)) setShortlisted([...shortlisted, studentId]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <header className="w-full bg-white border-b border-border py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-white font-bold">C</div>
          <span className="text-2xl font-bold">{company.companyName || company.email || 'Company'}</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/industry/post" className="px-4 py-2 bg-primary text-white rounded">Post Internship</a>
          <a href="/industry/postings" className="px-4 py-2 border rounded">My Postings</a>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full py-8 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 bg-white p-6 rounded shadow border border-border">
          <h3 className="text-lg font-semibold mb-2">Company Profile</h3>
          <div className="text-sm text-muted-foreground mb-4">{company.companyName || company.email}</div>
          <div className="mb-2">Posted Internships: <span className="font-medium">{postings.length}</span></div>
          <div>Interns Hired: <span className="font-medium">0</span></div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-muted-foreground mb-1">Select Posting</label>
            <select className="w-full border px-3 py-2 rounded" value={selectedPost || ''} onChange={e=>setSelectedPost(Number(e.target.value))}>
              {postings.map(p => <option key={p.id} value={p.id}>{p.title} — {p.location}</option>)}
            </select>
          </div>
        </aside>

        <section className="md:col-span-3 bg-white p-6 rounded shadow border border-border">
          <h2 className="text-xl font-bold mb-4">Candidate Recommendations</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Candidate Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">College</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Match %</th>
                  <th className="px-6 py-3 text-center"></th>
                </tr>
              </thead>
              <tbody className="bg-background divide-y divide-border">
                  {(!Array.isArray(candidates) || candidates.length === 0) ? (
                    <tr><td colSpan={4} className="text-center py-6 text-muted-foreground">No candidates yet for this posting.</td></tr>
                  ) : candidates.map(s => (
                    <tr key={s.id || JSON.stringify(s)}>
                      <td className="px-6 py-4 font-medium text-foreground">{s.name || 'Unknown'}</td>
                      <td className="px-6 py-4">{s.college || s.education || 'Unknown'}</td>
                      <td className="px-6 py-4 text-center font-semibold text-primary">{typeof s.score === 'number' ? s.score : (s.score || 0)}%</td>
                      <td className="px-6 py-4 text-center">
                        <button className="px-3 py-1 bg-primary text-white rounded" onClick={()=>handleShortlist(s.id)}>
                          {shortlisted.includes(s.id) ? 'Shortlisted' : 'Shortlist'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
          <div className="mt-6 text-sm text-muted-foreground">Footer: Internship Capacity: <span className="font-medium">{postings.reduce((acc,p)=>(acc + (p.capacity || 0)), 0)}/10 filled</span></div>
        </section>
      </main>
    </div>
  );
}
