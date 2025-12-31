import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import FinancialScene from '../components/3D/FinancialScene';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    const user = data?.user;
    if (!user) {
      setError('Login failed.');
      return;
    }
    // Check email verification
    if (!user.email_confirmed_at && !user.confirmed_at) {
      setError('Please verify your email before logging in.');
      return;
    }
    // Show welcome message
    setSuccess('Successfully logged in! Welcome to FINSAVVY, thanks — ' + (user.user_metadata?.name || 'Ankem Ganesh'));
    setTimeout(() => navigate('/profile'), 1800);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    setLoading(false);
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e2746] via-[#2e335a] to-[#1e2746] relative overflow-hidden">
      {/* 3D Financial Scene as background */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <FinancialScene />
      </div>
      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20 flex flex-col items-center animate-fade-in">
        <h2 className="text-3xl font-extrabold text-white mb-8 drop-shadow-lg tracking-tight text-center">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="px-5 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-300 shadow-sm transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="px-5 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-300 shadow-sm transition"
            required
          />
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          {success && <div className="text-green-400 text-sm text-center font-semibold">{success}</div>}
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 text-lg tracking-wide"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="my-6 w-full flex items-center justify-center">
          <span className="text-gray-300 font-medium">or</span>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white/90 hover:bg-white text-gray-900 font-semibold py-3 rounded-xl shadow-lg border border-gray-200 transition-all duration-200 text-base"
          disabled={loading}
        >
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>
        <div className="mt-6 text-gray-200 text-sm text-center">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-blue-300 hover:underline font-semibold">Sign Up</a>
        </div>
      </div>
      {/* Animation keyframes */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Login; 