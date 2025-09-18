import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const prev = {
      backgroundImage: document.body.style.backgroundImage,
      backgroundColor: document.body.style.backgroundColor,
      backgroundSize: document.body.style.backgroundSize,
      backgroundRepeat: document.body.style.backgroundRepeat,
      backgroundPosition: document.body.style.backgroundPosition,
    };
    document.body.style.backgroundImage = 'linear-gradient(to top, #a8edea 0%, #fed6e3 100%)';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';

    return () => {
      document.body.style.backgroundImage = prev.backgroundImage;
      document.body.style.backgroundColor = prev.backgroundColor;
      document.body.style.backgroundSize = prev.backgroundSize;
      document.body.style.backgroundRepeat = prev.backgroundRepeat;
      document.body.style.backgroundPosition = prev.backgroundPosition;
    };
  }, []);

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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md bg-transparent backdrop-blur-lg p-10 rounded-2xl shadow-2xl text-black" style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', border: '1px solid #d4d6ec' }}>
        <div className="mb-6 text-center">
          <h2 className="mb-1 tracking-tight" style={{ fontFamily: '"Sansplomb", Inter, system-ui, sans-serif', fontSize: '60px', lineHeight: '1', color: '#101f2c' }}>Make career moves</h2>
          <p className="text-sm" style={{ fontFamily: '"Sussie Int I", Inter, system-ui, sans-serif', fontSize: '18px', color: '#606384', display: 'none' }}>Use your .edu email if you have one.</p>
        </div>

        {message && <p className="mb-4 text-sm text-black/75">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-2 text-black/75">Email address</label>
            <input
              className="w-full px-4 py-3 border rounded-lg text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ borderColor: '#d4d6ec' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@college.com"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:brightness-95 transition"
            >
              Next
            </button>
          </div>

          <div className="text-center text-sm text-black/70 space-y-1">
            <p>Employer? <a className="text-primary underline" href="#">Create account</a></p>
            <p>Career services? <a className="text-primary underline" href="#">Get started</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
