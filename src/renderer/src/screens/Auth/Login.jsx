// src/screens/Auth/Login.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dumbbell,
  Eye,
  EyeOff,
  ArrowRight,
  Mail,
  Lock,
  AlertCircle,
  Shield,
} from 'lucide-react';

const COLORS = {
  gold: '#C5A059',
  goldLight: '#EAB308',
};

const DEMO_ACCOUNT = {
  email: 'admin@gymverse.com',
  password: 'admin123',
};

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // ⭐ FIX: Normalize email
      const normalizedEmail = email.trim().toLowerCase();

      // Check demo account
      if (
        normalizedEmail === DEMO_ACCOUNT.email &&
        password === DEMO_ACCOUNT.password
      ) {
        onLogin({
          name: 'Abdullah Ahmed',
          email: normalizedEmail,
          gymName: 'PowerFit Gym',
          gymCode: 'GYM4X2',
          role: 'admin',
          mobile: '+91 98765 43210',
        });
        return;
      }

      // Check registered users
      const registeredUsers = JSON.parse(
        localStorage.getItem('gymverse_users') || '[]'
      );

      // ⭐ FIX: Use normalized email for comparison
      const user = registeredUsers.find(
        (u) => u.email === normalizedEmail && u.password === password
      );

      if (user) {
        onLogin({
          name: user.name,
          email: user.email,
          gymName: user.gymName,
          mobile: user.mobile,
          role: 'admin',
        });
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
console.log('Users:', JSON.parse(localStorage.getItem('gymverse_users')));
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden p-4"
      style={{ background: '#000000' }}
    >
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(197,160,89,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(197,160,89,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-[120px] opacity-[0.06]"
        style={{ background: COLORS.gold }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full blur-[140px] opacity-[0.04]"
        style={{ background: COLORS.goldLight }}
      />

      <div className="relative w-full max-w-md">
        <div
          className="rounded-3xl p-8 sm:p-10"
          style={{
            background: 'rgba(5,5,5,0.85)',
            border: '1px solid rgba(197,160,89,0.15)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{
                background: `linear-gradient(135deg, ${COLORS.gold}20, ${COLORS.gold}08)`,
                border: `1px solid ${COLORS.gold}25`,
              }}
            >
              <Dumbbell size={26} color={COLORS.gold} />
            </div>

            <h1 className="font-orbitron text-[20px] font-bold tracking-[0.15em] mb-1">
              <span className="text-white">GYM</span>
              <span style={{ color: COLORS.gold }}>VERSE</span>
            </h1>

            <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.25em] uppercase">
              Admin Control Panel
            </p>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="font-orbitron text-white text-[16px] font-bold tracking-[0.12em] mb-1.5">
              WELCOME BACK
            </h2>
            <p className="font-rajdhani text-zinc-500 text-[13px] tracking-[0.04em]">
              Sign in to manage your gym
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-5 px-4 py-3 rounded-xl flex items-center gap-2.5 animate-shake"
              style={{
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.20)',
              }}
            >
              <AlertCircle size={16} color="#EF4444" />
              <p className="font-rajdhani text-red-400 text-[13px] tracking-[0.04em]">
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email */}
            <div>
              <label className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.18em] uppercase block mb-2 font-bold">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Mail size={15} color="#52525B" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gymverse.com"
                  required
                  disabled={loading}
                  className="w-full rounded-xl pl-11 pr-4 py-3.5 font-rajdhani text-white text-[13px] placeholder-zinc-700 transition-all duration-300 disabled:opacity-50"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = `${COLORS.gold}40`;
                    e.target.style.background = `${COLORS.gold}05`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.target.style.background = 'rgba(255,255,255,0.02)';
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.18em] uppercase block mb-2 font-bold">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock size={15} color="#52525B" />
                </div>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  className="w-full rounded-xl pl-11 pr-12 py-3.5 font-rajdhani text-white text-[13px] placeholder-zinc-700 transition-all duration-300 disabled:opacity-50"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = `${COLORS.gold}40`;
                    e.target.style.background = `${COLORS.gold}05`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.target.style.background = 'rgba(255,255,255,0.02)';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="flex justify-end">
              <button
                type="button"
                className="font-rajdhani text-zinc-600 text-[11px] tracking-[0.08em] hover:text-[#C5A059] transition-colors duration-300"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 font-orbitron text-[12px] font-bold tracking-[0.15em] py-3.5 rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{
                background: loading
                  ? 'rgba(197,160,89,0.20)'
                  : `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
                color: '#000000',
                boxShadow: loading
                  ? 'none'
                  : '0 8px 32px rgba(197,160,89,0.25)',
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {loading ? (
                <>
                  <div
                    className="w-4 h-4 border-2 rounded-full animate-spin"
                    style={{
                      borderColor: 'rgba(0,0,0,0.2)',
                      borderTopColor: '#000000',
                    }}
                  />
                  SIGNING IN...
                </>
              ) : (
                <>
                  SIGN IN
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="font-rajdhani text-zinc-700 text-[10px] tracking-[0.18em] uppercase">
              OR
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Register Link */}
          <button
            onClick={() => navigate('/register')}
            className="w-full py-3 rounded-xl font-rajdhani text-[12px] font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            style={{
              background: `${COLORS.gold}08`,
              color: COLORS.gold,
              border: `1px solid ${COLORS.gold}20`,
            }}
          >
            <Shield size={13} />
            Create New Account
          </button>

          {/* Demo Hint */}
          <div
            className="mt-6 pt-5 text-center"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
          >
            <p className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.12em] uppercase mb-1">
              Demo Account
            </p>
            <p className="font-rajdhani text-zinc-500 text-[11px]">
              <span style={{ color: COLORS.gold }}>admin@gymverse.com</span>
              {' / '}
              <span style={{ color: COLORS.gold }}>admin123</span>
            </p>
          </div>
        </div>

        <p className="text-center font-rajdhani text-zinc-700 text-[11px] tracking-[0.08em] mt-6">
          © {new Date().getFullYear()} GYMVERSE. Made in India 🇮🇳
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  );
}