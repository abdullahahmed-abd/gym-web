import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

const BG_IMAGE = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return setError('Fill all fields');
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (email === 'admin@gym.com' && password === 'admin123') {
        onLogin({ email, name: 'Admin' });
      } else {
        setError('Invalid credentials');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="relative flex h-screen w-screen bg-black overflow-hidden">
      {/* BG */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <img
          src={BG_IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-15 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black" />
      </div>

      {/* Left */}
      <div className="relative z-10 flex flex-col justify-center items-center
                      w-1/2 px-16 border-r border-white/5">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-14 h-14 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/25
                          flex items-center justify-center">
            <div className="w-5 h-5 bg-[#C5A059] rounded-sm" />
          </div>
          <div>
            <h1 className="font-orbitron text-white font-black text-3xl tracking-[0.35em]">
              GYM
            </h1>
            <p className="font-rajdhani text-zinc-500 text-sm tracking-[0.2em] uppercase">
              Admin Control Panel
            </p>
          </div>
        </div>

        <div className="w-full max-w-xs space-y-3">
          {[
            { label: 'Active Members', value: '128', color: 'text-[#C5A059]' },
            { label: 'Live Now', value: '15', color: 'text-green-400' },
            { label: "Today's Revenue", value: '₹45,200', color: 'text-purple-400' },
          ].map((s) => (
            <div key={s.label}
              className="flex items-center justify-between px-4 py-3
                         bg-white/[0.02] rounded-xl border border-white/6">
              <span className="font-rajdhani text-zinc-500 text-sm tracking-wider uppercase">
                {s.label}
              </span>
              <span className={`font-orbitron font-bold text-sm ${s.color}`}>
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="relative z-10 flex flex-col justify-center items-center w-1/2 px-16">
        <div className="w-full max-w-md">
          <p className="font-rajdhani text-zinc-500 text-sm tracking-[0.2em] uppercase mb-2">
            Welcome Back
          </p>
          <h2 className="font-orbitron text-white font-bold text-3xl tracking-[0.2em] mb-8">
            SIGN IN
          </h2>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="font-rajdhani text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-rajdhani text-zinc-500 text-xs tracking-[0.2em] uppercase mb-2">
                Email
              </label>
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl
                              bg-white/[0.03] border border-white/8
                              focus-within:border-[#C5A059]/40 transition-all">
                <User size={16} className="text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gym.com"
                  className="flex-1 bg-transparent font-rajdhani text-white text-base
                             outline-none placeholder:text-zinc-700 tracking-wide"
                />
              </div>
            </div>

            <div>
              <label className="block font-rajdhani text-zinc-500 text-xs tracking-[0.2em] uppercase mb-2">
                Password
              </label>
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl
                              bg-white/[0.03] border border-white/8
                              focus-within:border-[#C5A059]/40 transition-all">
                <Lock size={16} className="text-zinc-500" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent font-rajdhani text-white text-base
                             outline-none placeholder:text-zinc-700 tracking-wide"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="px-4 py-2.5 rounded-xl bg-[#C5A059]/5 border border-[#C5A059]/15">
              <p className="font-rajdhani text-[#C5A059]/60 text-xs tracking-wide">
                Demo: admin@gym.com / admin123
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-orbitron font-bold text-sm
                         tracking-[0.2em] text-black bg-[#C5A059] hover:bg-[#d4af6a]
                         disabled:opacity-50 transition-all duration-200 mt-2"
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;