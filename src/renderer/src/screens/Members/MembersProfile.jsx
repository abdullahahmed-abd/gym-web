// MembersProfile.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  Shield, Phone, Mail, Activity, Dumbbell,
  Calendar, Clock, CheckCircle, AlertCircle,
  Edit2, Trash2, ArrowLeft, Crown, Sparkles,
  Zap, Flame, Star, Timer, Users, TrendingUp,
  ChevronRight, Eye, MapPin, UserCheck, Target,
  Award, BarChart3, CalendarCheck, Wifi,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════ */
/* CONFIGS                                                         */
/* ═══════════════════════════════════════════════════════════════ */
const STATUS_CONFIG = {
  active: {
    label: 'ACTIVE', color: '#22C55E',
    bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.20)',
    icon: CheckCircle, pulse: true,
  },
  expired: {
    label: 'EXPIRED', color: '#EF4444',
    bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.20)',
    icon: AlertCircle, pulse: false,
  },
  trial: {
    label: 'TRIAL', color: '#3B82F6',
    bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.20)',
    icon: Zap, pulse: true,
  },
};

const TIER_CONFIG = {
  'ELITE TIER': {
    color: '#C5A059', icon: Crown,
    gradient: 'linear-gradient(135deg, rgba(197,160,89,0.10) 0%, rgba(197,160,89,0.02) 100%)',
    borderColor: 'rgba(197,160,89,0.18)',
    glowColor: 'rgba(197,160,89,0.08)',
    accentBar: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.5), transparent)',
  },
  'LEGENDARY TIER': {
    color: '#A855F7', icon: Sparkles,
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.10) 0%, rgba(168,85,247,0.02) 100%)',
    borderColor: 'rgba(168,85,247,0.18)',
    glowColor: 'rgba(168,85,247,0.08)',
    accentBar: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)',
  },
};

/* ── Pulse Dot ── */
const PulseDot = ({ color = '#22C55E', size = 6 }) => (
  <div className="relative flex items-center justify-center" style={{ width: size * 3, height: size * 3 }}>
    <span className="absolute rounded-full animate-ping opacity-30"
      style={{ width: size * 2.5, height: size * 2.5, backgroundColor: color }} />
    <span className="relative rounded-full"
      style={{ width: size, height: size, backgroundColor: color, boxShadow: `0 0 ${size * 2}px ${color}60` }} />
  </div>
);

/* ── Panel ── */
const Panel = ({ children, className = '', borderColor, glow, gradient }) => (
  <div className={`relative rounded-2xl overflow-hidden ${className}`}
    style={{
      background: gradient || '#000000',
      border: `1px solid ${borderColor || 'rgba(255,255,255,0.07)'}`,
      boxShadow: glow ? `0 6px 24px ${glow}` : 'none',
    }}>
    {children}
  </div>
);

/* ── Compact Stat ── */
const StatBlock = ({ icon: Icon, label, value, color = '#C5A059', suffix }) => (
  <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
    <div className="flex items-center gap-2.5 mb-2">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center"
        style={{ background: `${color}10`, border: `1px solid ${color}18` }}>
        <Icon size={13} style={{ color }} />
      </div>
      <span className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.15em] uppercase font-semibold">
        {label}
      </span>
    </div>
    <div className="flex items-baseline gap-1 pl-0.5">
      <p className="font-orbitron text-white font-bold text-[15px] leading-none">{value ?? '--'}</p>
      {suffix && <span className="font-rajdhani text-zinc-600 text-[9px] uppercase">{suffix}</span>}
    </div>
  </div>
);

/* ── Compact Info Row ── */
const InfoRow = ({ icon: Icon, label, value, color = '#C5A059', last }) => (
  <div className={`flex items-center justify-between py-3 ${!last ? 'border-b' : ''}`}
    style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}10`, border: `1px solid ${color}15` }}>
        <Icon size={12} style={{ color }} />
      </div>
      <span className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.12em] uppercase font-semibold">{label}</span>
    </div>
    <span className="font-orbitron text-white font-bold text-[12px] tracking-wider">{value || '--'}</span>
  </div>
);

/* ── Section Title ── */
const SectionTitle = ({ title, accentColor = '#C5A059' }) => (
  <div className="flex items-center gap-2.5 mb-4">
    <div className="w-1 h-6 rounded-full"
      style={{ background: `linear-gradient(180deg, ${accentColor}, ${accentColor}20)` }} />
    <h3 className="font-orbitron text-white font-bold text-[11px] tracking-[0.15em]">{title}</h3>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN                                                            */
/* ═══════════════════════════════════════════════════════════════ */
const MembersProfile = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const member = location.state?.member;

  if (!member) {
    return (
      <Layout title="MEMBER PROFILE" onLogout={onLogout}>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/[0.06]"
              style={{ background: 'rgba(239,68,68,0.05)' }}>
              <AlertCircle size={28} className="text-red-500/40" strokeWidth={1} />
            </div>
            <p className="font-orbitron text-zinc-600 text-[13px] tracking-[0.15em] mb-1">MEMBER NOT FOUND</p>
            <p className="font-rajdhani text-zinc-700 text-[11px] tracking-[0.1em] mb-5">No data available</p>
            <button onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-xl border border-white/[0.08] font-rajdhani text-zinc-500 text-[11px]
                         tracking-[0.12em] uppercase hover:text-white hover:border-white/20 transition-all">
              ← Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const status = STATUS_CONFIG[member.membershipStatus] || STATUS_CONFIG.active;
  const tier = TIER_CONFIG[member.membershipType] || TIER_CONFIG['ELITE TIER'];
  const TierIcon = tier.icon;
  const StatusIcon = status.icon;

  const formatDate = (d) => {
    if (!d) return '--';
    return new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const daysLeft = () => {
    if (!member.expiryDate) return null;
    return Math.ceil((new Date(member.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
  };

  const days = daysLeft();
  const daysColor = days <= 7 ? '#EF4444' : days <= 30 ? '#EAB308' : '#22C55E';

  return (
    <Layout title="MEMBER PROFILE" onLogout={onLogout}>
      <div className="min-h-screen bg-black">
        <div className="p-6 max-w-3xl mx-auto space-y-4">

          {/* ── Back ── */}
          <button onClick={() => navigate(-1)}
            className="group flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/[0.06]
                       hover:border-white/[0.12] transition-all duration-300"
            style={{ background: 'rgba(255,255,255,0.02)' }}>
            <ArrowLeft size={14} className="text-zinc-500 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
            <span className="font-rajdhani text-zinc-500 group-hover:text-white text-[11px] tracking-[0.12em] uppercase font-semibold transition-colors">
              Back
            </span>
          </button>

          {/* ══════════════════════════════════════════════════════ */}
          {/* HERO — Compact                                        */}
          {/* ══════════════════════════════════════════════════════ */}
          <Panel borderColor={tier.borderColor} glow={tier.glowColor} gradient={tier.gradient}>
            <div className="absolute top-0 left-10 right-10 h-[1.5px]" style={{ background: tier.accentBar }} />
            <div className="absolute -top-6 -right-6 pointer-events-none">
              <TierIcon size={120} style={{ color: tier.color }} strokeWidth={0.3} className="opacity-[0.04]" />
            </div>

            <div className="p-6 relative">
              <div className="flex items-center gap-5">

                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-orbitron font-bold text-white text-[20px]"
                    style={{
                      background: `linear-gradient(135deg, ${tier.color}20, ${tier.color}08)`,
                      border: `2px solid ${tier.color}30`,
                      boxShadow: `0 6px 24px ${tier.color}12`,
                    }}>
                    {member.avatar}
                  </div>
                  {member.isLive && (
                    <div className="absolute -bottom-1.5 -right-1.5 flex items-center gap-1 px-2 py-0.5 rounded-lg"
                      style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.30)' }}>
                      <Wifi size={8} className="text-green-400" />
                      <span className="font-orbitron text-green-400 text-[7px] font-bold">LIVE</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                      style={{ background: `${tier.color}10`, border: `1px solid ${tier.color}20` }}>
                      <TierIcon size={10} style={{ color: tier.color }} />
                      <span className="font-orbitron text-[8px] font-bold tracking-[0.15em]" style={{ color: tier.color }}>
                        {member.membershipType}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                      style={{ background: status.bg, border: `1px solid ${status.border}` }}>
                      {status.pulse ? <PulseDot color={status.color} size={5} /> : <StatusIcon size={10} style={{ color: status.color }} />}
                      <span className="font-orbitron text-[8px] font-bold tracking-[0.15em]" style={{ color: status.color }}>
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <h2 className="font-orbitron font-bold text-[22px] tracking-[0.08em] text-white leading-none mb-2 truncate">
                    {member.name}
                  </h2>

                  {/* Workout + Days */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      {member.workoutType === 'cardio_weights'
                        ? <Activity size={12} style={{ color: `${tier.color}90` }} />
                        : <Dumbbell size={12} style={{ color: `${tier.color}90` }} />}
                      <span className="font-rajdhani text-[11px] tracking-[0.1em] uppercase font-semibold"
                        style={{ color: `${tier.color}80` }}>
                        {member.workoutType === 'cardio_weights' ? 'Cardio + Weights' : 'Weights Only'}
                      </span>
                    </div>

                    {days !== null && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                        style={{ background: `${daysColor}10`, border: `1px solid ${daysColor}20` }}>
                        <Timer size={11} style={{ color: daysColor }} />
                        <span className="font-orbitron text-[9px] font-bold tracking-wider" style={{ color: daysColor }}>
                          {days > 0 ? `${days}d left` : 'Expired'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          {/* ══════════════════════════════════════════════════════ */}
          {/* ACTIVITY — 4-col compact                              */}
          {/* ══════════════════════════════════════════════════════ */}
          <Panel>
            <div className="p-5">
              <SectionTitle title="ACTIVITY" accentColor="#22C55E" />
              <div className="grid grid-cols-4 gap-3">
                <StatBlock icon={Clock} label="Check-in" value={member.checkinTime || '--:--'} color="#22C55E" />
                <StatBlock icon={Timer} label="Session" value={member.duration || '0m'} color="#22D3EE" />
                <StatBlock icon={CalendarCheck} label="Visits" value={member.totalVisits || 0} color={tier.color} />
                <StatBlock icon={Flame} label="Streak" value={member.currentStreak || 0} color="#EF4444" suffix="d" />
              </div>
            </div>
          </Panel>

          {/* ══════════════════════════════════════════════════════ */}
          {/* CONTACT + MEMBERSHIP — Side by side                   */}
          {/* ══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 gap-4">
            {/* Contact */}
            <Panel>
              <div className="p-5">
                <SectionTitle title="CONTACT" accentColor="#22D3EE" />
                <InfoRow icon={Phone} label="Phone" value={member.phone} color="#22C55E" />
                {member.email && <InfoRow icon={Mail} label="Email" value={member.email} color="#3B82F6" />}
                <InfoRow icon={UserCheck} label="ID"
                  value={`#${member.memberId || member.id?.slice?.(0, 6).toUpperCase() || '000000'}`}
                  color={tier.color} last />
              </div>
            </Panel>

            {/* Membership */}
            <Panel>
              <div className="p-5">
                <SectionTitle title="MEMBERSHIP" accentColor={tier.color} />
                <InfoRow icon={CalendarCheck} label="Joined" value={formatDate(member.joinDate)} color={tier.color} />
                <InfoRow icon={Clock} label="Expires" value={formatDate(member.expiryDate)}
                  color={days !== null && days <= 7 ? '#EF4444' : tier.color} />
                <InfoRow icon={Target} label="Paid" value={`₹${member.paidAmount || 0}`} color="#22C55E" last />
              </div>
            </Panel>
          </div>

          {/* ══════════════════════════════════════════════════════ */}
          {/* ACTIONS — Compact                                     */}
          {/* ══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 gap-3">
            <button className="group flex items-center justify-center gap-2.5 py-3 rounded-2xl transition-all duration-300
                               hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.18)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-500/10 border border-blue-500/18
                              group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Edit2 size={13} className="text-blue-400" />
              </div>
              <span className="font-orbitron text-blue-400 font-bold text-[11px] tracking-[0.12em]">EDIT</span>
            </button>

            <button onClick={() => { if (window.confirm(`Remove "${member.name}"?`)) navigate(-1); }}
              className="group flex items-center justify-center gap-2.5 py-3 rounded-2xl transition-all duration-300
                         hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-500/10 border border-red-500/18
                              group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Trash2 size={13} className="text-red-400" />
              </div>
              <span className="font-orbitron text-red-400 font-bold text-[11px] tracking-[0.12em]">REMOVE</span>
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default MembersProfile;