// AdminTrainers.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  Dumbbell, UserPlus, X, CheckCircle, Clock,
  Calendar, UserMinus, ArrowLeft, ArrowRight, Users,
} from 'lucide-react';
import splashBg from '../../../../../src/assets/splash-bg.jpg';

const TRAINER_COLOR = '#22D3EE';
const SPLASH_BG = splashBg;

/* ── Shared primitives ── */
const PulseDot = ({ color = '#22C55E', size = 8 }) => (
  <div className="relative flex items-center justify-center"
    style={{ width: size * 3, height: size * 3 }}>
    <span className="absolute rounded-full animate-ping opacity-30"
      style={{ width: size * 2.5, height: size * 2.5, backgroundColor: color }} />
    <span className="relative rounded-full"
      style={{ width: size, height: size, backgroundColor: color, boxShadow: `0 0 ${size * 2}px ${color}40` }} />
  </div>
);

const GlassCard = ({ children, className = '', onClick, hover = false, borderColor }) => (
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

/* ── Trainer Card ── */
const TrainerCard = ({ trainer, onRemove, onPress }) => {
  const daysAsTrainer = trainer.assignedAt
    ? Math.floor((Date.now() - new Date(trainer.assignedAt).getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const fmtDate = d => new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  const fmtShort = d => new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

  return (
    <GlassCard hover onClick={() => onPress(trainer)} borderColor={`${TRAINER_COLOR}30`} className="group">
      <div className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ background: `linear-gradient(135deg,${TRAINER_COLOR}06,transparent)` }} />
      <div className="p-6 relative z-10">
        {/* Top Row */}
        <div className="flex items-start gap-4 mb-5">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-[54px] h-[54px] rounded-2xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg,${TRAINER_COLOR}15,${TRAINER_COLOR}05)`,
                border: `2px solid ${TRAINER_COLOR}50`,
              }}>
              <span className="font-orbitron font-bold text-[17px]" style={{ color: TRAINER_COLOR }}>
                {trainer.name?.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full
                            flex items-center justify-center border-2"
              style={{ backgroundColor: '#000000', borderColor: '#000000' }}>
              <PulseDot color="#22C55E" size={5} />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg w-fit mb-3"
              style={{ background: `${TRAINER_COLOR}12`, border: `1px solid ${TRAINER_COLOR}25` }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: TRAINER_COLOR }} />
              <span className="font-rajdhani font-bold text-[9px] tracking-[0.15em] uppercase"
                style={{ color: TRAINER_COLOR }}>Active Trainer</span>
            </div>
            <h3 className="font-orbitron text-white font-bold text-[14px] mb-2 truncate">{trainer.name}</h3>
            <p className="font-rajdhani text-zinc-500 text-[10px] mb-2 tracking-wider">ID: {trainer.memberId}</p>
            <div className="flex items-center gap-2">
              <Calendar size={11} className="text-zinc-600" />
              <span className="font-rajdhani text-zinc-600 text-[10px]">Assigned {fmtDate(trainer.assignedAt)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center gap-3">
            <button onClick={e => { e.stopPropagation(); onRemove(trainer); }}
              className="w-10 h-10 rounded-xl flex items-center justify-center
                               bg-red-500/[0.08] border border-red-500/[0.2]
                               hover:bg-red-500/[0.15] transition-colors duration-200">
              <X size={15} className="text-red-400" />
            </button>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.04]
                            group-hover:bg-white/[0.08] transition-colors duration-200">
              <ArrowRight size={14} className="text-white/20 group-hover:text-white/40 transition-colors" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-5"
          style={{ background: `linear-gradient(90deg,transparent,${TRAINER_COLOR}15,transparent)` }} />

        {/* Stats Row */}
        <div className="flex items-center justify-between mb-4">
          {[
            { icon: <Calendar size={13} style={{ color: TRAINER_COLOR }} />, label: 'Days Active', val: daysAsTrainer, valColor: 'text-white' },
            { icon: <Clock size={13} className="text-zinc-500" />, label: 'Since', val: fmtShort(trainer.assignedAt), valColor: 'text-white' },
            { icon: <CheckCircle size={13} className="text-green-400" />, label: 'Status', val: 'Active', valColor: 'text-green-400' },
          ].map((s, i, arr) => (
            <React.Fragment key={s.label}>
              <div className="flex items-center gap-2">
                {s.icon}
                <span className="font-rajdhani text-zinc-500 text-[10px]">{s.label}</span>
                <span className={`font-orbitron font-bold text-[11px] ${s.valColor}`}>{s.val}</span>
              </div>
              {i < arr.length - 1 && <div className="w-px h-5 bg-white/[0.08]" />}
            </React.Fragment>
          ))}
        </div>

        {/* Tap Hint */}
        <div className="flex items-center justify-center gap-2 py-2 rounded-lg"
          style={{ background: `${TRAINER_COLOR}05` }}>
          <span className="font-rajdhani text-[10px]" style={{ color: `${TRAINER_COLOR}60` }}>
            Tap to view full details
          </span>
          <ArrowRight size={11} style={{ color: `${TRAINER_COLOR}50` }} />
        </div>
      </div>
    </GlassCard>
  );
};

/* ── Main Screen ── */
const AdminTrainers = ({ onLogout }) => {
  const nav = useNavigate();
  const [trainers, setTrainers] = useState([
    { id: 'm1', name: 'Abdullah Ahmed', memberId: 'GYM001', assignedAt: '2024-12-01T00:00:00Z' },
    { id: 'm4', name: 'Sneha Gupta', memberId: 'GYM004', assignedAt: '2024-11-15T00:00:00Z' },
  ]);

  const handleRemove = trainer => {
    if (window.confirm(`Remove ${trainer.name} from trainer role?\nThey will return to regular member dashboard.`)) {
      setTrainers(trainers.filter(t => t.id !== trainer.id));
      alert(`${trainer.name} is no longer a trainer.`);
    }
  };
  const handlePress = trainer => nav('/trainer-detail', { state: { trainer } });

  return (
    <Layout title="TRAINERS" onLogout={onLogout}>
      <div className="relative min-h-screen">
        {/* ── Background Image (same as Dashboard) ── */}
        <div className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url(${SPLASH_BG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />

        {/* ── Dark Overlay with blur effect ── */}
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

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-5 pt-2">
            {[
              {
                icon: <Users size={22} style={{ color: TRAINER_COLOR }} />, iconBg: `${TRAINER_COLOR}12`,
                iconBorder: `${TRAINER_COLOR}20`, val: trainers.length, valColor: TRAINER_COLOR, label: 'Total Trainers'
              },
              {
                icon: <CheckCircle size={22} className="text-green-400" />, iconBg: 'rgba(34,197,94,0.12)',
                iconBorder: 'rgba(34,197,94,0.20)', val: trainers.length, valColor: '#22C55E', label: 'Active Now'
              },
            ].map(s => (
              <GlassCard key={s.label}>
                <div className="p-5 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: s.iconBg, border: `1px solid ${s.iconBorder}` }}>
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase mb-1">
                      {s.label}
                    </p>
                    <p className="font-orbitron font-bold text-[26px] leading-none" style={{ color: s.valColor }}>
                      {s.val}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Back */}
          <button onClick={() => nav('/dashboard')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl border border-white/[0.08]
                            flex items-center justify-center
                            group-hover:bg-white/[0.06] transition-colors duration-200"
              style={{ background: '#000000' }}>
              <ArrowLeft size={16} className="text-white/60" />
            </div>
            <span className="font-rajdhani text-white/60 font-bold text-[11px] tracking-[0.2em] uppercase
                             group-hover:text-white/80 transition-colors duration-200">
              Back to Dashboard
            </span>
          </button>

          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full"
                style={{ background: `linear-gradient(180deg,${TRAINER_COLOR},${TRAINER_COLOR}20)` }} />
              <div className="flex items-center gap-2">
                <Dumbbell size={15} style={{ color: TRAINER_COLOR }} />
                <h2 className="font-rajdhani text-white/60 font-bold text-[11px] tracking-[0.2em] uppercase">
                  Active Trainers
                </h2>
                {trainers.length > 0 && (
                  <div className="px-3 py-1 rounded-lg"
                    style={{ background: `${TRAINER_COLOR}15`, border: `1px solid ${TRAINER_COLOR}25` }}>
                    <span className="font-orbitron font-bold text-[10px]" style={{ color: TRAINER_COLOR }}>
                      {trainers.length}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <button onClick={() => nav('/add-trainer')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                               transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ background: `linear-gradient(135deg,${TRAINER_COLOR},#0ea5e9)` }}>
              <UserPlus size={15} className="text-white" />
              <span className="font-rajdhani text-white font-bold text-[11px] tracking-[0.1em] uppercase">
                Add Trainer
              </span>
            </button>
          </div>

          {/* Content */}
          {trainers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-6">
              <div className="w-28 h-28 rounded-full flex items-center justify-center"
                style={{ background: `${TRAINER_COLOR}08`, border: `1px solid ${TRAINER_COLOR}15` }}>
                <UserMinus size={46} style={{ color: `${TRAINER_COLOR}40` }} />
              </div>
              <div className="text-center">
                <h3 className="font-orbitron text-zinc-400 font-bold text-[17px] mb-2">No Trainers Yet</h3>
                <p className="font-rajdhani text-zinc-600 text-[12px] max-w-xs mx-auto">
                  Add trainers by assigning members from your roster
                </p>
              </div>
              <button onClick={() => nav('/add-trainer')}
                className="flex items-center gap-3 px-8 py-4 rounded-xl mt-2
                                 transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: `linear-gradient(135deg,${TRAINER_COLOR},#0ea5e9)` }}>
                <UserPlus size={17} className="text-white" />
                <span className="font-rajdhani text-white font-bold text-[12px] tracking-[0.1em] uppercase">
                  Add First Trainer
                </span>
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {trainers.map(t => (
                  <TrainerCard key={t.id} trainer={t} onRemove={handleRemove} onPress={handlePress} />
                ))}
              </div>
              {/* Add More */}
              <button onClick={() => nav('/add-trainer')}
                className="w-full p-5 rounded-2xl border border-dashed
                                 transition-all duration-300 hover:scale-[1.01] group"
                style={{ borderColor: `${TRAINER_COLOR}20`, background: '#000000' }}>
                <div className="flex items-center justify-center gap-3">
                  <UserPlus size={17} style={{ color: TRAINER_COLOR }} />
                  <span className="font-rajdhani font-bold text-[12px] tracking-[0.1em] uppercase"
                    style={{ color: TRAINER_COLOR }}>Add Another Trainer</span>
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminTrainers;