// AdminUsersDetail.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  Users, Search, Phone, Shield, Activity, Dumbbell,
  CheckCircle, AlertCircle, Clock, X, Crown, Sparkles,
  Zap, ChevronRight, Filter, Eye, Wifi, UserPlus,
  Package, Star, Timer, Flame, ArrowUpRight,
  TrendingUp, Grid3X3, UserCheck, Bell, Target,
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
    gradient: 'linear-gradient(135deg, rgba(197,160,89,0.08) 0%, rgba(197,160,89,0.01) 100%)',
    borderColor: 'rgba(197,160,89,0.15)',
    glowColor: 'rgba(197,160,89,0.06)',
  },
  'LEGENDARY TIER': {
    color: '#A855F7', icon: Sparkles,
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(168,85,247,0.01) 100%)',
    borderColor: 'rgba(168,85,247,0.15)',
    glowColor: 'rgba(168,85,247,0.06)',
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
];

/* ── Pulse Dot ── */
const PulseDot = ({ color = '#22C55E', size = 5 }) => (
  <div className="relative flex items-center justify-center" style={{ width: size * 3, height: size * 3 }}>
    <span className="absolute rounded-full animate-ping opacity-30"
      style={{ width: size * 2.5, height: size * 2.5, backgroundColor: color }} />
    <span className="relative rounded-full"
      style={{ width: size, height: size, backgroundColor: color, boxShadow: `0 0 ${size * 2}px ${color}60` }} />
  </div>
);

/* ── Panel ── */
const Panel = ({ children, className = '', borderColor, glow }) => (
  <div className={`relative rounded-2xl overflow-hidden ${className}`}
    style={{
      background: '#000000',
      border: `1px solid ${borderColor || 'rgba(255,255,255,0.07)'}`,
      boxShadow: glow ? `0 6px 24px ${glow}` : 'none',
    }}>
    {children}
  </div>
);

/* ── Compact Stat ── */
const StatMini = ({ icon: Icon, label, value, color, pulse }) => (
  <Panel>
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${color}10`, border: `1px solid ${color}18` }}>
          <Icon size={14} style={{ color }} />
        </div>
        {pulse && <PulseDot color={color} size={5} />}
      </div>
      <p className="font-orbitron text-white font-bold text-[20px] leading-none mb-0.5">{value}</p>
      <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.15em] uppercase font-semibold">{label}</p>
    </div>
  </Panel>
);

/* ═══════════════════════════════════════════════════════════════ */
/* COMPACT MEMBER CARD                                             */
/* ═══════════════════════════════════════════════════════════════ */
const MemberCard = ({ member, onClick }) => {
  const status = STATUS_CONFIG[member.membershipStatus] || STATUS_CONFIG.active;
  const tier = TIER_CONFIG[member.membershipType] || TIER_CONFIG['ELITE TIER'];
  const TierIcon = tier.icon;
  const StatusIcon = status.icon;

  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer
                 transition-all duration-300 hover:scale-[1.005] active:scale-[0.995]"
      style={{
        background: '#000000',
        border: `1px solid rgba(255,255,255,0.06)`,
      }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-6 right-6 h-[1.5px] opacity-30 group-hover:opacity-80 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${tier.color}50, transparent)` }} />

      {/* BG */}
      <div className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity"
        style={{ background: tier.gradient }} />

      <div className="relative px-4 py-3.5 flex items-center gap-3.5">

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center font-orbitron font-bold text-white text-[13px]
                          transition-all duration-300 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${tier.color}18, ${tier.color}06)`,
              border: `1.5px solid ${tier.color}25`,
            }}>
            {member.avatar}
          </div>
          {member.isLive && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-md flex items-center justify-center"
              style={{ background: 'rgba(34,197,94,0.20)', border: '1px solid rgba(34,197,94,0.35)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* Row 1: Name + Status */}
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="font-orbitron text-white font-bold text-[12px] tracking-[0.06em] truncate">
              {member.name}
            </h3>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md flex-shrink-0"
              style={{ background: status.bg, border: `1px solid ${status.border}` }}>
              {status.pulse
                ? <PulseDot color={status.color} size={3.5} />
                : <StatusIcon size={8} style={{ color: status.color }} />}
              <span className="font-orbitron text-[7px] font-bold tracking-[0.1em]"
                style={{ color: status.color }}>{status.label}</span>
            </div>
          </div>

          {/* Row 2: Tier + Workout + Quick Stats */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Tier chip */}
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md"
              style={{ background: `${tier.color}08`, border: `1px solid ${tier.color}15` }}>
              <TierIcon size={8} style={{ color: tier.color }} />
              <span className="font-orbitron text-[7px] font-bold tracking-[0.1em]"
                style={{ color: `${tier.color}CC` }}>
                {tier.color === '#C5A059' ? 'ELITE' : 'LEGENDARY'}
              </span>
            </div>

            {/* Workout */}
            <div className="flex items-center gap-1">
              {member.workoutType === 'cardio_weights'
                ? <Activity size={9} style={{ color: `${tier.color}80` }} />
                : <Dumbbell size={9} style={{ color: `${tier.color}80` }} />}
              <span className="font-rajdhani text-zinc-600 text-[9px] tracking-[0.08em] uppercase font-semibold">
                {member.workoutType === 'cardio_weights' ? 'C+W' : 'Weights'}
              </span>
            </div>

            {/* Separator */}
            <div className="w-px h-3 bg-white/[0.06]" />

            {/* Visits */}
            <div className="flex items-center gap-1">
              <Target size={9} className="text-cyan-500/60" />
              <span className="font-orbitron text-zinc-400 text-[9px] font-bold">{member.totalVisits || 0}</span>
            </div>

            {/* Streak */}
            {member.currentStreak > 0 && (
              <div className="flex items-center gap-0.5">
                <Flame size={9} className="text-orange-400/70" />
                <span className="font-orbitron text-zinc-400 text-[9px] font-bold">{member.currentStreak}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Phone + Arrow */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Phone size={10} className="text-green-400/60" />
            <span className="font-rajdhani text-zinc-500 text-[10px] tracking-wider font-medium">
              {member.phone?.slice(-5)}
            </span>
          </div>

          <span className="font-orbitron text-[8px] tracking-wider px-1.5 py-0.5 rounded-md"
            style={{ color: `${tier.color}50`, background: `${tier.color}05`, border: `1px solid ${tier.color}10` }}>
            {member.memberId}
          </span>

          <ChevronRight size={14}
            className="text-white/10 group-hover:text-white/30 group-hover:translate-x-0.5 transition-all"
            style={{ color: `${tier.color}30` }} />
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN                                                            */
/* ═══════════════════════════════════════════════════════════════ */
const AdminUsersDetail = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('members');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredMembers = DUMMY_MEMBERS.filter((m) => {
    const s = search.toLowerCase();
    const matchesSearch = m.name.toLowerCase().includes(s) ||
      m.memberId.toLowerCase().includes(s) || m.phone.includes(search);
    const matchesFilter =
      filter === 'all' ||
      (filter === 'live' && m.isLive) ||
      (filter === 'active' && m.membershipStatus === 'active') ||
      (filter === 'expired' && m.membershipStatus === 'expired') ||
      (filter === 'trial' && m.membershipStatus === 'trial');
    return matchesSearch && matchesFilter;
  });

  const liveCount = DUMMY_MEMBERS.filter((m) => m.isLive).length;
  const activeCount = DUMMY_MEMBERS.filter((m) => m.membershipStatus === 'active').length;
  const expiredCount = DUMMY_MEMBERS.filter((m) => m.membershipStatus === 'expired').length;

  const handleMemberClick = (member) => {
    navigate('/member-profile', { state: { member } });
  };

  const tabs = [
    { id: 'members', label: 'Members', icon: Users, count: DUMMY_MEMBERS.length },
    { id: 'requests', label: 'Requests', icon: UserPlus, count: 3 },
  ];

  const filters = [
    { id: 'all', label: 'All', color: '#C5A059' },
    { id: 'live', label: 'Live', color: '#22C55E' },
    { id: 'active', label: 'Active', color: '#22C55E' },
    { id: 'expired', label: 'Expired', color: '#EF4444' },
    { id: 'trial', label: 'Trial', color: '#3B82F6' },
  ];

  return (
    <Layout title="MEMBERS" onLogout={onLogout}>
      <div className="min-h-screen bg-black">

        {/* ── Header ── */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(197,160,89,0.10)', border: '1px solid rgba(197,160,89,0.15)' }}>
                  <Users size={17} className="text-[#C5A059]" />
                </div>
                <div>
                  <h1 className="font-orbitron text-white font-bold text-[16px] tracking-[0.12em]">
                    MEMBERS
                  </h1>
                  <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.12em] uppercase font-medium">
                    Directory & management
                  </p>
                </div>
              </div>

              <button onClick={() => navigate('/members/add')}
                className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl transition-all duration-300
                           hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, rgba(197,160,89,0.18), rgba(197,160,89,0.06))',
                  border: '1px solid rgba(197,160,89,0.25)',
                }}>
                <UserPlus size={14} className="text-[#C5A059] group-hover:rotate-12 transition-transform" />
                <span className="font-orbitron text-[#C5A059] font-bold text-[10px] tracking-[0.12em]">ADD MEMBER</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-4 gap-3">
            <StatMini icon={Users} label="Total" value={DUMMY_MEMBERS.length} color="#C5A059" />
            <StatMini icon={Wifi} label="Live" value={liveCount} color="#22C55E" pulse />
            <StatMini icon={CheckCircle} label="Active" value={activeCount} color="#22C55E" />
            <StatMini icon={AlertCircle} label="Expired" value={expiredCount} color="#EF4444" />
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="px-6 pt-4 pb-3">
          <div className="flex items-center gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
                  style={{
                    background: isActive ? 'rgba(197,160,89,0.10)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isActive ? 'rgba(197,160,89,0.22)' : 'rgba(255,255,255,0.05)'}`,
                  }}>
                  <TabIcon size={12} style={{ color: isActive ? '#C5A059' : '#52525b' }} />
                  <span className="font-rajdhani text-[11px] font-bold tracking-[0.1em] uppercase"
                    style={{ color: isActive ? '#C5A059' : '#71717a' }}>{tab.label}</span>
                  <span className="font-orbitron text-[9px] font-bold px-1.5 py-0.5 rounded"
                    style={{
                      background: isActive ? 'rgba(197,160,89,0.12)' : 'rgba(255,255,255,0.03)',
                      color: isActive ? '#C5A059' : '#52525b',
                    }}>{tab.count}</span>
                  {tab.id === 'requests' && tab.count > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === 'members' && (
          <>
            {/* ── Search + Filters ── */}
            <div className="px-6 pb-2">
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl mb-3 transition-all
                              focus-within:border-[#C5A059]/25"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <Search size={14} className="text-zinc-600 flex-shrink-0" />
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name, ID, phone..."
                  className="flex-1 bg-transparent text-white font-rajdhani text-[12px] tracking-wider
                             outline-none placeholder:text-zinc-700" />
                {search && (
                  <button onClick={() => setSearch('')}
                    className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/[0.05]">
                    <X size={12} className="text-zinc-500" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Filter size={11} className="text-zinc-700 mr-0.5" />
                {filters.map((f) => {
                  const isActive = filter === f.id;
                  return (
                    <button key={f.id} onClick={() => setFilter(f.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200"
                      style={{
                        background: isActive ? `${f.color}10` : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${isActive ? `${f.color}22` : 'rgba(255,255,255,0.05)'}`,
                      }}>
                      <div className="w-1 h-1 rounded-full" style={{
                        backgroundColor: isActive ? f.color : '#3f3f46',
                        boxShadow: isActive ? `0 0 4px ${f.color}60` : 'none',
                      }} />
                      <span className="font-rajdhani text-[10px] font-bold tracking-[0.1em] uppercase"
                        style={{ color: isActive ? f.color : '#52525b' }}>{f.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Result Count ── */}
            <div className="px-6 py-2">
              <p className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.1em] uppercase">
                Showing <span className="text-white font-bold">{filteredMembers.length}</span> of{' '}
                <span className="text-zinc-400">{DUMMY_MEMBERS.length}</span> members
                {search && <> — "<span className="text-[#C5A059]">{search}</span>"</>}
              </p>
            </div>

            {/* ── Members List ── */}
            <div className="px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 380px)' }}>
              {filteredMembers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 border border-white/[0.06]"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <Search size={24} className="text-zinc-800" strokeWidth={1} />
                  </div>
                  <p className="font-orbitron text-zinc-700 text-[12px] tracking-[0.12em]">NO RESULTS</p>
                  <p className="font-rajdhani text-zinc-800 text-[10px] tracking-[0.08em] mt-1">
                    Try different search or filter
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredMembers.map((member) => (
                    <MemberCard key={member.id} member={member}
                      onClick={() => handleMemberClick(member)} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ── Requests Tab ── */}
        {activeTab === 'requests' && (
          <div className="px-6 py-14">
            <div className="flex flex-col items-center justify-center">
              <div className="w-18 h-18 rounded-2xl flex items-center justify-center mb-5 border border-white/[0.06]"
                style={{ background: 'rgba(197,160,89,0.05)' }}>
                <UserPlus size={32} className="text-[#C5A059]/30" strokeWidth={1} />
              </div>
              <h3 className="font-orbitron text-white font-bold text-[15px] tracking-[0.12em] mb-1.5">
                3 PENDING
              </h3>
              <p className="font-rajdhani text-zinc-600 text-[11px] tracking-[0.08em] text-center max-w-xs">
                New membership requests awaiting approval
              </p>
              <div className="mt-4 px-4 py-2 rounded-lg"
                style={{ background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.15)' }}>
                <span className="font-rajdhani text-[#C5A059] text-[10px] tracking-[0.1em] uppercase font-bold">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminUsersDetail;