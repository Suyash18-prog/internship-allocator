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

  const handleGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/home-landing` }
      });
      if (error) throw error;
    } catch (err) {
      setMessage(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const backgroundImage = 'https://cdn.builder.io/api/v1/image/assets%2F902415637eba40ef8ec961d0f3cbb8f5%2Ff74029a8379147a3a973f550b94cc2d7?format=webp&width=1600';

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6"
      style={{
        backgroundImage: 'linear-gradient(180deg, #f1f2b5 0%, #135058 100%)'
      }}
    >
      <div className="w-full max-w-[448px] h-[570px] bg-white/85 backdrop-blur-lg p-10 rounded-2xl shadow-2xl text-black" style={{ border: '1px solid #d4d6ec', margin: '-2px', flexGrow: 1 }}>
        <div className="mb-6 text-center">
          <h2 className="mb-1 tracking-tight" style={{ fontFamily: '"Sansplomb", Inter, system-ui, sans-serif', fontSize: '60px', lineHeight: '1', color: '#101f2c' }}>Sign up or log in</h2>
          <p className="text-sm" style={{ fontFamily: '"Sussie Int I", Inter, system-ui, sans-serif', fontSize: '18px', color: '#606384' }}><br /></p>
        </div>

        {message && <p className="mb-4 text-sm text-black/75">{message}</p>}

        <form onSubmit={handleNext} className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" size={18} />
            <input
              className="w-full pl-9 pr-3 py-3 border rounded-lg text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ borderColor: '#d4d6ec' }}
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
              className={`w-full px-4 py-3 font-semibold rounded-lg transition ${email ? 'bg-black text-white hover:brightness-95' : 'bg-white text-black/60 border'} `}
              style={!email ? { borderColor: '#d4d6ec', borderWidth: 1 } : undefined}
              disabled={loading || !email}
            >
              {loading ? 'Sending…' : 'Next'}
            </button>
          </div>

          <div className="flex items-center gap-3 text-black/50">
            <div className="h-px bg-black/20 flex-1" />
            <span className="text-xs">or continue with</span>
            <div className="h-px bg-black/20 flex-1" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="w-full px-4 py-3 bg-white text-black border border-border rounded-lg hover:bg-black/5 transition"
            disabled={loading}
          >
            Continue with Google
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
