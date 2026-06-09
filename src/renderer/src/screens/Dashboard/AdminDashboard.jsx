// src/screens/Dashboard/AdminDashboard.jsx — WITH MANUAL CHECK-IN
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import Layout from '../../components/shared/Layout';
import {
  Users, DollarSign, Dumbbell, UserPlus, ArrowRight,
  Clock, AlertCircle, CheckCircle, TrendingUp, Package,
  Activity, Zap, ChevronRight, BarChart3, Bell,
  Shield, Eye, CreditCard, CalendarCheck,
  UserCheck, Timer, Wifi, ArrowUpRight, Sparkles,
  Crown, Star, Target, TrendingDown, Calendar,
  Search, X, LogIn, LogOut, Phone, Hash,
  Loader2, MapPin, Flame,
} from 'lucide-react';

import gymLogo  from '../../../../../src/assets/gym-logo.png';
import splashBg from '../../../../../src/assets/splash-bg.jpg';

const GYM_LOGO  = gymLogo;
const SPLASH_BG = splashBg;

/* ── Palette ── */
const GOLD  = '#C5A059';
const GREEN = '#22C55E';

const TIER_COLORS = {
  elite:     { primary: '#C5A059' },
  legendary: { primary: '#A855F7' },
  trainer:   { primary: '#22D3EE', border: 'rgba(34,211,238,0.15)' },
  trial:     { primary: '#3B82F6' },
  expired:   { primary: '#EF4444' },
};

const MEMBERS = { total: 128, trial: 18, expired: 20, elite: 65, legendary: 43, trainer: 8 };
const LIVE    = { total: 15, avg: '38m', elite: 9, legendary: 6, trial: 3, expired: 4 };
const REVENUE = { today: 45200, memberships: 32000, renewals: 8000, others: 5200, growth: 12 };

/* ── Offline members pool ── */
const OFFLINE_MEMBERS = [
  { id: 'o1', name: 'Vikram Singh',    avatar: 'VS', memberId: 'GYM005',
    membershipType: 'ELITE TIER',     membershipStatus: 'active',  phone: '+91 98765 43214',
    checkinTime: null, lastCheckout: '5:00 PM', isLive: false },
  { id: 'o2', name: 'Meera Iyer',      avatar: 'MI', memberId: 'GYM008',
    membershipType: 'LEGENDARY TIER', membershipStatus: 'expired', phone: '+91 98765 43217',
    checkinTime: null, lastCheckout: '4:45 PM', isLive: false },
  { id: 'o3', name: 'Arjun Mehta',     avatar: 'AM', memberId: 'GYM009',
    membershipType: 'ELITE TIER',     membershipStatus: 'active',  phone: '+91 98765 43218',
    checkinTime: null, lastCheckout: '3:30 PM', isLive: false },
  { id: 'o4', name: 'Divya Sharma',    avatar: 'DS', memberId: 'GYM010',
    membershipType: 'LEGENDARY TIER', membershipStatus: 'active',  phone: '+91 98765 43219',
    checkinTime: null, lastCheckout: '2:00 PM', isLive: false },
  { id: 'o5', name: 'Ravi Kumar',      avatar: 'RK', memberId: 'GYM011',
    membershipType: null,             membershipStatus: 'trial',   phone: '+91 98765 43220',
    checkinTime: null, lastCheckout: '1:30 PM', isLive: false },
  { id: 'o6', name: 'Priya Nair',      avatar: 'PN', memberId: 'GYM012',
    membershipType: 'ELITE TIER',     membershipStatus: 'expired', phone: '+91 98765 43221',
    checkinTime: null, lastCheckout: 'Yesterday', isLive: false },
];

const TIER_CFG = {
  'ELITE TIER':     { badge: 'ELITE',     color: '#C5A059', icon: Crown    },
  'LEGENDARY TIER': { badge: 'LEGENDARY', color: '#A855F7', icon: Sparkles },
};
const TRIAL_CFG  = { badge: 'TRIAL', color: '#3B82F6', icon: Zap };
const STATUS_CFG = {
  active:  { label: 'ACTIVE',  color: GREEN,     icon: CheckCircle },
  expired: { label: 'EXPIRED', color: '#EF4444', icon: AlertCircle },
  trial:   { label: 'TRIAL',   color: '#3B82F6', icon: Zap         },
};

const getTier   = t  => TIER_CFG[t] || TIER_CFG['ELITE TIER'];
const getStatus = st => STATUS_CFG[st] || STATUS_CFG.active;

/* ═══════════════════════════════════════════════════════════════ */
/* ANIMATED NUMBER                                                 */
/* ═══════════════════════════════════════════════════════════════ */
const AnimatedNumber = ({ value, duration = 1200 }) => {
  const [display, setDisplay] = useState(0);
  const num = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) : value;
  useEffect(() => {
    const t0 = performance.now();
    const tick = t => {
      const p = Math.min((t - t0) / duration, 1);
      setDisplay(Math.floor((1 - Math.pow(1 - p, 3)) * num));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [num, duration]);
  return display;
};

/* ═══════════════════════════════════════════════════════════════ */
/* PULSE DOT                                                       */
/* ═══════════════════════════════════════════════════════════════ */
const PulseDot = ({ color = GREEN, size = 8 }) => (
  <div className="relative flex items-center justify-center" style={{ width: size*3, height: size*3 }}>
    <span className="absolute rounded-full animate-ping opacity-30"
      style={{ width: size*2.5, height: size*2.5, backgroundColor: color }} />
    <span className="absolute rounded-full animate-pulse opacity-20"
      style={{ width: size*1.8, height: size*1.8, backgroundColor: color }} />
    <span className="relative rounded-full"
      style={{ width: size, height: size, backgroundColor: color, boxShadow: `0 0 ${size*2}px ${color}40` }} />
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* GLASSPANEL                                                      */
/* ═══════════════════════════════════════════════════════════════ */
const GlassPanel = ({ children, className='', onClick, hover=false, gradient, borderColor, glow }) => (
  <div onClick={onClick}
    className={`relative rounded-3xl overflow-hidden
      ${hover?'cursor-pointer transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1':''}
      ${onClick?'cursor-pointer':''} ${className}`}
    style={{
      background: gradient||'#000000',
      border: `1px solid ${borderColor||'rgba(255,255,255,0.08)'}`,
      backdropFilter: 'blur(24px)',
      boxShadow: glow?`0 8px 32px ${glow}`:'none',
    }}>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* STAT CARD                                                       */
/* ═══════════════════════════════════════════════════════════════ */
const StatCard = ({ icon: Icon, label, value, change, sub, color, pulse }) => (
  <GlassPanel hover className="group" glow={`${color}08`}>
    <div className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center
                        transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{ background:`linear-gradient(135deg,${color}15,${color}08)`, border:`1px solid ${color}20`,
                   boxShadow:`0 4px 16px ${color}10` }}>
          <Icon size={20} style={{ color }} />
        </div>
        {pulse && <PulseDot color={color} size={7} />}
        {change && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
            style={{
              background: change.startsWith('+')?'rgba(34,197,94,0.1)':'rgba(239,68,68,0.1)',
              border: change.startsWith('+')?'1px solid rgba(34,197,94,0.2)':'1px solid rgba(239,68,68,0.2)',
            }}>
            {change.startsWith('+')
              ? <ArrowUpRight size={12} className="text-green-400" />
              : <TrendingDown size={12} className="text-red-400" />}
            <span className={`font-orbitron text-[10px] font-bold ${change.startsWith('+')?'text-green-400':'text-red-400'}`}>
              {change}
            </span>
          </div>
        )}
      </div>
      <div className="mb-3">
        <p className="font-orbitron text-white font-bold text-[32px] leading-none mb-2
                      transition-all duration-300 group-hover:text-[34px]">
          {typeof value === 'number' ? <AnimatedNumber value={value} /> : value}
        </p>
        <p className="font-rajdhani text-zinc-300 text-[11px] tracking-[0.15em] uppercase font-semibold">{label}</p>
      </div>
      {sub && (
        <>
          <div className="h-px bg-gradient-to-r from-white/[0.05] via-white/[0.1] to-white/[0.05] mb-3" />
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor:`${color}80` }} />
            <span className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.1em] uppercase font-medium">{sub}</span>
          </div>
        </>
      )}
    </div>
  </GlassPanel>
);

/* ═══════════════════════════════════════════════════════════════ */
/* TIER BADGE                                                      */
/* ═══════════════════════════════════════════════════════════════ */
const TierBadge = ({ icon: Icon, label, count, color, total }) => {
  const pct = ((count / total) * 100).toFixed(0);
  return (
    <div className="group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
      style={{ background:'#000000', border:`1px solid ${color}12` }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
        style={{ background:`${color}10`, border:`1px solid ${color}20`, boxShadow:`0 4px 12px ${color}08` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between mb-1">
          <span className="font-orbitron text-white font-bold text-[20px]">{count}</span>
          <span className="font-rajdhani text-[11px] tracking-[0.15em] uppercase font-bold" style={{ color }}>{pct}%</span>
        </div>
        <p className="font-rajdhani text-[11px] tracking-[0.2em] uppercase font-semibold mb-2" style={{ color:`${color}CC` }}>{label}</p>
        <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-1000"
            style={{ width:`${pct}%`, background:`linear-gradient(90deg,${color},${color}60)`, boxShadow:`0 0 8px ${color}40` }} />
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* COMMAND BUTTON                                                  */
/* ═══════════════════════════════════════════════════════════════ */
const CommandButton = ({ icon: Icon, label, sublabel, color, onClick, badge }) => (
  <button type="button" onClick={onClick}
    className="group relative flex items-center gap-4 w-full px-6 py-4 rounded-2xl
               text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
    style={{ background:'#000000', border:'1px solid rgba(255,255,255,0.08)' }}>
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{ background:`radial-gradient(circle at center,${color}08 0%,transparent 70%)` }} />
    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 z-10
                    transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
      style={{ background:`${color}10`, border:`1px solid ${color}20`, boxShadow:`0 4px 12px ${color}08` }}>
      <Icon size={18} style={{ color }} />
    </div>
    <div className="flex-1 min-w-0 z-10">
      <p className="font-rajdhani text-white text-[13px] font-bold tracking-[0.12em] uppercase">{label}</p>
      {sublabel && <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.1em] uppercase mt-0.5">{sublabel}</p>}
    </div>
    {badge && (
      <span className="px-2.5 py-1 rounded-lg text-[9px] font-orbitron font-bold z-10"
        style={{ background:`${color}12`, color, border:`1px solid ${color}25` }}>{badge}</span>
    )}
    <ChevronRight size={18} className="text-white/30 group-hover:text-white/60 z-10 group-hover:translate-x-1 transition-all duration-300" />
  </button>
);

/* ═══════════════════════════════════════════════════════════════ */
/* REVENUE ITEM                                                    */
/* ═══════════════════════════════════════════════════════════════ */
const RevenueItem = ({ label, amount, percentage, color, icon: Icon }) => (
  <div className="group">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
        style={{ background:`${color}10`, border:`1px solid ${color}15` }}>
        <Icon size={16} style={{ color }} />
      </div>
      <div className="flex-1">
        <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.15em] uppercase font-semibold mb-1">{label}</p>
        <p className="font-orbitron text-white font-bold text-[16px]">₹{(amount/1000).toFixed(1)}K</p>
      </div>
    </div>
    <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-1000"
        style={{ width:`${percentage}%`, background:`linear-gradient(90deg,${color},${color}60)`, boxShadow:`0 0 8px ${color}40` }} />
    </div>
    <div className="flex items-center justify-between mt-2">
      <span className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.1em] uppercase">of total revenue</span>
      <span className="font-orbitron text-[11px] font-bold" style={{ color }}>{percentage}%</span>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* MEMBER PROFILE PANEL (slide-in inside modal)                    */
/* ═══════════════════════════════════════════════════════════════ */
const MemberProfilePanel = ({ member, onCheckIn, onCheckOut, onBack, processing }) => {
  const isTrial   = member.membershipStatus === 'trial';
  const tierCfg   = isTrial ? TRIAL_CFG : getTier(member.membershipType);
  const statusCfg = getStatus(member.membershipStatus);
  const accent    = tierCfg.color;
  const TierIcon  = tierCfg.icon;

  return (
    <div className="flex flex-col h-full">
      {/* Back */}
      <div className="p-5 flex items-center gap-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <button onClick={onBack}
          className="group w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <ChevronRight size={15} color="#71717A" className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <div>
          <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.12em]">MEMBER PROFILE</h3>
          <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">Check-in / Check-out</p>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">

        {/* Hero */}
        <div className="p-5 rounded-2xl relative overflow-hidden"
          style={{ background:`${accent}06`, border:`1px solid ${accent}18` }}>
          <div className="absolute top-0 left-6 right-6 h-[1.5px]"
            style={{ background:`linear-gradient(90deg,transparent,${accent}40,transparent)` }} />

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-orbitron font-bold text-[18px] flex-shrink-0"
              style={{ background:`${accent}15`, border:`2px solid ${accent}30`, color: accent }}>
              {member.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg"
                  style={{ background:`${accent}12`, border:`1px solid ${accent}22` }}>
                  <TierIcon size={9} style={{ color: accent }} />
                  <span className="font-orbitron text-[7px] font-bold tracking-widest" style={{ color: accent }}>{tierCfg.badge}</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg"
                  style={{ background:`${statusCfg.color}10`, border:`1px solid ${statusCfg.color}20` }}>
                  <statusCfg.icon size={9} style={{ color: statusCfg.color }} />
                  <span className="font-orbitron text-[7px] font-bold tracking-widest" style={{ color: statusCfg.color }}>{statusCfg.label}</span>
                </div>
              </div>
              <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.06em] truncate">{member.name}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <Hash size={10} className="text-zinc-600" />
                <span className="font-mono text-zinc-500 text-[10px]">{member.memberId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Last activity */}
        <div className="p-4 rounded-2xl"
          style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)' }}>
          <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.2em] uppercase font-semibold mb-3">Last Session</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background:'rgba(234,179,8,0.10)', border:'1px solid rgba(234,179,8,0.18)' }}>
              <LogOut size={14} className="text-yellow-400" />
            </div>
            <div>
              <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.15em] uppercase">Last Checkout</p>
              <p className="font-orbitron text-zinc-300 text-[13px] font-bold">{member.lastCheckout || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Expired warning */}
        {member.membershipStatus === 'expired' && (
          <div className="p-4 rounded-2xl"
            style={{ background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.18)' }}>
            <div className="flex items-center gap-3">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <div>
                <p className="font-rajdhani text-red-400 text-[11px] font-bold tracking-[0.12em] uppercase">Membership Expired</p>
                <p className="font-rajdhani text-zinc-600 text-[10px] tracking-wider">Check-in allowed but renewal recommended</p>
              </div>
            </div>
          </div>
        )}

        {/* Phone */}
        <div className="p-4 rounded-2xl flex items-center gap-3"
          style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background:'rgba(34,197,94,0.10)', border:'1px solid rgba(34,197,94,0.18)' }}>
            <Phone size={13} className="text-green-400" />
          </div>
          <div className="flex-1">
            <p className="font-rajdhani text-zinc-600 text-[9px] tracking-[0.15em] uppercase">Phone</p>
            <p className="font-orbitron text-white text-[12px] font-bold">{member.phone}</p>
          </div>
        </div>
      </div>

      {/* Footer action */}
      <div className="p-5 flex-shrink-0" style={{ borderTop:'1px solid rgba(255,255,255,0.07)' }}>
        {member.isLive ? (
          <button onClick={() => onCheckOut(member)} disabled={processing}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-orbitron text-[12px]
                       font-bold tracking-[0.15em] uppercase transition-all duration-300
                       hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background:'linear-gradient(135deg,rgba(234,179,8,0.20),rgba(234,179,8,0.08))',
              border:'1px solid rgba(234,179,8,0.35)', color:'#EAB308',
              boxShadow:'0 6px 24px rgba(234,179,8,0.12)',
            }}>
            {processing
              ? <><Loader2 size={17} className="animate-spin" />Processing...</>
              : <><div className="w-8 h-8 rounded-lg flex items-center justify-center bg-yellow-400/15">
                  <LogOut size={15} className="text-yellow-400" />
                </div>Check Out Member</>}
          </button>
        ) : (
          <button onClick={() => onCheckIn(member)} disabled={processing}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-orbitron text-[12px]
                       font-bold tracking-[0.15em] uppercase transition-all duration-300
                       hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background:`linear-gradient(135deg,${GREEN}20,${GREEN}08)`,
              border:`1px solid ${GREEN}35`, color: GREEN,
              boxShadow:`0 6px 24px ${GREEN}12`,
            }}>
            {processing
              ? <><Loader2 size={17} className="animate-spin" />Processing...</>
              : <><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:`${GREEN}15` }}>
                  <LogIn size={15} style={{ color: GREEN }} />
                </div>Check In Member</>}
          </button>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* MANUAL CHECK-IN MODAL (portal)                                  */
/* ═══════════════════════════════════════════════════════════════ */
const ManualCheckInModal = ({ onClose, members, setMembers }) => {
  const [search,        setSearch]        = useState('');
  const [selectedMember, setSelected]    = useState(null);
  const [processing,    setProcessing]   = useState(false);
  const [toast,         setToast]        = useState({ visible: false, msg: '', type: 'success' });

  /* Lock scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const showToast = (msg, type='success') => {
    setToast({ visible: true, msg, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  const filtered = members.filter(m => {
    const q = search.toLowerCase();
    return m.name.toLowerCase().includes(q) || m.memberId.toLowerCase().includes(q) || m.phone.includes(search);
  });

  const handleCheckIn = async m => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 1100));
    const t = new Date().toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12:true });
    setMembers(prev => prev.map(x => x.id===m.id ? { ...x, isLive:true, checkinTime:t } : x));
    setProcessing(false);
    showToast(`${m.name} checked in at ${t}`);
    setSelected(null);
  };

  const handleCheckOut = async m => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 1100));
    const t = new Date().toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12:true });
    setMembers(prev => prev.map(x => x.id===m.id ? { ...x, isLive:false, checkinTime:null, lastCheckout:t } : x));
    setProcessing(false);
    showToast(`${m.name} checked out at ${t}`, 'warning');
    setSelected(null);
  };

  return createPortal(
    <>
      {/* Toast */}
      <div className={`fixed top-6 right-6 z-[99999] flex items-center gap-3 px-5 py-4 rounded-2xl
        transition-all duration-500 ${toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        style={{
          background:'#000',
          border:`1px solid ${toast.type==='success'?'rgba(34,197,94,0.28)':'rgba(234,179,8,0.28)'}`,
          boxShadow:`0 12px 40px ${toast.type==='success'?'rgba(34,197,94,0.15)':'rgba(234,179,8,0.15)'}`,
        }}>
        {toast.type==='success'
          ? <CheckCircle size={17} color={GREEN} />
          : <LogOut size={17} color="#EAB308" />}
        <span className="font-rajdhani text-white text-[12px] tracking-[0.12em] uppercase font-bold">{toast.msg}</span>
      </div>

      {/* Modal overlay */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
        style={{ background:'rgba(0,0,0,0.90)', backdropFilter:'blur(12px)' }}>

        {/* Backdrop */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal card */}
        <div className="relative w-full flex flex-col rounded-3xl overflow-hidden"
          style={{
            maxWidth: '480px',
            maxHeight: 'calc(100vh - 80px)',
            background:'#000000',
            border:'1px solid rgba(34,197,94,0.20)',
            boxShadow:'0 32px 100px rgba(0,0,0,0.95), 0 0 60px rgba(34,197,94,0.06)',
          }}>

          {/* Gold accent */}
          <div className="h-[2px] flex-shrink-0"
            style={{ background:'linear-gradient(90deg,transparent,rgba(34,197,94,0.50),transparent)' }} />

          {/* ── If a member is selected → show profile ── */}
          {selectedMember ? (
            <MemberProfilePanel
              member={selectedMember}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
              onBack={() => setSelected(null)}
              processing={processing}
            />
          ) : (
            <>
              {/* Header */}
              <div className="p-5 sm:p-6 flex items-center justify-between flex-shrink-0"
                style={{ borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ background:'rgba(34,197,94,0.12)', border:'1px solid rgba(34,197,94,0.22)' }}>
                    <UserCheck size={19} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-orbitron text-white font-bold text-[15px] tracking-[0.12em]">MANUAL CHECK-IN</h3>
                    <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">Walk-in verification</p>
                  </div>
                </div>
                <button onClick={onClose}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
                  <X size={15} color="#71717A" />
                </button>
              </div>

              {/* Search */}
              <div className="px-5 pt-4 flex-shrink-0">
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.09)' }}>
                  <Search size={15} className="text-zinc-600 flex-shrink-0" />
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name, ID or phone..."
                    autoFocus
                    className="flex-1 bg-transparent font-rajdhani text-white text-[13px] tracking-wider
                               outline-none placeholder:text-zinc-700" />
                  {search && (
                    <button onClick={() => setSearch('')}
                      className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-white/[0.06]">
                      <X size={11} className="text-zinc-500" />
                    </button>
                  )}
                </div>
              </div>

              {/* Count + filter info */}
              <div className="px-5 pt-3 pb-1 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <MapPin size={11} className="text-zinc-600" />
                  <span className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.12em] uppercase font-medium">
                    <span className="text-white font-bold">{filtered.length}</span> members found
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                  style={{ background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.15)' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-rajdhani text-green-400 text-[9px] tracking-widest uppercase font-bold">
                    {members.filter(m => m.isLive).length} Active
                  </span>
                </div>
              </div>

              {/* Member list */}
              <div className="flex-1 overflow-y-auto px-5 pb-5 pt-2 space-y-2">
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                      style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)' }}>
                      <Search size={24} className="text-zinc-800" strokeWidth={1.5} />
                    </div>
                    <p className="font-orbitron text-zinc-600 text-[13px] tracking-[0.15em]">NO MEMBERS FOUND</p>
                  </div>
                ) : (
                  filtered.map(m => {
                    const isTrial   = m.membershipStatus==='trial';
                    const tierCfg   = isTrial ? TRIAL_CFG : getTier(m.membershipType);
                    const statusCfg = getStatus(m.membershipStatus);
                    const accent    = tierCfg.color;
                    return (
                      <button key={m.id} onClick={() => setSelected(m)}
                        className="group w-full flex items-center gap-3.5 p-4 rounded-2xl text-left
                                   transition-all duration-300 hover:scale-[1.01]"
                        style={{
                          background: m.isLive?'rgba(34,197,94,0.05)':'rgba(255,255,255,0.02)',
                          border:`1px solid ${m.isLive?'rgba(34,197,94,0.15)':'rgba(255,255,255,0.06)'}`,
                        }}>

                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center font-orbitron font-bold text-[14px] flex-shrink-0"
                          style={{ background:`${accent}14`, border:`1.5px solid ${accent}28`, color: accent }}>
                          {m.avatar}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-orbitron text-white font-bold text-[13px] tracking-[0.05em] truncate">{m.name}</span>
                            {m.isLive && <PulseDot color={GREEN} size={4} />}
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md"
                              style={{ background:`${accent}10`, border:`1px solid ${accent}18` }}>
                              <span className="font-orbitron text-[7px] font-bold tracking-widest" style={{ color: accent }}>
                                {tierCfg.badge}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md"
                              style={{ background:`${statusCfg.color}08`, border:`1px solid ${statusCfg.color}18` }}>
                              <span className="font-orbitron text-[7px] font-bold tracking-widest" style={{ color: statusCfg.color }}>
                                {statusCfg.label}
                              </span>
                            </div>
                            <span className="font-mono text-zinc-600 text-[9px]">{m.memberId}</span>
                          </div>
                        </div>

                        {/* Status indicator */}
                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          {m.isLive ? (
                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
                              style={{ background:'rgba(234,179,8,0.10)', border:'1px solid rgba(234,179,8,0.22)' }}>
                              <LogOut size={11} className="text-yellow-400" />
                              <span className="font-orbitron text-yellow-400 text-[8px] font-bold tracking-widest">OUT</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
                              style={{ background:'rgba(34,197,94,0.10)', border:'1px solid rgba(34,197,94,0.22)' }}>
                              <LogIn size={11} className="text-green-400" />
                              <span className="font-orbitron text-green-400 text-[8px] font-bold tracking-widest">IN</span>
                            </div>
                          )}
                          <ChevronRight size={14} className="text-white/15 group-hover:text-white/40 transition-colors" />
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>,
    document.body
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN DASHBOARD                                                  */
/* ═══════════════════════════════════════════════════════════════ */
const AdminDashboard = ({ onLogout }) => {
  const nav  = useNavigate();
  const [time,          setTime]          = useState(new Date());
  const [showCheckIn,   setShowCheckIn]   = useState(false);
  const [checkInMembers, setCheckInMembers] = useState(OFFLINE_MEMBERS);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = () => {
    const h = time.getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <Layout title="DASHBOARD" onLogout={onLogout}>

      {/* Manual Check-In Modal */}
      {showCheckIn && (
        <ManualCheckInModal
          onClose={() => setShowCheckIn(false)}
          members={checkInMembers}
          setMembers={setCheckInMembers}
        />
      )}

      {/* Background */}
      <div className="relative min-h-screen">
        <div className="fixed inset-0 z-0"
          style={{ backgroundImage:`url(${SPLASH_BG})`, backgroundSize:'cover', backgroundPosition:'center' }} />
        <div className="fixed inset-0 z-[1]" style={{
          background:`
            radial-gradient(ellipse at 20% 0%, rgba(234,179,8,0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(168,85,247,0.04) 0%, transparent 50%),
            linear-gradient(180deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.96) 40%, #000000 100%)
          `,
        }} />

        <div className="relative z-10 p-8 lg:p-10 space-y-8 max-w-[1600px] mx-auto">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-5">
              {GYM_LOGO && (
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/[0.1]
                                flex items-center justify-center p-2 shadow-xl shadow-black/20"
                  style={{ backgroundColor:'#000000' }}>
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

            <div className="flex items-center gap-4">
              <GlassPanel className="hidden lg:block px-6 py-3" gradient="#000000">
                <div className="flex items-center gap-4">
                  <Clock size={18} className="text-[#C5A059]" />
                  <div>
                    <span className="font-orbitron text-white text-[16px] font-bold tracking-wider block">
                      {time.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' })}
                    </span>
                    <span className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.15em] uppercase">
                      {time.toLocaleDateString('en-US', { weekday:'short', day:'numeric', month:'short' })}
                    </span>
                  </div>
                </div>
              </GlassPanel>

              <button onClick={() => nav('/upgrade')}
                className="h-12 px-5 rounded-2xl border border-yellow-500/20 flex items-center gap-2
                           transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background:'rgba(197,160,89,0.10)', boxShadow:'0 10px 30px rgba(197,160,89,0.08)' }}>
                <Crown size={16} className="text-[#C5A059]" />
                <span className="font-orbitron text-[10px] tracking-[0.18em] font-bold text-[#C5A059]">UPGRADE</span>
              </button>

              <button
                className="relative w-12 h-12 rounded-2xl border border-white/[0.08]
                           flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ backgroundColor:'#000000' }}>
                <Bell size={18} className="text-zinc-400" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500
                                 flex items-center justify-center border-2 border-black animate-pulse">
                  <span className="font-orbitron text-white text-[8px] font-bold">3</span>
                </span>
              </button>
            </div>
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard icon={Users}      label="Total Members"  value={MEMBERS.total}  color="#C5A059" change="+8" />
            <StatCard icon={Activity}   label="Live Now"       value={LIVE.total}     color="#22C55E" sub="currently checked in" pulse />
            <StatCard icon={DollarSign} label="Today's Revenue" value={`₹${(REVENUE.today/1000).toFixed(1)}K`} color="#C5A059" change={`+${REVENUE.growth}%`} sub="vs yesterday" />
            <StatCard icon={TrendingUp} label="Active Rate"    value="84%"            color="#A855F7" change="+3%" sub="this week" />
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-12 gap-6">

            {/* LEFT */}
            <div className="col-span-12 xl:col-span-5 space-y-6">

              {/* Live Roster */}
              <GlassPanel hover onClick={() => nav('/live-roster')} className="group"
                borderColor="rgba(34,197,94,0.15)" glow="rgba(34,197,94,0.08)">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <PulseDot color="#22C55E" size={8} />
                      <div>
                        <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em] mb-1">LIVE ROSTER</h3>
                        <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.15em] uppercase">Real-time activity monitor</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl group-hover:bg-green-500/[0.08] transition-all"
                      style={{ border:'1px solid rgba(34,197,94,0.2)' }}>
                      <Wifi size={12} className="text-green-400" />
                      <span className="font-rajdhani text-green-400 text-[10px] tracking-[0.15em] uppercase font-bold">Live</span>
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
                    <p className="font-rajdhani text-zinc-400 text-[12px] tracking-[0.2em] uppercase font-medium">Currently Active Members</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      { label:'Elite',     count:LIVE.elite,    color:TIER_COLORS.elite.primary,     icon:Crown        },
                      { label:'Legendary', count:LIVE.legendary,color:TIER_COLORS.legendary.primary, icon:Star         },
                      { label:'Trial',     count:LIVE.trial,    color:TIER_COLORS.trial.primary,     icon:Zap          },
                      { label:'Expired',   count:LIVE.expired,  color:TIER_COLORS.expired.primary,   icon:AlertCircle  },
                    ].map(tier => (
                      <div key={tier.label} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:`${tier.color}10` }}>
                          <tier.icon size={12} style={{ color:tier.color }} />
                        </div>
                        <span className="font-rajdhani text-[11px] tracking-[0.12em] uppercase font-semibold w-20"
                          style={{ color:`${tier.color}CC` }}>{tier.label}</span>
                        <div className="flex-1 h-[4px] bg-white/[0.06] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000"
                            style={{ width:`${(tier.count/LIVE.total)*100}%`, background:`linear-gradient(90deg,${tier.color},${tier.color}60)`, boxShadow:`0 0 8px ${tier.color}40` }} />
                        </div>
                        <span className="font-orbitron text-white font-bold text-[13px] w-6 text-right">{tier.count}</span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-green-500/[0.2] to-transparent mb-5" />
                  <div className="flex items-center justify-between px-5 py-4 rounded-xl border border-green-500/[0.12] group-hover:border-green-500/[0.25] transition-all"
                    style={{ backgroundColor:'#000000' }}>
                    <div className="flex items-center gap-3">
                      <Eye size={16} className="text-green-400" />
                      <span className="font-rajdhani text-white font-bold text-[12px] tracking-[0.12em] uppercase">View Full Roster</span>
                    </div>
                    <ArrowRight size={18} className="text-green-400/60 group-hover:text-green-400 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </GlassPanel>

              {/* Quick Actions */}
              <GlassPanel>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#C5A059] to-[#C5A059]/20" />
                    <div>
                      <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.15em]">QUICK ACTIONS</h3>
                      <p className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.15em] uppercase">Frequently used commands</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <CommandButton icon={UserPlus} label="Add Member" sublabel="Register new member" color="#C5A059" onClick={() => nav('/members')} />
                    <CommandButton icon={Package}  label="Create Plan" sublabel="New membership plan" color="#A855F7" onClick={() => nav('/plans/add')} badge="NEW" />
                    <CommandButton icon={Dumbbell} label="Manage Trainers" sublabel={`${MEMBERS.trainer} active trainers`} color="#22D3EE" onClick={() => nav('/trainers')} />
                    {/* ✅ Manual Check-In opens modal */}
                    <CommandButton
                      icon={UserCheck}
                      label="Manual Check-In"
                      sublabel="Walk-in verification"
                      color="#22C55E"
                      onClick={() => setShowCheckIn(true)}
                      badge="LIVE"
                    />
                  </div>
                </div>
              </GlassPanel>
            </div>

            {/* RIGHT */}
            <div className="col-span-12 xl:col-span-7 space-y-6">

              {/* Members Breakdown */}
              <GlassPanel className="relative overflow-hidden">
                {GYM_LOGO && (
                  <img src={GYM_LOGO} alt=""
                    className="absolute right-8 top-1/2 -translate-y-1/2 w-[240px] h-[120px] object-contain opacity-[0.03] pointer-events-none" />
                )}
                <div className="p-8 relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                        style={{ background:'rgba(197,160,89,0.10)', border:'1px solid rgba(197,160,89,0.15)', boxShadow:'0 4px 16px rgba(197,160,89,0.08)' }}>
                        <Users size={20} className="text-[#C5A059]" />
                      </div>
                      <div>
                        <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em] mb-1">MEMBERSHIP</h3>
                        <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.15em] uppercase">Tier distribution & analytics</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.2em] uppercase text-right mb-1">Total Members</p>
                      <p className="font-orbitron text-white font-extralight text-[36px] leading-none text-right">
                        <AnimatedNumber value={MEMBERS.total} />
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <TierBadge icon={Crown}     label="Elite Members" count={MEMBERS.elite}     color={TIER_COLORS.elite.primary}     total={MEMBERS.total} />
                    <TierBadge icon={Sparkles}  label="Legendary"     count={MEMBERS.legendary} color={TIER_COLORS.legendary.primary} total={MEMBERS.total} />
                    <TierBadge icon={Zap}       label="Trial Members" count={MEMBERS.trial}     color={TIER_COLORS.trial.primary}     total={MEMBERS.total} />
                    <TierBadge icon={AlertCircle} label="Expired"     count={MEMBERS.expired}   color={TIER_COLORS.expired.primary}   total={MEMBERS.total} />
                  </div>
                  <div className="flex items-center justify-between px-5 py-4 rounded-2xl"
                    style={{ background:'#000000', border:`1px solid ${TIER_COLORS.trainer.border}` }}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:'rgba(34,211,238,0.12)' }}>
                        <Dumbbell size={16} className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-rajdhani text-cyan-400 text-[12px] font-bold tracking-[0.12em] uppercase leading-none mb-1">Professional Trainers</p>
                        <p className="font-rajdhani text-cyan-400/70 text-[10px] tracking-[0.1em] uppercase font-medium">Active on roster</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-orbitron text-cyan-400 text-[24px] font-bold">{MEMBERS.trainer}</span>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/[0.10] border border-cyan-500/[0.2]">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="font-rajdhani text-cyan-400 text-[9px] tracking-[0.1em] uppercase font-bold">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassPanel>

              {/* Revenue */}
              <GlassPanel hover onClick={() => nav('/expenses')} className="group"
                borderColor="rgba(197,160,89,0.12)" glow="rgba(197,160,89,0.06)">
                <div className="absolute top-0 left-10 right-10 h-[2px]"
                  style={{ background:'linear-gradient(90deg,transparent,rgba(197,160,89,0.4),transparent)' }} />
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                        style={{ background:'rgba(197,160,89,0.10)', border:'1px solid rgba(197,160,89,0.15)', boxShadow:'0 4px 16px rgba(197,160,89,0.08)' }}>
                        <CreditCard size={20} className="text-[#C5A059]" />
                      </div>
                      <div>
                        <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em] mb-1">REVENUE</h3>
                        <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.15em] uppercase">Today's financial performance</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/[0.08] border border-green-500/[0.15]">
                      <TrendingUp size={12} className="text-green-400" />
                      <span className="font-orbitron text-green-400 text-[11px] font-bold">+{REVENUE.growth}%</span>
                    </div>
                  </div>
                  <div className="mb-8">
                    <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.2em] uppercase mb-2 font-medium">Total Collection</p>
                    <span className="font-orbitron text-[#C5A059] font-extralight text-[52px] leading-none">
                      ₹<AnimatedNumber value={REVENUE.today} />
                    </span>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Target size={12} className="text-zinc-500" />
                          <span className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.12em] uppercase font-medium">Daily Target Progress</span>
                        </div>
                        <span className="font-orbitron text-zinc-300 text-[11px] font-bold">75%</span>
                      </div>
                      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000"
                          style={{ width:'75%', background:'linear-gradient(90deg,#C5A059,#EAB308)', boxShadow:'0 0 12px rgba(197,160,89,0.4)' }} />
                      </div>
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-6" />
                  <div className="grid grid-cols-3 gap-6">
                    <RevenueItem label="Memberships" amount={REVENUE.memberships} percentage={71} color="#C5A059" icon={CreditCard} />
                    <RevenueItem label="Renewals"    amount={REVENUE.renewals}    percentage={18} color="#A855F7" icon={CalendarCheck} />
                    <RevenueItem label="Others"      amount={REVENUE.others}      percentage={11} color="#3B82F6" icon={Package} />
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent my-6" />
                  <div className="flex items-center justify-center gap-3 group-hover:gap-4 transition-all">
                    <BarChart3 size={14} className="text-[#C5A059]/50 group-hover:text-[#C5A059]/80 transition-colors" />
                    <span className="font-rajdhani text-white/50 group-hover:text-white/70 text-[11px] tracking-[0.12em] uppercase transition-colors">
                      Click for detailed analytics
                    </span>
                    <ArrowRight size={14} className="text-white/30 group-hover:text-[#C5A059]/80 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </GlassPanel>

              {/* Alerts */}
              <GlassPanel borderColor="rgba(239,68,68,0.12)" className="hover:border-red-500/20 transition-all duration-300">
                <div className="p-6 flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background:'rgba(239,68,68,0.10)', border:'1px solid rgba(239,68,68,0.15)', boxShadow:'0 4px 16px rgba(239,68,68,0.08)' }}>
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
                      <span className="font-orbitron text-red-400 text-[14px] font-bold">{MEMBERS.expired}</span>
                    </div>
                    <button className="w-9 h-9 rounded-lg border border-red-500/[0.2] flex items-center justify-center hover:opacity-80 transition-colors"
                      style={{ backgroundColor:'#000000' }}>
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