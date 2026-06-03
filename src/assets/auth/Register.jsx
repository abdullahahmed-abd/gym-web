// src/screens/Auth/Register.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dumbbell,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building2,
  Lock,
  AlertCircle,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const COLORS = {
  gold: '#C5A059',
  goldLight: '#EAB308',
};

// ─── INITIAL FORM STATE ──────────────────────────────────────────────────────

const INITIAL_FORM = {
  name: '',
  mobile: '',
  email: '',
  gymName: '',
  password: '',
  confirmPassword: '',
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Register() {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────────────────────────

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generalError, setGeneralError] = useState('');

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field error when user types
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  // ── Validation ─────────────────────────────────────────────────────────────

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      newErrors.mobile = 'Enter valid 10-digit Indian mobile';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    // Gym name validation
    if (!formData.gymName.trim()) {
      newErrors.gymName = 'Gym name is required';
    } else if (formData.gymName.trim().length < 3) {
      newErrors.gymName = 'Gym name must be at least 3 characters';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleRegister = async (e) => {
    e.preventDefault();
    setGeneralError('');

    if (!validate()) return;

    setLoading(true);

    try {
      // ── Simulate API delay ────────────────────────────────────────────────
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // ── Check if email already exists ────────────────────────────────────
      const existingUsers = JSON.parse(
        localStorage.getItem('gymverse_users') || '[]'
      );

      const emailExists = existingUsers.some(
        (u) => u.email === formData.email.trim().toLowerCase()
      );

      if (emailExists) {
        setGeneralError('Email already registered. Please login instead.');
        setLoading(false);
        return;
      }

      // ── Save user to localStorage ────────────────────────────────────────
      const newUser = {
        id: Date.now(),
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email.trim().toLowerCase(),
        gymName: formData.gymName.trim(),
        password: formData.password, // ⚠️ In production: hash this!
        createdAt: new Date().toISOString(),
      };

      existingUsers.push(newUser);
      localStorage.setItem('gymverse_users', JSON.stringify(existingUsers));

      // ── Show success ─────────────────────────────────────────────────────
      setSuccess(true);

      // ── Redirect to login after 2 sec ────────────────────────────────────
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setGeneralError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Form Field Helper ──────────────────────────────────────────────────────

  const FormField = ({
    icon: Icon,
    label,
    field,
    type = 'text',
    placeholder,
    prefix,
    maxLength,
  }) => (
    <div>
      <label className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.18em] uppercase block mb-2 font-bold">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <Icon size={15} color="#52525B" />
          {prefix && (
            <span className="font-rajdhani text-zinc-500 text-[13px]">
              {prefix}
            </span>
          )}
        </div>
        <input
          type={type}
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={loading || success}
          className="w-full rounded-xl py-3.5 font-rajdhani text-white text-[13px] placeholder-zinc-700 transition-all duration-300 disabled:opacity-50"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${
              errors[field]
                ? 'rgba(239,68,68,0.40)'
                : 'rgba(255,255,255,0.06)'
            }`,
            outline: 'none',
            paddingLeft: prefix ? '4rem' : '2.75rem',
            paddingRight: '1rem',
          }}
          onFocus={(e) => {
            if (!errors[field]) {
              e.target.style.borderColor = `${COLORS.gold}40`;
              e.target.style.background = `${COLORS.gold}05`;
            }
          }}
          onBlur={(e) => {
            if (!errors[field]) {
              e.target.style.borderColor = 'rgba(255,255,255,0.06)';
              e.target.style.background = 'rgba(255,255,255,0.02)';
            }
          }}
        />
      </div>
      {errors[field] && (
        <p className="font-rajdhani text-red-400 text-[11px] tracking-[0.04em] mt-1.5 flex items-center gap-1.5">
          <AlertCircle size={11} />
          {errors[field]}
        </p>
      )}
    </div>
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden p-4 py-8"
      style={{ background: '#000000' }}
    >
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/*  Background                                                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}

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
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-[120px] opacity-[0.06]"
        style={{ background: COLORS.gold }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[140px] opacity-[0.04]"
        style={{ background: COLORS.goldLight }}
      />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/*  Back to Landing Button                                             */}
      {/* ═══════════════════════════════════════════════════════════════════ */}

      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 rounded-lg font-rajdhani text-zinc-500 text-[11px] tracking-[0.12em] uppercase transition-all duration-300 hover:text-[#C5A059] hover:scale-105"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <ArrowLeft size={13} />
        Back to Home
      </button>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/*  Register Card                                                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}

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
          {/* ═════════════════════════════════════════════════════════════ */}
          {/*  SUCCESS STATE                                                */}
          {/* ═════════════════════════════════════════════════════════════ */}

          {success ? (
            <div className="text-center py-8">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: 'rgba(34,197,94,0.10)',
                  border: '2px solid rgba(34,197,94,0.30)',
                }}
              >
                <CheckCircle size={40} color="#22C55E" />
              </div>

              <h2 className="font-orbitron text-white text-[18px] font-bold tracking-[0.12em] mb-3">
                ACCOUNT{' '}
                <span style={{ color: '#22C55E' }}>CREATED</span>
              </h2>

              <p className="font-rajdhani text-zinc-400 text-[13px] tracking-[0.04em] mb-2">
                Welcome to GYMVERSE, {formData.name.split(' ')[0]}!
              </p>

              <p className="font-rajdhani text-zinc-600 text-[12px] tracking-[0.08em]">
                Redirecting to login...
              </p>

              <div
                className="mt-6 mx-auto w-32 h-1 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight})`,
                    animation: 'progress 2s linear forwards',
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              {/* ═══════════════════════════════════════════════════════════ */}
              {/*  FORM STATE                                                 */}
              {/* ═══════════════════════════════════════════════════════════ */}

              {/* ─── Logo ──────────────────────────────────────────────── */}

              <div className="flex flex-col items-center mb-6">
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

              {/* ─── Title ─────────────────────────────────────────────── */}

              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1.5 mb-2">
                  <Sparkles size={12} color={COLORS.gold} />
                  <span className="font-rajdhani text-[#C5A059] text-[10px] tracking-[0.18em] uppercase font-bold">
                    Get Started
                  </span>
                </div>
                <h2 className="font-orbitron text-white text-[16px] font-bold tracking-[0.12em] mb-1.5">
                  CREATE ACCOUNT
                </h2>
                <p className="font-rajdhani text-zinc-500 text-[12px] tracking-[0.04em]">
                  Start managing your gym in 2 minutes
                </p>
              </div>

              {/* ─── Error Banner ──────────────────────────────────────── */}

              {generalError && (
                <div
                  className="mb-5 px-4 py-3 rounded-xl flex items-center gap-2.5"
                  style={{
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.20)',
                  }}
                >
                  <AlertCircle size={16} color="#EF4444" />
                  <p className="font-rajdhani text-red-400 text-[12px] tracking-[0.04em]">
                    {generalError}
                  </p>
                </div>
              )}

              {/* ─── Form ──────────────────────────────────────────────── */}

              <form onSubmit={handleRegister} className="space-y-3.5">

                <FormField
                  icon={User}
                  label="Full Name"
                  field="name"
                  placeholder="Abdullah Ahmed"
                />

                <FormField
                  icon={Phone}
                  label="Mobile Number"
                  field="mobile"
                  type="tel"
                  placeholder="9876543210"
                  prefix="+91"
                  maxLength={10}
                />

                <FormField
                  icon={Mail}
                  label="Email Address"
                  field="email"
                  type="email"
                  placeholder="admin@yourgym.com"
                />

                <FormField
                  icon={Building2}
                  label="Gym Name"
                  field="gymName"
                  placeholder="PowerFit Gym"
                />

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
                      value={formData.password}
                      onChange={(e) =>
                        handleChange('password', e.target.value)
                      }
                      placeholder="At least 6 characters"
                      disabled={loading}
                      className="w-full rounded-xl pl-11 pr-12 py-3.5 font-rajdhani text-white text-[13px] placeholder-zinc-700 transition-all duration-300 disabled:opacity-50"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: `1px solid ${
                          errors.password
                            ? 'rgba(239,68,68,0.40)'
                            : 'rgba(255,255,255,0.06)'
                        }`,
                        outline: 'none',
                      }}
                      onFocus={(e) => {
                        if (!errors.password) {
                          e.target.style.borderColor = `${COLORS.gold}40`;
                          e.target.style.background = `${COLORS.gold}05`;
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.password) {
                          e.target.style.borderColor =
                            'rgba(255,255,255,0.06)';
                          e.target.style.background =
                            'rgba(255,255,255,0.02)';
                        }
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
                  {errors.password && (
                    <p className="font-rajdhani text-red-400 text-[11px] tracking-[0.04em] mt-1.5 flex items-center gap-1.5">
                      <AlertCircle size={11} />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.18em] uppercase block mb-2 font-bold">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Lock size={15} color="#52525B" />
                    </div>
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleChange('confirmPassword', e.target.value)
                      }
                      placeholder="Re-enter password"
                      disabled={loading}
                      className="w-full rounded-xl pl-11 pr-12 py-3.5 font-rajdhani text-white text-[13px] placeholder-zinc-700 transition-all duration-300 disabled:opacity-50"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: `1px solid ${
                          errors.confirmPassword
                            ? 'rgba(239,68,68,0.40)'
                            : 'rgba(255,255,255,0.06)'
                        }`,
                        outline: 'none',
                      }}
                      onFocus={(e) => {
                        if (!errors.confirmPassword) {
                          e.target.style.borderColor = `${COLORS.gold}40`;
                          e.target.style.background = `${COLORS.gold}05`;
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.confirmPassword) {
                          e.target.style.borderColor =
                            'rgba(255,255,255,0.06)';
                          e.target.style.background =
                            'rgba(255,255,255,0.02)';
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="font-rajdhani text-red-400 text-[11px] tracking-[0.04em] mt-1.5 flex items-center gap-1.5">
                      <AlertCircle size={11} />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
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
                    if (!loading)
                      e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    if (!loading)
                      e.currentTarget.style.transform = 'scale(1)';
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
                      CREATING ACCOUNT...
                    </>
                  ) : (
                    <>
                      CREATE ACCOUNT
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              {/* ─── Terms ─────────────────────────────────────────────── */}

              <p className="text-center font-rajdhani text-zinc-700 text-[10px] tracking-[0.06em] mt-4 leading-relaxed">
                By creating account, you agree to our{' '}
                <a
                  href="#"
                  className="hover:text-[#C5A059] transition-colors"
                  style={{ color: COLORS.gold }}
                >
                  Terms
                </a>{' '}
                and{' '}
                <a
                  href="#"
                  className="hover:text-[#C5A059] transition-colors"
                  style={{ color: COLORS.gold }}
                >
                  Privacy Policy
                </a>
              </p>

              {/* ─── Login Link ────────────────────────────────────────── */}

              <div
                className="mt-6 pt-5 text-center"
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <p className="font-rajdhani text-zinc-500 text-[12px] tracking-[0.04em]">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="font-bold hover:underline underline-offset-4 transition-all"
                    style={{ color: COLORS.gold }}
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </>
          )}
        </div>

        {/* ─── Footer ─────────────────────────────────────────────────── */}

        <p className="text-center font-rajdhani text-zinc-700 text-[11px] tracking-[0.08em] mt-6">
          © {new Date().getFullYear()} GYMVERSE. Made in India 🇮🇳
        </p>
      </div>

      {/* Progress Animation */}
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}