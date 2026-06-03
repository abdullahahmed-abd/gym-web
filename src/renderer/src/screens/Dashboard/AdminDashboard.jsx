// AdminDashboard.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  Users, DollarSign, Dumbbell, UserPlus, ArrowRight,
  Clock, AlertCircle, TrendingUp, Package,
  Activity, Zap, ChevronRight, BarChart3, Bell,
  Eye, CreditCard, CalendarCheck,
  UserCheck, Timer, Wifi, ArrowUpRight, Sparkles,
  Crown, Star, Target, TrendingDown, Calendar,
} from 'lucide-react';

import gymLogo from '../../../../../src/assets/gym-logo.png';
import splashBg from '../../../../../src/assets/splash-bg.jpg';

const GYM_LOGO = gymLogo;
const SPLASH_BG = splashBg;

const TIER_COLORS = {
  elite: { primary: '#C5A059', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.15)' },
  legendary: { primary: '#A855F7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.15)' },
  trainer: { primary: '#22D3EE', bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.15)' },
  trial: { primary: '#3B82F6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.15)' },
  expired: { primary: '#EF4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.15)' },
  active: { primary: '#22C55E', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.15)' },
};

const MEMBERS = { total: 128, trial: 18, expired: 20, elite: 65, legendary: 43, trainer: 8 };
const LIVE = { total: 15, avg: '38m', elite: 9, legendary: 6, active: 8, expired: 4, trial: 3, trainer: 2 };
const REVENUE = { today: 45200, memberships: 32000, renewals: 8000, others: 5200, growth: 12 };

// ─────────────────────────────────────────────────────────────────────────────
// Subscription Helpers (localStorage: gymverse_subscription)
// ─────────────────────────────────────────────────────────────────────────────

const readSubscription = () => {
  try {
    const raw = localStorage.getItem('gymverse_subscription');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
};

/* ═══════════════════════════════════════════════════════════════ */
/* ANIMATED COUNTER                                               */
/* ═══════════════════════════════════════════════════════════════ */
const AnimatedNumber = ({ value, duration = 1200 }) => {
  const [display, setDisplay] = useState(0);
  const numValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) : value;

  useEffect(() => {
    const end = numValue;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [numValue, duration]);

  return display;
};

/* ═══════════════════════════════════════════════════════════════ */
/* LIVE PULSE DOT                                                 */
/* ═══════════════════════════════════════════════════════════════ */
const PulseDot = ({ color = '#22C55E', size = 8 }) => (
  <div className="relative flex items-center justify-center" style={{ width: size * 3, height: size * 3 }}>
    <span
      className="absolute rounded-full animate-ping opacity-30"
      style={{ width: size * 2.5, height: size * 2.5, backgroundColor: color }}
    />
    <span
      className="absolute rounded-full animate-pulse opacity-20"
      style={{ width: size * 1.8, height: size * 1.8, backgroundColor: color }}
    />
    <span
      className="relative rounded-full"
      style={{ width: size, height: size, backgroundColor: color, boxShadow: `0 0 ${size * 2}px ${color}40` }}
    />
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* GLASS CARD WRAPPER                                             */
/* ═══════════════════════════════════════════════════════════════ */
const GlassPanel = ({ children, className = '', onClick, hover = false, gradient, borderColor, glow }) => (
  <div
    onClick={onClick}
    className={`
      relative rounded-3xl overflow-hidden
      ${hover ? 'cursor-pointer transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1' : ''}
      ${onClick ? 'cursor-pointer' : ''}
      ${className}
    `}
    style={{
      background: gradient || '#000000',
      border: `1px solid ${borderColor || 'rgba(255,255,255,0.08)'}`,
      backdropFilter: 'blur(24px)',
      boxShadow: glow ? `0 8px 32px ${glow}` : 'none',
    }}
  >
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* STAT CARD                                                      */
/* ═══════════════════════════════════════════════════════════════ */
const StatCard = ({ icon: Icon, label, value, change, sub, color, pulse }) => (
  <GlassPanel hover className="group" glow={`${color}08`}>
    <div className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center
                      transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{
            background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
            border: `1px solid ${color}20`,
            boxShadow: `0 4px 16px ${color}10`
          }}
        >
          <Icon size={20} style={{ color }} />
        </div>

        {pulse && <PulseDot color={color} size={7} />}

        {change && (
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                        transition-all duration-300 group-hover:scale-105"
            style={{
              background: change.startsWith('+') ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
              border: change.startsWith('+') ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(239,68,68,0.2)'
            }}
          >
            {change.startsWith('+') ? (
              <ArrowUpRight size={12} className="text-green-400" />
            ) : (
              <TrendingDown size={12} className="text-red-400" />
            )}
            <span
              className={`font-orbitron text-[10px] font-bold ${
                change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {change}
            </span>
          </div>
        )}
      </div>

      <div className="mb-3">
        <p className="font-orbitron text-white font-bold text-[32px] leading-none mb-2 transition-all duration-300 group-hover:text-[34px]">
          {typeof value === 'number' ? <AnimatedNumber value={value} /> : value}
        </p>
        <p className="font-rajdhani text-zinc-300 text-[11px] tracking-[0.15em] uppercase font-semibold">
          {label}
        </p>
      </div>

      {sub && (
        <>
          <div className="h-px bg-gradient-to-r from-white/[0.05] via-white/[0.1] to-white/[0.05] mb-3" />
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${color}80` }} />
            <span className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.1em] uppercase font-medium">
              {sub}
            </span>
          </div>
        </>
      )}
    </div>
  </GlassPanel>
);

/* ═══════════════════════════════════════════════════════════════ */
/* TIER BADGE                                                     */
/* ═══════════════════════════════════════════════════════════════ */
const TierBadge = ({ icon: Icon, label, count, color, total }) => {
  const percentage = ((count / total) * 100).toFixed(0);
  return (
    <div
      className="group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
      style={{ background: '#000000', border: `1px solid ${color}12` }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
        style={{
          background: `${color}10`,
          border: `1px solid ${color}20`,
          boxShadow: `0 4px 12px ${color}08`
        }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between mb-1">
          <span className="font-orbitron text-white font-bold text-[20px]">{count}</span>
          <span className="font-rajdhani text-[11px] tracking-[0.15em] uppercase font-bold" style={{ color }}>
            {percentage}%
          </span>
        </div>
        <p className="font-rajdhani text-[11px] tracking-[0.2em] uppercase font-semibold mb-2" style={{ color: `${color}CC` }}>
          {label}
        </p>
        <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${percentage}%`,
              background: `linear-gradient(90deg, ${color} 0%, ${color}60 100%)`,
              boxShadow: `0 0 8px ${color}40`
            }}
          />
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* COMMAND BUTTON                                                 */
/* ═══════════════════════════════════════════════════════════════ */
const CommandButton = ({ icon: Icon, label, sublabel, color, onClick, badge }) => (
  <button
    type="button"
    onClick={onClick}
    className="group relative flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
    style={{ background: '#000000', border: '1px solid rgba(255,255,255,0.08)' }}
  >
    <div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{ background: `radial-gradient(circle at center, ${color}08 0%, transparent 70%)` }}
    />

    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 z-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
      style={{ background: `${color}10`, border: `1px solid ${color}20`, boxShadow: `0 4px 12px ${color}08` }}
    >
      <Icon size={18} style={{ color }} />
    </div>

    <div className="flex-1 min-w-0 z-10">
      <p className="font-rajdhani text-white text-[13px] font-bold tracking-[0.12em] uppercase">
        {label}
      </p>
      {sublabel && (
        <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.1em] uppercase mt-0.5">
          {sublabel}
        </p>
      )}
    </div>

    {badge && (
      <span
        className="px-2.5 py-1 rounded-lg text-[9px] font-orbitron font-bold z-10"
        style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}
      >
        {badge}
      </span>
    )}

    <ChevronRight
      size={18}
      className="text-white/30 group-hover:text-white/60 z-10 group-hover:translate-x-1 transition-all duration-300"
    />
  </button>
);

/* ═══════════════════════════════════════════════════════════════ */
/* REVENUE ITEM                                                   */
/* ═══════════════════════════════════════════════════════════════ */
const RevenueItem = ({ label, amount, percentage, color, icon: Icon }) => (
  <div className="group">
    <div className="flex items-center gap-3 mb-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
        style={{ background: `${color}10`, border: `1px solid ${color}15` }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <div className="flex-1">
        <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.15em] uppercase font-semibold mb-1">
          {label}
        </p>
        <p className="font-orbitron text-white font-bold text-[16px]">
          ₹{(amount / 1000).toFixed(1)}K
        </p>
      </div>
    </div>

    <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000"
        style={{
          width: `${percentage}%`,
          background: `linear-gradient(90deg, ${color} 0%, ${color}60 100%)`,
          boxShadow: `0 0 8px ${color}40`
        }}
      />
    </div>

    <div className="flex items-center justify-between mt-2">
      <span className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.1em] uppercase">
        of total revenue
      </span>
      <span className="font-orbitron text-[11px] font-bold" style={{ color }}>
        {percentage}%
      </span>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN DASHBOARD                                                 */
/* ═══════════════════════════════════════════════════════════════ */
const AdminDashboard = ({ onLogout }) => {
  const nav = useNavigate();
  const [time, setTime] = useState(new Date());

  // subscription state
  const [subscription, setSubscription] = useState(() => readSubscription());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // keep subscription refreshed (when coming back from upgrade screen)
  useEffect(() => {
    const sync = () => setSubscription(readSubscription());

    window.addEventListener('focus', sync);
    window.addEventListener('storage', sync);

    return () => {
      window.removeEventListener('focus', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const greeting = () => {
    const h = time.getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const subMeta = useMemo(() => {
    const now = new Date();

    if (!subscription || !subscription.expiresAt) {
      return {
        exists: false,
        status: 'FREE',
        plan: 'Free Plan',
        expiresText: 'No expiry',
        color: '#C5A059',
        border: 'rgba(197,160,89,0.18)',
        bg: 'rgba(197,160,89,0.08)',
      };
    }

    const expiresAt = new Date(subscription.expiresAt);
    const expired = expiresAt.getTime() < now.getTime();

    return {
      exists: true,
      status: expired ? 'EXPIRED' : 'ACTIVE',
      plan: subscription.planLabel || 'Premium',
      expiresText: expired ? `Expired: ${formatDate(expiresAt)}` : `Expires: ${formatDate(expiresAt)}`,
      color: expired ? '#EF4444' : '#22C55E',
      border: expired ? 'rgba(239,68,68,0.22)' : 'rgba(34,197,94,0.22)',
      bg: expired ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)',
    };
  }, [subscription]);

  const upgradeBtnText = subMeta.status === 'EXPIRED' ? 'RENEW' : 'UPGRADE';

  return (
    <Layout title="DASHBOARD" onLogout={onLogout}>
      <div className="relative min-h-screen">
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url(${SPLASH_BG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          className="fixed inset-0 z-[1]"
          style={{
            background: `
              radial-gradient(ellipse at 20% 0%, rgba(234,179,8,0.05) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 100%, rgba(168,85,247,0.04) 0%, transparent 50%),
              linear-gradient(180deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.96) 40%, #000000 100%)
            `,
          }}
        />

        <div className="relative z-10 p-8 lg:p-10 space-y-8 max-w-[1600px] mx-auto">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-5">
              {GYM_LOGO && (
                <div
                  className="w-14 h-14 rounded-2xl overflow-hidden border border-white/[0.1]
                              flex items-center justify-center p-2 shadow-xl shadow-black/20"
                  style={{ backgroundColor: '#000000' }}
                >
                  <img src={GYM_LOGO} alt="Logo" className="w-full h-full object-contain" />
                </div>
              )}
              <div>
                <p className="font-rajdhani text-[#C5A059] text-[12px] tracking-[0.3em] uppercase font-bold mb-1 flex items-center gap-2">
                  <span>{greeting()}</span>
                  <span className="text-white/30">•</span>
                  <span className="text-white/60">Admin</span>
                </p>
                <h1 className="font-orbitron text-white font-extrabold text-[32px] tracking-[0.2em]
                               bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  COMMAND CENTER
                </h1>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Time Display */}
              <GlassPanel className="hidden lg:block px-6 py-3" gradient="#000000">
                <div className="flex items-center gap-4">
                  <Clock size={18} className="text-[#C5A059]" />
                  <div>
                    <span className="font-orbitron text-white text-[16px] font-bold tracking-wider block">
                      {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.15em] uppercase">
                      {time.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
              </GlassPanel>

              {/* ✅ Subscription Badge */}
              <GlassPanel
                hover
                onClick={() => nav('/upgrade')}
                className="hidden md:block px-5 py-3"
                gradient="#000000"
                borderColor={subMeta.border}
                glow={`${subMeta.color}10`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{
                      background: subMeta.bg,
                      border: `1px solid ${subMeta.border}`,
                    }}
                  >
                    {subMeta.status === 'ACTIVE' ? (
                      <CheckCircle size={18} color={subMeta.color} />
                    ) : subMeta.status === 'EXPIRED' ? (
                      <AlertCircle size={18} color={subMeta.color} />
                    ) : (
                      <Crown size={18} color="#C5A059" />
                    )}
                  </div>

                  <div className="min-w-[170px]">
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className="font-rajdhani text-[10px] tracking-[0.18em] uppercase font-bold"
                        style={{ color: subMeta.color }}
                      >
                        {subMeta.status}
                      </span>
                      <Calendar size={14} className="text-white/30" />
                    </div>

                    <div className="font-orbitron text-white text-[12px] font-bold tracking-wider mt-0.5">
                      {subMeta.plan}
                    </div>

                    <div className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.12em] uppercase mt-0.5">
                      {subMeta.expiresText}
                    </div>
                  </div>
                </div>
              </GlassPanel>

              {/* ✅ UPGRADE / RENEW BUTTON */}
              <button
                onClick={() => nav('/upgrade')}
                className="h-12 px-5 rounded-2xl border border-yellow-500/20
                           flex items-center gap-2 transition-all duration-300
                           hover:scale-105 active:scale-95"
                style={{
                  background: 'rgba(197,160,89,0.10)',
                  boxShadow: '0 10px 30px rgba(197,160,89,0.08)',
                }}
              >
                <Crown size={16} className="text-[#C5A059]" />
                <span className="font-orbitron text-[10px] tracking-[0.18em] font-bold text-[#C5A059]">
                  {upgradeBtnText}
                </span>
              </button>

              {/* Notifications */}
              <button
                className="relative w-12 h-12 rounded-2xl border border-white/[0.08]
                           flex items-center justify-center
                           transition-all duration-300 hover:scale-105 active:scale-95
                           shadow-lg shadow-black/10"
                style={{ backgroundColor: '#000000' }}
              >
                <Bell size={18} className="text-zinc-400" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500
                                 flex items-center justify-center border-2 border-black
                                 animate-pulse">
                  <span className="font-orbitron text-white text-[8px] font-bold">3</span>
                </span>
              </button>
            </div>
          </div>

          {/* TOP METRICS - 4 CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard icon={Users} label="Total Members" value={MEMBERS.total} color="#C5A059" change="+8" />
            <StatCard icon={Activity} label="Live Now" value={LIVE.total} color="#22C55E" sub="currently checked in" pulse />
            <StatCard
              icon={DollarSign}
              label="Today's Revenue"
              value={`₹${(REVENUE.today / 1000).toFixed(1)}K`}
              color="#C5A059"
              change={`+${REVENUE.growth}%`}
              sub="vs yesterday"
            />
            <StatCard icon={TrendingUp} label="Active Rate" value="84%" color="#A855F7" change="+3%" sub="this week" />
          </div>

          {/* MAIN CONTENT GRID */}
          <div className="grid grid-cols-12 gap-6">

            {/* LEFT COLUMN */}
            <div className="col-span-12 xl:col-span-5 space-y-6">

              {/* Live Roster Card */}
              <GlassPanel
                hover
                onClick={() => nav('/live-roster')}
                className="group"
                borderColor="rgba(34,197,94,0.15)"
                glow="rgba(34,197,94,0.08)"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <PulseDot color="#22C55E" size={8} />
                      <div>
                        <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em] mb-1">
                          LIVE ROSTER
                        </h3>
                        <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.15em] uppercase">
                          Real-time activity monitor
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 px-4 py-2 rounded-xl group-hover:bg-green-500/[0.08] transition-all duration-300"
                      style={{ border: '1px solid rgba(34,197,94,0.2)' }}
                    >
                      <Wifi size={12} className="text-green-400" />
                      <span className="font-rajdhani text-green-400 text-[10px] tracking-[0.15em] uppercase font-bold">
                        Live
                      </span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-end gap-4 mb-4">
                      <p className="font-orbitron text-white font-extralight text-[64px] leading-none">
                        <AnimatedNumber value={LIVE.total} />
                      </p>
                      <div className="mb-3 flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/[0.08] border border-amber-500/[0.15]">
                        <Timer size={14} className="text-amber-400" />
                        <span className="font-orbitron text-amber-400 text-[14px] font-bold">{LIVE.avg}</span>
                        <span className="font-rajdhani text-amber-400/90 text-[11px] uppercase font-medium">avg time</span>
                      </div>
                    </div>
                    <p className="font-rajdhani text-zinc-400 text-[12px] tracking-[0.2em] uppercase font-medium">
                      Currently Active Members
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      { label: 'Elite', count: LIVE.elite, color: TIER_COLORS.elite.primary, icon: Crown },
                      { label: 'Legendary', count: LIVE.legendary, color: TIER_COLORS.legendary.primary, icon: Star },
                      { label: 'Trial', count: LIVE.trial, color: TIER_COLORS.trial.primary, icon: Zap },
                      { label: 'Expired', count: LIVE.expired, color: TIER_COLORS.expired.primary, icon: AlertCircle },
                    ].map((tier) => (
                      <div key={tier.label} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${tier.color}10` }}>
                          <tier.icon size={12} style={{ color: tier.color }} />
                        </div>
                        <span className="font-rajdhani text-[11px] tracking-[0.12em] uppercase font-semibold w-20" style={{ color: `${tier.color}CC` }}>
                          {tier.label}
                        </span>
                        <div className="flex-1 h-[4px] bg-white/[0.06] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${(tier.count / LIVE.total) * 100}%`,
                              background: `linear-gradient(90deg, ${tier.color} 0%, ${tier.color}60 100%)`,
                              boxShadow: `0 0 8px ${tier.color}40`
                            }}
                          />
                        </div>
                        <span className="font-orbitron text-white font-bold text-[13px] w-6 text-right">
                          {tier.count}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-green-500/[0.2] to-transparent mb-5" />

                  <div
                    className="flex items-center justify-between px-5 py-4 rounded-xl border border-green-500/[0.12] group-hover:border-green-500/[0.25] transition-all duration-300"
                    style={{ backgroundColor: '#000000' }}
                  >
                    <div className="flex items-center gap-3">
                      <Eye size={16} className="text-green-400" />
                      <span className="font-rajdhani text-white font-bold text-[12px] tracking-[0.12em] uppercase">
                        View Full Roster
                      </span>
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-green-400/60 group-hover:text-green-400 group-hover:translate-x-1 transition-all duration-300"
                    />
                  </div>
                </div>
              </GlassPanel>

              {/* Quick Actions */}
              <GlassPanel>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#C5A059] to-[#C5A059]/20" />
                    <div>
                      <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.15em]">
                        QUICK ACTIONS
                      </h3>
                      <p className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.15em] uppercase">
                        Frequently used commands
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <CommandButton
                      icon={UserPlus}
                      label="Add Member"
                      sublabel="Register new member"
                      color="#C5A059"
                      onClick={() => nav('/members')}
                    />
                    <CommandButton
                      icon={Package}
                      label="Create Plan"
                      sublabel="New membership plan"
                      color="#A855F7"
                      onClick={() => nav('/plans/add')}
                      badge="NEW"
                    />
                    <CommandButton
                      icon={Dumbbell}
                      label="Manage Trainers"
                      sublabel={`${MEMBERS.trainer} active trainers`}
                      color="#22D3EE"
                      onClick={() => nav('/trainers')}
                    />
                    <CommandButton
                      icon={UserCheck}
                      label="Manual Check-In"
                      sublabel="Walk-in verification"
                      color="#22C55E"
                      onClick={() => {}}
                    />
                  </div>
                </div>
              </GlassPanel>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-span-12 xl:col-span-7 space-y-6">

              {/* Members Breakdown */}
              <GlassPanel className="relative overflow-hidden">
                {GYM_LOGO && (
                  <img
                    src={GYM_LOGO}
                    alt=""
                    className="absolute right-8 top-1/2 -translate-y-1/2 w-[240px] h-[120px] object-contain opacity-[0.03] pointer-events-none"
                  />
                )}

                <div className="p-8 relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center"
                        style={{
                          background: 'rgba(197,160,89,0.10)',
                          border: '1px solid rgba(197,160,89,0.15)',
                          boxShadow: '0 4px 16px rgba(197,160,89,0.08)'
                        }}
                      >
                        <Users size={20} className="text-[#C5A059]" />
                      </div>
                      <div>
                        <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em] mb-1">
                          MEMBERSHIP
                        </h3>
                        <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.15em] uppercase">
                          Tier distribution & analytics
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.2em] uppercase text-right mb-1">
                        Total Members
                      </p>
                      <p className="font-orbitron text-white font-extralight text-[36px] leading-none text-right">
                        <AnimatedNumber value={MEMBERS.total} />
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <TierBadge icon={Crown} label="Elite Members" count={MEMBERS.elite} color={TIER_COLORS.elite.primary} total={MEMBERS.total} />
                    <TierBadge icon={Sparkles} label="Legendary" count={MEMBERS.legendary} color={TIER_COLORS.legendary.primary} total={MEMBERS.total} />
                    <TierBadge icon={Zap} label="Trial Members" count={MEMBERS.trial} color={TIER_COLORS.trial.primary} total={MEMBERS.total} />
                    <TierBadge icon={AlertCircle} label="Expired" count={MEMBERS.expired} color={TIER_COLORS.expired.primary} total={MEMBERS.total} />
                  </div>

                  <div
                    className="flex items-center justify-between px-5 py-4 rounded-2xl"
                    style={{ background: '#000000', border: `1px solid ${TIER_COLORS.trainer.border}` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(34,211,238,0.12)' }}>
                        <Dumbbell size={16} className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-rajdhani text-cyan-400 text-[12px] font-bold tracking-[0.12em] uppercase leading-none mb-1">
                          Professional Trainers
                        </p>
                        <p className="font-rajdhani text-cyan-400/70 text-[10px] tracking-[0.1em] uppercase font-medium">
                          Active on roster
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-orbitron text-cyan-400 text-[24px] font-bold">{MEMBERS.trainer}</span>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/[0.10] border border-cyan-500/[0.2]">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="font-rajdhani text-cyan-400 text-[9px] tracking-[0.1em] uppercase font-bold">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassPanel>

              {/* Revenue Card */}
              <GlassPanel
                hover
                onClick={() => nav('/expenses')}
                className="group"
                borderColor="rgba(197,160,89,0.12)"
                glow="rgba(197,160,89,0.06)"
              >
                <div
                  className="absolute top-0 left-10 right-10 h-[2px]"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(197,160,89,0.4) 50%, transparent 100%)',
                  }}
                />

                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center"
                        style={{
                          background: 'rgba(197,160,89,0.10)',
                          border: '1px solid rgba(197,160,89,0.15)',
                          boxShadow: '0 4px 16px rgba(197,160,89,0.08)'
                        }}
                      >
                        <CreditCard size={20} className="text-[#C5A059]" />
                      </div>
                      <div>
                        <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em] mb-1">
                          REVENUE
                        </h3>
                        <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.15em] uppercase">
                          Today's financial performance
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/[0.08] border border-green-500/[0.15]">
                      <TrendingUp size={12} className="text-green-400" />
                      <span className="font-orbitron text-green-400 text-[11px] font-bold">
                        +{REVENUE.growth}%
                      </span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.2em] uppercase mb-2 font-medium">
                      Total Collection
                    </p>
                    <div className="flex items-end gap-4 mb-4">
                      <span className="font-orbitron text-[#C5A059] font-extralight text-[52px] leading-none">
                        ₹<AnimatedNumber value={REVENUE.today} />
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Target size={12} className="text-zinc-500" />
                          <span className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.12em] uppercase font-medium">
                            Daily Target Progress
                          </span>
                        </div>
                        <span className="font-orbitron text-zinc-300 text-[11px] font-bold">75%</span>
                      </div>
                      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: '75%',
                            background: 'linear-gradient(90deg, #C5A059 0%, #EAB308 100%)',
                            boxShadow: '0 0 12px rgba(197,160,89,0.4)'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-6" />

                  <div className="grid grid-cols-3 gap-6">
                    <RevenueItem label="Memberships" amount={REVENUE.memberships} percentage={71} color="#C5A059" icon={CreditCard} />
                    <RevenueItem label="Renewals" amount={REVENUE.renewals} percentage={18} color="#A855F7" icon={CalendarCheck} />
                    <RevenueItem label="Others" amount={REVENUE.others} percentage={11} color="#3B82F6" icon={Package} />
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent my-6" />

                  <div className="flex items-center justify-center gap-3 group-hover:gap-4 transition-all duration-300">
                    <BarChart3 size={14} className="text-[#C5A059]/50 group-hover:text-[#C5A059]/80 transition-colors" />
                    <span className="font-rajdhani text-white/50 group-hover:text-white/70 text-[11px] tracking-[0.12em] uppercase transition-colors">
                      Click for detailed analytics
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-white/30 group-hover:text-[#C5A059]/80 group-hover:translate-x-1 transition-all duration-300"
                    />
                  </div>
                </div>
              </GlassPanel>

              {/* Alerts Card */}
              <GlassPanel borderColor="rgba(239,68,68,0.12)" className="hover:border-red-500/20 transition-all duration-300">
                <div className="p-6 flex items-center gap-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(239,68,68,0.10)',
                      border: '1px solid rgba(239,68,68,0.15)',
                      boxShadow: '0 4px 16px rgba(239,68,68,0.08)'
                    }}
                  >
                    <Bell size={18} className="text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-rajdhani text-white text-[13px] font-bold tracking-[0.12em] uppercase mb-1">
                      {MEMBERS.expired} Memberships Expiring Soon
                    </p>
                    <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.1em] uppercase font-medium">
                      Requires immediate attention this week
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-2 rounded-xl bg-red-500/[0.12] border border-red-500/[0.25]">
                      <span className="font-orbitron text-red-400 text-[14px] font-bold">
                        {MEMBERS.expired}
                      </span>
                    </div>
                    <button
                      className="w-9 h-9 rounded-lg border border-red-500/[0.2] flex items-center justify-center hover:opacity-80 transition-colors duration-200"
                      style={{ backgroundColor: '#000000' }}
                    >
                      <ChevronRight size={16} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </GlassPanel>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;