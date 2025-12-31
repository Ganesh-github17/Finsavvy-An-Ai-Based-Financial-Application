import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import FinancialScene from '../components/3D/FinancialScene';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name: username }
      }
    });
    setLoading(false);
    if (error) setError(error.message);
    else {
      setSuccess('Signup successful! Please check your email to confirm your account.');
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 relative">
      <div className="absolute inset-0 opacity-40 z-0">
        <FinancialScene />
      </div>
      <div className="relative z-10 bg-gray-900/80 p-10 rounded-2xl shadow-xl w-full max-w-md flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-6">Create an Account</h2>
        <form onSubmit={handleSignup} className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
            required
          />
          {error && <div className="text-red-400 text-sm">{error}</div>}
          {success && <div className="text-green-400 text-sm">{success}</div>}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 text-gray-400 text-sm">
          Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup; 