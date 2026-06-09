import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  ArrowLeft, Search, X, Clock, LogIn,
  Phone, Shield, Activity, Dumbbell,
  CheckCircle, AlertCircle, Timer, Users,
} from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────
const TIER_TEMPLATES = {
  'ELITE TIER': {
    badge: 'ELITE',
    iconColor: '#C5A059',
    textColor: '#C5A059',
    subtitle: 'Cardio + Weight Lifting',
  },
  'LEGENDARY TIER': {
    badge: 'LEGENDARY',
    iconColor: '#a855f7',
    textColor: '#c084fc',
    subtitle: 'Weight Lifting Only',
  },
};

const MEMBERSHIP_STATUS = {
  active: { label: 'ACTIVE', color: '#22C55E', icon: CheckCircle },
  expired: { label: 'EXPIRED', color: '#EF4444', icon: AlertCircle },
  trial: { label: 'TRIAL', color: '#3B82F6', icon: Timer },
};

const LIVE_MEMBERS = [
  {
    id: '1', name: 'Abdullah Ahmed',
    membershipType: 'ELITE TIER', membershipStatus: 'active',
    workoutType: 'cardio_weights', duration: '45 min',
    checkinTime: '6:30 AM', avatar: 'AA',
    memberId: 'GYM001', phone: '+91 88171 59218',
    daysLeft: 25, expiryDate: '2025-02-15',
    joinDate: '2024-01-15', email: 'abdullah@example.com',
    totalVisits: 156, currentStreak: 12,
    lastCheckout: '8:15 AM', lastVisitDate: 'Today',
    isLive: true, paidAmount: 2500,
  },
  {
    id: '2', name: 'Priya Patel',
    membershipType: 'LEGENDARY TIER', membershipStatus: 'expired',
    workoutType: 'weights_only', duration: '32 min',
    checkinTime: '6:45 AM', avatar: 'PP',
    memberId: 'GYM002', phone: '+91 98765 43211',
    daysLeft: 0, expiryDate: '2025-01-10',
    joinDate: '2024-03-10', email: 'priya@example.com',
    totalVisits: 89, currentStreak: 0,
    lastCheckout: null, lastVisitDate: 'Today',
    isLive: true, paidAmount: 3500,
  },
  {
    id: '3', name: 'Rahul Verma',
    membershipType: null, membershipStatus: 'trial',
    workoutType: 'cardio_weights', duration: '58 min',
    checkinTime: '6:15 AM', avatar: 'RV',
    memberId: 'GYM003', phone: '+91 98765 43212',
    daysLeft: 5, expiryDate: '2025-01-25',
    joinDate: '2025-01-15', email: 'rahul@example.com',
    totalVisits: 5, currentStreak: 5,
    lastCheckout: null, lastVisitDate: 'Today',
    isLive: true, paidAmount: 0,
  },
  {
    id: '4', name: 'Sneha Gupta',
    membershipType: 'LEGENDARY TIER', membershipStatus: 'active',
    workoutType: 'weights_only', duration: '40 min',
    checkinTime: '6:50 AM', avatar: 'SG',
    memberId: 'GYM004', phone: '+91 98765 43213',
    daysLeft: 45, expiryDate: '2025-03-05',
    joinDate: '2024-06-01', email: 'sneha@example.com',
    totalVisits: 210, currentStreak: 28,
    lastCheckout: null, lastVisitDate: 'Today',
    isLive: true, paidAmount: 3500,
  },
  {
    id: '5', name: 'Vikram Singh',
    membershipType: 'ELITE TIER', membershipStatus: 'expired',
    workoutType: 'cardio_weights', duration: '25 min',
    checkinTime: '7:00 AM', avatar: 'VS',
    memberId: 'GYM005', phone: '+91 98765 43214',
    daysLeft: 0, expiryDate: '2025-01-05',
    joinDate: '2024-02-20', email: 'vikram@example.com',
    totalVisits: 67, currentStreak: 0,
    lastCheckout: null, lastVisitDate: 'Today',
    isLive: true, paidAmount: 2500,
  },
  {
    id: '6', name: 'Ananya Reddy',
    membershipType: null, membershipStatus: 'trial',
    workoutType: 'weights_only', duration: '50 min',
    checkinTime: '6:20 AM', avatar: 'AR',
    memberId: 'GYM006', phone: '+91 98765 43215',
    daysLeft: 3, expiryDate: '2025-01-23',
    joinDate: '2025-01-17', email: 'ananya@example.com',
    totalVisits: 3, currentStreak: 3,
    lastCheckout: null, lastVisitDate: 'Today',
    isLive: true, paidAmount: 0,
  },
  {
    id: '7', name: 'Karan Malhotra',
    membershipType: 'ELITE TIER', membershipStatus: 'active',
    workoutType: 'cardio_weights', duration: '35 min',
    checkinTime: '6:40 AM', avatar: 'KM',
    memberId: 'GYM007', phone: '+91 98765 43216',
    daysLeft: 60, expiryDate: '2025-03-20',
    joinDate: '2024-05-15', email: 'karan@example.com',
    totalVisits: 178, currentStreak: 22,
    lastCheckout: null, lastVisitDate: 'Today',
    isLive: true, paidAmount: 2500,
  },
  {
    id: '8', name: 'Meera Iyer',
    membershipType: 'LEGENDARY TIER', membershipStatus: 'expired',
    workoutType: 'weights_only', duration: '55 min',
    checkinTime: '6:10 AM', avatar: 'MI',
    memberId: 'GYM008', phone: '+91 98765 43217',
    daysLeft: 0, expiryDate: '2025-01-08',
    joinDate: '2024-04-01', email: 'meera@example.com',
    totalVisits: 134, currentStreak: 0,
    lastCheckout: null, lastVisitDate: 'Today',
    isLive: true, paidAmount: 3500,
  },
  {
    id: '9', name: 'Aditya Kumar',
    membershipType: 'ELITE TIER', membershipStatus: 'active',
    workoutType: 'cardio_weights', duration: '28 min',
    checkinTime: '6:55 AM', avatar: 'AK',
    memberId: 'GYM009', phone: '+91 98765 43218',
    daysLeft: 15, expiryDate: '2025-02-05',
    joinDate: '2024-08-10', email: 'aditya@example.com',
    totalVisits: 95, currentStreak: 8,
    lastCheckout: null, lastVisitDate: 'Today',
    isLive: true, paidAmount: 2500,
  },
  {
    id: '10', name: 'Riya Chopra',
    membershipType: null, membershipStatus: 'trial',
    workoutType: 'weights_only', duration: '42 min',
    checkinTime: '6:35 AM', avatar: 'RC',
    memberId: 'GYM010', phone: '+91 98765 43219',
    daysLeft: 7, expiryDate: '2025-01-27',
    joinDate: '2025-01-13', email: 'riya@example.com',
    totalVisits: 7, currentStreak: 7,
    lastCheckout: null, lastVisitDate: 'Today',
    isLive: true, paidAmount: 0,
  },
];

const FILTER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Elite', value: 'ELITE TIER' },
  { label: 'Legendary', value: 'LEGENDARY TIER' },
  { label: 'Active', value: 'status_active' },
  { label: 'Expired', value: 'status_expired' },
  { label: 'Trial', value: 'status_trial' },
];

const getAvgSession = () => {
  const avg = Math.round(
    LIVE_MEMBERS.reduce(
      (sum, m) => sum + parseInt(m.duration.replace(/[^0-9]/g, '')), 0
    ) / LIVE_MEMBERS.length
  );
  return `${avg}m`;
};

// ── Member Card ────────────────────────────────────────────────
const MemberCard = ({ member, onClick }) => {
  const isTrial = member.membershipStatus === 'trial';
  const tier = isTrial ? null : TIER_TEMPLATES[member.membershipType];
  const status = MEMBERSHIP_STATUS[member.membershipStatus];
  const accentColor = isTrial ? '#3B82F6' : tier?.iconColor || '#EAB308';
  const StatusIcon = status.icon;

  return (
    <div
      onClick={() => onClick(member)}
      className="relative rounded-2xl bg-black border overflow-hidden
                 hover:border-white/20 transition-all cursor-pointer
                 active:scale-[0.98]"
      style={{ borderColor: `${accentColor}25` }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100
                   transition-opacity pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${accentColor}08, transparent)`,
        }}
      />

      {/* BG Icon */}
      <div className="absolute -top-3 -right-3 pointer-events-none opacity-50">
        <Shield
          size={70}
          strokeWidth={0.5}
          style={{ color: `${accentColor}15` }}
        />
      </div>

      <div className="relative p-4">
        {/* Top Row */}
        <div className="flex items-start gap-3 mb-3">

          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center
                         font-orbitron font-bold text-sm text-white border-2"
              style={{
                backgroundColor: `${accentColor}15`,
                borderColor: `${accentColor}40`,
              }}
            >
              {member.avatar}
            </div>
            {/* Live dot */}
            <div
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5
                         rounded-full bg-green-500 border-2 border-black"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">

            {/* Badges */}
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              {!isTrial && tier && (
                <div
                  className="inline-flex items-center gap-1 px-1.5 py-0.5
                             rounded text-xs font-rajdhani font-semibold
                             tracking-wider border"
                  style={{
                    borderColor: `${tier.iconColor}35`,
                    color: '#a1a1aa',
                  }}
                >
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: tier.iconColor }}
                  />
                  {tier.badge}
                </div>
              )}

              <div
                className="inline-flex items-center gap-1 px-1.5 py-0.5
                           rounded text-xs font-rajdhani font-semibold
                           tracking-wider border"
                style={{
                  borderColor: `${status.color}30`,
                  color: '#a1a1aa',
                }}
              >
                <StatusIcon
                  size={8}
                  style={{ color: status.color }}
                />
                {status.label}
              </div>

              <div className="ml-auto inline-flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="font-orbitron text-green-500 text-[10px] font-bold">
                  LIVE
                </span>
              </div>
            </div>

            {/* Name */}
            <h3 className="font-orbitron text-white font-bold text-sm tracking-wide truncate">
              {member.name}
            </h3>

            {/* Workout Badge */}
            {!isTrial && (
              <div
                className="inline-flex items-center gap-1 px-1.5 py-0.5
                           rounded mt-1"
                style={{ backgroundColor: `${accentColor}12` }}
              >
                {member.workoutType === 'cardio_weights'
                  ? <Activity size={8} style={{ color: accentColor }} />
                  : <Dumbbell size={8} style={{ color: accentColor }} />
                }
                <span
                  className="font-rajdhani font-semibold text-[10px]
                             tracking-widest uppercase"
                  style={{ color: accentColor }}
                >
                  {member.workoutType === 'cardio_weights'
                    ? 'CARDIO + WEIGHTS'
                    : 'WEIGHTS ONLY'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Time Row */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1.5">
            <LogIn size={11} className="text-green-400" />
            <span className="font-orbitron text-white text-xs">
              {member.checkinTime}
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-1.5">
            <Clock size={11} style={{ color: accentColor }} />
            <span className="font-orbitron text-white text-xs">
              {member.duration}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-3"
          style={{ backgroundColor: `${accentColor}20` }}
        />

        {/* Bottom */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}12` }}
            >
              <Phone size={12} style={{ color: accentColor }} />
            </div>
            <span className="font-orbitron text-white text-xs">
              {member.phone}
            </span>
          </div>
          <span className="font-rajdhani text-zinc-600 text-xs tracking-widest">
            {member.memberId}
          </span>
        </div>
      </div>
    </div>
  );
};

// ── Main ───────────────────────────────────────────────────────
const AdminLiveRoster = ({ onLogout }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  //  Member card click handler
  const handleMemberClick = (member) => {
    navigate('/member-view', { state: { member } });
  };

  const filtered = LIVE_MEMBERS.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.memberId.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search);

    if (filter === 'all') return matchesSearch;
    if (filter.startsWith('status_'))
      return matchesSearch &&
        m.membershipStatus === filter.replace('status_', '');
    return matchesSearch && m.membershipType === filter;
  });

  const eliteCount = LIVE_MEMBERS.filter(
    (m) => m.membershipType === 'ELITE TIER'
  ).length;
  const legendaryCount = LIVE_MEMBERS.filter(
    (m) => m.membershipType === 'LEGENDARY TIER'
  ).length;
  const expiredCount = LIVE_MEMBERS.filter(
    (m) => m.membershipStatus === 'expired'
  ).length;
  const trialCount = LIVE_MEMBERS.filter(
    (m) => m.membershipStatus === 'trial'
  ).length;

  return (
    <Layout title="LIVE ROSTER" onLogout={onLogout}>
      <div className="flex flex-col h-full overflow-hidden">

        {/* ── Top Stats Bar ── */}
        <div className="px-8 py-4 border-b border-white/5">
          <div className="flex items-center gap-6">

            {/* Back */}
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-zinc-500
                         hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="font-rajdhani font-semibold text-sm
                               tracking-widest uppercase">
                Dashboard
              </span>
            </button>

            {/* Live Count */}
            <div className="flex items-center gap-4 px-5 py-3
                            rounded-2xl border border-green-500/20 bg-black">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-green-500/30
                                absolute inset-0 animate-ping" />
                <div className="w-3 h-3 rounded-full bg-green-500/60 relative" />
              </div>
              <div>
                <span className="font-orbitron text-white font-bold text-2xl">
                  {LIVE_MEMBERS.length}
                </span>
                <span className="font-rajdhani text-zinc-500 text-xs
                                 tracking-widest uppercase ml-2">
                  Live Now
                </span>
              </div>

              <div className="w-px h-8 bg-white/8 mx-2" />

              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#C5A059]" />
                <span className="font-orbitron text-white font-bold text-lg">
                  {getAvgSession()}
                </span>
                <span className="font-rajdhani text-zinc-500 text-xs uppercase">
                  AVG
                </span>
              </div>

              <div className="w-px h-8 bg-white/8 mx-2" />

              <div className="flex gap-2">
                {[
                  { color: '#C5A059', count: eliteCount },
                  { color: '#a855f7', count: legendaryCount },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-2 py-1
                               rounded-lg border border-white/8"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: t.color }}
                    />
                    <span className="font-orbitron text-zinc-300 text-xs font-bold">
                      {t.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Pills */}
            <div className="flex gap-3 ml-auto">
              {[
                { label: 'Expired', count: expiredCount, color: '#EF4444' },
                { label: 'Trial', count: trialCount, color: '#3B82F6' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 px-3 py-2
                             rounded-xl border"
                  style={{ borderColor: `${s.color}20` }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="font-rajdhani text-zinc-500 text-xs
                                   tracking-widest uppercase">
                    {s.label}
                  </span>
                  <span
                    className="font-orbitron font-bold text-sm"
                    style={{ color: s.color }}
                  >
                    {s.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Search + Filters ── */}
        <div className="flex items-center gap-4 px-8 py-3 border-b border-white/5">

          {/* Search */}
          <div className="flex items-center gap-2 flex-1 max-w-sm px-4 py-2
                          rounded-xl bg-white/3 border border-white/8
                          focus-within:border-white/15 transition-all">
            <Search size={15} className="text-zinc-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, ID, or phone..."
              className="flex-1 bg-transparent font-rajdhani text-white
                         text-sm tracking-wide outline-none
                         placeholder:text-zinc-600"
            />
            {search && (
              <button onClick={() => setSearch('')}>
                <X size={13} className="text-zinc-500" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {FILTER_OPTIONS.map((opt) => {
              const isActive = filter === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setFilter(opt.value)}
                  className="px-3 py-1.5 rounded-full text-xs font-rajdhani
                             font-semibold tracking-widest uppercase border
                             transition-all"
                  style={{
                    borderColor: isActive
                      ? 'rgba(255,255,255,0.2)'
                      : 'rgba(255,255,255,0.08)',
                    backgroundColor: isActive
                      ? 'rgba(255,255,255,0.12)'
                      : 'rgba(255,255,255,0.03)',
                    color: isActive ? 'white' : '#71717a',
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Count */}
          <div className="ml-auto flex items-center gap-2">
            <Users size={14} className="text-zinc-500" />
            <span className="font-orbitron text-green-400 font-bold text-sm">
              {filtered.length}
            </span>
          </div>
        </div>

        {/* ── Members Grid ── */}
        <div className="flex-1 overflow-y-auto p-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Users size={48} className="text-zinc-700 mb-4" />
              <h3 className="font-orbitron text-white text-xl tracking-wider mb-2">
                No Members Found
              </h3>
              <p className="font-rajdhani text-zinc-500 text-base text-center">
                {search
                  ? `No results for "${search}"`
                  : 'No members in this category'}
              </p>
              {(search || filter !== 'all') && (
                <button
                  onClick={() => { setSearch(''); setFilter('all'); }}
                  className="mt-4 px-4 py-2 rounded-xl bg-white/8
                             font-rajdhani text-white text-sm font-semibold
                             tracking-widest uppercase hover:bg-white/12
                             transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filtered.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onClick={handleMemberClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminLiveRoster;