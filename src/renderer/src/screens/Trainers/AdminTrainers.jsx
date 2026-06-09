// AdminTrainers.jsx — FULL DASHBOARD-MATCHING PREMIUM UI
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  Dumbbell, UserPlus, X, CheckCircle, Clock,
  Calendar, UserMinus, ArrowLeft, ArrowRight,
  Users, Activity, Star, ChevronRight, Eye,
  Shield, TrendingUp, Wifi, Timer, Target,
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
/* STAT CARD (same as dashboard top metrics)                       */
/* ═══════════════════════════════════════════════════════════════ */
const StatCard = ({ icon: Icon, label, value, color, sub, pulse }) => (
  <GlassPanel hover className="group" glow={`${color}08`}>
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center
                        transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{
            background: `linear-gradient(135deg, ${color}15, ${color}08)`,
            border: `1px solid ${color}20`,
          }}>
          <Icon size={20} style={{ color }} />
        </div>
        {pulse && <PulseDot color={color} size={6} />}
      </div>
      <p className="font-orbitron text-white font-bold text-[32px] leading-none mb-1
                    transition-all duration-300 group-hover:text-[34px]">
        {value}
      </p>
      <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.15em] uppercase font-semibold">
        {label}
      </p>
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
/* TRAINER CARD — Dashboard Style                                  */
/* ═══════════════════════════════════════════════════════════════ */
const TrainerCard = ({ trainer, onRemove, onPress }) => {
  const daysActive = trainer.assignedAt
    ? Math.floor((Date.now() - new Date(trainer.assignedAt).getTime()) / 86400000)
    : 0;
  const fmtDate  = d => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const fmtShort = d => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });

  return (
    <GlassPanel
      hover
      onClick={() => onPress(trainer)}
      className="group"
      borderColor={`${CYAN}18`}
      glow={`${CYAN}05`}
    >
      {/* Cyan top accent */}
      <div className="absolute top-0 left-8 right-8 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg,transparent,${CYAN}50,transparent)` }} />

      {/* BG gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${CYAN}04, transparent 60%)` }} />

      {/* Watermark */}
      <div className="absolute -top-6 -right-6 pointer-events-none transition-transform duration-500
                      group-hover:scale-110 group-hover:rotate-12">
        <Dumbbell size={100} style={{ color: CYAN }} strokeWidth={0.3} className="opacity-[0.04]" />
      </div>

      <div className="relative p-7">

        {/* ── Row 1: Avatar + Info + Actions ── */}
        <div className="flex items-start gap-4 mb-5">

          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-orbitron font-bold text-[18px]
                            transition-all duration-300 group-hover:scale-105 group-hover:rotate-3"
              style={{
                background: `linear-gradient(135deg, ${CYAN}15, ${CYAN}05)`,
                border: `2px solid ${CYAN}30`,
                color: CYAN,
                boxShadow: `0 8px 24px ${CYAN}10`,
              }}>
              {trainer.name?.slice(0, 2).toUpperCase()}
            </div>
            {/* Live indicator */}
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: '#000', border: '2px solid rgba(34,197,94,0.40)' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-2.5">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                style={{ background: `${CYAN}10`, border: `1px solid ${CYAN}20` }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: CYAN }} />
                <span className="font-orbitron text-[8px] font-bold tracking-[0.15em] uppercase"
                  style={{ color: CYAN }}>TRAINER</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }}>
                <PulseDot color={GREEN} size={4} />
                <span className="font-orbitron text-green-400 text-[8px] font-bold tracking-widest">ACTIVE</span>
              </div>
            </div>

            {/* Name */}
            <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.08em] mb-1 truncate
                           group-hover:tracking-[0.10em] transition-all">
              {trainer.name}
            </h3>

            {/* ID */}
            <div className="flex items-center gap-2">
              <div className="px-2 py-0.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <span className="font-mono text-zinc-500 text-[10px]">{trainer.memberId}</span>
              </div>
            </div>
          </div>

          {/* Remove button */}
          <div className="flex-shrink-0">
            <button
              onClick={e => { e.stopPropagation(); onRemove(trainer); }}
              className="group/btn w-10 h-10 rounded-xl flex items-center justify-center
                         opacity-40 group-hover:opacity-100 transition-all duration-300
                         hover:scale-110 active:scale-95"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}>
              <X size={15} className="text-red-400" />
            </button>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px mb-5"
          style={{ background: `linear-gradient(90deg,transparent,${CYAN}15,transparent)` }} />

        {/* ── Stats row ── */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { icon: Target,   label: 'Days Active', value: `${daysActive}d`,        color: CYAN  },
            { icon: Calendar, label: 'Since',        value: fmtShort(trainer.assignedAt), color: GOLD  },
            { icon: CheckCircle, label: 'Status',    value: 'Active',               color: GREEN },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="rounded-2xl p-3 text-center transition-all duration-300 group-hover:scale-[1.02]"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center mx-auto mb-2"
                style={{ background: `${color}10`, border: `1px solid ${color}15` }}>
                <Icon size={12} style={{ color }} />
              </div>
              <p className="font-orbitron font-bold text-[13px]" style={{ color }}>{value}</p>
              <p className="font-rajdhani text-zinc-600 text-[8px] tracking-[0.12em] uppercase mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Joined date row ── */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl mb-4"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <Calendar size={12} className="text-zinc-600" />
          <span className="font-rajdhani text-zinc-500 text-[11px] tracking-wider flex-1">Assigned</span>
          <span className="font-orbitron text-white text-[11px] font-bold">{fmtDate(trainer.assignedAt)}</span>
        </div>

        {/* ── Footer CTA ── */}
        <div className="flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300"
          style={{ background: `${CYAN}04`, border: `1px solid ${CYAN}10` }}>
          <div className="flex items-center gap-2">
            <Eye size={13} style={{ color: `${CYAN}60` }} />
            <span className="font-rajdhani text-[11px] font-bold tracking-[0.12em] uppercase"
              style={{ color: `${CYAN}70` }}>View Full Profile</span>
          </div>
          <ChevronRight size={15} style={{ color: `${CYAN}35` }}
            className="group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </GlassPanel>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN                                                            */
/* ═══════════════════════════════════════════════════════════════ */
const AdminTrainers = ({ onLogout }) => {
  const nav = useNavigate();
  const [trainers, setTrainers] = useState([
    { id: 'm1', name: 'Abdullah Ahmed', memberId: 'GYM001', assignedAt: '2024-12-01T00:00:00Z' },
    { id: 'm4', name: 'Sneha Gupta',    memberId: 'GYM004', assignedAt: '2024-11-15T00:00:00Z' },
  ]);

  const handleRemove = trainer => {
    if (window.confirm(`Remove ${trainer.name} from trainer role?`)) {
      setTrainers(p => p.filter(t => t.id !== trainer.id));
    }
  };
  const handlePress = trainer => nav('/trainer-detail', { state: { trainer } });

  const activeCount = trainers.length;

  return (
    <Layout title="TRAINERS" onLogout={onLogout}>
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

        <div className="relative z-10 p-8 lg:p-10 space-y-8 max-w-[1400px] mx-auto">

          {/* ═══════════════════════════════════════════════════════ */}
          {/* HEADER                                                 */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <button onClick={() => nav('/dashboard')}
                className="group w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{ background: '#000', border: '1px solid rgba(255,255,255,0.08)' }}>
                <ArrowLeft size={18} className="text-zinc-400 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
              </button>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${CYAN}15, ${CYAN}06)`,
                  border: `1px solid ${CYAN}22`,
                  boxShadow: `0 4px 16px ${CYAN}08`,
                }}>
                <Dumbbell size={24} style={{ color: CYAN }} />
              </div>

              <div>
                <p className="font-rajdhani text-[12px] tracking-[0.3em] uppercase font-bold mb-1"
                  style={{ color: CYAN }}>
                  Roster Management
                </p>
                <h1 className="font-orbitron text-white font-extrabold text-[28px] tracking-[0.15em]
                               bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  TRAINERS
                </h1>
              </div>
            </div>

            <button onClick={() => nav('/add-trainer')}
              className="group flex items-center gap-3 h-12 px-6 rounded-2xl transition-all duration-300
                         hover:scale-105 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${CYAN}, #0ea5e9)`,
                boxShadow: `0 8px 32px ${CYAN}30`,
                color: '#000',
              }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-black/10 transition-all group-hover:scale-110 group-hover:rotate-12">
                <UserPlus size={16} />
              </div>
              <span className="font-orbitron text-[11px] font-bold tracking-[0.15em]">ADD TRAINER</span>
            </button>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* STAT CARDS (dashboard pattern)                         */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <StatCard icon={Users}      label="Total Trainers" value={trainers.length} color={CYAN}  sub="registered" />
            <StatCard icon={CheckCircle} label="Active Now"    value={activeCount}     color={GREEN} pulse sub="on roster" />
            <StatCard icon={Star}        label="Avg Days"      value={
              trainers.length > 0
                ? Math.round(trainers.reduce((s, t) => s + Math.floor((Date.now() - new Date(t.assignedAt)) / 86400000), 0) / trainers.length)
                : 0
            } color={GOLD} sub="active days" />
            <StatCard icon={TrendingUp} label="Performance"   value="100%" color={CYAN} sub="attendance rate" />
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* SECTION HEADER                                         */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 rounded-full"
                style={{ background: `linear-gradient(180deg, ${CYAN}, ${CYAN}20)` }} />
              <div>
                <h2 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em]">
                  ACTIVE TRAINERS
                </h2>
                <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.15em] uppercase">
                  Manage your training staff
                </p>
              </div>
            </div>

            {trainers.length > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                style={{ background: `${CYAN}10`, border: `1px solid ${CYAN}20` }}>
                <span className="font-orbitron text-[12px] font-bold" style={{ color: CYAN }}>
                  {trainers.length}
                </span>
                <span className="font-rajdhani text-zinc-500 text-[10px] tracking-wider">registered</span>
              </div>
            )}
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* TRAINER CARDS or EMPTY STATE                           */}
          {/* ═══════════════════════════════════════════════════════ */}
          {trainers.length === 0 ? (

            /* ── Empty State ── */
            <GlassPanel borderColor={`${CYAN}12`}>
              <div className="flex flex-col items-center justify-center py-28">
                <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
                    style={{ background: `${CYAN}06`, border: `1px solid ${CYAN}15` }}>
                    <UserMinus size={44} style={{ color: `${CYAN}30` }} strokeWidth={1.5} />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: '#000', border: `1px solid ${CYAN}25` }}>
                    <UserPlus size={16} style={{ color: CYAN }} />
                  </div>
                </div>

                <h3 className="font-orbitron text-white font-bold text-[20px] tracking-[0.15em] mb-3
                               bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  NO TRAINERS YET
                </h3>
                <p className="font-rajdhani text-zinc-500 text-[13px] tracking-wider text-center max-w-sm leading-relaxed mb-8">
                  Assign trainers from your member roster to get started
                </p>

                <button onClick={() => nav('/add-trainer')}
                  className="group flex items-center gap-3 px-7 py-3.5 rounded-2xl transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${CYAN}15, ${CYAN}05)`,
                    border: `1px solid ${CYAN}30`,
                    boxShadow: `0 6px 24px ${CYAN}10`,
                  }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-12"
                    style={{ background: `${CYAN}15`, border: `1px solid ${CYAN}25` }}>
                    <UserPlus size={16} style={{ color: CYAN }} />
                  </div>
                  <span className="font-orbitron font-bold text-[12px] tracking-[0.15em]"
                    style={{ color: CYAN }}>ADD FIRST TRAINER</span>
                  <ChevronRight size={16} style={{ color: `${CYAN}40` }}
                    className="group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </GlassPanel>

          ) : (
            <>
              {/* ── Trainer Grid ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {trainers.map(t => (
                  <TrainerCard
                    key={t.id}
                    trainer={t}
                    onRemove={handleRemove}
                    onPress={handlePress}
                  />
                ))}
              </div>

              {/* ── Add More Button (dashboard style) ── */}
              <button onClick={() => nav('/add-trainer')}
                className="group w-full flex items-center justify-center gap-3 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background: '#000',
                  border: `1px dashed ${CYAN}22`,
                }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-12"
                  style={{ background: `${CYAN}08`, border: `1px solid ${CYAN}15` }}>
                  <UserPlus size={16} style={{ color: CYAN }} />
                </div>
                <span className="font-orbitron font-bold text-[12px] tracking-[0.15em]"
                  style={{ color: `${CYAN}80` }}>
                  ADD ANOTHER TRAINER
                </span>
                <ChevronRight size={16} style={{ color: `${CYAN}35` }}
                  className="group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          )}

          {/* ═══════════════════════════════════════════════════════ */}
          {/* FOOTER NOTICE (dashboard alert style)                  */}
          {/* ═══════════════════════════════════════════════════════ */}
          <GlassPanel borderColor={`${CYAN}10`}>
            <div className="p-5 flex items-center gap-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${CYAN}08`, border: `1px solid ${CYAN}15` }}>
                <Shield size={16} style={{ color: CYAN }} />
              </div>
              <div className="flex-1">
                <p className="font-rajdhani text-white text-[12px] font-bold tracking-[0.12em] uppercase mb-0.5">
                  Trainer Access
                </p>
                <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.10em] uppercase font-medium">
                  Trainers get access to their dedicated dashboard · Removing revokes access immediately
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl flex-shrink-0"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-rajdhani text-green-400 text-[9px] tracking-[0.12em] uppercase font-bold">
                  {activeCount} Active
                </span>
              </div>
            </div>
          </GlassPanel>

        </div>
      </div>
    </Layout>
  );
};

export default AdminTrainers;