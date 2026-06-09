// MembersProfile.jsx — FULL DASHBOARD-MATCHING PREMIUM UI
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  Shield, Phone, Mail, Activity, Dumbbell,
  Calendar, Clock, CheckCircle, AlertCircle,
  Edit2, Trash2, ArrowLeft, Crown, Sparkles,
  Zap, Flame, Timer, TrendingUp, Hash,
  ChevronRight, Eye, UserCheck, Target,
  CalendarCheck, Wifi, LogIn, LogOut,
  Loader2, X, MapPin, CreditCard, User,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════ */
/* CONFIGS                                                         */
/* ═══════════════════════════════════════════════════════════════ */
const STATUS_CONFIG = {
  active:  { label: 'ACTIVE',  color: '#22C55E', icon: CheckCircle, pulse: true  },
  expired: { label: 'EXPIRED', color: '#EF4444', icon: AlertCircle, pulse: false },
  trial:   { label: 'TRIAL',   color: '#3B82F6', icon: Zap,         pulse: true  },
};

const TIER_CONFIG = {
  'ELITE TIER': {
    color: '#C5A059', icon: Crown, short: 'ELITE',
    borderColor: 'rgba(197,160,89,0.18)', glowColor: 'rgba(197,160,89,0.08)',
  },
  'LEGENDARY TIER': {
    color: '#A855F7', icon: Sparkles, short: 'LEGENDARY',
    borderColor: 'rgba(168,85,247,0.18)', glowColor: 'rgba(168,85,247,0.08)',
  },
};

/* ═══════════════════════════════════════════════════════════════ */
/* GLASSPANEL (identical to dashboard)                             */
/* ═══════════════════════════════════════════════════════════════ */
const GlassPanel = ({ children, className = '', onClick, hover = false, borderColor, glow }) => (
  <div onClick={onClick}
    className={`relative rounded-3xl overflow-hidden
      ${hover ? 'cursor-pointer transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1' : ''}
      ${onClick ? 'cursor-pointer' : ''} ${className}`}
    style={{
      background: '#000000',
      border: `1px solid ${borderColor || 'rgba(255,255,255,0.08)'}`,
      backdropFilter: 'blur(24px)',
      boxShadow: glow ? `0 8px 32px ${glow}` : 'none',
    }}>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* PULSE DOT (dashboard style)                                     */
/* ═══════════════════════════════════════════════════════════════ */
const PulseDot = ({ color = '#22C55E', size = 8 }) => (
  <div className="relative flex items-center justify-center" style={{ width: size * 3, height: size * 3 }}>
    <span className="absolute rounded-full animate-ping opacity-30"
      style={{ width: size * 2.5, height: size * 2.5, backgroundColor: color }} />
    <span className="absolute rounded-full animate-pulse opacity-20"
      style={{ width: size * 1.8, height: size * 1.8, backgroundColor: color }} />
    <span className="relative rounded-full"
      style={{ width: size, height: size, backgroundColor: color, boxShadow: `0 0 ${size * 2}px ${color}40` }} />
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* STAT CARD (dashboard top metrics style)                         */
/* ═══════════════════════════════════════════════════════════════ */
const StatCard = ({ icon: Icon, label, value, color, pulse, sub }) => (
  <GlassPanel hover className="group" glow={`${color}08`}>
    <div className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center
                        transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{
            background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
            border: `1px solid ${color}20`,
          }}>
          <Icon size={17} style={{ color }} />
        </div>
        {pulse && <PulseDot color={color} size={6} />}
      </div>
      <p className="font-orbitron text-white font-bold text-[26px] leading-none mb-1
                    transition-all duration-300 group-hover:text-[28px]">
        {value}
      </p>
      <p className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.15em] uppercase font-semibold">{label}</p>
      {sub && (
        <>
          <div className="h-px bg-gradient-to-r from-white/[0.05] via-white/[0.1] to-white/[0.05] my-2" />
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${color}80` }} />
            <span className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.1em] uppercase">{sub}</span>
          </div>
        </>
      )}
    </div>
  </GlassPanel>
);

/* ═══════════════════════════════════════════════════════════════ */
/* INFO ROW                                                        */
/* ═══════════════════════════════════════════════════════════════ */
const InfoRow = ({ icon: Icon, label, value, valueColor, color = '#C5A059', last }) => (
  <div className={`flex items-center justify-between py-3.5 ${!last ? '' : ''}`}
    style={{ borderBottom: !last ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}10`, border: `1px solid ${color}15` }}>
        <Icon size={13} style={{ color }} />
      </div>
      <span className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.15em] uppercase font-semibold">{label}</span>
    </div>
    <span className="font-orbitron text-[12px] font-bold tracking-wider"
      style={{ color: valueColor || 'rgba(255,255,255,0.90)' }}>{value || '--'}</span>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* TOAST                                                           */
/* ═══════════════════════════════════════════════════════════════ */
const Toast = ({ message, type = 'success', visible }) => (
  <div className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl
    transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
    style={{
      background: '#000000',
      border: `1px solid ${type === 'success' ? 'rgba(34,197,94,0.25)' : type === 'warning' ? 'rgba(234,179,8,0.25)' : 'rgba(239,68,68,0.25)'}`,
      boxShadow: `0 12px 40px ${type === 'success' ? 'rgba(34,197,94,0.15)' : type === 'warning' ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.15)'}`,
    }}>
    {type === 'success' ? <CheckCircle size={17} color="#22C55E" /> :
     type === 'warning' ? <AlertCircle size={17} color="#EAB308" /> :
     <AlertCircle size={17} color="#EF4444" />}
    <span className="font-rajdhani text-white text-[12px] tracking-[0.12em] uppercase font-bold">{message}</span>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* CONFIRM MODAL                                                   */
/* ═══════════════════════════════════════════════════════════════ */
const ConfirmModal = ({ isOpen, title, subtitle, message, icon: Icon, iconColor, confirmLabel,
                        confirmColor, onConfirm, onCancel, loading, loadingText }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)' }}>
      <div className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{ background: '#000', border: `1px solid ${confirmColor}22`, boxShadow: '0 32px 100px rgba(0,0,0,0.9)' }}>

        <div className="p-6 flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: `${iconColor}10`, border: `1px solid ${iconColor}20` }}>
              <Icon size={20} style={{ color: iconColor }} />
            </div>
            <div>
              <h2 className="font-orbitron text-white text-[15px] font-bold tracking-[0.12em]">{title}</h2>
              {subtitle && (
                <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">{subtitle}</p>
              )}
            </div>
          </div>
          <button onClick={onCancel} disabled={loading}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105 hover:bg-white/[0.06]"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <X size={15} color="#71717A" />
          </button>
        </div>

        <div className="p-6">
          <p className="font-rajdhani text-zinc-300 text-[14px] tracking-wide leading-relaxed">{message}</p>
        </div>

        <div className="p-6 flex gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <button onClick={onCancel} disabled={loading}
            className="flex-1 py-3.5 rounded-2xl font-rajdhani text-zinc-300 text-[12px] tracking-[0.15em] uppercase font-bold
                       transition-all duration-300 hover:scale-[1.01] hover:text-white"
            style={{ background: '#000', border: '1px solid rgba(255,255,255,0.10)' }}>
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 py-3.5 rounded-2xl font-rajdhani text-[12px] tracking-[0.15em] uppercase font-bold
                       flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01]
                       disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: `${confirmColor}12`, border: `1px solid ${confirmColor}25`, color: confirmColor }}>
            {loading
              ? <><Loader2 size={15} style={{ color: confirmColor }} className="animate-spin" />{loadingText}</>
              : <><Icon size={15} style={{ color: confirmColor }} />{confirmLabel}</>}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN                                                            */
/* ═══════════════════════════════════════════════════════════════ */
const MembersProfile = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const rawMember = location.state?.member;

  const [member, setMember]             = useState(rawMember);
  const [checkAction, setCheckAction]   = useState(null);
  const [processing, setProcessing]     = useState(false);
  const [toast, setToast]               = useState({ visible: false, message: '', type: 'success' });
  const [sessionTimer, setSessionTimer] = useState(null);

  // ── Live timer ──
  useEffect(() => {
    if (!member?.isLive || !member?.checkinTime) { setSessionTimer(null); return; }
    const parseTime = (str) => {
      if (!str) return null;
      const m = str.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (!m) return null;
      let h = parseInt(m[1]);
      const min = parseInt(m[2]);
      if (m[3].toUpperCase() === 'PM' && h !== 12) h += 12;
      if (m[3].toUpperCase() === 'AM' && h === 12) h = 0;
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, min);
    };
    const checkin = parseTime(member.checkinTime);
    if (!checkin) { setSessionTimer(null); return; }
    const iv = setInterval(() => {
      setSessionTimer(Math.max(Math.floor((Date.now() - checkin.getTime()) / 1000), 0));
    }, 1000);
    return () => clearInterval(iv);
  }, [member?.isLive, member?.checkinTime]);

  const fmtElapsed = (s) => {
    if (s === null) return null;
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${sec}s`;
    return `${sec}s`;
  };

  const showToast = (msg, type = 'success') => {
    setToast({ visible: true, message: msg, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3500);
  };

  const handleCheckIn = async () => {
    setProcessing(true);
    try {
      await new Promise(r => setTimeout(r, 1200));
      const t = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      setMember(p => ({ ...p, isLive: true, checkinTime: t, duration: '0m',
        totalVisits: (p.totalVisits || 0) + 1, currentStreak: (p.currentStreak || 0) + 1 }));
      setCheckAction(null);
      showToast(`${member.name} checked in at ${t}`);
    } catch { showToast('Check-in failed', 'error'); }
    finally { setProcessing(false); }
  };

  const handleCheckOut = async () => {
    setProcessing(true);
    try {
      await new Promise(r => setTimeout(r, 1200));
      const t = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      const elapsed = fmtElapsed(sessionTimer) || '0m';
      setMember(p => ({ ...p, isLive: false, checkinTime: null, duration: elapsed, lastCheckout: t }));
      setCheckAction(null); setSessionTimer(null);
      showToast(`${member.name} checked out — ${elapsed}`);
    } catch { showToast('Check-out failed', 'error'); }
    finally { setProcessing(false); }
  };

  // ── Not found ──
  if (!member) {
    return (
      <Layout title="MEMBER PROFILE" onLogout={onLogout}>
        <div className="relative min-h-screen">
          <div className="fixed inset-0 z-0" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0.95) 0%,#000 100%)' }} />
          <div className="relative z-10 flex items-center justify-center min-h-screen">
            <GlassPanel className="p-12 text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <User size={28} className="text-zinc-700" strokeWidth={1.5} />
              </div>
              <p className="font-orbitron text-zinc-500 text-[14px] tracking-[0.15em] mb-4">MEMBER NOT FOUND</p>
              <button onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl mx-auto transition-all hover:scale-105"
                style={{ background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.18)' }}>
                <ArrowLeft size={14} className="text-[#C5A059]" />
                <span className="font-rajdhani text-[#C5A059] text-[11px] tracking-widest uppercase font-bold">Go Back</span>
              </button>
            </GlassPanel>
          </div>
        </div>
      </Layout>
    );
  }

  const status = STATUS_CONFIG[member.membershipStatus] || STATUS_CONFIG.active;
  const tier = TIER_CONFIG[member.membershipType] || TIER_CONFIG['ELITE TIER'];
  const TierIcon = tier.icon;
  const fmtDate = d => !d ? '--' : new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const daysLeft = () => { if (!member.expiryDate) return null; return Math.ceil((new Date(member.expiryDate) - new Date()) / 86400000); };
  const days = daysLeft();
  const daysColor = days === null ? '#71717A' : days <= 7 ? '#EF4444' : days <= 30 ? '#EAB308' : '#22C55E';

  return (
    <Layout title="MEMBER PROFILE" onLogout={onLogout}>
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />

      <ConfirmModal isOpen={checkAction === 'in'} title="CHECK IN" subtitle="Mark member as active"
        message={`Check in "${member.name}" now? This will mark them as currently present in the gym.`}
        icon={LogIn} iconColor="#22C55E" confirmLabel="Check In Now" confirmColor="#22C55E"
        onConfirm={handleCheckIn} onCancel={() => !processing && setCheckAction(null)}
        loading={processing} loadingText="Checking In..." />

      <ConfirmModal isOpen={checkAction === 'out'} title="CHECK OUT" subtitle="End active session"
        message={`Check out "${member.name}"? Session: ${fmtElapsed(sessionTimer) || member.duration || '0m'}`}
        icon={LogOut} iconColor="#EAB308" confirmLabel="Check Out Now" confirmColor="#EAB308"
        onConfirm={handleCheckOut} onCancel={() => !processing && setCheckAction(null)}
        loading={processing} loadingText="Checking Out..." />

      <div className="relative min-h-screen">
        {/* ── Background (same as dashboard) ── */}
        <div className="fixed inset-0 z-0" style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(234,179,8,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(168,85,247,0.03) 0%, transparent 50%),
            linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.97) 40%, #000000 100%)
          `,
        }} />

        <div className="relative z-10 p-8 lg:p-10 space-y-6 max-w-[1200px] mx-auto">

          {/* ═══════════════════════════════════════════════════════ */}
          {/* HEADER ROW                                             */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)}
              className="group flex items-center gap-3 h-11 px-5 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ background: '#000', border: '1px solid rgba(255,255,255,0.08)' }}>
              <ArrowLeft size={15} className="text-zinc-400 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
              <span className="font-rajdhani text-zinc-400 group-hover:text-white text-[12px] tracking-[0.15em] uppercase font-bold transition-colors">
                Back
              </span>
            </button>

            <div className="flex items-center gap-3">
              {member.isLive && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
                  style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }}>
                  <PulseDot color="#22C55E" size={5} />
                  <Wifi size={13} className="text-green-400" />
                  <span className="font-orbitron text-green-400 text-[10px] font-bold tracking-widest">LIVE NOW</span>
                </div>
              )}
              <div className="px-3 py-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <span className="font-mono text-zinc-500 text-[11px]">{member.memberId}</span>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* HERO CARD                                              */}
          {/* ═══════════════════════════════════════════════════════ */}
          <GlassPanel borderColor={tier.borderColor} glow={tier.glowColor}>
            {/* Gold top accent */}
            <div className="absolute top-0 left-10 right-10 h-[2px]"
              style={{ background: `linear-gradient(90deg,transparent,${tier.color}50,transparent)` }} />

            {/* Watermark */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none" style={{ opacity: 0.03 }}>
              <Shield size={160} color={tier.color} />
            </div>

            <div className="p-8 relative z-10">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center
                                  font-orbitron font-bold text-[22px] sm:text-[26px]"
                    style={{
                      background: `linear-gradient(135deg, ${tier.color}15, ${tier.color}05)`,
                      border: `2px solid ${tier.color}30`, color: tier.color,
                      boxShadow: `0 8px 32px ${tier.color}10`,
                    }}>
                    {member.avatar}
                  </div>
                  {member.isLive && (
                    <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-xl flex items-center justify-center"
                      style={{ background: '#000', border: '2px solid rgba(34,197,94,0.45)' }}>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  {/* Badges */}
                  <div className="flex items-center gap-2.5 flex-wrap mb-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                      style={{ background: `${tier.color}10`, border: `1px solid ${tier.color}22` }}>
                      <TierIcon size={12} style={{ color: tier.color }} />
                      <span className="font-orbitron text-[9px] font-bold tracking-[0.12em]"
                        style={{ color: tier.color }}>{tier.short}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                      style={{ background: `${status.color}10`, border: `1px solid ${status.color}22` }}>
                      {status.pulse ? <PulseDot color={status.color} size={4} /> :
                        <status.icon size={10} style={{ color: status.color }} />}
                      <span className="font-orbitron text-[9px] font-bold tracking-[0.12em]"
                        style={{ color: status.color }}>{status.label}</span>
                    </div>
                    {member.isLive && member.checkinTime && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                        style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }}>
                        <Clock size={10} className="text-green-400" />
                        <span className="font-orbitron text-green-400 text-[9px] font-bold tracking-wider">
                          IN {member.checkinTime}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <h1 className="font-orbitron text-white font-extrabold text-[24px] sm:text-[28px] tracking-[0.10em] mb-1
                                 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                    {member.name}
                  </h1>

                  {/* Workout + Days */}
                  <div className="flex items-center gap-4 flex-wrap mt-3">
                    <div className="flex items-center gap-2">
                      {member.workoutType === 'cardio_weights'
                        ? <Activity size={14} style={{ color: `${tier.color}90` }} />
                        : <Dumbbell size={14} style={{ color: `${tier.color}90` }} />}
                      <span className="font-rajdhani text-zinc-400 text-[12px] tracking-[0.12em] uppercase font-semibold">
                        {member.workoutType === 'cardio_weights' ? 'Cardio + Weights' : 'Weights Only'}
                      </span>
                    </div>
                    {days !== null && (
                      <>
                        <div className="w-px h-4 bg-white/[0.08]" />
                        <div className="flex items-center gap-2">
                          <Timer size={14} style={{ color: daysColor }} />
                          <span className="font-orbitron text-[12px] font-bold" style={{ color: daysColor }}>
                            {days > 0 ? `${days} days left` : 'Expired'}
                          </span>
                        </div>
                      </>
                    )}
                    {member.isLive && sessionTimer !== null && (
                      <>
                        <div className="w-px h-4 bg-white/[0.08]" />
                        <div className="flex items-center gap-2">
                          <Timer size={14} className="text-cyan-400" />
                          <span className="font-orbitron text-cyan-400 text-[12px] font-bold">
                            {fmtElapsed(sessionTimer)}
                          </span>
                          <span className="font-rajdhani text-zinc-500 text-[10px] tracking-wider uppercase">session</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* STATS ROW                                              */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Target} label="Total Visits" value={member.totalVisits || 0} color="#22D3EE" />
            <StatCard icon={Flame} label="Current Streak" value={`${member.currentStreak || 0}d`} color="#F97316"
              pulse={member.currentStreak > 0} />
            <StatCard icon={CreditCard} label="Amount Paid"
              value={member.paidAmount ? `₹${(member.paidAmount / 1000).toFixed(1)}K` : '—'} color="#C5A059" />
            <StatCard icon={Calendar} label="Days Left"
              value={days !== null ? (days > 0 ? `${days}d` : 'Expired') : '—'}
              color={daysColor} pulse={days !== null && days > 0 && days <= 7} />
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* MAIN GRID                                              */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-12 gap-6">

            {/* ── LEFT: Attendance + Contact ── */}
            <div className="col-span-12 lg:col-span-5 space-y-6">

              {/* Attendance Card */}
              <GlassPanel
                borderColor={member.isLive ? 'rgba(34,197,94,0.20)' : 'rgba(255,255,255,0.08)'}
                glow={member.isLive ? 'rgba(34,197,94,0.06)' : undefined}
              >
                {member.isLive && (
                  <div className="absolute top-0 left-8 right-8 h-[2px]"
                    style={{ background: 'linear-gradient(90deg,transparent,rgba(34,197,94,0.5),transparent)' }} />
                )}

                <div className="p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-8 rounded-full"
                      style={{ background: member.isLive
                        ? 'linear-gradient(180deg,#22C55E,rgba(34,197,94,0.2))'
                        : 'linear-gradient(180deg,#C5A059,rgba(197,160,89,0.2))' }} />
                    <div>
                      <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.15em]">ATTENDANCE</h3>
                      <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">
                        {member.isLive ? 'Active session' : 'Manual check-in/out'}
                      </p>
                    </div>
                  </div>

                  {member.isLive ? (
                    <div className="space-y-4">
                      {/* Checked in at */}
                      <div className="flex items-center gap-4 p-4 rounded-2xl"
                        style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.12)' }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.20)' }}>
                          <LogIn size={16} className="text-green-400" />
                        </div>
                        <div>
                          <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.2em] uppercase">Checked In At</p>
                          <p className="font-orbitron text-green-400 text-[16px] font-bold">{member.checkinTime}</p>
                        </div>
                      </div>

                      {/* Elapsed */}
                      <div className="flex items-center gap-4 p-4 rounded-2xl"
                        style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.12)' }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.20)' }}>
                          <Timer size={16} className="text-cyan-400" />
                        </div>
                        <div>
                          <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.2em] uppercase">Session Elapsed</p>
                          <p className="font-orbitron text-cyan-400 text-[16px] font-bold">{fmtElapsed(sessionTimer) || '0s'}</p>
                        </div>
                      </div>

                      {/* Live strip */}
                      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                        style={{ background: '#000', border: '1px solid rgba(34,197,94,0.15)' }}>
                        <PulseDot color="#22C55E" size={6} />
                        <span className="font-rajdhani text-green-400 text-[11px] tracking-[0.12em] uppercase font-bold flex-1">
                          Session Active
                        </span>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                          style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.20)' }}>
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          <span className="font-rajdhani text-green-400 text-[9px] tracking-widest uppercase font-bold">Live</span>
                        </div>
                      </div>

                      {/* Checkout btn */}
                      <button onClick={() => setCheckAction('out')}
                        className="group w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-orbitron text-[12px]
                                   font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          background: 'linear-gradient(135deg,rgba(234,179,8,0.15),rgba(234,179,8,0.05))',
                          border: '1px solid rgba(234,179,8,0.30)', color: '#EAB308',
                          boxShadow: '0 6px 24px rgba(234,179,8,0.10)',
                        }}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                          style={{ background: 'rgba(234,179,8,0.15)', border: '1px solid rgba(234,179,8,0.25)' }}>
                          <LogOut size={16} className="text-yellow-400" />
                        </div>
                        Check Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Last checkout info */}
                      {member.lastCheckout && (
                        <div className="flex items-center gap-4 p-4 rounded-2xl"
                          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: 'rgba(234,179,8,0.10)', border: '1px solid rgba(234,179,8,0.18)' }}>
                            <LogOut size={16} className="text-yellow-400" />
                          </div>
                          <div>
                            <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.2em] uppercase">Last Checkout</p>
                            <p className="font-orbitron text-zinc-300 text-[14px] font-bold">{member.lastCheckout}</p>
                          </div>
                        </div>
                      )}

                      {member.duration && (
                        <div className="flex items-center gap-4 p-4 rounded-2xl"
                          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: 'rgba(34,211,238,0.10)', border: '1px solid rgba(34,211,238,0.18)' }}>
                            <Timer size={16} className="text-cyan-400" />
                          </div>
                          <div>
                            <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.2em] uppercase">Last Session</p>
                            <p className="font-orbitron text-zinc-300 text-[14px] font-bold">{member.duration}</p>
                          </div>
                        </div>
                      )}

                      {/* Offline strip */}
                      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                        style={{ background: '#000', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="w-2 h-2 rounded-full bg-zinc-700" />
                        <span className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.12em] uppercase font-bold flex-1">
                          Not Checked In
                        </span>
                        <span className="font-rajdhani text-zinc-700 text-[9px] tracking-widest uppercase">Offline</span>
                      </div>

                      {/* Check-in or expired */}
                      {member.membershipStatus !== 'expired' ? (
                        <button onClick={() => setCheckAction('in')}
                          className="group w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-orbitron text-[12px]
                                     font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                          style={{
                            background: 'linear-gradient(135deg,rgba(34,197,94,0.15),rgba(34,197,94,0.05))',
                            border: '1px solid rgba(34,197,94,0.30)', color: '#22C55E',
                            boxShadow: '0 6px 24px rgba(34,197,94,0.10)',
                          }}>
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                            style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.25)' }}>
                            <LogIn size={16} className="text-green-400" />
                          </div>
                          Check In
                        </button>
                      ) : (
                        <GlassPanel borderColor="rgba(239,68,68,0.15)">
                          <div className="p-4 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ background: 'rgba(239,68,68,0.10)' }}>
                              <AlertCircle size={15} className="text-red-400" />
                            </div>
                            <div>
                              <p className="font-rajdhani text-red-400 text-[11px] font-bold tracking-[0.12em] uppercase">
                                Membership Expired
                              </p>
                              <p className="font-rajdhani text-zinc-600 text-[10px] tracking-wider">
                                Renew to enable check-in
                              </p>
                            </div>
                          </div>
                        </GlassPanel>
                      )}
                    </div>
                  )}
                </div>
              </GlassPanel>

              {/* Contact Card */}
              <GlassPanel>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-cyan-400 to-cyan-400/20" />
                    <div>
                      <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.15em]">CONTACT</h3>
                      <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">Member details</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl mb-3"
                    style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.12)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.18)' }}>
                      <Phone size={16} color="#22C55E" />
                    </div>
                    <div>
                      <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.2em] uppercase">Phone</p>
                      <p className="font-orbitron text-white text-[13px] font-bold tracking-wider">{member.phone}</p>
                    </div>
                  </div>

                  {member.email && (
                    <div className="flex items-center gap-4 p-4 rounded-2xl mb-3"
                      style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.12)' }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.18)' }}>
                        <Mail size={16} color="#3B82F6" />
                      </div>
                      <div>
                        <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.2em] uppercase">Email</p>
                        <p className="font-orbitron text-white text-[12px] font-bold tracking-wider truncate">{member.email}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 p-4 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${tier.color}08`, border: `1px solid ${tier.color}15` }}>
                      <Hash size={16} color={tier.color} />
                    </div>
                    <div>
                      <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.2em] uppercase">Member ID</p>
                      <p className="font-mono text-white text-[13px] font-bold">{member.memberId}</p>
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </div>

            {/* ── RIGHT: Membership + Actions ── */}
            <div className="col-span-12 lg:col-span-7 space-y-6">

              {/* Membership Card */}
              <GlassPanel borderColor={`${tier.color}15`} glow={`${tier.color}06`}>
                <div className="absolute top-0 left-8 right-8 h-[2px]"
                  style={{ background: `linear-gradient(90deg,transparent,${tier.color}40,transparent)` }} />

                {/* Watermark */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none" style={{ opacity: 0.03 }}>
                  <TierIcon size={140} color={tier.color} />
                </div>

                <div className="p-7 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-8 rounded-full" style={{ background: `linear-gradient(180deg,${tier.color},${tier.color}20)` }} />
                      <div>
                        <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.15em]">MEMBERSHIP</h3>
                        <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">Plan & billing details</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                      style={{ background: `${tier.color}10`, border: `1px solid ${tier.color}20` }}>
                      <TierIcon size={14} style={{ color: tier.color }} />
                      <span className="font-orbitron text-[11px] font-bold tracking-wider" style={{ color: tier.color }}>
                        {tier.short}
                      </span>
                    </div>
                  </div>

                  <div className="px-1">
                    <InfoRow icon={CalendarCheck} label="Join Date" value={fmtDate(member.joinDate)} color={tier.color} />
                    <InfoRow icon={Clock} label="Expiry Date" value={fmtDate(member.expiryDate)}
                      color={days !== null && days <= 7 ? '#EF4444' : tier.color}
                      valueColor={days !== null && days <= 7 ? '#EF4444' : undefined} />
                    <InfoRow icon={Shield} label="Status" value={status.label}
                      color={status.color} valueColor={status.color} />
                    <InfoRow icon={Timer} label="Remaining" value={days !== null ? (days > 0 ? `${days} days` : 'Expired') : '--'}
                      color={daysColor} valueColor={daysColor} />
                    <InfoRow icon={Activity} label="Workout"
                      value={member.workoutType === 'cardio_weights' ? 'Cardio + Weights' : 'Weights Only'}
                      color={tier.color} />
                    <InfoRow icon={CreditCard} label="Amount Paid" value={`₹${member.paidAmount || 0}`}
                      color="#22C55E" valueColor="#22C55E" last />
                  </div>
                </div>
              </GlassPanel>

              {/* Expired Alert */}
              {member.membershipStatus === 'expired' && (
                <GlassPanel borderColor="rgba(239,68,68,0.20)" glow="rgba(239,68,68,0.05)">
                  <div className="p-6 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.20)' }}>
                      <AlertCircle size={20} color="#EF4444" />
                    </div>
                    <div className="flex-1">
                      <p className="font-orbitron text-red-400 font-bold text-[13px] tracking-[0.12em] uppercase mb-1">
                        Membership Expired
                      </p>
                      <p className="font-rajdhani text-zinc-400 text-[12px] tracking-wider">
                        Expired on {fmtDate(member.expiryDate)} · Renewal recommended
                      </p>
                    </div>
                    <button className="flex items-center gap-2.5 px-5 py-3 rounded-2xl font-orbitron text-[11px] font-bold
                                       tracking-[0.12em] uppercase transition-all hover:scale-105 flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg,#C5A059,#EAB308)', color: '#000',
                        boxShadow: '0 6px 24px rgba(197,160,89,0.30)',
                      }}>
                      <Sparkles size={15} /> Renew
                    </button>
                  </div>
                </GlassPanel>
              )}

              {/* Trial Alert */}
              {member.membershipStatus === 'trial' && (
                <GlassPanel borderColor="rgba(59,130,246,0.20)" glow="rgba(59,130,246,0.05)">
                  <div className="p-6 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.20)' }}>
                      <Zap size={20} color="#3B82F6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-orbitron text-blue-400 font-bold text-[13px] tracking-[0.12em] uppercase mb-1">
                        Trial Period
                      </p>
                      <p className="font-rajdhani text-zinc-400 text-[12px] tracking-wider">
                        {days > 0 ? `${days} days remaining` : 'Trial expired'} · Upgrade to full membership
                      </p>
                    </div>
                    <button className="flex items-center gap-2.5 px-5 py-3 rounded-2xl font-orbitron text-[11px] font-bold
                                       tracking-[0.12em] uppercase transition-all hover:scale-105 flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg,#C5A059,#EAB308)', color: '#000',
                        boxShadow: '0 6px 24px rgba(197,160,89,0.30)',
                      }}>
                      <Crown size={15} /> Upgrade
                    </button>
                  </div>
                </GlassPanel>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button className="group relative flex items-center justify-center gap-3 py-4 rounded-2xl
                                   transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: '#000', border: '1px solid rgba(59,130,246,0.20)' }}>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at center,rgba(59,130,246,0.06) 0%,transparent 70%)' }} />
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 relative z-10"
                    style={{ background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.20)' }}>
                    <Edit2 size={16} color="#3B82F6" />
                  </div>
                  <span className="font-orbitron text-blue-400 text-[12px] font-bold tracking-[0.15em] uppercase z-10">
                    Edit Member
                  </span>
                  <ChevronRight size={15} className="text-blue-400/30 group-hover:text-blue-400/60 group-hover:translate-x-1 transition-all z-10" />
                </button>

                <button onClick={() => { if (window.confirm(`Remove "${member.name}"?`)) navigate(-1); }}
                  className="group relative flex items-center justify-center gap-3 py-4 rounded-2xl
                             transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: '#000', border: '1px solid rgba(239,68,68,0.18)' }}>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at center,rgba(239,68,68,0.06) 0%,transparent 70%)' }} />
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 relative z-10"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}>
                    <Trash2 size={16} color="#EF4444" />
                  </div>
                  <span className="font-orbitron text-red-400 text-[12px] font-bold tracking-[0.15em] uppercase z-10">
                    Remove
                  </span>
                  <ChevronRight size={15} className="text-red-400/30 group-hover:text-red-400/60 group-hover:translate-x-1 transition-all z-10" />
                </button>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* FOOTER                                                 */}
          {/* ═══════════════════════════════════════════════════════ */}
          <GlassPanel borderColor="rgba(197,160,89,0.10)">
            <div className="p-5 flex items-center gap-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.15)' }}>
                <Eye size={16} className="text-[#C5A059]" />
              </div>
              <div className="flex-1">
                <p className="font-rajdhani text-white text-[12px] font-bold tracking-[0.12em] uppercase mb-0.5">
                  Profile Data Secured
                </p>
                <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.10em] uppercase font-medium">
                  All changes are logged · Member data is encrypted and protected
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl flex-shrink-0"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-rajdhani text-green-400 text-[9px] tracking-[0.12em] uppercase font-bold">Encrypted</span>
              </div>
            </div>
          </GlassPanel>

        </div>
      </div>
    </Layout>
  );
};

export default MembersProfile;