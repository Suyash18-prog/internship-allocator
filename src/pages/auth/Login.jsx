import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setMessage('Login successful');
      navigate('/home-landing');
    } catch (err) {
      setMessage(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({ provider: 'google' });
    } catch (err) {
      setMessage(err.message || 'OAuth failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md bg-card p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {message && <p className="mb-3 text-sm text-muted-foreground">{message}</p>}
        <form onSubmit={handleEmailLogin} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input className="w-full input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            <button type="button" className="btn" onClick={() => navigate('/auth/signup')}>Sign up</button>
          </div>
        </form>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Or login with</p>
          <button className="btn btn-outline w-full" onClick={handleGoogle}>Continue with Google</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
