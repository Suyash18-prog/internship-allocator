import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleNext = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/home-landing` }
      });
      if (error) throw error;
      setMessage('Check your email for a login link.');
    } catch (err) {
      setMessage(err.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  const backgroundImage = 'https://cdn.builder.io/api/v1/image/assets%2F902415637eba40ef8ec961d0f3cbb8f5%2Ff74029a8379147a3a973f550b94cc2d7?format=webp&width=1600';

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full max-w-md bg-white/85 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-border text-black">
        <div className="mb-6 text-center">
          <h2 className="mb-1 tracking-tight" style={{ fontFamily: '"Sansplomb", Inter, system-ui, sans-serif', fontSize: '44px', lineHeight: '1', color: '#101f2c' }}>Sign up or log in</h2>
        </div>

        {message && <p className="mb-4 text-sm text-black/75">{message}</p>}

        <form onSubmit={handleNext} className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" size={18} />
            <input
              className="w-full pl-9 pr-3 py-3 border border-border rounded-lg text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              type="text"
              placeholder="Find your school"
            />
          </div>

          <div className="flex items-center gap-3 text-black/50">
            <div className="h-px bg-black/20 flex-1" />
            <span className="text-xs">or</span>
            <div className="h-px bg-black/20 flex-1" />
          </div>

          <div>
            <input
              className="w-full px-4 py-3 border border-border rounded-lg text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:brightness-95 transition"
              disabled={loading}
            >
              {loading ? 'Sending…' : 'Next'}
            </button>
          </div>

          <div className="text-center text-xs text-black/70">
            <a className="underline" href="#">UK or EU? Sign up or log in</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
