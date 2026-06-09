// AdminUsersDetail.jsx — DASHBOARD-MATCHING PREMIUM UI
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  Users, Search, Phone, Activity, Dumbbell,
  CheckCircle, AlertCircle, X, Crown, Sparkles,
  Zap, ChevronRight, Filter, Eye, Wifi, UserPlus,
  Star, Flame, Target, Calendar, TrendingUp,
  ArrowUpRight, Clock, Shield, Mail, Hash,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════ */
/* CONFIGS                                                         */
/* ═══════════════════════════════════════════════════════════════ */
const STATUS_CONFIG = {
  active: {
    label: 'ACTIVE', color: '#22C55E',
    icon: CheckCircle, pulse: true,
  },
  expired: {
    label: 'EXPIRED', color: '#EF4444',
    icon: AlertCircle, pulse: false,
  },
  trial: {
    label: 'TRIAL', color: '#3B82F6',
    icon: Zap, pulse: true,
  },
};

const TIER_CONFIG = {
  'ELITE TIER': {
    color: '#C5A059', icon: Crown, short: 'ELITE',
  },
  'LEGENDARY TIER': {
    color: '#A855F7', icon: Sparkles, short: 'LEGENDARY',
  },
};

const DUMMY_MEMBERS = [
  {
    id: '1', name: 'Abdullah Ahmed', avatar: 'AA', memberId: 'GYM001',
    phone: '+91 88171 59218', email: 'abdullah@email.com',
    membershipType: 'ELITE TIER', membershipStatus: 'active',
    workoutType: 'cardio_weights', isLive: true, checkinTime: '06:30 AM',
    lastCheckout: '08:15 AM', duration: '1h 45m', totalVisits: 156,
    currentStreak: 12, joinDate: '2024-01-15', expiryDate: '2025-01-15', paidAmount: 12000,
  },
  {
    id: '2', name: 'Priya Patel', avatar: 'PP', memberId: 'GYM002',
    phone: '+91 98765 43211', email: 'priya@email.com',
    membershipType: 'LEGENDARY TIER', membershipStatus: 'expired',
    workoutType: 'weights_only', isLive: false, checkinTime: null,
    lastCheckout: '05:30 PM', duration: null, totalVisits: 89,
    currentStreak: 0, joinDate: '2024-03-01', expiryDate: '2024-12-01', paidAmount: 8000,
  },
  {
    id: '3', name: 'Rahul Sharma', avatar: 'RS', memberId: 'GYM003',
    phone: '+91 91234 56789', membershipType: 'ELITE TIER',
    membershipStatus: 'trial', workoutType: 'cardio_weights', isLive: true,
    checkinTime: '07:00 AM', lastCheckout: null, duration: '45m',
    totalVisits: 5, currentStreak: 3, joinDate: '2024-12-20',
    expiryDate: '2025-01-03', paidAmount: 0,
  },
  {
    id: '4', name: 'Sara Khan', avatar: 'SK', memberId: 'GYM004',
    phone: '+91 87654 32100', membershipType: 'LEGENDARY TIER',
    membershipStatus: 'active', workoutType: 'weights_only', isLive: false,
    checkinTime: null, lastCheckout: '04:00 PM', duration: null,
    totalVisits: 210, currentStreak: 28, joinDate: '2023-06-15',
    expiryDate: '2025-06-15', paidAmount: 24000,
  },
  {
    id: '5', name: 'Arjun Mehta', avatar: 'AM', memberId: 'GYM005',
    phone: '+91 99887 76655', membershipType: 'ELITE TIER',
    membershipStatus: 'active', workoutType: 'cardio_weights', isLive: true,
    checkinTime: '08:00 AM', lastCheckout: null, duration: '30m',
    totalVisits: 72, currentStreak: 8, joinDate: '2024-06-01',
    expiryDate: '2025-06-01', paidAmount: 12000,
  },
  {
    id: '6', name: 'Meera Joshi', avatar: 'MJ', memberId: 'GYM006',
    phone: '+91 77665 54433', membershipType: 'LEGENDARY TIER',
    membershipStatus: 'trial', workoutType: 'weights_only', isLive: false,
    checkinTime: null, lastCheckout: '06:00 PM', duration: null,
    totalVisits: 2, currentStreak: 2, joinDate: '2024-12-28',
    expiryDate: '2025-01-11', paidAmount: 0,
  },
];

/* ── GlassPanel (SAME as dashboard) ─────────────────────────────── */
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

/* ── PulseDot (SAME as dashboard) ─────────────────────────────── */
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

/* ── StatCard (SAME pattern as dashboard top metrics) ───────────── */
const StatCard = ({ icon: Icon, label, value, color, pulse, change }) => (
  <GlassPanel hover className="group" glow={`${color}08`}>
    <div className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{
            background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
            border: `1px solid ${color}20`,
          }}>
          <Icon size={17} style={{ color }} />
        </div>
        {pulse && <PulseDot color={color} size={6} />}
        {change && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg"
            style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.20)' }}>
            <ArrowUpRight size={10} className="text-green-400" />
            <span className="font-orbitron text-green-400 text-[9px] font-bold">{change}</span>
          </div>
        )}
      </div>
      <p className="font-orbitron text-white font-bold text-[28px] leading-none mb-1
                    transition-all duration-300 group-hover:text-[30px]">
        {value}
      </p>
      <p className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.15em] uppercase font-semibold">
        {label}
      </p>
    </div>
  </GlassPanel>
);

/* ═══════════════════════════════════════════════════════════════ */
/* MEMBER CARD — Premium Dashboard Style                           */
/* ═══════════════════════════════════════════════════════════════ */
const MemberCard = ({ member, onClick }) => {
  const status = STATUS_CONFIG[member.membershipStatus] || STATUS_CONFIG.active;
  const tier = TIER_CONFIG[member.membershipType] || TIER_CONFIG['ELITE TIER'];
  const TierIcon = tier.icon;

  return (
    <GlassPanel
      hover
      onClick={onClick}
      className="group"
      borderColor={member.isLive ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)'}
      glow={member.isLive ? 'rgba(34,197,94,0.04)' : undefined}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-8 right-8 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${tier.color}40, transparent)` }} />

      <div className="p-5">
        <div className="flex items-start gap-4">

          {/* ── Avatar ── */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-orbitron font-bold text-[15px]
                            transition-all duration-300 group-hover:scale-105 group-hover:rotate-3"
              style={{
                background: `linear-gradient(135deg, ${tier.color}15, ${tier.color}05)`,
                border: `1.5px solid ${tier.color}25`,
                color: tier.color,
                boxShadow: `0 4px 16px ${tier.color}08`,
              }}>
              {member.avatar}
            </div>
            {/* Live indicator */}
            {member.isLive && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg flex items-center justify-center"
                style={{ background: '#000', border: '2px solid rgba(34,197,94,0.40)' }}>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
            )}
          </div>

          {/* ── Info ── */}
          <div className="flex-1 min-w-0">
            {/* Row 1: Name + Badges */}
            <div className="flex items-center gap-2.5 mb-2 flex-wrap">
              <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.08em] truncate
                             group-hover:tracking-[0.10em] transition-all">
                {member.name}
              </h3>

              {/* Status badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg flex-shrink-0"
                style={{ background: `${status.color}10`, border: `1px solid ${status.color}20` }}>
                {status.pulse
                  ? <PulseDot color={status.color} size={4} />
                  : <status.icon size={10} style={{ color: status.color }} />}
                <span className="font-orbitron text-[8px] font-bold tracking-[0.12em]"
                  style={{ color: status.color }}>
                  {status.label}
                </span>
              </div>

              {/* Live tag */}
              {member.isLive && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg flex-shrink-0"
                  style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }}>
                  <Wifi size={9} className="text-green-400" />
                  <span className="font-orbitron text-green-400 text-[8px] font-bold tracking-widest">LIVE</span>
                </div>
              )}
            </div>

            {/* Row 2: Tier + Workout + ID */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {/* Tier */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                style={{ background: `${tier.color}08`, border: `1px solid ${tier.color}15` }}>
                <TierIcon size={10} style={{ color: tier.color }} />
                <span className="font-orbitron text-[8px] font-bold tracking-[0.12em]"
                  style={{ color: `${tier.color}CC` }}>
                  {tier.short}
                </span>
              </div>

              {/* Workout type */}
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {member.workoutType === 'cardio_weights'
                  ? <Activity size={10} className="text-cyan-400/70" />
                  : <Dumbbell size={10} className="text-purple-400/70" />}
                <span className="font-rajdhani text-zinc-500 text-[10px] tracking-wider uppercase font-semibold">
                  {member.workoutType === 'cardio_weights' ? 'Cardio + Weights' : 'Weights Only'}
                </span>
              </div>

              {/* Member ID */}
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Hash size={9} className="text-zinc-600" />
                <span className="font-mono text-zinc-500 text-[10px]">{member.memberId}</span>
              </div>
            </div>

            {/* Row 3: Stats bar */}
            <div className="flex items-center gap-4">
              {/* Visits */}
              <div className="flex items-center gap-1.5">
                <Target size={11} className="text-cyan-500/60" />
                <span className="font-orbitron text-zinc-300 text-[11px] font-bold">{member.totalVisits}</span>
                <span className="font-rajdhani text-zinc-600 text-[9px] tracking-wider uppercase">visits</span>
              </div>

              {/* Streak */}
              {member.currentStreak > 0 && (
                <>
                  <div className="w-px h-3 bg-white/[0.06]" />
                  <div className="flex items-center gap-1.5">
                    <Flame size={11} className="text-orange-400/70" />
                    <span className="font-orbitron text-zinc-300 text-[11px] font-bold">{member.currentStreak}</span>
                    <span className="font-rajdhani text-zinc-600 text-[9px] tracking-wider uppercase">streak</span>
                  </div>
                </>
              )}

              {/* Duration (if live) */}
              {member.isLive && member.duration && (
                <>
                  <div className="w-px h-3 bg-white/[0.06]" />
                  <div className="flex items-center gap-1.5">
                    <Clock size={11} className="text-amber-400/70" />
                    <span className="font-orbitron text-amber-400 text-[11px] font-bold">{member.duration}</span>
                  </div>
                </>
              )}

              {/* Phone */}
              <div className="hidden sm:flex items-center gap-1.5 ml-auto">
                <Phone size={10} className="text-green-500/50" />
                <span className="font-rajdhani text-zinc-500 text-[10px] tracking-wider font-medium">
                  {member.phone?.slice(-5)}
                </span>
              </div>
            </div>
          </div>

          {/* ── Right Arrow ── */}
          <div className="flex-shrink-0 flex items-center self-center">
            <ChevronRight size={18}
              className="text-white/10 group-hover:text-white/40 group-hover:translate-x-1 transition-all duration-300"
              style={{ color: `${tier.color}25` }} />
          </div>
        </div>
      </div>
    </GlassPanel>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN COMPONENT                                                  */
/* ═══════════════════════════════════════════════════════════════ */
const AdminUsersDetail = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('members');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredMembers = useMemo(() =>
    DUMMY_MEMBERS.filter(m => {
      const s = search.toLowerCase();
      const matchSearch = m.name.toLowerCase().includes(s) ||
        m.memberId.toLowerCase().includes(s) || m.phone.includes(search);
      const matchFilter =
        filter === 'all' ||
        (filter === 'live' && m.isLive) ||
        (filter === 'active' && m.membershipStatus === 'active') ||
        (filter === 'expired' && m.membershipStatus === 'expired') ||
        (filter === 'trial' && m.membershipStatus === 'trial');
      return matchSearch && matchFilter;
    }),
    [search, filter]
  );

  const liveCount = DUMMY_MEMBERS.filter(m => m.isLive).length;
  const activeCount = DUMMY_MEMBERS.filter(m => m.membershipStatus === 'active').length;
  const expiredCount = DUMMY_MEMBERS.filter(m => m.membershipStatus === 'expired').length;
  const trialCount = DUMMY_MEMBERS.filter(m => m.membershipStatus === 'trial').length;

  const tabs = [
    { id: 'members', label: 'Members', icon: Users, count: DUMMY_MEMBERS.length },
    { id: 'requests', label: 'Requests', icon: UserPlus, count: 3, alert: true },
  ];

  const filters = [
    { id: 'all',     label: 'All',     color: '#C5A059', count: DUMMY_MEMBERS.length },
    { id: 'live',    label: 'Live',    color: '#22C55E', count: liveCount },
    { id: 'active',  label: 'Active',  color: '#22C55E', count: activeCount },
    { id: 'expired', label: 'Expired', color: '#EF4444', count: expiredCount },
    { id: 'trial',   label: 'Trial',   color: '#3B82F6', count: trialCount },
  ];

  return (
    <Layout title="MEMBERS" onLogout={onLogout}>
      <div className="relative min-h-screen">
        {/* Background (same as dashboard) */}
        <div className="fixed inset-0 z-0" style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(234,179,8,0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(168,85,247,0.04) 0%, transparent 50%),
            linear-gradient(180deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.96) 40%, #000000 100%)
          `,
        }} />

        <div className="relative z-10 p-8 lg:p-10 space-y-6 max-w-[1400px] mx-auto">

          {/* ═══════════════════════════════════════════════════════ */}
          {/* HEADER                                                 */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(197,160,89,0.10)',
                  border: '1px solid rgba(197,160,89,0.18)',
                  boxShadow: '0 4px 16px rgba(197,160,89,0.06)',
                }}>
                <Users size={24} className="text-[#C5A059]" />
              </div>
              <div>
                <p className="font-rajdhani text-[#C5A059] text-[12px] tracking-[0.3em] uppercase font-bold mb-1">
                  Directory
                </p>
                <h1 className="font-orbitron text-white font-extrabold text-[28px] tracking-[0.15em]
                               bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  MEMBERS
                </h1>
              </div>
            </div>

            <button onClick={() => navigate('/members/add')}
              className="group flex items-center gap-3 h-12 px-6 rounded-2xl transition-all duration-300
                         hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, rgba(197,160,89,0.15), rgba(197,160,89,0.05))',
                border: '1px solid rgba(197,160,89,0.25)',
                boxShadow: '0 4px 16px rgba(197,160,89,0.08)',
              }}>
              <UserPlus size={16} className="text-[#C5A059] group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-orbitron text-[#C5A059] font-bold text-[11px] tracking-[0.15em]">
                ADD MEMBER
              </span>
            </button>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* STATS ROW (same pattern as dashboard top metrics)       */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Users} label="Total Members" value={DUMMY_MEMBERS.length} color="#C5A059" change="+3" />
            <StatCard icon={Wifi} label="Live Now" value={liveCount} color="#22C55E" pulse />
            <StatCard icon={CheckCircle} label="Active" value={activeCount} color="#22C55E" />
            <StatCard icon={AlertCircle} label="Expired" value={expiredCount} color="#EF4444" />
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* TABS                                                    */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="flex items-center gap-3">
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className="group flex items-center gap-2.5 px-5 py-3 rounded-2xl transition-all duration-300
                             hover:scale-[1.02]"
                  style={{
                    background: isActive ? 'rgba(197,160,89,0.10)' : '#000000',
                    border: `1px solid ${isActive ? 'rgba(197,160,89,0.22)' : 'rgba(255,255,255,0.06)'}`,
                  }}>
                  <tab.icon size={15} style={{ color: isActive ? '#C5A059' : '#52525B' }} />
                  <span className="font-rajdhani text-[12px] font-bold tracking-[0.12em] uppercase"
                    style={{ color: isActive ? '#C5A059' : '#71717A' }}>
                    {tab.label}
                  </span>
                  <span className="font-orbitron text-[10px] font-bold px-2 py-0.5 rounded-lg"
                    style={{
                      background: isActive ? 'rgba(197,160,89,0.15)' : 'rgba(255,255,255,0.03)',
                      color: isActive ? '#C5A059' : '#52525B',
                      border: `1px solid ${isActive ? 'rgba(197,160,89,0.20)' : 'rgba(255,255,255,0.05)'}`,
                    }}>
                    {tab.count}
                  </span>
                  {tab.alert && tab.count > 0 && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* MEMBERS TAB CONTENT                                    */}
          {/* ═══════════════════════════════════════════════════════ */}
          {activeTab === 'members' && (
            <div className="space-y-5">

              {/* ── Search & Filters Panel ── */}
              <GlassPanel>
                <div className="p-6">
                  {/* Search */}
                  <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl mb-4 transition-all duration-300
                                  focus-within:border-[rgba(197,160,89,0.25)]"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Search size={16} className="text-zinc-600 flex-shrink-0" />
                    <input
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search by name, member ID, phone number..."
                      className="flex-1 bg-transparent text-white font-rajdhani text-[13px] tracking-wider
                                 outline-none placeholder:text-zinc-700"
                    />
                    {search && (
                      <button onClick={() => setSearch('')}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/[0.05] transition-colors"
                        style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                        <X size={12} className="text-zinc-500" />
                      </button>
                    )}
                  </div>

                  {/* Filters */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <div className="flex items-center gap-2 mr-1">
                      <Filter size={12} className="text-zinc-600" />
                      <span className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.15em] uppercase font-semibold">
                        Filter
                      </span>
                    </div>

                    {filters.map(f => {
                      const isActive = filter === f.id;
                      return (
                        <button key={f.id} onClick={() => setFilter(f.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300
                                     hover:scale-[1.03]"
                          style={{
                            background: isActive ? `${f.color}10` : 'rgba(255,255,255,0.02)',
                            border: `1px solid ${isActive ? `${f.color}25` : 'rgba(255,255,255,0.06)'}`,
                          }}>
                          <div className="w-1.5 h-1.5 rounded-full transition-all"
                            style={{
                              backgroundColor: isActive ? f.color : '#3F3F46',
                              boxShadow: isActive ? `0 0 6px ${f.color}60` : 'none',
                            }} />
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

              {/* ── Results Count ── */}
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <Eye size={12} className="text-zinc-600" />
                  <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.12em] uppercase font-medium">
                    Showing <span className="text-white font-bold">{filteredMembers.length}</span> of{' '}
                    <span className="text-zinc-400">{DUMMY_MEMBERS.length}</span> members
                    {search && (
                      <span> — "<span className="text-[#C5A059]">{search}</span>"</span>
                    )}
                  </p>
                </div>
                {filter !== 'all' && (
                  <button onClick={() => setFilter('all')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <X size={10} className="text-zinc-500" />
                    <span className="font-rajdhani text-zinc-400 text-[10px] tracking-wider uppercase font-bold">
                      Clear
                    </span>
                  </button>
                )}
              </div>

              {/* ── Members List ── */}
              {filteredMembers.length === 0 ? (
                <GlassPanel>
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}>
                      <Search size={28} className="text-zinc-800" strokeWidth={1.5} />
                    </div>
                    <p className="font-orbitron text-zinc-600 text-[14px] tracking-[0.15em] mb-2">
                      NO RESULTS FOUND
                    </p>
                    <p className="font-rajdhani text-zinc-700 text-[12px] tracking-wider max-w-xs text-center">
                      Try a different search term or adjust your filters
                    </p>
                    <button onClick={() => { setSearch(''); setFilter('all'); }}
                      className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover:scale-105"
                      style={{ background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.18)' }}>
                      <X size={12} className="text-[#C5A059]" />
                      <span className="font-rajdhani text-[#C5A059] text-[11px] tracking-wider uppercase font-bold">
                        Clear All Filters
                      </span>
                    </button>
                  </div>
                </GlassPanel>
              ) : (
                <div className="space-y-3">
                  {filteredMembers.map(member => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      onClick={() => navigate('/member-profile', { state: { member } })}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════ */}
          {/* REQUESTS TAB                                           */}
          {/* ═══════════════════════════════════════════════════════ */}
          {activeTab === 'requests' && (
            <GlassPanel borderColor="rgba(197,160,89,0.12)">
              <div className="py-20 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
                  style={{
                    background: 'rgba(197,160,89,0.06)',
                    border: '1px solid rgba(197,160,89,0.15)',
                  }}>
                  <UserPlus size={36} className="text-[#C5A059]/30" strokeWidth={1.5} />
                </div>
                <h3 className="font-orbitron text-white font-bold text-[18px] tracking-[0.15em] mb-2">
                  3 PENDING REQUESTS
                </h3>
                <p className="font-rajdhani text-zinc-500 text-[12px] tracking-wider max-w-sm text-center mb-6">
                  New membership applications awaiting your review and approval
                </p>
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
                  style={{ background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.18)' }}>
                  <Star size={13} className="text-[#C5A059]" />
                  <span className="font-rajdhani text-[#C5A059] text-[11px] tracking-[0.15em] uppercase font-bold">
                    Coming Soon
                  </span>
                </div>
              </div>
            </GlassPanel>
          )}

          {/* ═══════════════════════════════════════════════════════ */}
          {/* FOOTER INFO                                            */}
          {/* ═══════════════════════════════════════════════════════ */}
          <GlassPanel borderColor="rgba(197,160,89,0.10)">
            <div className="p-5 flex items-center gap-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.15)' }}>
                <Shield size={16} className="text-[#C5A059]" />
              </div>
              <div className="flex-1">
                <p className="font-rajdhani text-white text-[12px] font-bold tracking-[0.12em] uppercase mb-0.5">
                  Member Data Protected
                </p>
                <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.1em] uppercase font-medium">
                  All member information is encrypted and stored securely · Click any member for full profile
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl flex-shrink-0"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-rajdhani text-green-400 text-[9px] tracking-[0.12em] uppercase font-bold">
                  Secured
                </span>
              </div>
            </div>
          </GlassPanel>

        </div>
      </div>
    </Layout>
  );
};

export default AdminUsersDetail;