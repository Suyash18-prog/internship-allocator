import React, { useState } from 'react';
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

  const backgroundGradient = `radial-gradient(at 33% 2%, #f344bc 0, transparent 50%), radial-gradient(at 42% 35%, #51c4f6 0, transparent 50%), radial-gradient(at 95% 26%, #cf8af4 0, transparent 50%), radial-gradient(at 91% 68%, #a085e0 0, transparent 50%), radial-gradient(at 47% 56%, #50f83a 0, transparent 50%), radial-gradient(at 11% 71%, #b0f099 0, transparent 50%), radial-gradient(at 66% 59%, #a9df62 0, transparent 50%)`;
  const backgroundImage = 'https://cdn.builder.io/api/v1/image/assets%2F902415637eba40ef8ec961d0f3cbb8f5%2F2c26372928ef47008dc3a5614f63de0d?format=webp&width=1600';

  return (
    <div className="min-h-screen flex items-center justify-center" style={{
      backgroundImage: `${backgroundGradient}, url(${backgroundImage})`,
      backgroundBlendMode: 'overlay, normal',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="w-full max-w-md bg-white/85 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-border">
        <h2 className="text-3xl font-extrabold mb-2 text-foreground">Make career moves</h2>
        <p className="text-sm text-muted-foreground mb-6">Use your .edu email if you have one.</p>

        {message && <p className="mb-3 text-sm text-muted-foreground">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-muted-foreground">Email address</label>
            <input className="w-full px-3 py-2 border border-border rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </div>

          <div className="flex items-center">
            <button type="submit" className="w-full px-4 py-2 bg-foreground text-white font-semibold rounded-md">Next</button>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>Employer? <a className="text-primary underline" href="#">Create account</a></p>
            <p>Career services? <a className="text-primary underline" href="#">Get started</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
