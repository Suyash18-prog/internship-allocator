import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SkillsInput from '../student-registration/components/SkillsInput';

const TITLE_OPTIONS = ['Data Analyst', 'Web Developer', 'ML Intern', 'Backend Developer', 'Marketing Intern', 'Product Management Intern'];
const SKILL_OPTIONS = ['Python','JavaScript','React','Node.js','SQL','ML','Data Analysis','Communication','Marketing','Java'];
const LOCATION_OPTIONS = ['Remote','Delhi','Bangalore','Mumbai','Hyderabad','Chennai','Pune'];
const STIPEND_OPTIONS = ['0','5000','10000','15000','20000','25000']; // representative min stipend values
const CAPACITY_OPTIONS = [1,2,3,4,5,10];
const SECTOR_OPTIONS = ['Technology','Marketing','Finance','Healthcare','Education'];
const DURATION_OPTIONS = ['1 month','2 months','3 months','6 months'];

export default function PostInternship() {
  const [title, setTitle] = useState(TITLE_OPTIONS[0]);
  const [skills, setSkills] = useState([]);
  const [location, setLocation] = useState(LOCATION_OPTIONS[0]);
  const [stipend, setStipend] = useState(STIPEND_OPTIONS[2]);
  const [capacity, setCapacity] = useState(CAPACITY_OPTIONS[0]);
  const [sector, setSector] = useState(SECTOR_OPTIONS[0]);
  const [duration, setDuration] = useState(DURATION_OPTIONS[0]);
  const navigate = useNavigate();

  const handleSkillChange = (e) => {
    const options = Array.from(e.target.options);
    const selected = options.filter(o => o.selected).map(o => o.value);
    setSkills(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const internships = JSON.parse(localStorage.getItem('industry_internships') || '[]');
    const industry = JSON.parse(localStorage.getItem('industry') || '{}');

  const finalTitle = title && String(title).trim() !== '' ? title : 'Custom Role';
  const finalLocation = location && String(location).trim() !== '' ? location : 'Custom Location';
  const finalStipend = stipend && String(stipend).trim() !== '' ? Number(String(stipend).replace(/[^0-9.-]/g, '')) : 0;
  const finalCapacity = capacity && String(capacity).trim() !== '' ? Number(String(capacity).replace(/[^0-9.-]/g, '')) : 1;
  const finalSector = sector && String(sector).trim() !== '' ? sector : 'Other';
  const finalDuration = duration && String(duration).trim() !== '' ? duration : 'Custom';

    const newPost = {
      id: Date.now(),
      title: finalTitle,
      requiredSkills: skills,
      requirements: skills.join(', '),
      location: finalLocation,
      stipend: finalStipend,
      capacity: finalCapacity,
      sector: finalSector,
      duration: finalDuration,
      company: industry.companyName || industry.email || 'Company'
    };
    internships.push(newPost);
    localStorage.setItem('industry_internships', JSON.stringify(internships));
    navigate('/industry/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Post Internship</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Role</label>
          <input list="title-options" className="w-full px-3 py-2 border rounded" value={title} onChange={e=>setTitle(e.target.value)} />
          <datalist id="title-options">
            {TITLE_OPTIONS.map(t => <option key={t} value={t} />)}
          </datalist>
        </div>

        <div>
          <SkillsInput skills={skills} onChange={setSkills} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Location</label>
            <input list="location-options" className="w-full px-3 py-2 border rounded" value={location} onChange={e=>setLocation(e.target.value)} />
            <datalist id="location-options">
              {LOCATION_OPTIONS.map(l => <option key={l} value={l} />)}
            </datalist>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Min Stipend (₹)</label>
            <input list="stipend-options" className="w-full px-3 py-2 border rounded" value={stipend} onChange={e=>setStipend(e.target.value)} />
            <datalist id="stipend-options">
              {STIPEND_OPTIONS.map(s => <option key={s} value={s}>{s === '0' ? 'Unpaid' : `₹${s}`}</option>)}
            </datalist>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Capacity</label>
            <input list="capacity-options" className="w-full px-3 py-2 border rounded" value={capacity} onChange={e=>setCapacity(e.target.value)} />
            <datalist id="capacity-options">
              {CAPACITY_OPTIONS.map(c => <option key={c} value={c} />)}
            </datalist>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Duration</label>
            <input list="duration-options" className="w-full px-3 py-2 border rounded" value={duration} onChange={e=>setDuration(e.target.value)} />
            <datalist id="duration-options">
              {DURATION_OPTIONS.map(d => <option key={d} value={d} />)}
            </datalist>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Sector</label>
          <input list="sector-options" className="w-full px-3 py-2 border rounded" value={sector} onChange={e=>setSector(e.target.value)} />
          <datalist id="sector-options">
            {SECTOR_OPTIONS.map(s => <option key={s} value={s} />)}
          </datalist>
        </div>

        <div className="flex gap-3">
          <button className="bg-primary text-white px-4 py-2 rounded">Post</button>
          <button type="button" className="px-4 py-2 border rounded" onClick={()=>navigate('/industry/dashboard')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
