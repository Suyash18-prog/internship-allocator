import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
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

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password, role })
      });
      const resData = await response.json();
      if (!response.ok) throw new Error(resData.message || 'Signup failed');
      setMessage('Signup successful! Redirecting to login...');
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm mb-2 text-black/75">Email address</label>
            <input
              className="w-full px-4 py-3 border rounded-lg text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ borderColor: '#d4d6ec' }}
              type="email"
              placeholder="you@college.com"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>

          <div>
            <label className="block text-sm mb-2 text-black/75">Password</label>
            <input
              className="w-full px-4 py-3 border rounded-lg text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ borderColor: '#d4d6ec' }}
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>

          <div>
            <label className="block text-sm mb-2 text-black/75">Sign up as</label>
            <select
              className="w-full px-4 py-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ borderColor: '#d4d6ec' }}
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="company">Company</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:brightness-95 transition"
              disabled={loading}
            >
              {loading ? 'Signing up…' : 'Next'}
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
