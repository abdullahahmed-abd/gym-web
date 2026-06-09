// AdminSeeUserProfile.jsx — DASHBOARD-MATCHING PREMIUM UI
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  Shield, Phone, Mail, Activity, Dumbbell, Clock,
  CheckCircle, AlertCircle, Timer, Edit2, Trash2,
  Sparkles, ArrowLeft, Crown, Star, Zap, Target,
  Flame, Calendar, CreditCard, TrendingUp, Hash,
  ChevronRight, Eye, Wifi, ArrowUpRight, User,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════ */
/* CONFIGS                                                         */
/* ═══════════════════════════════════════════════════════════════ */
const TIER_CONFIG = {
  'ELITE TIER':     { color: '#C5A059', icon: Crown,    short: 'ELITE'     },
  'LEGENDARY TIER': { color: '#A855F7', icon: Sparkles, short: 'LEGENDARY' },
};

const STATUS_CONFIG = {
  active:  { label: 'ACTIVE',  color: '#22C55E', icon: CheckCircle, pulse: true  },
  expired: { label: 'EXPIRED', color: '#EF4444', icon: AlertCircle, pulse: false },
  trial:   { label: 'TRIAL',   color: '#3B82F6', icon: Zap,         pulse: true  },
};

/* ═══════════════════════════════════════════════════════════════ */
/* SHARED: GlassPanel (identical to dashboard)                    */
/* ═══════════════════════════════════════════════════════════════ */
const GlassPanel = ({ children, className = '', onClick, hover = false, borderColor, glow }) => (
  <div
    onClick={onClick}
    className={`
      relative rounded-3xl overflow-hidden
      ${hover ? 'cursor-pointer transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1' : ''}
      ${onClick ? 'cursor-pointer' : ''}
      ${className}
    `}
    style={{
      background: '#000000',
      border: `1px solid ${borderColor || 'rgba(255,255,255,0.08)'}`,
      backdropFilter: 'blur(24px)',
      boxShadow: glow ? `0 8px 32px ${glow}` : 'none',
    }}
  >
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* PULSE DOT (identical to dashboard)                             */
/* ═══════════════════════════════════════════════════════════════ */
const PulseDot = ({ color = '#22C55E', size = 8 }) => (
  <div className="relative flex items-center justify-center"
    style={{ width: size * 3, height: size * 3 }}>
    <span className="absolute rounded-full animate-ping opacity-30"
      style={{ width: size * 2.5, height: size * 2.5, backgroundColor: color }} />
    <span className="absolute rounded-full animate-pulse opacity-20"
      style={{ width: size * 1.8, height: size * 1.8, backgroundColor: color }} />
    <span className="relative rounded-full"
      style={{ width: size, height: size, backgroundColor: color,
               boxShadow: `0 0 ${size * 2}px ${color}40` }} />
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* STAT CARD (same pattern as dashboard)                          */
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
      <p className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.15em] uppercase font-semibold">
        {label}
      </p>
      {sub && (
        <>
          <div className="h-px bg-gradient-to-r from-white/[0.05] via-white/[0.1] to-white/[0.05] my-2" />
          <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.1em] uppercase">{sub}</p>
        </>
      )}
    </div>
  </GlassPanel>
);

/* ═══════════════════════════════════════════════════════════════ */
/* INFO ROW                                                        */
/* ═══════════════════════════════════════════════════════════════ */
const InfoRow = ({ label, value, valueColor, icon: Icon, iconColor }) => (
  <div className="flex items-center justify-between py-4"
    style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
    <div className="flex items-center gap-3">
      {Icon && (
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${iconColor || '#C5A059'}10`, border: `1px solid ${iconColor || '#C5A059'}15` }}>
          <Icon size={13} style={{ color: iconColor || '#C5A059' }} />
        </div>
      )}
      <span className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.15em] uppercase font-semibold">
        {label}
      </span>
    </div>
    <span className="font-orbitron text-[12px] font-bold"
      style={{ color: valueColor || 'rgba(255,255,255,0.90)' }}>
      {value}
    </span>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN COMPONENT                                                  */
/* ═══════════════════════════════════════════════════════════════ */
const AdminSeeUserProfile = ({ onLogout }) => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const member    = location.state?.member;

  /* ── Not found ── */
  if (!member) {
    return (
      <Layout title="MEMBER PROFILE" onLogout={onLogout}>
        <div className="relative min-h-screen">
          <div className="fixed inset-0 z-0" style={{
            background: 'linear-gradient(180deg,rgba(0,0,0,0.95) 0%,#000 100%)',
          }} />
          <div className="relative z-10 flex items-center justify-center min-h-screen">
            <GlassPanel className="p-12 text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <User size={28} className="text-zinc-700" strokeWidth={1.5} />
              </div>
              <p className="font-orbitron text-zinc-500 text-[14px] tracking-[0.15em] mb-4">
                MEMBER NOT FOUND
              </p>
              <button onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl mx-auto transition-all hover:scale-105"
                style={{ background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.18)' }}>
                <ArrowLeft size={14} className="text-[#C5A059]" />
                <span className="font-rajdhani text-[#C5A059] text-[11px] tracking-widest uppercase font-bold">
                  Go Back
                </span>
              </button>
            </GlassPanel>
          </div>
        </div>
      </Layout>
    );
  }

  const tier    = TIER_CONFIG[member.membershipType] || TIER_CONFIG['ELITE TIER'];
  const status  = STATUS_CONFIG[member.membershipStatus] || STATUS_CONFIG.active;
  const TierIcon = tier.icon;

  const formatDate = d =>
    new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const getDaysLeft = () => {
    if (member.membershipStatus === 'expired') return 'Expired';
    if (member.daysLeft) return `${member.daysLeft} days`;
    const diff = Math.ceil((new Date(member.expiryDate) - new Date()) / 86400000);
    return diff > 0 ? `${diff} days` : 'Expired';
  };

  /* ── Render ── */
  return (
    <Layout title="MEMBER PROFILE" onLogout={onLogout}>
      <div className="relative min-h-screen">

        {/* Background (matches dashboard) */}
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
              className="group flex items-center gap-3 h-11 px-5 rounded-2xl transition-all duration-300
                         hover:scale-105 active:scale-95"
              style={{ background: '#000000', border: '1px solid rgba(255,255,255,0.08)' }}>
              <ArrowLeft size={15}
                className="text-zinc-400 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
              <span className="font-rajdhani text-zinc-400 group-hover:text-white text-[12px] tracking-[0.15em] uppercase font-bold transition-colors">
                Back
              </span>
            </button>

            <div className="flex items-center gap-3">
              {member.isLive && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                  style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }}>
                  <PulseDot color="#22C55E" size={5} />
                  <Wifi size={13} className="text-green-400" />
                  <span className="font-orbitron text-green-400 text-[10px] font-bold tracking-widest">
                    LIVE NOW
                  </span>
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
          <GlassPanel
            borderColor={`${tier.color}20`}
            glow={`${tier.color}06`}
          >
            {/* Gold top accent line */}
            <div className="absolute top-0 left-10 right-10 h-[2px]"
              style={{ background: `linear-gradient(90deg,transparent,${tier.color}50,transparent)` }} />

            {/* Watermark shield */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ opacity: 0.03 }}>
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
                      border: `2px solid ${tier.color}30`,
                      color: tier.color,
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

                {/* Core Info */}
                <div className="flex-1 min-w-0">
                  {/* Badges row */}
                  <div className="flex items-center gap-2.5 flex-wrap mb-3">
                    {/* Tier badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                      style={{ background: `${tier.color}10`, border: `1px solid ${tier.color}22` }}>
                      <TierIcon size={12} style={{ color: tier.color }} />
                      <span className="font-orbitron text-[9px] font-bold tracking-[0.12em]"
                        style={{ color: tier.color }}>
                        {tier.short}
                      </span>
                    </div>

                    {/* Status badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                      style={{ background: `${status.color}10`, border: `1px solid ${status.color}22` }}>
                      {status.pulse
                        ? <PulseDot color={status.color} size={4} />
                        : <status.icon size={10} style={{ color: status.color }} />}
                      <span className="font-orbitron text-[9px] font-bold tracking-[0.12em]"
                        style={{ color: status.color }}>
                        {status.label}
                      </span>
                    </div>

                    {/* Live badge */}
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

                  {/* Workout + Duration */}
                  <div className="flex items-center gap-4 flex-wrap mt-3">
                    <div className="flex items-center gap-2">
                      {member.workoutType === 'cardio_weights'
                        ? <Activity size={14} style={{ color: `${tier.color}90` }} />
                        : <Dumbbell size={14} style={{ color: `${tier.color}90` }} />}
                      <span className="font-rajdhani text-zinc-400 text-[12px] tracking-[0.12em] uppercase font-semibold">
                        {member.workoutType === 'cardio_weights' ? 'Cardio + Weights' : 'Weights Only'}
                      </span>
                    </div>

                    {member.duration && (
                      <>
                        <div className="w-px h-4 bg-white/[0.08]" />
                        <div className="flex items-center gap-2">
                          <Timer size={14} className="text-amber-400/70" />
                          <span className="font-orbitron text-amber-400 text-[12px] font-bold">
                            {member.duration}
                          </span>
                          <span className="font-rajdhani text-zinc-500 text-[10px] tracking-wider uppercase">
                            session
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* ALERT CARD (Expired / Trial)                           */}
          {/* ═══════════════════════════════════════════════════════ */}
          {(member.membershipStatus === 'expired' || member.membershipStatus === 'trial') && (
            <GlassPanel
              borderColor={member.membershipStatus === 'expired'
                ? 'rgba(239,68,68,0.20)'
                : 'rgba(59,130,246,0.20)'}
              glow={member.membershipStatus === 'expired'
                ? 'rgba(239,68,68,0.05)'
                : 'rgba(59,130,246,0.05)'}
            >
              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: member.membershipStatus === 'expired'
                      ? 'rgba(239,68,68,0.10)' : 'rgba(59,130,246,0.10)',
                    border: member.membershipStatus === 'expired'
                      ? '1px solid rgba(239,68,68,0.20)' : '1px solid rgba(59,130,246,0.20)',
                  }}>
                  <AlertCircle size={20}
                    color={member.membershipStatus === 'expired' ? '#EF4444' : '#3B82F6'} />
                </div>

                <div className="flex-1">
                  <p className="font-orbitron font-bold text-[13px] tracking-[0.12em] uppercase mb-1"
                    style={{ color: member.membershipStatus === 'expired' ? '#EF4444' : '#3B82F6' }}>
                    {member.membershipStatus === 'expired' ? 'Membership Expired' : 'Trial Period Active'}
                  </p>
                  <p className="font-rajdhani text-zinc-400 text-[12px] tracking-[0.10em] uppercase font-medium">
                    {member.membershipStatus === 'expired'
                      ? `Expired on ${formatDate(member.expiryDate)} · Immediate renewal recommended`
                      : `${getDaysLeft()} remaining · Upgrade to full membership`}
                  </p>
                </div>

                <button className="flex items-center gap-2.5 px-6 py-3 rounded-2xl font-orbitron text-[11px]
                                   font-bold tracking-[0.12em] uppercase transition-all duration-300 hover:scale-105
                                   flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #C5A059, #EAB308)',
                    color: '#000',
                    boxShadow: '0 6px 24px rgba(197,160,89,0.30)',
                  }}>
                  <Sparkles size={15} />
                  {member.membershipStatus === 'expired' ? 'Renew Now' : 'Upgrade'}
                </button>
              </div>
            </GlassPanel>
          )}

          {/* ═══════════════════════════════════════════════════════ */}
          {/* STATS ROW (same pattern as dashboard top metrics)       */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Target}
              label="Total Visits"
              value={member.totalVisits || 0}
              color="#22D3EE"
            />
            <StatCard
              icon={Flame}
              label="Current Streak"
              value={`${member.currentStreak || 0}d`}
              color="#F97316"
              pulse={member.currentStreak > 0}
            />
            <StatCard
              icon={CreditCard}
              label="Amount Paid"
              value={member.paidAmount ? `₹${(member.paidAmount / 1000).toFixed(1)}K` : '—'}
              color="#C5A059"
            />
            <StatCard
              icon={Calendar}
              label="Days Remaining"
              value={getDaysLeft()}
              color={member.membershipStatus === 'expired' ? '#EF4444' : '#22C55E'}
              pulse={member.membershipStatus === 'active'}
            />
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* MAIN GRID — Contact + Membership                        */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-12 gap-6">

            {/* ── Contact Card ── */}
            <div className="col-span-12 lg:col-span-5">
              <GlassPanel className="h-full">
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#C5A059] to-[#C5A059]/20" />
                    <div>
                      <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.15em]">
                        CONTACT INFO
                      </h3>
                      <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">
                        Member contact details
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl mb-3 transition-all duration-300 hover:scale-[1.01]"
                    style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.12)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.18)' }}>
                      <Phone size={16} color="#22C55E" />
                    </div>
                    <div>
                      <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.2em] uppercase mb-0.5">
                        Phone
                      </p>
                      <p className="font-orbitron text-white text-[13px] font-bold tracking-wider">
                        {member.phone}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  {member.email && (
                    <div className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
                      style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.12)' }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.18)' }}>
                        <Mail size={16} color="#3B82F6" />
                      </div>
                      <div>
                        <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.2em] uppercase mb-0.5">
                          Email
                        </p>
                        <p className="font-orbitron text-white text-[12px] font-bold tracking-wider truncate">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Member ID */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl mt-3 transition-all duration-300 hover:scale-[1.01]"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.15)' }}>
                      <Hash size={16} color="#C5A059" />
                    </div>
                    <div>
                      <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.2em] uppercase mb-0.5">
                        Member ID
                      </p>
                      <p className="font-mono text-white text-[13px] font-bold">
                        {member.memberId}
                      </p>
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </div>

            {/* ── Membership Card ── */}
            <div className="col-span-12 lg:col-span-7">
              <GlassPanel
                borderColor={`${tier.color}12`}
                glow={`${tier.color}05`}
                className="h-full"
              >
                {/* Gold top accent */}
                <div className="absolute top-0 left-8 right-8 h-[2px]"
                  style={{ background: `linear-gradient(90deg,transparent,${tier.color}40,transparent)` }} />

                <div className="p-7">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#C5A059] to-[#C5A059]/20" />
                      <div>
                        <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.15em]">
                          MEMBERSHIP
                        </h3>
                        <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">
                          Plan & expiry details
                        </p>
                      </div>
                    </div>
                    {/* Tier pill */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                      style={{ background: `${tier.color}10`, border: `1px solid ${tier.color}20` }}>
                      <TierIcon size={14} style={{ color: tier.color }} />
                      <span className="font-orbitron text-[11px] font-bold tracking-wider"
                        style={{ color: tier.color }}>
                        {tier.short}
                      </span>
                    </div>
                  </div>

                  {/* Rows */}
                  <div className="px-1">
                    <InfoRow
                      label="Joined"
                      value={formatDate(member.joinDate)}
                      icon={Calendar}
                      iconColor="#C5A059"
                    />
                    <InfoRow
                      label="Expires"
                      value={formatDate(member.expiryDate)}
                      icon={Clock}
                      iconColor={member.membershipStatus === 'expired' ? '#EF4444' : '#22C55E'}
                      valueColor={member.membershipStatus === 'expired' ? '#EF4444' : undefined}
                    />
                    <InfoRow
                      label="Status"
                      value={status.label}
                      icon={Shield}
                      iconColor={status.color}
                      valueColor={status.color}
                    />
                    <InfoRow
                      label="Remaining"
                      value={getDaysLeft()}
                      icon={Timer}
                      iconColor={member.membershipStatus === 'expired' ? '#EF4444' : '#22C55E'}
                      valueColor={member.membershipStatus === 'expired' ? '#EF4444' : '#22C55E'}
                    />
                    <InfoRow
                      label="Workout"
                      value={member.workoutType === 'cardio_weights' ? 'Cardio + Weights' : 'Weights Only'}
                      icon={member.workoutType === 'cardio_weights' ? Activity : Dumbbell}
                      iconColor={tier.color}
                    />
                    {member.checkinTime && (
                      <InfoRow
                        label="Last Check-In"
                        value={member.checkinTime}
                        icon={TrendingUp}
                        iconColor="#22C55E"
                        valueColor="#22C55E"
                      />
                    )}
                  </div>
                </div>
              </GlassPanel>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* ACTION BUTTONS (dashboard CommandButton style)          */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 gap-4">
            {/* Edit */}
            <button
              className="group relative flex items-center justify-center gap-3 py-4 rounded-2xl
                         transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: '#000000', border: '1px solid rgba(59,130,246,0.20)' }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, rgba(59,130,246,0.06) 0%, transparent 70%)' }} />
              <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 relative z-10"
                style={{ background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.20)' }}>
                <Edit2 size={16} color="#3B82F6" />
              </div>
              <span className="font-orbitron text-blue-400 text-[12px] font-bold tracking-[0.15em] uppercase z-10
                               group-hover:tracking-[0.18em] transition-all">
                Edit Member
              </span>
              <ChevronRight size={15} className="text-blue-400/30 group-hover:text-blue-400/60 group-hover:translate-x-1 transition-all z-10" />
            </button>

            {/* Remove */}
            <button
              className="group relative flex items-center justify-center gap-3 py-4 rounded-2xl
                         transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: '#000000', border: '1px solid rgba(239,68,68,0.18)' }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, rgba(239,68,68,0.06) 0%, transparent 70%)' }} />
              <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 relative z-10"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}>
                <Trash2 size={16} color="#EF4444" />
              </div>
              <span className="font-orbitron text-red-400 text-[12px] font-bold tracking-[0.15em] uppercase z-10
                               group-hover:tracking-[0.18em] transition-all">
                Remove Member
              </span>
              <ChevronRight size={15} className="text-red-400/30 group-hover:text-red-400/60 group-hover:translate-x-1 transition-all z-10" />
            </button>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* FOOTER SECURITY NOTICE (matches dashboard alert style)  */}
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
                  Member data is encrypted · Changes are logged and timestamped automatically
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl flex-shrink-0"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-rajdhani text-green-400 text-[9px] tracking-[0.12em] uppercase font-bold">
                  Encrypted
                </span>
              </div>
            </div>
          </GlassPanel>

        </div>
      </div>
    </Layout>
  );
};

export default AdminSeeUserProfile;