import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role }
        }
      });
      if (error) throw error;
      setMessage('Signup successful. Please check your email to confirm your account.');
      setEmail(''); setPassword('');
      // optionally redirect to login
      setTimeout(() => navigate('/auth/login'), 1500);
    } catch (err) {
      setMessage(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md bg-card p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create an account</h2>
        {message && <p className="mb-3 text-sm text-muted-foreground">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input className="w-full input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Role</label>
            <select className="w-full input" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student (looking for internship)</option>
              <option value="industry">Industry (posting internships)</option>
              <option value="admin">Admin (main control)</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Signing up...' : 'Sign up'}</button>
            <button type="button" className="btn" onClick={() => navigate('/auth/login')}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
