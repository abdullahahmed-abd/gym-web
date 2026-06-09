// TrainerDetail.jsx — FULL DASHBOARD-MATCHING PREMIUM UI
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  ArrowLeft, Calendar, CheckCircle, Clock,
  ClipboardList, Dumbbell, X, Phone,
  MessageCircle, ChevronRight, Shield,
  Eye, Target, Star, Hash, User, Wifi,
} from 'lucide-react';

import splashBg from '../../../../../src/assets/splash-bg.jpg';
const SPLASH_BG = splashBg;

const CYAN  = '#22D3EE';
const GOLD  = '#C5A059';
const GREEN = '#22C55E';

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
          style={{
            background: `linear-gradient(135deg, ${color}15, ${color}08)`,
            border: `1px solid ${color}20`,
          }}>
          <Icon size={17} style={{ color }} />
        </div>
        {pulse && <PulseDot color={color} size={6} />}
      </div>
      <p className="font-orbitron text-white font-bold text-[22px] leading-none mb-1
                    transition-all duration-300 group-hover:text-[24px]">
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
/* INFO ROW                                                        */
/* ═══════════════════════════════════════════════════════════════ */
const InfoRow = ({ icon: Icon, label, value, valueColor, color = CYAN, last }) => (
  <div className={`flex items-center justify-between py-3.5`}
    style={{ borderBottom: !last ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}10`, border: `1px solid ${color}15` }}>
        <Icon size={13} style={{ color }} />
      </div>
      <span className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.15em] uppercase font-semibold">
        {label}
      </span>
    </div>
    <span className="font-orbitron text-[12px] font-bold tracking-wider"
      style={{ color: valueColor || 'rgba(255,255,255,0.90)' }}>
      {value}
    </span>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* ACTION BUTTON (dashboard CommandButton style)                   */
/* ═══════════════════════════════════════════════════════════════ */
const ActionBtn = ({ icon: Icon, label, sub, color, onClick, badge }) => (
  <button onClick={onClick}
    className="group relative flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-left
               transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
    style={{ background: '#000', border: '1px solid rgba(255,255,255,0.07)' }}>
    {/* Hover glow */}
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{ background: `radial-gradient(circle at 30% 50%, ${color}08 0%, transparent 70%)` }} />
    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 z-10
                    transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
      style={{ background: `${color}10`, border: `1px solid ${color}18`, boxShadow: `0 4px 12px ${color}08` }}>
      <Icon size={18} style={{ color }} />
    </div>
    <div className="flex-1 min-w-0 z-10">
      <p className="font-rajdhani text-white text-[13px] font-bold tracking-[0.10em] uppercase">{label}</p>
      {sub && (
        <p className="font-rajdhani text-zinc-500 text-[11px] tracking-wide mt-0.5 truncate">{sub}</p>
      )}
    </div>
    {badge && (
      <span className="px-2.5 py-1 rounded-lg text-[9px] font-orbitron font-bold z-10"
        style={{ background: `${color}12`, color, border: `1px solid ${color}22` }}>{badge}</span>
    )}
    <ChevronRight size={16}
      className="text-white/15 group-hover:text-white/40 group-hover:translate-x-1 transition-all z-10" />
  </button>
);

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN                                                            */
/* ═══════════════════════════════════════════════════════════════ */
const TrainerDetail = ({ onLogout }) => {
  const nav      = useNavigate();
  const location = useLocation();
  const trainer  = location.state?.trainer;

  /* ── Not found ── */
  if (!trainer) {
    return (
      <Layout title="TRAINER DETAIL" onLogout={onLogout}>
        <div className="relative min-h-screen">
          <div className="fixed inset-0 z-0"
            style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0.95) 0%,#000 100%)' }} />
          <div className="relative z-10 flex items-center justify-center min-h-screen">
            <GlassPanel className="p-12 text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <User size={28} className="text-zinc-700" strokeWidth={1.5} />
              </div>
              <p className="font-orbitron text-zinc-500 text-[14px] tracking-[0.15em] mb-4">
                TRAINER NOT FOUND
              </p>
              <button onClick={() => nav('/trainers')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl mx-auto transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${CYAN}15, ${CYAN}05)`,
                  border: `1px solid ${CYAN}30`,
                }}>
                <ArrowLeft size={14} style={{ color: CYAN }} />
                <span className="font-rajdhani font-bold text-[11px] tracking-widest uppercase"
                  style={{ color: CYAN }}>Back to Trainers</span>
              </button>
            </GlassPanel>
          </div>
        </div>
      </Layout>
    );
  }

  const daysActive = trainer.assignedAt
    ? Math.floor((Date.now() - new Date(trainer.assignedAt).getTime()) / 86400000)
    : 0;

  const fmtDate = d =>
    new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const handleRemove = () => {
    if (window.confirm(`Remove ${trainer.name} from trainer role?\nThey will return to regular member status.`)) {
      nav('/trainers');
    }
  };

  const handleAttendance = () => nav('/trainer-attendance-log', { state: { trainer } });
  const handleCall = () => window.open(`tel:${trainer.phone}`);
  const handleWA   = () => window.open(`https://wa.me/${(trainer.phone || '').replace(/\D/g,'')}`);

  return (
    <Layout title="TRAINER DETAIL" onLogout={onLogout}>
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
            <button onClick={() => nav('/trainers')}
              className="group flex items-center gap-3 h-11 px-5 rounded-2xl transition-all duration-300 hover:scale-105"
              style={{ background: '#000', border: '1px solid rgba(255,255,255,0.08)' }}>
              <ArrowLeft size={15}
                className="text-zinc-400 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
              <span className="font-rajdhani text-zinc-400 group-hover:text-white text-[12px] tracking-[0.15em] uppercase font-bold transition-colors">
                Back
              </span>
            </button>

            <div className="flex items-center gap-3">
              {/* Live badge */}
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }}>
                <PulseDot color={GREEN} size={5} />
                <Wifi size={13} className="text-green-400" />
                <span className="font-orbitron text-green-400 text-[10px] font-bold tracking-widest">ACTIVE</span>
              </div>
              {/* Member ID */}
              <div className="px-3 py-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <span className="font-mono text-zinc-500 text-[11px]">{trainer.memberId}</span>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* HERO CARD                                              */}
          {/* ═══════════════════════════════════════════════════════ */}
          <GlassPanel borderColor={`${CYAN}20`} glow={`${CYAN}06`}>
            {/* Cyan top accent */}
            <div className="absolute top-0 left-10 right-10 h-[2px]"
              style={{ background: `linear-gradient(90deg,transparent,${CYAN}50,transparent)` }} />

            {/* Watermark */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none" style={{ opacity: 0.03 }}>
              <Dumbbell size={160} color={CYAN} />
            </div>

            <div className="p-8 relative z-10">
              <div className="flex items-start gap-6">

                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center
                                  font-orbitron font-bold text-[22px] sm:text-[26px]"
                    style={{
                      background: `linear-gradient(135deg, ${CYAN}15, ${CYAN}05)`,
                      border: `2px solid ${CYAN}35`,
                      color: CYAN,
                      boxShadow: `0 8px 32px ${CYAN}12`,
                    }}>
                    {trainer.name?.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-xl flex items-center justify-center"
                    style={{ background: '#000', border: '2px solid rgba(34,197,94,0.45)' }}>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  {/* Badges */}
                  <div className="flex items-center gap-2.5 flex-wrap mb-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                      style={{ background: `${CYAN}12`, border: `1px solid ${CYAN}22` }}>
                      <Dumbbell size={11} style={{ color: CYAN }} />
                      <span className="font-orbitron text-[9px] font-bold tracking-[0.12em]"
                        style={{ color: CYAN }}>TRAINER</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                      style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }}>
                      <PulseDot color={GREEN} size={4} />
                      <span className="font-orbitron text-green-400 text-[9px] font-bold tracking-[0.12em]">ACTIVE</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <Calendar size={10} className="text-zinc-600" />
                      <span className="font-orbitron text-zinc-500 text-[9px] font-bold tracking-wider">
                        {fmtDate(trainer.assignedAt)}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <h1 className="font-orbitron text-white font-extrabold text-[24px] sm:text-[28px] tracking-[0.10em] mb-1
                                 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                    {trainer.name}
                  </h1>

                  {/* Sub info */}
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5">
                      <Hash size={12} className="text-zinc-600" />
                      <span className="font-mono text-zinc-500 text-[11px]">{trainer.memberId}</span>
                    </div>
                    <div className="w-px h-4 bg-white/[0.08]" />
                    <div className="flex items-center gap-1.5">
                      <Star size={12} className="text-amber-400/60" />
                      <span className="font-rajdhani text-zinc-400 text-[12px] tracking-wider">
                        {daysActive} days as trainer
                      </span>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button onClick={handleRemove}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0
                             transition-all duration-300 hover:scale-110 active:scale-95"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.20)' }}>
                  <X size={16} className="text-red-400" />
                </button>
              </div>
            </div>
          </GlassPanel>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* STAT CARDS (dashboard pattern)                         */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Target}       label="Days Active"   value={`${daysActive}d`} color={CYAN}  />
            <StatCard icon={Calendar}     label="Assigned"      value={fmtDate(trainer.assignedAt)} color={GOLD} />
            <StatCard icon={CheckCircle}  label="Status"        value="Active"           color={GREEN} pulse />
            <StatCard icon={Dumbbell}     label="Role"          value="Trainer"          color={CYAN}  sub="gym staff" />
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* MAIN GRID                                              */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-12 gap-6">

            {/* ── LEFT: Attendance CTA + Info ── */}
            <div className="col-span-12 lg:col-span-7 space-y-6">

              {/* Attendance CTA */}
              <GlassPanel
                hover
                onClick={handleAttendance}
                className="group"
                borderColor={`${CYAN}20`}
                glow={`${CYAN}06`}
              >
                {/* Cyan top accent */}
                <div className="absolute top-0 left-8 right-8 h-[2px]"
                  style={{ background: `linear-gradient(90deg,transparent,${CYAN}40,transparent)` }} />

                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0
                                    transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                      style={{ background: `${CYAN}12`, border: `1px solid ${CYAN}22`,
                               boxShadow: `0 4px 16px ${CYAN}08` }}>
                      <ClipboardList size={24} style={{ color: CYAN }} />
                    </div>
                    <div>
                      <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em] mb-1
                                     group-hover:tracking-[0.18em] transition-all">
                        ATTENDANCE LOG
                      </h3>
                      <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.15em] uppercase
                                    group-hover:text-zinc-400 transition-colors">
                        Weekly · Monthly · Yearly history
                      </p>
                    </div>
                  </div>

                  {/* Preview stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { label: 'This Week',  value: '5 days' },
                      { label: 'This Month', value: '22 days' },
                      { label: 'Total',      value: `${daysActive}d` },
                    ].map(item => (
                      <div key={item.label} className="rounded-2xl p-4 text-center"
                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <p className="font-orbitron text-white font-bold text-[15px] mb-1" style={{ color: CYAN }}>
                          {item.value}
                        </p>
                        <p className="font-rajdhani text-zinc-600 text-[9px] tracking-[0.12em] uppercase">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="h-px mb-5"
                    style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)' }} />

                  {/* CTA button row */}
                  <div className="flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300
                                  group-hover:border-opacity-60"
                    style={{ background: `${CYAN}05`, border: `1px solid ${CYAN}12` }}>
                    <div className="flex items-center gap-3">
                      <Eye size={16} style={{ color: `${CYAN}70` }} />
                      <span className="font-rajdhani text-white font-bold text-[12px] tracking-[0.12em] uppercase
                                       group-hover:tracking-[0.15em] transition-all">
                        View Full Attendance Log
                      </span>
                    </div>
                    <ChevronRight size={18}
                      className="group-hover:translate-x-2 transition-all duration-300"
                      style={{ color: `${CYAN}50` }} />
                  </div>
                </div>
              </GlassPanel>

              {/* Trainer Info Card */}
              <GlassPanel borderColor={`${CYAN}12`} glow={`${CYAN}05`}>
                <div className="absolute top-0 left-8 right-8 h-[2px]"
                  style={{ background: `linear-gradient(90deg,transparent,${CYAN}30,transparent)` }} />

                <div className="p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1.5 h-8 rounded-full"
                      style={{ background: `linear-gradient(180deg, ${CYAN}, ${CYAN}20)` }} />
                    <div>
                      <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.15em]">
                        TRAINER INFO
                      </h3>
                      <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">
                        Profile & assignment details
                      </p>
                    </div>
                  </div>

                  <div className="px-1">
                    <InfoRow icon={User}         label="Full Name"    value={trainer.name}                    color={CYAN} />
                    <InfoRow icon={Hash}          label="Member ID"    value={trainer.memberId}                color={CYAN} />
                    <InfoRow icon={Dumbbell}      label="Role"         value="Gym Trainer" valueColor={CYAN}   color={CYAN} />
                    <InfoRow icon={Calendar}      label="Assigned On"  value={fmtDate(trainer.assignedAt)}    color={GOLD} />
                    <InfoRow icon={Target}        label="Days Active"  value={`${daysActive} days`} valueColor={CYAN} color={CYAN} />
                    <InfoRow icon={CheckCircle}   label="Status"       value="Active" valueColor={GREEN}       color={GREEN} last />
                  </div>
                </div>
              </GlassPanel>
            </div>

            {/* ── RIGHT: Actions ── */}
            <div className="col-span-12 lg:col-span-5 space-y-6">

              {/* Quick Actions */}
              <GlassPanel>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#C5A059] to-[#C5A059]/20" />
                    <div>
                      <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.15em]">
                        QUICK ACTIONS
                      </h3>
                      <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">
                        Frequently used commands
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <ActionBtn
                      icon={ClipboardList}
                      label="Attendance Log"
                      sub="View check-in / check-out history"
                      color={CYAN}
                      onClick={handleAttendance}
                      badge="VIEW"
                    />
                    <ActionBtn
                      icon={Phone}
                      label="Call Trainer"
                      sub={trainer.phone || 'No phone set'}
                      color={GREEN}
                      onClick={handleCall}
                    />
                    <ActionBtn
                      icon={MessageCircle}
                      label="WhatsApp"
                      sub="Send a direct message"
                      color="#25D366"
                      onClick={handleWA}
                    />
                  </div>
                </div>
              </GlassPanel>

              {/* Remove trainer danger card */}
              <GlassPanel borderColor="rgba(239,68,68,0.15)" glow="rgba(239,68,68,0.04)">
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-red-400 to-red-400/20" />
                    <div>
                      <h3 className="font-orbitron text-red-400 font-bold text-[13px] tracking-[0.15em]">
                        DANGER ZONE
                      </h3>
                      <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">
                        Irreversible action
                      </p>
                    </div>
                  </div>

                  <button onClick={handleRemove}
                    className="group relative flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-left
                               transition-all duration-300 hover:scale-[1.01]"
                    style={{ background: '#000', border: '1px solid rgba(239,68,68,0.18)' }}>
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: 'radial-gradient(circle at 30% 50%,rgba(239,68,68,0.06) 0%,transparent 70%)' }} />
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 z-10
                                    transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                      style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.20)' }}>
                      <X size={16} className="text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0 z-10">
                      <p className="font-rajdhani text-red-400 text-[13px] font-bold tracking-[0.10em] uppercase">
                        Remove Trainer
                      </p>
                      <p className="font-rajdhani text-red-400/40 text-[11px] tracking-wide mt-0.5">
                        Reverts to regular member role
                      </p>
                    </div>
                    <ChevronRight size={16}
                      className="text-red-400/25 group-hover:text-red-400/60 group-hover:translate-x-1 transition-all z-10" />
                  </button>
                </div>
              </GlassPanel>
            </div>
          </div>

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
                  Trainer Access Active
                </p>
                <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.10em] uppercase font-medium">
                  {trainer.name} has full trainer dashboard access · Removing revokes access immediately
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl flex-shrink-0"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-rajdhani text-green-400 text-[9px] tracking-[0.12em] uppercase font-bold">
                  Active
                </span>
              </div>
            </div>
          </GlassPanel>

        </div>
      </div>
    </Layout>
  );
};

export default TrainerDetail;