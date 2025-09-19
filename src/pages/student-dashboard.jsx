import React, { useEffect, useState } from 'react';

import FooterSection from './home-landing/components/FooterSection';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

const mockStudent = {
  name: 'Priya Sharma',
  course: 'B.Tech Computer Science',
  college: 'IIT Delhi',
  skills: ['Python', 'ML', 'SQL'],
  location: 'Delhi',
};

const mockInternships = [
  { id: 1, title: 'Data Analyst', company: 'ABC Ltd', matchPercent: 92, location: 'Delhi', stipend: 15000 },
  { id: 2, title: 'Web Developer', company: 'XYZ Pvt', matchPercent: 85, location: 'Bangalore', stipend: 12000 },
  { id: 3, title: 'ML Intern', company: 'DEF Inc', matchPercent: 80, location: 'Remote', stipend: 10000 },
  { id: 4, title: 'Backend Developer', company: 'TechSoft', matchPercent: 75, location: 'Delhi', stipend: 18000 },
  { id: 5, title: 'Marketing Intern', company: 'MarketGenius', matchPercent: 70, location: 'Mumbai', stipend: 9000 },
];

export default function StudentDashboard() {
  const [applied, setApplied] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');
  const [stipendFilter, setStipendFilter] = useState('');

  const handleApply = (id) => {
    setApplied([...applied, id]);
  };

  // Filtered internships for "All Internships" view
  const filteredInternships = mockInternships.filter(intern => {
    const locMatch = locationFilter ? intern.location.toLowerCase().includes(locationFilter.toLowerCase()) : true;
    const stipendMatch = stipendFilter ? intern.stipend >= Number(stipendFilter) : true;
    return locMatch && stipendMatch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      {/* Custom Dashboard Header */}
      <header className="w-full bg-white border-b border-border py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon name="Briefcase" size={32} className="text-primary" />
          <span className="text-2xl font-bold text-foreground">InterNova</span>
        </div>
        <nav className="flex items-center gap-8 text-base font-medium">
          <a href="#" className="hover:text-primary">Explore</a>
          <a href="#" className="hover:text-primary">Courses</a>
          <a href="#" className="hover:text-primary">My Applications</a>
          <a href="/auth/login" className="hover:text-primary">Logout</a>
        </nav>
      </header>

      <main className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full pt-16 pb-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
        {/* Sidebar: Profile Card */}
        <aside className="w-full md:w-1/4 mb-8 md:mb-0 md:mr-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center border border-border">
            <Icon name="User" size={48} className="mb-4 text-primary" />
            <h2 className="text-xl font-bold mb-1">{mockStudent.name}</h2>
            <div className="text-sm text-muted-foreground mb-2">{mockStudent.course}</div>
            <div className="text-sm text-muted-foreground mb-4">{mockStudent.college}</div>
            <div className="flex flex-wrap gap-2 mb-4">
              {mockStudent.skills.map(skill => (
                <span key={skill} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">{skill}</span>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">Location preference: <span className="font-medium text-foreground">{mockStudent.location}</span></div>
          </div>
        </aside>
        {/* Main Section: Recommendations & All Internships */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Icon name="Sparkles" size={24} className="text-primary" /> Internship Recommendations
            </h1>
            <Button variant="outline" size="sm" onClick={() => setShowAll(v => !v)}>
              {showAll ? 'Show Recommendations' : 'See All Internships'}
            </Button>
          </div>

          {/* Recommendations Table (default) */}
          {!showAll && (
            <>
              <div className="overflow-x-auto rounded-lg shadow bg-white border border-border">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Internship Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Match %</th>
                      <th className="px-6 py-3 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    {mockInternships.slice(0, 3).map(intern => (
                      <tr key={intern.id}>
                        <td className="px-6 py-4 font-medium text-foreground">{intern.title}</td>
                        <td className="px-6 py-4">{intern.company}</td>
                        <td className="px-6 py-4 text-center font-semibold text-primary">{intern.matchPercent}%</td>
                        <td className="px-6 py-4 text-center">
                          <Button
                            variant={applied.includes(intern.id) ? 'outline' : 'primary'}
                            size="sm"
                            disabled={applied.includes(intern.id)}
                            onClick={() => handleApply(intern.id)}
                          >
                            {applied.includes(intern.id) ? 'Applied' : 'Apply'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Footer: Why recommended */}
              <div className="mt-8 p-4 bg-muted rounded-lg flex items-center gap-3 border border-border">
                <Icon name="Info" size={20} className="text-primary" />
                <span className="text-sm text-muted-foreground">Why recommended? <span className="font-medium text-foreground">Skills matched: Python</span></span>
              </div>
            </>
          )}

          {/* All Internships Table with Filters */}
          {showAll && (
            <>
              <div className="mb-4 flex flex-wrap gap-4 items-end">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Location</label>
                  <input
                    type="text"
                    className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. Delhi, Remote"
                    value={locationFilter}
                    onChange={e => setLocationFilter(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Min Stipend</label>
                  <input
                    type="number"
                    className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. 10000"
                    value={stipendFilter}
                    onChange={e => setStipendFilter(e.target.value)}
                  />
                </div>
              </div>
              <div className="overflow-x-auto rounded-lg shadow bg-white border border-border">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Internship Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Stipend</th>
                      <th className="px-6 py-3 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    {filteredInternships.length === 0 ? (
                      <tr><td colSpan={5} className="text-center py-6 text-muted-foreground">No internships found.</td></tr>
                    ) : filteredInternships.map(intern => (
                      <tr key={intern.id}>
                        <td className="px-6 py-4 font-medium text-foreground">{intern.title}</td>
                        <td className="px-6 py-4">{intern.company}</td>
                        <td className="px-6 py-4">{intern.location}</td>
                        <td className="px-6 py-4 text-center">₹{intern.stipend}</td>
                        <td className="px-6 py-4 text-center">
                          <Button
                            variant={applied.includes(intern.id) ? 'outline' : 'primary'}
                            size="sm"
                            disabled={applied.includes(intern.id)}
                            onClick={() => handleApply(intern.id)}
                          >
                            {applied.includes(intern.id) ? 'Applied' : 'Apply'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
  </main>
  {/* Consistent Footer */}
  <FooterSection />
    </div>
  );
}
