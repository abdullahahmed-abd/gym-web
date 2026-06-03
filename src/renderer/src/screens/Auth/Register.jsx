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
  Shield,
  Zap,
} from 'lucide-react';

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const COLORS = {
  gold: '#C5A059',
  goldLight: '#EAB308',
  goldDark: '#8B7335',
};

const INITIAL_FORM = {
  name: '',
  mobile: '',
  email: '',
  gymName: '',
  password: '',
  confirmPassword: '',
};

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [step, setStep] = useState(1); // Multi-step form

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const validate = (currentStep = step) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      else if (formData.name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters';

      if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
      else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) newErrors.mobile = 'Enter valid 10-digit Indian mobile';
    }

    if (currentStep === 2) {
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) newErrors.email = 'Enter a valid email address';

      if (!formData.gymName.trim()) newErrors.gymName = 'Gym name is required';
      else if (formData.gymName.trim().length < 3) newErrors.gymName = 'Gym name must be at least 3 characters';
    }

    if (currentStep === 3) {
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate(step)) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setGeneralError('');

    if (!validate(3)) return;

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const existingUsersStr = localStorage.getItem('gymverse_users');
      const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];

      const normalizedEmail = formData.email.trim().toLowerCase();
      const emailExists = existingUsers.some((u) => u.email === normalizedEmail);

      if (emailExists) {
        setGeneralError('Email already registered. Please login instead.');
        setLoading(false);
        return;
      }

      const newUser = {
        id: Date.now(),
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        email: normalizedEmail,
        gymName: formData.gymName.trim(),
        password: formData.password,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('gymverse_users', JSON.stringify([...existingUsers, newUser]));

      setSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch {
      setGeneralError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex" style={{ background: '#000000' }}>
      
      {/* ═══════════════════════════════════════════════════════════════
          LEFT SIDE - BRANDING PANEL (Hidden on mobile)
      ═══════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-2/5 xl:w-1/2 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0" style={{ 
          background: `linear-gradient(135deg, ${COLORS.goldDark}15 0%, ${COLORS.gold}25 100%)`
        }} />
        
        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(197,160,89,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(197,160,89,0.6) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite',
          }}
        />

        {/* Floating Orbs */}
        <div
          className="absolute top-20 left-20 w-64 h-64 rounded-full blur-[100px] opacity-20 animate-pulse"
          style={{ background: COLORS.gold, animationDuration: '4s' }}
        />
        <div
          className="absolute bottom-32 right-20 w-80 h-80 rounded-full blur-[120px] opacity-15 animate-pulse"
          style={{ background: COLORS.goldLight, animationDuration: '6s', animationDelay: '2s' }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24 py-12">
          
          {/* Logo */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
                  boxShadow: `0 0 40px ${COLORS.gold}40`,
                }}
              >
                <Dumbbell size={32} color="#000" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="font-orbitron text-3xl font-bold tracking-[0.15em]">
                  <span className="text-white">GYM</span>
                  <span style={{ color: COLORS.gold }}>VERSE</span>
                </h1>
                <p className="font-rajdhani text-zinc-500 text-xs tracking-[0.2em] uppercase mt-1">
                  Admin Control Panel
                </p>
              </div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="mb-10">
            <h2 className="font-orbitron text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
              Transform Your
              <br />
              <span style={{ color: COLORS.gold }}>Gym Management</span>
            </h2>
            <p className="font-rajdhani text-zinc-400 text-lg leading-relaxed max-w-md">
              Join thousands of gym owners who trust GYMVERSE to streamline operations, 
              track members, and grow their business.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-5">
            {[
              { icon: Zap, text: 'Lightning-fast member management' },
              { icon: Shield, text: 'Bank-level security & data protection' },
              { icon: Sparkles, text: 'AI-powered insights & analytics' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'rgba(197,160,89,0.10)',
                    border: `1px solid ${COLORS.gold}30`,
                  }}
                >
                  <feature.icon size={20} color={COLORS.gold} />
                </div>
                <p className="font-rajdhani text-zinc-300 text-base tracking-wide">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-12 border-t border-zinc-800">
            {[
              { value: '10K+', label: 'Active Gyms' },
              { value: '500K+', label: 'Members' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-orbitron text-2xl font-bold mb-1" style={{ color: COLORS.gold }}>
                  {stat.value}
                </div>
                <div className="font-rajdhani text-zinc-500 text-xs tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          RIGHT SIDE - REGISTRATION FORM
      ═══════════════════════════════════════════════════════════════ */}
      <div className="w-full lg:w-3/5 xl:w-1/2 relative flex items-center justify-center px-6 py-12 lg:px-12">
        
        {/* Background Effects for Mobile */}
        <div className="lg:hidden absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(rgba(197,160,89,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(197,160,89,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="
            absolute top-6 left-6 z-50
            flex items-center gap-2 px-4 py-2.5 rounded-xl
            font-rajdhani text-zinc-400 text-xs tracking-wider uppercase
            transition-all duration-300 hover:text-white hover:scale-105
            lg:top-8 lg:left-8
          "
          style={{
            background: 'rgba(0,0,0,0.60)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <ArrowLeft size={14} />
          Back
        </button>

        {/* Form Container */}
        <div className="w-full max-w-md relative z-10">
          
          {/* Mobile Logo (shown only on small screens) */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${COLORS.gold}30, ${COLORS.gold}10)`,
                border: `1px solid ${COLORS.gold}40`,
              }}
            >
              <Dumbbell size={22} color={COLORS.gold} />
            </div>
            <h1 className="font-orbitron text-xl font-bold tracking-wider">
              <span className="text-white">GYM</span>
              <span style={{ color: COLORS.gold }}>VERSE</span>
            </h1>
          </div>

          <div
            className="rounded-3xl p-8 lg:p-10"
            style={{
              background: 'rgba(10,10,10,0.90)',
              border: '1px solid rgba(197,160,89,0.12)',
              backdropFilter: 'blur(30px)',
              boxShadow: '0 30px 90px rgba(0,0,0,0.7)',
            }}
          >
            {success ? (
              // ═══════════════════════════════════════════════════════════
              //  SUCCESS STATE
              // ═══════════════════════════════════════════════════════════
              <div className="text-center py-10">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce"
                  style={{
                    background: 'rgba(34,197,94,0.12)',
                    border: '3px solid rgba(34,197,94,0.30)',
                    boxShadow: '0 0 60px rgba(34,197,94,0.3)',
                  }}
                >
                  <CheckCircle size={48} color="#22C55E" strokeWidth={2.5} />
                </div>

                <h2 className="font-orbitron text-white text-2xl font-bold tracking-wider mb-4">
                  WELCOME ABOARD!
                </h2>

                <p className="font-rajdhani text-zinc-400 text-base tracking-wide mb-2">
                  Your account has been created successfully
                </p>
                
                <p className="font-rajdhani text-[#22C55E] text-sm tracking-wider font-bold mb-8">
                  {formData.name.split(' ')[0]}, get ready to transform your gym! 🚀
                </p>

                <div className="relative w-48 h-2 rounded-full overflow-hidden mx-auto" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, #22C55E, #10B981)`,
                      animation: 'progress 2s ease-out forwards',
                    }}
                  />
                </div>
                
                <p className="font-rajdhani text-zinc-600 text-xs tracking-wider uppercase mt-4">
                  Redirecting to dashboard...
                </p>
              </div>
            ) : (
              <>
                {/* ═══════════════════════════════════════════════════════
                    HEADER
                ═══════════════════════════════════════════════════════ */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full" style={{
                    background: `${COLORS.gold}10`,
                    border: `1px solid ${COLORS.gold}30`,
                  }}>
                    <Sparkles size={14} color={COLORS.gold} />
                    <span className="font-rajdhani text-[#C5A059] text-xs tracking-widest uppercase font-bold">
                      Step {step} of 3
                    </span>
                  </div>
                  
                  <h2 className="font-orbitron text-white text-2xl font-bold tracking-wider mb-3">
                    {step === 1 && 'PERSONAL INFO'}
                    {step === 2 && 'GYM DETAILS'}
                    {step === 3 && 'SECURE ACCESS'}
                  </h2>
                  
                  <p className="font-rajdhani text-zinc-500 text-sm tracking-wide">
                    {step === 1 && 'Tell us about yourself'}
                    {step === 2 && 'Information about your gym'}
                    {step === 3 && 'Create a secure password'}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex gap-2">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className="h-1.5 rounded-full flex-1 transition-all duration-500"
                        style={{
                          background: s <= step 
                            ? `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight})`
                            : 'rgba(255,255,255,0.05)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* ═══════════════════════════════════════════════════════
                    GENERAL ERROR
                ═══════════════════════════════════════════════════════ */}
                {generalError && (
                  <div
                    className="mb-6 px-5 py-4 rounded-2xl flex items-start gap-3 animate-shake"
                    style={{
                      background: 'rgba(239,68,68,0.10)',
                      border: '1px solid rgba(239,68,68,0.25)',
                    }}
                  >
                    <AlertCircle size={18} color="#EF4444" className="flex-shrink-0 mt-0.5" />
                    <p className="font-rajdhani text-red-400 text-sm tracking-wide leading-relaxed">
                      {generalError}
                    </p>
                  </div>
                )}

                {/* ═══════════════════════════════════════════════════════
                    MULTI-STEP FORM
                ═══════════════════════════════════════════════════════ */}
                <form onSubmit={step === 3 ? handleRegister : (e) => { e.preventDefault(); handleNext(); }}>
                  
                  {/* STEP 1: Personal Information */}
                  {step === 1 && (
                    <div className="space-y-5 animate-fadeIn">
                      {/* Name */}
                      <div>
                        <label className="font-rajdhani text-zinc-400 text-xs tracking-widest uppercase block mb-2.5 font-bold">
                          Full Name *
                        </label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 group-focus-within:text-[#C5A059]">
                            <User size={18} color={errors.name ? '#EF4444' : '#52525B'} />
                          </div>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Abdullah Ahmed"
                            autoComplete="name"
                            autoFocus
                            className="w-full rounded-2xl pl-12 pr-5 py-4 font-rajdhani text-white text-sm placeholder-zinc-700 transition-all duration-300 focus:scale-[1.01]"
                            style={{
                              background: 'rgba(255,255,255,0.03)',
                              border: `1.5px solid ${errors.name ? 'rgba(239,68,68,0.50)' : 'rgba(255,255,255,0.08)'}`,
                              outline: 'none',
                            }}
                            onFocus={(e) => e.target.style.borderColor = errors.name ? 'rgba(239,68,68,0.50)' : COLORS.gold + '60'}
                            onBlur={(e) => e.target.style.borderColor = errors.name ? 'rgba(239,68,68,0.50)' : 'rgba(255,255,255,0.08)'}
                          />
                        </div>
                        {errors.name && (
                          <p className="font-rajdhani text-red-400 text-xs tracking-wide mt-2 flex items-center gap-2 animate-shake">
                            <AlertCircle size={12} />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Mobile */}
                      <div>
                        <label className="font-rajdhani text-zinc-400 text-xs tracking-widest uppercase block mb-2.5 font-bold">
                          Mobile Number *
                        </label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2.5 transition-colors duration-300">
                            <Phone size={18} color={errors.mobile ? '#EF4444' : '#52525B'} />
                            <span className="font-rajdhani text-zinc-500 text-sm font-bold">+91</span>
                          </div>
                          <input
                            type="tel"
                            value={formData.mobile}
                            onChange={(e) => handleChange('mobile', e.target.value)}
                            placeholder="9876543210"
                            maxLength={10}
                            inputMode="numeric"
                            autoComplete="tel"
                            className="w-full rounded-2xl pl-20 pr-5 py-4 font-rajdhani text-white text-sm placeholder-zinc-700 transition-all duration-300 focus:scale-[1.01]"
                            style={{
                              background: 'rgba(255,255,255,0.03)',
                              border: `1.5px solid ${errors.mobile ? 'rgba(239,68,68,0.50)' : 'rgba(255,255,255,0.08)'}`,
                              outline: 'none',
                            }}
                            onFocus={(e) => e.target.style.borderColor = errors.mobile ? 'rgba(239,68,68,0.50)' : COLORS.gold + '60'}
                            onBlur={(e) => e.target.style.borderColor = errors.mobile ? 'rgba(239,68,68,0.50)' : 'rgba(255,255,255,0.08)'}
                          />
                        </div>
                        {errors.mobile && (
                          <p className="font-rajdhani text-red-400 text-xs tracking-wide mt-2 flex items-center gap-2 animate-shake">
                            <AlertCircle size={12} />
                            {errors.mobile}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Gym Details */}
                  {step === 2 && (
                    <div className="space-y-5 animate-fadeIn">
                      {/* Email */}
                      <div>
                        <label className="font-rajdhani text-zinc-400 text-xs tracking-widest uppercase block mb-2.5 font-bold">
                          Email Address *
                        </label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300">
                            <Mail size={18} color={errors.email ? '#EF4444' : '#52525B'} />
                          </div>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="admin@yourgym.com"
                            autoComplete="email"
                            autoFocus
                            className="w-full rounded-2xl pl-12 pr-5 py-4 font-rajdhani text-white text-sm placeholder-zinc-700 transition-all duration-300 focus:scale-[1.01]"
                            style={{
                              background: 'rgba(255,255,255,0.03)',
                              border: `1.5px solid ${errors.email ? 'rgba(239,68,68,0.50)' : 'rgba(255,255,255,0.08)'}`,
                              outline: 'none',
                            }}
                            onFocus={(e) => e.target.style.borderColor = errors.email ? 'rgba(239,68,68,0.50)' : COLORS.gold + '60'}
                            onBlur={(e) => e.target.style.borderColor = errors.email ? 'rgba(239,68,68,0.50)' : 'rgba(255,255,255,0.08)'}
                          />
                        </div>
                        {errors.email && (
                          <p className="font-rajdhani text-red-400 text-xs tracking-wide mt-2 flex items-center gap-2 animate-shake">
                            <AlertCircle size={12} />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Gym Name */}
                      <div>
                        <label className="font-rajdhani text-zinc-400 text-xs tracking-widest uppercase block mb-2.5 font-bold">
                          Gym Name *
                        </label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300">
                            <Building2 size={18} color={errors.gymName ? '#EF4444' : '#52525B'} />
                          </div>
                          <input
                            type="text"
                            value={formData.gymName}
                            onChange={(e) => handleChange('gymName', e.target.value)}
                            placeholder="PowerFit Gym"
                            autoComplete="organization"
                            className="w-full rounded-2xl pl-12 pr-5 py-4 font-rajdhani text-white text-sm placeholder-zinc-700 transition-all duration-300 focus:scale-[1.01]"
                            style={{
                              background: 'rgba(255,255,255,0.03)',
                              border: `1.5px solid ${errors.gymName ? 'rgba(239,68,68,0.50)' : 'rgba(255,255,255,0.08)'}`,
                              outline: 'none',
                            }}
                            onFocus={(e) => e.target.style.borderColor = errors.gymName ? 'rgba(239,68,68,0.50)' : COLORS.gold + '60'}
                            onBlur={(e) => e.target.style.borderColor = errors.gymName ? 'rgba(239,68,68,0.50)' : 'rgba(255,255,255,0.08)'}
                          />
                        </div>
                        {errors.gymName && (
                          <p className="font-rajdhani text-red-400 text-xs tracking-wide mt-2 flex items-center gap-2 animate-shake">
                            <AlertCircle size={12} />
                            {errors.gymName}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Password */}
                  {step === 3 && (
                    <div className="space-y-5 animate-fadeIn">
                      {/* Password */}
                      <div>
                        <label className="font-rajdhani text-zinc-400 text-xs tracking-widest uppercase block mb-2.5 font-bold">
                          Password *
                        </label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300">
                            <Lock size={18} color={errors.password ? '#EF4444' : '#52525B'} />
                          </div>
                          <input
                            type={showPass ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            placeholder="Minimum 6 characters"
                            autoComplete="new-password"
                            autoFocus
                            className="w-full rounded-2xl pl-12 pr-14 py-4 font-rajdhani text-white text-sm placeholder-zinc-700 transition-all duration-300 focus:scale-[1.01]"
                            style={{
                              background: 'rgba(255,255,255,0.03)',
                              border: `1.5px solid ${errors.password ? 'rgba(239,68,68,0.50)' : 'rgba(255,255,255,0.08)'}`,
                              outline: 'none',
                            }}
                            onFocus={(e) => e.target.style.borderColor = errors.password ? 'rgba(239,68,68,0.50)' : COLORS.gold + '60'}
                            onBlur={(e) => e.target.style.borderColor = errors.password ? 'rgba(239,68,68,0.50)' : 'rgba(255,255,255,0.08)'}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-all duration-300 hover:scale-110"
                            tabIndex={-1}
                          >
                            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="font-rajdhani text-red-400 text-xs tracking-wide mt-2 flex items-center gap-2 animate-shake">
                            <AlertCircle size={12} />
                            {errors.password}
                          </p>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="font-rajdhani text-zinc-400 text-xs tracking-widest uppercase block mb-2.5 font-bold">
                          Confirm Password *
                        </label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300">
                            <Lock size={18} color={errors.confirmPassword ? '#EF4444' : '#52525B'} />
                          </div>
                          <input
                            type={showConfirm ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={(e) => handleChange('confirmPassword', e.target.value)}
                            placeholder="Re-enter your password"
                            autoComplete="new-password"
                            className="w-full rounded-2xl pl-12 pr-14 py-4 font-rajdhani text-white text-sm placeholder-zinc-700 transition-all duration-300 focus:scale-[1.01]"
                            style={{
                              background: 'rgba(255,255,255,0.03)',
                              border: `1.5px solid ${errors.confirmPassword ? 'rgba(239,68,68,0.50)' : 'rgba(255,255,255,0.08)'}`,
                              outline: 'none',
                            }}
                            onFocus={(e) => e.target.style.borderColor = errors.confirmPassword ? 'rgba(239,68,68,0.50)' : COLORS.gold + '60'}
                            onBlur={(e) => e.target.style.borderColor = errors.confirmPassword ? 'rgba(239,68,68,0.50)' : 'rgba(255,255,255,0.08)'}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-all duration-300 hover:scale-110"
                            tabIndex={-1}
                          >
                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="font-rajdhani text-red-400 text-xs tracking-wide mt-2 flex items-center gap-2 animate-shake">
                            <AlertCircle size={12} />
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>

                      {/* Password Strength Indicator */}
                      {formData.password && (
                        <div className="pt-2">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-rajdhani text-zinc-500 text-xs tracking-wider uppercase">
                              Password Strength
                            </span>
                            <span className={`font-rajdhani text-xs font-bold tracking-wider uppercase ${
                              formData.password.length >= 8 ? 'text-green-400' : 
                              formData.password.length >= 6 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              {formData.password.length >= 8 ? 'Strong' : 
                               formData.password.length >= 6 ? 'Medium' : 'Weak'}
                            </span>
                          </div>
                          <div className="flex gap-1.5">
                            {[1, 2, 3, 4].map((bar) => (
                              <div
                                key={bar}
                                className="h-1.5 rounded-full flex-1 transition-all duration-500"
                                style={{
                                  background: 
                                    formData.password.length >= bar * 2 
                                      ? formData.password.length >= 8 
                                        ? '#22C55E' 
                                        : formData.password.length >= 6 
                                          ? '#EAB308' 
                                          : '#EF4444'
                                      : 'rgba(255,255,255,0.05)',
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ═══════════════════════════════════════════════════════
                      NAVIGATION BUTTONS
                  ═══════════════════════════════════════════════════════ */}
                  <div className="flex gap-3 mt-8">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handlePrev}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 font-rajdhani text-sm font-bold tracking-wider uppercase py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1.5px solid rgba(255,255,255,0.10)',
                          color: '#FFFFFF',
                        }}
                      >
                        <ArrowLeft size={16} />
                        Back
                      </button>
                    )}
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2.5 font-orbitron text-sm font-bold tracking-wider uppercase py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background: loading
                          ? 'rgba(197,160,89,0.25)'
                          : `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
                        color: '#000000',
                        boxShadow: loading ? 'none' : `0 10px 40px ${COLORS.gold}40`,
                      }}
                    >
                      {loading ? (
                        <>
                          <div
                            className="w-4 h-4 border-2 rounded-full animate-spin"
                            style={{ borderColor: 'rgba(0,0,0,0.2)', borderTopColor: '#000000' }}
                          />
                          Processing...
                        </>
                      ) : step === 3 ? (
                        <>
                          Create Account
                          <CheckCircle size={16} />
                        </>
                      ) : (
                        <>
                          Continue
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* ═══════════════════════════════════════════════════════
                    FOOTER
                ═══════════════════════════════════════════════════════ */}
                {step === 3 && (
                  <p className="text-center font-rajdhani text-zinc-600 text-xs tracking-wide mt-6 leading-relaxed px-4">
                    By creating an account, you agree to our{' '}
                    <a href="#" className="hover:text-[#C5A059] transition-colors font-bold" style={{ color: COLORS.gold }}>
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="hover:text-[#C5A059] transition-colors font-bold" style={{ color: COLORS.gold }}>
                      Privacy Policy
                    </a>
                  </p>
                )}

                {/* Login Link */}
                <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="font-rajdhani text-zinc-500 text-sm tracking-wide">
                    Already have an account?{' '}
                    <button
                      onClick={() => navigate('/login')}
                      className="font-bold hover:underline underline-offset-4 transition-all hover:scale-105 inline-block"
                      style={{ color: COLORS.gold }}
                    >
                      Sign In →
                    </button>
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <p className="text-center font-rajdhani text-zinc-700 text-xs tracking-wider mt-8">
            © {new Date().getFullYear()} GYMVERSE • Proudly Made in India 🇮🇳
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          ANIMATIONS
      ═══════════════════════════════════════════════════════════════ */}
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0;
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}