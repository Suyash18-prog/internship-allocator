import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password })
      });
      const resData = await response.json();
      if (!response.ok) throw new Error(resData.message || 'Login failed');
      localStorage.setItem('token', resData.token);
      setMessage('Login successful! Redirecting...');
      // Redirect based on role: companies -> industry dashboard, students -> student dashboard
      setTimeout(() => {
        const role = resData.user?.role;
        if (role === 'company' || role === 'industry' || role === 'employer') {
          navigate('/industry/dashboard');
        } else {
          navigate('/student-dashboard');
        }
      }, 1000);
    } catch (err) {
      setMessage(err.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
  // TODO: Replace with JWT-based Google OAuth (if implemented)
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
      <div className="w-full max-w-[448px] h-[570px] bg-transparent backdrop-blur-lg p-10 rounded-2xl shadow-2xl text-black" style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', border: '1px solid #d4d6ec', margin: '-2px', flexGrow: 1 }}>
        <div className="mb-6 text-center">
          <h2 className="mb-1 tracking-tight" style={{ fontFamily: '"Sansplomb", Inter, system-ui, sans-serif', fontSize: '60px', lineHeight: '1', color: '#101f2c' }}>Sign up or log in</h2>
          <p className="text-sm" style={{ fontFamily: '"Sussie Int I", Inter, system-ui, sans-serif', fontSize: '18px', color: '#606384' }}><br /></p>
        </div>

        {message && <p className="mb-4 text-sm text-black/75">{message}</p>}

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" size={18} />
            <input
              className="w-full pl-9 pr-3 py-3 border rounded-lg text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ borderColor: '#d4d6ec' }}
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>

          <div className="flex items-center gap-3 text-black/50">
            <div className="h-px bg-black/20 flex-1" />
            <span className="text-xs">or</span>
            <div className="h-px bg-black/20 flex-1" />
          </div>

          <div>
            <input
              className="w-full px-4 py-3 border rounded-lg text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ borderColor: '#d4d6ec' }}
              type="email"
              placeholder="Enter email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>

          <div>
            <button
              type="submit"
              className={`w-full px-4 py-3 font-semibold rounded-lg transition bg-black text-white hover:brightness-95`}
              disabled={loading}
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
