// AdminAddTrainer.jsx — FULL DASHBOARD-MATCHING PREMIUM UI
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  Search, X, Shield, CheckCircle, AlertCircle, Timer,
  Activity, Clock, Phone, MessageCircle, Dumbbell,
  ArrowLeft, Zap, Wifi, Crown, Sparkles, ChevronRight,
  Users, Filter, Eye, Target, Flame, UserPlus, Hash,
} from 'lucide-react';

import splashBg from '../../../../../src/assets/splash-bg.jpg';
const SPLASH_BG = splashBg;

const CYAN  = '#22D3EE';
const GOLD  = '#C5A059';
const GREEN = '#22C55E';
const WHITE8 = 'rgba(255,255,255,0.08)';

/* ═══════════════════════════════════════════════════════════════ */
/* DATA                                                            */
/* ═══════════════════════════════════════════════════════════════ */
const TIER_CONFIG = {
  'ELITE TIER':     { badge: 'ELITE',     color: '#C5A059', icon: Crown    },
  'LEGENDARY TIER': { badge: 'LEGENDARY', color: '#A855F7', icon: Sparkles },
};
const TRIAL_CFG   = { badge: 'TRIAL', color: '#3B82F6', icon: Zap };
const STATUS_CFG  = {
  active:  { label: 'ACTIVE',  color: GREEN,     icon: CheckCircle },
  expired: { label: 'EXPIRED', color: '#EF4444', icon: AlertCircle },
  trial:   { label: 'TRIAL',   color: '#3B82F6', icon: Zap         },
};

const DUMMY_MEMBERS = [
  { id: 'm1', name: 'Abdullah Ahmed', avatar: 'AA', memberId: 'GYM001', phone: '+918817159218',
    membershipType: 'ELITE TIER',     membershipStatus: 'active',  workoutType: 'cardio_weights',
    isLive: true,  checkinTime: '6:30 AM', duration: '45m', lastCheckout: '8:15 AM',
    totalVisits: 156, currentStreak: 12 },
  { id: 'm2', name: 'Priya Patel',    avatar: 'PP', memberId: 'GYM002', phone: '+919876543211',
    membershipType: 'LEGENDARY TIER', membershipStatus: 'expired', workoutType: 'weights_only',
    isLive: true,  checkinTime: '6:45 AM', duration: '32m', lastCheckout: null,
    totalVisits: 89, currentStreak: 0 },
  { id: 'm3', name: 'Rahul Verma',    avatar: 'RV', memberId: 'GYM003', phone: '+919876543212',
    membershipType: null,             membershipStatus: 'trial',   workoutType: 'cardio_weights',
    isLive: true,  checkinTime: '6:15 AM', duration: '58m', lastCheckout: null,
    totalVisits: 5,  currentStreak: 5  },
  { id: 'm4', name: 'Sneha Gupta',    avatar: 'SG', memberId: 'GYM004', phone: '+919876543213',
    membershipType: 'LEGENDARY TIER', membershipStatus: 'active',  workoutType: 'weights_only',
    isLive: true,  checkinTime: '6:50 AM', duration: '40m', lastCheckout: null,
    totalVisits: 210, currentStreak: 28 },
  { id: 'm5', name: 'Vikram Singh',   avatar: 'VS', memberId: 'GYM005', phone: '+919876543214',
    membershipType: 'ELITE TIER',     membershipStatus: 'expired', workoutType: 'cardio_weights',
    isLive: false, checkinTime: null,       duration: null,  lastCheckout: '5:00 PM',
    totalVisits: 67, currentStreak: 0  },
  { id: 'm6', name: 'Ananya Reddy',   avatar: 'AR', memberId: 'GYM006', phone: '+919876543215',
    membershipType: null,             membershipStatus: 'trial',   workoutType: 'weights_only',
    isLive: true,  checkinTime: '6:20 AM', duration: '50m', lastCheckout: null,
    totalVisits: 3,  currentStreak: 3  },
  { id: 'm7', name: 'Karan Malhotra', avatar: 'KM', memberId: 'GYM007', phone: '+919876543216',
    membershipType: 'ELITE TIER',     membershipStatus: 'active',  workoutType: 'cardio_weights',
    isLive: true,  checkinTime: '6:40 AM', duration: '35m', lastCheckout: null,
    totalVisits: 178, currentStreak: 22 },
  { id: 'm8', name: 'Meera Iyer',     avatar: 'MI', memberId: 'GYM008', phone: '+919876543217',
    membershipType: 'LEGENDARY TIER', membershipStatus: 'expired', workoutType: 'weights_only',
    isLive: false, checkinTime: null,       duration: null,  lastCheckout: '4:45 PM',
    totalVisits: 134, currentStreak: 0 },
];

const fmtPhone = p => {
  const c = (p || '').replace(/\D/g, '');
  return c.length === 12 ? `+${c.slice(0,2)} ${c.slice(2,7)} ${c.slice(7)}` : p;
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
      border: `1px solid ${borderColor || WHITE8}`,
      backdropFilter: 'blur(24px)',
      boxShadow: glow ? `0 8px 32px ${glow}` : 'none',
    }}>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* PULSE DOT                                                       */
/* ═══════════════════════════════════════════════════════════════ */
const PulseDot = ({ color = GREEN, size = 8 }) => (
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
/* STAT CARD (dashboard pattern)                                   */
/* ═══════════════════════════════════════════════════════════════ */
const StatCard = ({ icon: Icon, label, value, color, pulse }) => (
  <GlassPanel hover className="group" glow={`${color}08`}>
    <div className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center
                        transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{ background: `linear-gradient(135deg,${color}15,${color}08)`, border: `1px solid ${color}20` }}>
          <Icon size={17} style={{ color }} />
        </div>
        {pulse && <PulseDot color={color} size={6} />}
      </div>
      <p className="font-orbitron text-white font-bold text-[26px] leading-none mb-1
                    transition-all duration-300 group-hover:text-[28px]">
        {value}
      </p>
      <p className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.15em] uppercase font-semibold">{label}</p>
    </div>
  </GlassPanel>
);

/* ═══════════════════════════════════════════════════════════════ */
/* MEMBER CARD — Dashboard Style                                   */
/* ═══════════════════════════════════════════════════════════════ */
const MemberCard = ({ member, onPress, isTrainer }) => {
  const isTrial   = member.membershipStatus === 'trial';
  const tierCfg   = isTrial ? TRIAL_CFG : (TIER_CONFIG[member.membershipType] || TIER_CONFIG['ELITE TIER']);
  const statusCfg = STATUS_CFG[member.membershipStatus] || STATUS_CFG.active;
  const accent    = isTrainer ? CYAN : tierCfg.color;
  const TierIcon  = tierCfg.icon;

  const handleCall = e => { e.stopPropagation(); window.open(`tel:${member.phone.replace(/\D/g,'')}`); };
  const handleWA   = e => { e.stopPropagation(); window.open(`https://wa.me/${member.phone.replace(/\D/g,'')}`); };

  return (
    <GlassPanel
      hover
      onClick={() => onPress(member)}
      className="group"
      borderColor={isTrainer ? `${CYAN}22` : `${accent}14`}
      glow={isTrainer ? `${CYAN}06` : `${accent}04`}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-8 right-8 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg,transparent,${accent}50,transparent)` }} />

      {/* BG gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${accent}05, transparent 60%)` }} />

      <div className="relative p-6">

        {/* ── Row 1: Avatar + Info ── */}
        <div className="flex items-start gap-4 mb-5">

          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-orbitron font-bold text-[16px]
                            transition-all duration-300 group-hover:scale-105 group-hover:rotate-3"
              style={{
                background: `linear-gradient(135deg, ${accent}15, ${accent}05)`,
                border: `2px solid ${accent}28`,
                color: accent,
                boxShadow: `0 4px 16px ${accent}08`,
              }}>
              {member.avatar}
            </div>
            {member.isLive && (
              <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-lg flex items-center justify-center"
                style={{ background: '#000', border: '2px solid rgba(34,197,94,0.40)' }}>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Badges row */}
            <div className="flex items-center gap-2 mb-2.5 flex-wrap">
              {isTrainer ? (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                  style={{ background: `${CYAN}12`, border: `1px solid ${CYAN}22` }}>
                  <Dumbbell size={9} style={{ color: CYAN }} />
                  <span className="font-orbitron text-[7px] font-bold tracking-[0.15em]" style={{ color: CYAN }}>
                    TRAINER
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                    style={{ background: `${accent}10`, border: `1px solid ${accent}18` }}>
                    <TierIcon size={9} style={{ color: accent }} />
                    <span className="font-orbitron text-[7px] font-bold tracking-[0.15em]"
                      style={{ color: accent }}>{tierCfg.badge}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                    style={{ background: `${statusCfg.color}08`, border: `1px solid ${statusCfg.color}18` }}>
                    <statusCfg.icon size={9} style={{ color: statusCfg.color }} />
                    <span className="font-orbitron text-[7px] font-bold tracking-[0.12em]"
                      style={{ color: statusCfg.color }}>{statusCfg.label}</span>
                  </div>
                </>
              )}

              {/* Live / Offline */}
              {member.isLive ? (
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg"
                  style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }}>
                  <Wifi size={9} className="text-green-400" />
                  <span className="font-orbitron text-green-400 text-[7px] font-bold tracking-widest">LIVE</span>
                </div>
              ) : (
                <div className="px-2 py-1 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="font-orbitron text-zinc-700 text-[7px] font-bold tracking-widest">OFFLINE</span>
                </div>
              )}
            </div>

            {/* Name */}
            <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.06em] truncate mb-1.5
                           group-hover:tracking-[0.08em] transition-all">
              {member.name}
            </h3>

            {/* Stats row */}
            <div className="flex items-center gap-3">
              {/* ID */}
              <div className="flex items-center gap-1">
                <Hash size={9} className="text-zinc-600" />
                <span className="font-mono text-zinc-500 text-[10px]">{member.memberId}</span>
              </div>
              <div className="w-px h-3 bg-white/[0.06]" />
              {/* Visits */}
              <div className="flex items-center gap-1">
                <Target size={9} className="text-zinc-600" />
                <span className="font-orbitron text-zinc-400 text-[10px] font-bold">{member.totalVisits}</span>
              </div>
              {/* Streak */}
              {member.currentStreak > 0 && (
                <>
                  <div className="w-px h-3 bg-white/[0.06]" />
                  <div className="flex items-center gap-1">
                    <Flame size={9} className="text-orange-400/70" />
                    <span className="font-orbitron text-zinc-400 text-[10px] font-bold">{member.currentStreak}d</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── Session strip ── */}
        {member.isLive && member.checkinTime ? (
          <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl mb-4"
            style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.12)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-rajdhani text-green-400 text-[10px] font-bold tracking-wider flex-1">
              In since {member.checkinTime}
            </span>
            {member.duration && (
              <div className="flex items-center gap-1">
                <Clock size={10} className="text-amber-400" />
                <span className="font-orbitron text-amber-400 text-[10px] font-bold">{member.duration}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl mb-4"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Clock size={11} className="text-zinc-700" />
            <span className="font-rajdhani text-zinc-600 text-[10px] tracking-wider">
              Last checkout: {member.lastCheckout || 'N/A'}
            </span>
          </div>
        )}

        {/* ── Divider ── */}
        <div className="h-px mb-4"
          style={{ background: `linear-gradient(90deg,transparent,${accent}15,transparent)` }} />

        {/* ── Bottom: Contact + Actions ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${accent}10`, border: `1px solid ${accent}15` }}>
              <Phone size={13} style={{ color: accent }} />
            </div>
            <span className="font-mono text-zinc-400 text-[10px] tracking-wider">
              {fmtPhone(member.phone)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Call */}
            <button onClick={handleCall}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }}>
              <Phone size={13} className="text-green-400" />
            </button>
            {/* WhatsApp */}
            <button onClick={handleWA}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.18)' }}>
              <MessageCircle size={13} style={{ color: '#25D366' }} />
            </button>
            {/* View profile arrow */}
            <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/[0.06]"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <ChevronRight size={14} className="text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

        {/* ── Trainer badge overlay (if already trainer) ── */}
        {isTrainer && (
          <div className="mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl"
            style={{ background: `${CYAN}08`, border: `1px solid ${CYAN}18` }}>
            <Eye size={12} style={{ color: `${CYAN}80` }} />
            <span className="font-rajdhani text-[10px] font-bold tracking-[0.12em] uppercase"
              style={{ color: `${CYAN}80` }}>
              Already a Trainer · Tap to Manage
            </span>
          </div>
        )}
      </div>
    </GlassPanel>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN                                                            */
/* ═══════════════════════════════════════════════════════════════ */
const AdminAddTrainer = ({ onLogout }) => {
  const nav = useNavigate();
  const [search,      setSearch]      = useState('');
  const [focused,     setFocused]     = useState(false);
  const [filter,      setFilter]      = useState('all');
  const [trainerIds,  setTrainerIds]  = useState(['m1']);

  const liveCount   = DUMMY_MEMBERS.filter(m => m.isLive).length;
  const activeCount = DUMMY_MEMBERS.filter(m => m.membershipStatus === 'active').length;
  const trialCount  = DUMMY_MEMBERS.filter(m => m.membershipStatus === 'trial').length;

  const filtered = DUMMY_MEMBERS.filter(m => {
    const q = search.toLowerCase();
    const matchQ = m.name.toLowerCase().includes(q) || m.memberId.toLowerCase().includes(q) || m.phone.includes(search);
    const matchF =
      filter === 'all' ||
      (filter === 'active' && m.membershipStatus === 'active') ||
      (filter === 'trial'  && m.membershipStatus === 'trial')  ||
      (filter === 'live'   && m.isLive);
    return matchQ && matchF;
  });

  const filterTabs = [
    { label: 'All',    value: 'all',    count: DUMMY_MEMBERS.length, color: GOLD  },
    { label: 'Active', value: 'active', count: activeCount,          color: GREEN },
    { label: 'Trial',  value: 'trial',  count: trialCount,           color: '#3B82F6' },
    { label: 'Live',   value: 'live',   count: liveCount,            color: GREEN },
  ];

  return (
    <Layout title="ADD TRAINER" onLogout={onLogout}>
      <div className="relative min-h-screen">

        {/* ── Background (same as dashboard) ── */}
        <div className="fixed inset-0 z-0"
          style={{ backgroundImage: `url(${SPLASH_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="fixed inset-0 z-[1]" style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(34,211,238,0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(168,85,247,0.04) 0%, transparent 50%),
            linear-gradient(180deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.96) 40%, #000000 100%)
          `,
        }} />

        <div className="relative z-10 p-8 lg:p-10 space-y-7 max-w-[1400px] mx-auto">

          {/* ═══════════════════════════════════════════════════════ */}
          {/* HEADER                                                 */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <button onClick={() => nav('/trainers')}
                className="group w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{ background: '#000', border: WHITE8 }}>
                <ArrowLeft size={18} className="text-zinc-400 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
              </button>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${CYAN}15, ${CYAN}06)`,
                  border: `1px solid ${CYAN}22`,
                  boxShadow: `0 4px 16px ${CYAN}08`,
                }}>
                <UserPlus size={24} style={{ color: CYAN }} />
              </div>
              <div>
                <p className="font-rajdhani text-[12px] tracking-[0.3em] uppercase font-bold mb-1"
                  style={{ color: CYAN }}>
                  Select Member
                </p>
                <h1 className="font-orbitron text-white font-extrabold text-[28px] tracking-[0.15em]
                               bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  ADD TRAINER
                </h1>
              </div>
            </div>

            {/* Count badge */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
              style={{ background: `${CYAN}10`, border: `1px solid ${CYAN}20` }}>
              <span className="font-orbitron text-[14px] font-bold" style={{ color: CYAN }}>
                {DUMMY_MEMBERS.length}
              </span>
              <span className="font-rajdhani text-zinc-500 text-[11px] tracking-wider">members</span>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* STAT CARDS                                             */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Users}       label="Total Members" value={DUMMY_MEMBERS.length} color={GOLD}  />
            <StatCard icon={Wifi}         label="Live Now"      value={liveCount}             color={GREEN} pulse />
            <StatCard icon={CheckCircle}  label="Active"        value={activeCount}           color={GREEN} />
            <StatCard icon={Dumbbell}     label="Trainers"      value={trainerIds.length}     color={CYAN}  />
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* SEARCH + FILTERS PANEL                                 */}
          {/* ═══════════════════════════════════════════════════════ */}
          <GlassPanel>
            <div className="p-6">
              {/* Search */}
              <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl mb-4 transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${focused ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.08)'}`,
                }}>
                <Search size={16} className={focused ? 'text-white' : 'text-zinc-600'} />
                <input
                  type="text"
                  placeholder="Search by name, member ID or phone..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="flex-1 bg-transparent font-rajdhani text-white text-[13px] tracking-wider
                             outline-none placeholder:text-zinc-700"
                />
                {search && (
                  <button onClick={() => setSearch('')}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/[0.06] transition-colors"
                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                    <X size={12} className="text-zinc-500" />
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="flex items-center gap-2 mr-1">
                  <Filter size={12} className="text-zinc-600" />
                  <span className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.15em] uppercase font-semibold">Filter</span>
                </div>
                {filterTabs.map(f => {
                  const isActive = filter === f.value;
                  return (
                    <button key={f.value} onClick={() => setFilter(f.value)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-[1.03]"
                      style={{
                        background:   isActive ? `${f.color}10` : 'rgba(255,255,255,0.02)',
                        border:       `1px solid ${isActive ? `${f.color}25` : 'rgba(255,255,255,0.06)'}`,
                      }}>
                      <div className="w-1.5 h-1.5 rounded-full transition-all"
                        style={{ backgroundColor: isActive ? f.color : '#3F3F46',
                                 boxShadow: isActive ? `0 0 6px ${f.color}60` : 'none' }} />
                      <span className="font-rajdhani text-[11px] font-bold tracking-[0.12em] uppercase"
                        style={{ color: isActive ? f.color : '#52525B' }}>
                        {f.label}
                      </span>
                      <span className="font-orbitron text-[9px] font-bold"
                        style={{ color: isActive ? `${f.color}CC` : '#3F3F46' }}>
                        {f.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </GlassPanel>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* RESULTS + INFO                                         */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Eye size={12} className="text-zinc-600" />
              <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.12em] uppercase font-medium">
                Showing <span className="text-white font-bold">{filtered.length}</span> of{' '}
                <span className="text-zinc-400">{DUMMY_MEMBERS.length}</span> members
                {search && <span> — "<span className="text-[#22D3EE]">{search}</span>"</span>}
              </p>
            </div>
            {filter !== 'all' && (
              <button onClick={() => setFilter('all')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <X size={10} className="text-zinc-500" />
                <span className="font-rajdhani text-zinc-400 text-[10px] tracking-wider uppercase font-bold">Clear</span>
              </button>
            )}
          </div>

          {/* Info notice */}
          <GlassPanel borderColor={`${CYAN}12`}>
            <div className="p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${CYAN}10`, border: `1px solid ${CYAN}18` }}>
                <Shield size={16} style={{ color: CYAN }} />
              </div>
              <p className="font-rajdhani text-zinc-400 text-[12px] tracking-wide flex-1">
                Tap on any member card to view their profile and assign them as a trainer
              </p>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl flex-shrink-0"
                style={{ background: `${CYAN}10`, border: `1px solid ${CYAN}18` }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: CYAN }} />
                <span className="font-rajdhani text-[9px] tracking-[0.12em] uppercase font-bold" style={{ color: CYAN }}>
                  {trainerIds.length} Assigned
                </span>
              </div>
            </div>
          </GlassPanel>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* MEMBER GRID                                            */}
          {/* ═══════════════════════════════════════════════════════ */}
          {filtered.length === 0 ? (
            <GlassPanel borderColor={`${CYAN}10`}>
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Search size={28} className="text-zinc-800" strokeWidth={1.5} />
                </div>
                <p className="font-orbitron text-zinc-600 text-[14px] tracking-[0.15em] mb-2">NO MEMBERS FOUND</p>
                <p className="font-rajdhani text-zinc-700 text-[12px] tracking-wider mb-5">
                  Try a different search or filter
                </p>
                <button onClick={() => { setSearch(''); setFilter('all'); }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover:scale-105"
                  style={{ background: `${CYAN}08`, border: `1px solid ${CYAN}18` }}>
                  <X size={12} style={{ color: CYAN }} />
                  <span className="font-rajdhani text-[11px] tracking-wider uppercase font-bold" style={{ color: CYAN }}>
                    Clear Filters
                  </span>
                </button>
              </div>
            </GlassPanel>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filtered.map(m => (
                <MemberCard
                  key={m.id}
                  member={m}
                  onPress={member => nav('/trainer-profile', { state: { member } })}
                  isTrainer={trainerIds.includes(m.id)}
                />
              ))}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════ */}
          {/* FOOTER                                                 */}
          {/* ═══════════════════════════════════════════════════════ */}
          <GlassPanel borderColor="rgba(197,160,89,0.10)">
            <div className="p-5 flex items-center gap-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.15)' }}>
                <Dumbbell size={16} className="text-[#C5A059]" />
              </div>
              <div className="flex-1">
                <p className="font-rajdhani text-white text-[12px] font-bold tracking-[0.12em] uppercase mb-0.5">
                  Trainer Assignment
                </p>
                <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.10em] uppercase font-medium">
                  Select a member to assign trainer role · Access is granted immediately
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl flex-shrink-0"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-rajdhani text-green-400 text-[9px] tracking-[0.12em] uppercase font-bold">
                  Live
                </span>
              </div>
            </div>
          </GlassPanel>

        </div>
      </div>
    </Layout>
  );
};

export default AdminAddTrainer;