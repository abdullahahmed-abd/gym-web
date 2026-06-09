// TrainerAttendanceLog.jsx — FULL DASHBOARD-MATCHING PREMIUM UI
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  ArrowLeft, Clock, Calendar, LogIn, LogOut,
  CheckCircle, X, Shield, Eye, Target, User,
  TrendingUp, Dumbbell, Activity, ChevronRight, Hash,
} from 'lucide-react';

import splashBg from '../../../../../src/assets/splash-bg.jpg';
const SPLASH_BG = splashBg;

const CYAN  = '#22D3EE';
const GOLD  = '#C5A059';
const GREEN = '#22C55E';
const RED   = '#EF4444';

/* ── Attendance Data ── */
const WEEKLY_LOG = [
  { date:'20 Jan', day:'Mon', status:'present', checkin:'6:15 AM', checkout:null,      duration:'2h 30m (ongoing)' },
  { date:'19 Jan', day:'Sun', status:'present', checkin:'6:10 AM', checkout:'3:00 PM', duration:'8h 50m' },
  { date:'18 Jan', day:'Sat', status:'absent',  checkin:null,      checkout:null,      duration:null },
  { date:'17 Jan', day:'Fri', status:'present', checkin:'6:30 AM', checkout:'2:30 PM', duration:'8h 00m' },
  { date:'16 Jan', day:'Thu', status:'present', checkin:'6:05 AM', checkout:'2:50 PM', duration:'8h 45m' },
  { date:'15 Jan', day:'Wed', status:'present', checkin:'6:20 AM', checkout:'3:10 PM', duration:'8h 50m' },
  { date:'14 Jan', day:'Tue', status:'present', checkin:'6:25 AM', checkout:'2:40 PM', duration:'8h 15m' },
];
const MONTHLY_LOG = [
  ...WEEKLY_LOG,
  { date:'13 Jan', day:'Mon', status:'present', checkin:'6:20 AM', checkout:'2:55 PM', duration:'8h 35m' },
  { date:'12 Jan', day:'Sun', status:'absent',  checkin:null,      checkout:null,      duration:null },
  { date:'11 Jan', day:'Sat', status:'present', checkin:'6:30 AM', checkout:'3:00 PM', duration:'8h 30m' },
  { date:'10 Jan', day:'Fri', status:'present', checkin:'6:15 AM', checkout:'2:45 PM', duration:'8h 30m' },
  { date:'9 Jan',  day:'Thu', status:'present', checkin:'6:10 AM', checkout:'2:50 PM', duration:'8h 40m' },
  { date:'8 Jan',  day:'Wed', status:'absent',  checkin:null,      checkout:null,      duration:null },
  { date:'7 Jan',  day:'Tue', status:'present', checkin:'6:25 AM', checkout:'3:05 PM', duration:'8h 40m' },
];
const YEARLY_LOG = [
  ...MONTHLY_LOG,
  { date:'6 Jan',  day:'Mon', status:'present', checkin:'6:20 AM', checkout:'2:40 PM', duration:'8h 20m' },
  { date:'5 Jan',  day:'Sun', status:'present', checkin:'6:30 AM', checkout:'3:10 PM', duration:'8h 40m' },
  { date:'4 Jan',  day:'Sat', status:'absent',  checkin:null,      checkout:null,      duration:null },
  { date:'3 Jan',  day:'Fri', status:'present', checkin:'6:15 AM', checkout:'2:50 PM', duration:'8h 35m' },
  { date:'2 Jan',  day:'Thu', status:'present', checkin:'6:10 AM', checkout:'2:45 PM', duration:'8h 35m' },
  { date:'1 Jan',  day:'Wed', status:'present', checkin:'7:00 AM', checkout:'1:00 PM', duration:'6h 00m' },
];

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
/* STAT CARD (dashboard top-metrics style)                         */
/* ═══════════════════════════════════════════════════════════════ */
const StatCard = ({ icon: Icon, label, value, color, sub, pulse }) => (
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
      <p className="font-orbitron text-white font-bold text-[28px] leading-none mb-1
                    transition-all duration-300 group-hover:text-[30px]" style={{ color }}>
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
/* LOG ROW — Dashboard Card Style                                  */
/* ═══════════════════════════════════════════════════════════════ */
const LogRow = ({ log }) => {
  const isPresent = log.status === 'present';
  const isOngoing = log.checkout === null && isPresent;

  return (
    <div className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.005]"
      style={{
        background: '#000000',
        border: `1px solid ${isOngoing ? 'rgba(34,197,94,0.15)' : isPresent ? 'rgba(255,255,255,0.06)' : 'rgba(239,68,68,0.10)'}`,
      }}>

      {/* ── Day badge ── */}
      <div className="w-12 flex flex-col items-center justify-center py-3 rounded-xl flex-shrink-0 transition-all group-hover:scale-105"
        style={{
          background: isPresent ? `${CYAN}08` : 'rgba(239,68,68,0.06)',
          border: `1px solid ${isPresent ? `${CYAN}18` : 'rgba(239,68,68,0.15)'}`,
        }}>
        <span className="font-orbitron text-[10px] font-bold tracking-wider"
          style={{ color: isPresent ? CYAN : RED }}>{log.day}</span>
        <span className="font-rajdhani text-zinc-600 text-[9px] mt-0.5 tracking-wide">
          {log.date?.split(' ')[0]}
        </span>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0">
        {/* Row 1: Date + status badge */}
        <div className="flex items-center gap-2.5 mb-2">
          <span className="font-orbitron text-white text-[12px] font-bold tracking-[0.06em]">{log.date}</span>

          {/* Status */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg"
            style={{
              background: isOngoing ? 'rgba(34,197,94,0.10)' : isPresent ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
              border: `1px solid ${isOngoing ? 'rgba(34,197,94,0.25)' : isPresent ? 'rgba(34,197,94,0.18)' : 'rgba(239,68,68,0.20)'}`,
            }}>
            {isOngoing
              ? <PulseDot color={GREEN} size={4} />
              : isPresent
                ? <CheckCircle size={9} color={GREEN} />
                : <X size={9} color={RED} />}
            <span className="font-orbitron text-[8px] font-bold tracking-[0.12em]"
              style={{ color: isPresent ? GREEN : RED }}>
              {isOngoing ? 'IN GYM' : isPresent ? 'PRESENT' : 'ABSENT'}
            </span>
          </div>
        </div>

        {/* Row 2: Time info */}
        {isPresent ? (
          <div className="flex items-center gap-3 flex-wrap">
            {/* Check-in */}
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md flex items-center justify-center"
                style={{ background: 'rgba(34,197,94,0.10)' }}>
                <LogIn size={10} color={GREEN} />
              </div>
              <span className="font-orbitron text-green-400 text-[10px] font-bold">{log.checkin}</span>
            </div>

            <div className="w-px h-3 bg-white/[0.06]" />

            {/* Check-out */}
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md flex items-center justify-center"
                style={{ background: isOngoing ? `${CYAN}10` : 'rgba(239,68,68,0.08)' }}>
                <LogOut size={10} style={{ color: isOngoing ? CYAN : '#9CA3AF' }} />
              </div>
              <span className="font-orbitron text-[10px] font-bold"
                style={{ color: isOngoing ? CYAN : '#6B7280' }}>
                {isOngoing ? 'Still here' : log.checkout}
              </span>
            </div>

            <div className="w-px h-3 bg-white/[0.06]" />

            {/* Duration */}
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md flex items-center justify-center"
                style={{ background: 'rgba(197,160,89,0.10)' }}>
                <Clock size={10} color={GOLD} />
              </div>
              <span className="font-orbitron text-zinc-300 text-[10px] font-bold">{log.duration}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md flex items-center justify-center"
              style={{ background: 'rgba(239,68,68,0.08)' }}>
              <X size={10} color={RED} />
            </div>
            <span className="font-rajdhani text-zinc-600 text-[11px] tracking-wide">
              Did not check in
            </span>
          </div>
        )}
      </div>

      {/* ── Right: duration pill ── */}
      {isPresent && !isOngoing && (
        <div className="flex-shrink-0 px-3 py-1.5 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="font-orbitron text-zinc-400 text-[10px] font-bold">{log.duration}</span>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN                                                            */
/* ═══════════════════════════════════════════════════════════════ */
const TrainerAttendanceLog = ({ onLogout }) => {
  const nav      = useNavigate();
  const location = useLocation();
  const trainer  = location.state?.trainer;
  const [activeTab, setActiveTab] = useState('weekly');

  /* ── Not found ── */
  if (!trainer) {
    return (
      <Layout title="ATTENDANCE LOG" onLogout={onLogout}>
        <div className="flex items-center justify-center min-h-screen bg-black">
          <GlassPanel className="p-12 text-center max-w-md mx-auto">
            <p className="font-orbitron text-zinc-500 text-[14px] tracking-[0.15em] mb-4">TRAINER NOT FOUND</p>
            <button onClick={() => nav('/trainers')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl mx-auto transition-all hover:scale-105"
              style={{ background: `${CYAN}08`, border: `1px solid ${CYAN}18` }}>
              <ArrowLeft size={14} style={{ color: CYAN }} />
              <span className="font-rajdhani font-bold text-[11px] tracking-widest uppercase"
                style={{ color: CYAN }}>Back to Trainers</span>
            </button>
          </GlassPanel>
        </div>
      </Layout>
    );
  }

  const logData = activeTab === 'weekly' ? WEEKLY_LOG : activeTab === 'monthly' ? MONTHLY_LOG : YEARLY_LOG;
  const presentCount = logData.filter(l => l.status === 'present').length;
  const absentCount  = logData.filter(l => l.status === 'absent').length;
  const attendancePct = Math.round((presentCount / logData.length) * 100);

  const tabLabel = activeTab === 'weekly' ? 'Last 7 Days' : activeTab === 'monthly' ? 'Last 30 Days' : 'This Year';

  return (
    <Layout title="ATTENDANCE LOG" onLogout={onLogout}>
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

        <div className="relative z-10 p-8 lg:p-10 space-y-6 max-w-[1200px] mx-auto">

          {/* ═══════════════════════════════════════════════════════ */}
          {/* HEADER                                                 */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <button onClick={() => nav('/trainer-detail', { state: { trainer } })}
                className="group w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{ background: '#000', border: '1px solid rgba(255,255,255,0.08)' }}>
                <ArrowLeft size={18} className="text-zinc-400 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
              </button>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `${CYAN}12`, border: `1px solid ${CYAN}22`, boxShadow: `0 4px 16px ${CYAN}08` }}>
                <Activity size={24} style={{ color: CYAN }} />
              </div>

              <div>
                <p className="font-rajdhani text-[12px] tracking-[0.3em] uppercase font-bold mb-1"
                  style={{ color: CYAN }}>
                  {trainer.name} · {tabLabel}
                </p>
                <h1 className="font-orbitron text-white font-extrabold text-[28px] tracking-[0.15em]
                               bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  ATTENDANCE LOG
                </h1>
              </div>
            </div>

            {/* Trainer mini badge */}
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{ background: `${CYAN}08`, border: `1px solid ${CYAN}15` }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${CYAN}15`, border: `1px solid ${CYAN}25` }}>
                <span className="font-orbitron font-bold text-[11px]" style={{ color: CYAN }}>
                  {trainer.name?.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-orbitron text-white text-[12px] font-bold tracking-wider">{trainer.name}</p>
                <p className="font-mono text-zinc-500 text-[10px]">{trainer.memberId}</p>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* STAT CARDS (dashboard pattern)                         */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={CheckCircle}  label="Present Days" value={presentCount}        color={GREEN} pulse sub={`${attendancePct}% rate`} />
            <StatCard icon={X}             label="Absent Days"  value={absentCount}         color={RED}   sub="missed days" />
            <StatCard icon={Calendar}      label="Total Days"   value={logData.length}      color={CYAN}  sub={tabLabel} />
            <StatCard icon={TrendingUp}    label="Attendance"   value={`${attendancePct}%`} color={GOLD}  sub="rate" />
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* PERIOD TABS                                            */}
          {/* ═══════════════════════════════════════════════════════ */}
          <GlassPanel>
            <div className="p-2 flex items-center gap-2">
              {[
                { id: 'weekly',  label: 'Weekly',  sub: '7 days'  },
                { id: 'monthly', label: 'Monthly', sub: '30 days' },
                { id: 'yearly',  label: 'Yearly',  sub: 'annual'  },
              ].map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className="flex-1 py-3 rounded-2xl transition-all duration-300"
                    style={{
                      background: isActive ? `${CYAN}12` : 'transparent',
                      border: isActive ? `1px solid ${CYAN}25` : '1px solid transparent',
                    }}>
                    <p className="font-orbitron text-[11px] font-bold tracking-[0.12em] uppercase"
                      style={{ color: isActive ? CYAN : '#52525B' }}>
                      {tab.label}
                    </p>
                    <p className="font-rajdhani text-[9px] tracking-wider uppercase mt-0.5"
                      style={{ color: isActive ? `${CYAN}80` : '#3F3F46' }}>
                      {tab.sub}
                    </p>
                  </button>
                );
              })}
            </div>
          </GlassPanel>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* ATTENDANCE RATE BAR                                    */}
          {/* ═══════════════════════════════════════════════════════ */}
          <GlassPanel borderColor={`${CYAN}12`} glow={`${CYAN}04`}>
            <div className="absolute top-0 left-8 right-8 h-[2px]"
              style={{ background: `linear-gradient(90deg,transparent,${CYAN}35,transparent)` }} />
            <div className="p-7">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#22D3EE] to-[#22D3EE]/20" />
                  <div>
                    <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.15em]">
                      ATTENDANCE RATE
                    </h3>
                    <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">
                      {tabLabel} performance
                    </p>
                  </div>
                </div>
                <span className="font-orbitron font-extralight text-[36px] leading-none" style={{ color: CYAN }}>
                  {attendancePct}%
                </span>
              </div>

              {/* Progress bars */}
              <div className="space-y-4">
                {/* Present */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      <span className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.12em] uppercase font-semibold">
                        Present
                      </span>
                    </div>
                    <span className="font-orbitron text-green-400 text-[13px] font-bold">{presentCount} days</span>
                  </div>
                  <div className="h-2.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${(presentCount / logData.length) * 100}%`,
                        background: 'linear-gradient(90deg,#22C55E,#16A34A)',
                        boxShadow: '0 0 12px rgba(34,197,94,0.35)',
                      }} />
                  </div>
                </div>

                {/* Absent */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.12em] uppercase font-semibold">
                        Absent
                      </span>
                    </div>
                    <span className="font-orbitron text-red-400 text-[13px] font-bold">{absentCount} days</span>
                  </div>
                  <div className="h-2.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${(absentCount / logData.length) * 100}%`,
                        background: 'linear-gradient(90deg,#EF4444,#DC2626)',
                        boxShadow: '0 0 12px rgba(239,68,68,0.30)',
                      }} />
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* LOG ENTRIES                                            */}
          {/* ═══════════════════════════════════════════════════════ */}
          <GlassPanel className="flex flex-col">
            {/* Section header */}
            <div className="p-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-white/40 to-white/[0.05]" />
                  <div>
                    <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em]">
                      {activeTab === 'weekly' ? 'WEEKLY' : activeTab === 'monthly' ? 'MONTHLY' : 'YEARLY'} LOG
                    </h3>
                    <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.15em] uppercase">
                      {logData.length} entries · {tabLabel}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Eye size={12} className="text-zinc-600" />
                  <span className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.12em] uppercase font-bold">
                    {logData.length} records
                  </span>
                </div>
              </div>
            </div>

            {/* Log rows */}
            <div className="p-6 space-y-3">
              {logData.map((log, i) => (
                <LogRow key={`${activeTab}-${i}`} log={log} />
              ))}
            </div>

            {/* Footer totals */}
            <div className="px-6 py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                    style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                    <CheckCircle size={13} color={GREEN} />
                    <span className="font-orbitron text-green-400 text-[12px] font-bold">{presentCount}</span>
                    <span className="font-rajdhani text-zinc-500 text-[10px] tracking-wider uppercase">present</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
                    <X size={13} color={RED} />
                    <span className="font-orbitron text-red-400 text-[12px] font-bold">{absentCount}</span>
                    <span className="font-rajdhani text-zinc-500 text-[10px] tracking-wider uppercase">absent</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-rajdhani text-zinc-500 text-[11px] tracking-wider uppercase">Rate</span>
                  <span className="font-orbitron text-[18px] font-bold" style={{ color: CYAN }}>{attendancePct}%</span>
                </div>
              </div>
            </div>
          </GlassPanel>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* FOOTER NOTICE                                          */}
          {/* ═══════════════════════════════════════════════════════ */}
          <GlassPanel borderColor={`${CYAN}10`}>
            <div className="p-5 flex items-center gap-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${CYAN}08`, border: `1px solid ${CYAN}15` }}>
                <Shield size={16} style={{ color: CYAN }} />
              </div>
              <div className="flex-1">
                <p className="font-rajdhani text-white text-[12px] font-bold tracking-[0.12em] uppercase mb-0.5">
                  Attendance Records
                </p>
                <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.10em] uppercase font-medium">
                  Logs are auto-synced · Changes reflect immediately across the system
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl flex-shrink-0"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-rajdhani text-green-400 text-[9px] tracking-[0.12em] uppercase font-bold">
                  Synced
                </span>
              </div>
            </div>
          </GlassPanel>

        </div>
      </div>
    </Layout>
  );
};

export default TrainerAttendanceLog;