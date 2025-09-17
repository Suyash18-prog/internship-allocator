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

  const backgroundImage = 'https://cdn.builder.io/api/v1/image/assets%2F902415637eba40ef8ec961d0f3cbb8f5%2Ff74029a8379147a3a973f550b94cc2d7?format=webp&width=1600';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="w-full max-w-md bg-white/85 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-border text-black">
        <div className="mb-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-1 tracking-tight">Make career moves</h2>
          <p className="text-sm text-black/75">Use your .edu email if you have one.</p>
        </div>

        {message && <p className="mb-4 text-sm text-black/75">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-2 text-black/75">Email address</label>
            <input
              className="w-full px-4 py-3 border border-border rounded-lg text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@college.edu"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-md hover:brightness-95 transition"
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
