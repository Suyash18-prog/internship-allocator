import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IndustryLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now accept any credentials and store company email
    localStorage.setItem('industry', JSON.stringify({ email }));
    navigate('/industry/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-24 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Industry Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full px-3 py-2 border rounded" placeholder="Company email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full px-3 py-2 border rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-primary text-white px-3 py-2 rounded">Login</button>
      </form>
    </div>
  );
}
