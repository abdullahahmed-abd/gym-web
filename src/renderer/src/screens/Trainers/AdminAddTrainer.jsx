// AdminAddTrainer.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  Search, X, Shield, CheckCircle, AlertCircle, Timer,
  Activity, LogIn, Clock, Smartphone, Phone, MessageCircle,
  Dumbbell, ArrowLeft, Zap, Wifi, Crown, Sparkles, ChevronRight,
} from 'lucide-react';
import splashBg from '../../../../../src/assets/splash-bg.jpg';

const TRAINER_COLOR = '#22D3EE';
const SPLASH_BG = splashBg;

const DUMMY_MEMBERS = [
  {
    id: 'm1', name: 'Abdullah Ahmed', avatar: 'AA', memberId: 'GYM001',
    phone: '+918817159218', email: 'abdullah@example.com',
    membershipType: 'ELITE TIER', membershipStatus: 'active',
    workoutType: 'cardio_weights', isLive: true,
    checkinTime: '6:30 AM', duration: '45 min', lastCheckout: '8:15 AM',
    joinDate: '2024-01-15', expiryDate: '2025-02-15', daysLeft: 25,
    totalVisits: 156, currentStreak: 12, paidAmount: 2500,
  },
  {
    id: 'm2', name: 'Priya Patel', avatar: 'PP', memberId: 'GYM002',
    phone: '+919876543211', email: 'priya@example.com',
    membershipType: 'LEGENDARY TIER', membershipStatus: 'expired',
    workoutType: 'weights_only', isLive: true,
    checkinTime: '6:45 AM', duration: '32 min', lastCheckout: null,
    joinDate: '2024-03-10', expiryDate: '2025-01-10', daysLeft: 0,
    totalVisits: 89, currentStreak: 0, paidAmount: 3500,
  },
  {
    id: 'm3', name: 'Rahul Verma', avatar: 'RV', memberId: 'GYM003',
    phone: '+919876543212', email: 'rahul@example.com',
    membershipType: null, membershipStatus: 'trial',
    workoutType: 'cardio_weights', isLive: true,
    checkinTime: '6:15 AM', duration: '58 min', lastCheckout: null,
    joinDate: '2025-01-15', expiryDate: '2025-01-22', daysLeft: 5,
    totalVisits: 5, currentStreak: 5, paidAmount: 0,
  },
  {
    id: 'm4', name: 'Sneha Gupta', avatar: 'SG', memberId: 'GYM004',
    phone: '+919876543213', email: 'sneha@example.com',
    membershipType: 'LEGENDARY TIER', membershipStatus: 'active',
    workoutType: 'weights_only', isLive: true,
    checkinTime: '6:50 AM', duration: '40 min', lastCheckout: null,
    joinDate: '2024-06-01', expiryDate: '2025-03-05', daysLeft: 45,
    totalVisits: 210, currentStreak: 28, paidAmount: 3500,
  },
  {
    id: 'm5', name: 'Vikram Singh', avatar: 'VS', memberId: 'GYM005',
    phone: '+919876543214', email: 'vikram@example.com',
    membershipType: 'ELITE TIER', membershipStatus: 'expired',
    workoutType: 'cardio_weights', isLive: false,
    checkinTime: null, duration: null, lastCheckout: '5:00 PM',
    joinDate: '2024-02-20', expiryDate: '2025-01-05', daysLeft: 0,
    totalVisits: 67, currentStreak: 0, paidAmount: 2500,
  },
  {
    id: 'm6', name: 'Ananya Reddy', avatar: 'AR', memberId: 'GYM006',
    phone: '+919876543215', email: 'ananya@example.com',
    membershipType: null, membershipStatus: 'trial',
    workoutType: 'weights_only', isLive: true,
    checkinTime: '6:20 AM', duration: '50 min', lastCheckout: null,
    joinDate: '2025-01-17', expiryDate: '2025-01-24', daysLeft: 3,
    totalVisits: 3, currentStreak: 3, paidAmount: 0,
  },
  {
    id: 'm7', name: 'Karan Malhotra', avatar: 'KM', memberId: 'GYM007',
    phone: '+919876543216', email: 'karan@example.com',
    membershipType: 'ELITE TIER', membershipStatus: 'active',
    workoutType: 'cardio_weights', isLive: true,
    checkinTime: '6:40 AM', duration: '35 min', lastCheckout: null,
    joinDate: '2024-05-15', expiryDate: '2025-03-20', daysLeft: 60,
    totalVisits: 178, currentStreak: 22, paidAmount: 2500,
  },
  {
    id: 'm8', name: 'Meera Iyer', avatar: 'MI', memberId: 'GYM008',
    phone: '+919876543217', email: 'meera@example.com',
    membershipType: 'LEGENDARY TIER', membershipStatus: 'expired',
    workoutType: 'weights_only', isLive: false,
    checkinTime: null, duration: null, lastCheckout: '4:45 PM',
    joinDate: '2024-04-01', expiryDate: '2025-01-08', daysLeft: 0,
    totalVisits: 134, currentStreak: 0, paidAmount: 3500,
  },
];

const TIER_TEMPLATES = {
  'ELITE TIER': { badge: 'ELITE', iconColor: '#C5A059', icon: Crown },
  'LEGENDARY TIER': { badge: 'LEGENDARY', iconColor: '#A855F7', icon: Sparkles },
};
const TRIAL_CONFIG = { iconColor: '#3B82F6', badge: 'TRIAL', icon: Zap };
const STATUS_CONFIG = {
  active: { label: 'ACTIVE', color: '#22C55E', icon: CheckCircle },
  expired: { label: 'EXPIRED', color: '#EF4444', icon: AlertCircle },
  trial: { label: 'TRIAL', color: '#3B82F6', icon: Timer },
};

const formatPhone = (phone) => {
  const c = phone?.replace(/\D/g, '') || '';
  return c.length === 12 ? `+${c.slice(0, 2)} ${c.slice(2, 7)} ${c.slice(7)}` : phone;
};

/* ── Shared primitives ── */
const PulseDot = ({ color = '#22C55E', size = 8 }) => (
  <div className="relative flex items-center justify-center"
    style={{ width: size * 3, height: size * 3 }}>
    <span className="absolute rounded-full animate-ping opacity-30"
      style={{ width: size * 2.5, height: size * 2.5, backgroundColor: color }} />
    <span className="relative rounded-full"
      style={{
        width: size, height: size, backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${color}40`
      }} />
  </div>
);

const GlassCard = ({ children, className = '', onClick, borderColor, hover }) => (
  <div onClick={onClick}
    className={`relative rounded-2xl overflow-hidden
         ${hover ? 'cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5' : ''}
         ${className}`}
    style={{
      background: '#000000',
      border: `1px solid ${borderColor || 'rgba(255,255,255,0.08)'}`,
    }}>
    {children}
  </div>
);

/* ── Member Card ── */
const MemberCard = ({ member, onPress, isMemberTrainer }) => {
  const isTrial = member.membershipStatus === 'trial';
  const tierConfig = isTrial ? TRIAL_CONFIG : (TIER_TEMPLATES[member.membershipType] || TIER_TEMPLATES['ELITE TIER']);
  const statusConfig = STATUS_CONFIG[member.membershipStatus] || STATUS_CONFIG.active;
  const accentColor = tierConfig.iconColor;
  const StatusIcon = statusConfig.icon;

  const handleCall = (e) => { e.stopPropagation(); window.open(`tel:${member.phone.replace(/\D/g, '')}`); };
  const handleWA = (e) => { e.stopPropagation(); window.open(`https://wa.me/${member.phone.replace(/\D/g, '')}`); };

  return (
    <GlassCard hover onClick={() => onPress(member)}
      borderColor={isMemberTrainer ? `${TRAINER_COLOR}40` : `${accentColor}30`}
      className="group">
      {/* BG watermark */}
      <div className="absolute -top-2 -right-4 opacity-[0.03] pointer-events-none">
        <Shield size={110} style={{ color: accentColor }} strokeWidth={0.5} />
      </div>

      <div className="p-5 relative z-10">
        {/* Top Row */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-[54px] h-[54px] rounded-2xl flex items-center justify-center"
              style={{
                border: `2px solid ${isMemberTrainer ? `${TRAINER_COLOR}80` : `${accentColor}60`}`,
                background: isMemberTrainer ? `${TRAINER_COLOR}15` : `${accentColor}15`,
              }}>
              <span className="font-orbitron text-white font-bold text-[15px]">{member.avatar}</span>
            </div>
            {member.isLive && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full
                              flex items-center justify-center border-2"
                style={{ backgroundColor: '#000000', borderColor: '#000000' }}>
                <PulseDot color="#22C55E" size={5} />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Badges row */}
            <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                {isMemberTrainer ? (
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
                    style={{ border: `1px solid ${TRAINER_COLOR}40`, background: `${TRAINER_COLOR}10` }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: TRAINER_COLOR }} />
                    <span className="font-rajdhani font-bold text-[9px] tracking-[0.1em] uppercase"
                      style={{ color: TRAINER_COLOR }}>TRAINER</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
                      style={{ border: `1px solid ${accentColor}40` }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                      <span className="font-rajdhani text-zinc-400 font-bold text-[9px] tracking-[0.1em] uppercase">
                        {tierConfig.badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
                      style={{ border: `1px solid ${statusConfig.color}30` }}>
                      <StatusIcon size={9} style={{ color: statusConfig.color }} />
                      <span className="font-rajdhani text-zinc-400 font-bold text-[9px] tracking-[0.1em] uppercase">
                        {statusConfig.label}
                      </span>
                    </div>
                  </>
                )}
              </div>
              {/* Live / Offline */}
              {member.isLive ? (
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
                  style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.20)' }}>
                  <Wifi size={9} className="text-green-400" />
                  <span className="font-orbitron text-green-400 font-bold text-[8px] tracking-wider">LIVE</span>
                </div>
              ) : (
                <div className="px-2 py-1 rounded-lg bg-white/[0.02]">
                  <span className="font-orbitron text-white/30 font-bold text-[8px] tracking-wider">OFFLINE</span>
                </div>
              )}
            </div>

            {/* Name */}
            <h3 className="font-orbitron text-white font-bold text-[13px] mb-2 truncate">{member.name}</h3>

            {/* Workout badge */}
            {isMemberTrainer ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg w-fit mb-2"
                style={{ background: `${TRAINER_COLOR}15` }}>
                <Dumbbell size={10} style={{ color: TRAINER_COLOR }} />
                <span className="font-rajdhani font-bold text-[9px] tracking-[0.1em] uppercase"
                  style={{ color: TRAINER_COLOR }}>GYM TRAINER</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg w-fit mb-2"
                style={{ background: `${accentColor}15` }}>
                {member.workoutType === 'cardio_weights'
                  ? <Activity size={10} style={{ color: accentColor }} />
                  : <Dumbbell size={10} style={{ color: accentColor }} />}
                <span className="font-rajdhani text-white font-bold text-[9px] tracking-[0.1em] uppercase">
                  {member.workoutType === 'cardio_weights' ? 'CARDIO + WEIGHTS' : 'WEIGHTS ONLY'}
                </span>
              </div>
            )}

            {/* Time row */}
            <div className="flex items-center gap-2 flex-wrap">
              {member.isLive && member.checkinTime ? (
                <>
                  <div className="flex items-center gap-1">
                    <LogIn size={10} className="text-green-400" />
                    <span className="font-orbitron text-white text-[9px]">{member.checkinTime}</span>
                  </div>
                  {member.duration && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-white/20" />
                      <div className="flex items-center gap-1">
                        <Clock size={10} style={{ color: accentColor }} />
                        <span className="font-orbitron text-white text-[9px]">{member.duration}</span>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-1">
                  <Clock size={10} className="text-white/30" />
                  <span className="font-orbitron text-white/40 text-[9px]">
                    Last: {member.lastCheckout || 'N/A'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-4"
          style={{
            background: `linear-gradient(90deg,transparent 0%,${isMemberTrainer ? TRAINER_COLOR : accentColor}25 50%,transparent 100%)`
          }} />

        {/* Bottom Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: isMemberTrainer ? `${TRAINER_COLOR}12` : `${accentColor}12` }}>
              <Smartphone size={15} style={{ color: isMemberTrainer ? TRAINER_COLOR : accentColor }} />
            </div>
            <div>
              <p className="font-rajdhani text-white/40 text-[8px] tracking-[0.15em] uppercase mb-0.5">Contact</p>
              <p className="font-orbitron text-white text-[9px] tracking-wider">{formatPhone(member.phone)}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={handleCall}
              className="w-9 h-9 rounded-xl flex items-center justify-center
                               border border-white/[0.08]
                               hover:bg-white/[0.06] transition-colors duration-200"
              style={{ background: '#000000' }}>
              <Phone size={14} className="text-green-400" />
            </button>
            <button onClick={handleWA}
              className="w-9 h-9 rounded-xl flex items-center justify-center
                               border border-white/[0.08]
                               hover:bg-white/[0.06] transition-colors duration-200"
              style={{ background: '#000000' }}>
              <MessageCircle size={14} className="text-[#25D366]" />
            </button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

/* ── Main Screen ── */
const AdminAddTrainer = ({ onLogout }) => {
  const nav = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setFocused] = useState(false);
  const [memberFilter, setMemberFilter] = useState('all');
  const [trainers, setTrainers] = useState(['m1']);

  const isTrainer = (id) => trainers.includes(id);

  const filtered = DUMMY_MEMBERS.filter((m) => {
    const q = searchQuery.toLowerCase();
    const matchSearch = m.name.toLowerCase().includes(q)
      || m.memberId.toLowerCase().includes(q)
      || m.phone.includes(searchQuery);
    const matchFilter =
      memberFilter === 'all' ||
      (memberFilter === 'active' && m.membershipStatus === 'active') ||
      (memberFilter === 'trial' && m.membershipStatus === 'trial') ||
      (memberFilter === 'live' && m.isLive);
    return matchSearch && matchFilter;
  });

  const liveCount = DUMMY_MEMBERS.filter(m => m.isLive).length;
  const activeCount = DUMMY_MEMBERS.filter(m => m.membershipStatus === 'active').length;
  const trialCount = DUMMY_MEMBERS.filter(m => m.membershipStatus === 'trial').length;

  return (
    <Layout title="ADD TRAINER" onLogout={onLogout}>
      <div className="relative min-h-screen">
        {/* ── Background Image ── */}
        <div className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url(${SPLASH_BG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />

        {/* ── Dark Overlay with blur ── */}
        <div className="fixed inset-0 z-[1]"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            background: `
              radial-gradient(ellipse at 20% 0%, rgba(34,211,238,0.05) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 100%, rgba(168,85,247,0.04) 0%, transparent 50%),
              linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.95) 100%)
            `,
          }} />

        {/* ── Content ── */}
        <div className="relative z-10 px-8 py-6 max-w-[1400px] mx-auto space-y-5">

          {/* Back */}
          <button onClick={() => nav('/trainers')} className="flex items-center gap-3 group pt-2">
            <div className="w-10 h-10 rounded-xl border border-white/[0.08]
                            flex items-center justify-center
                            group-hover:bg-white/[0.06] transition-colors duration-200"
              style={{ background: '#000000' }}>
              <ArrowLeft size={16} className="text-white/60" />
            </div>
            <span className="font-rajdhani text-white/60 font-bold text-[11px] tracking-[0.2em] uppercase
                             group-hover:text-white/80 transition-colors duration-200">
              Back to Trainers
            </span>
          </button>

          {/* Info Banner */}
          <GlassCard borderColor={`${TRAINER_COLOR}20`}>
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${TRAINER_COLOR}12` }}>
                <Dumbbell size={18} style={{ color: TRAINER_COLOR }} />
              </div>
              <p className="font-rajdhani text-zinc-400 text-[11px] leading-relaxed">
                Tap on a member to view their profile and assign them as a trainer.
              </p>
            </div>
          </GlassCard>

          {/* Search */}
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300"
            style={{
              background: '#000000',
              border: `1px solid ${isSearchFocused ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}`,
            }}>
            <Search size={18} className={isSearchFocused ? 'text-white' : 'text-white/40'} />
            <input type="text" placeholder="Search name, ID, or phone..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
              className="flex-1 bg-transparent outline-none font-rajdhani text-white
                              text-[13px] placeholder:text-white/30" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}
                className="w-6 h-6 rounded-lg bg-white/[0.05] hover:bg-white/[0.10]
                                 flex items-center justify-center transition-colors">
                <X size={13} className="text-white/50" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { label: 'All', value: 'all', count: DUMMY_MEMBERS.length },
              { label: 'Active', value: 'active', count: activeCount, color: '#22C55E' },
              { label: 'Trial', value: 'trial', count: trialCount, color: '#3B82F6' },
              { label: 'Live', value: 'live', count: liveCount, color: '#22C55E' },
            ].map(f => (
              <button key={f.value} onClick={() => setMemberFilter(f.value)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all duration-200"
                style={{
                  background: memberFilter === f.value ? 'rgba(255,255,255,0.10)' : '#000000',
                  border: `1px solid ${memberFilter === f.value ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}`,
                }}>
                {f.color && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: f.color }} />}
                <span className={`font-rajdhani font-bold text-[10px] tracking-[0.15em] uppercase
                                  ${memberFilter === f.value ? 'text-white' : 'text-white/40'}`}>
                  {f.label} ({f.count})
                </span>
              </button>
            ))}
          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full"
                style={{ background: `linear-gradient(180deg,${TRAINER_COLOR},${TRAINER_COLOR}20)` }} />
              <h2 className="font-rajdhani text-white/60 font-bold text-[11px] tracking-[0.2em] uppercase">
                {searchQuery ? 'Search Results'
                  : memberFilter === 'live' ? 'Live Members'
                    : memberFilter === 'active' ? 'Active Members'
                      : memberFilter === 'trial' ? 'Trial Members'
                        : 'All Members'}
              </h2>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl"
              style={{ background: `${TRAINER_COLOR}15`, border: `1px solid ${TRAINER_COLOR}25` }}>
              <span className="font-orbitron font-bold text-[11px]" style={{ color: TRAINER_COLOR }}>
                {filtered.length}
              </span>
            </div>
          </div>

          {/* Member Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Search size={48} className="text-white/20" />
              <div className="text-center">
                <h3 className="font-orbitron text-zinc-400 font-bold text-[16px] mb-2">No Members Found</h3>
                <p className="font-rajdhani text-zinc-600 text-[12px]">Try adjusting your search or filter</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filtered.map(m => (
                <MemberCard key={m.id} member={m}
                  onPress={member => nav('/trainer-profile', { state: { member } })}
                  isMemberTrainer={isTrainer(m.id)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminAddTrainer;