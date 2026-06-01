// TrainerDetail.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  ArrowLeft, Calendar, CheckCircle, Clock,
  ClipboardList, Dumbbell, X, Phone,
  MessageCircle, Mail, ChevronRight,
} from 'lucide-react';
import splashBg from '../../../../../src/assets/splash-bg.jpg';

const TRAINER_COLOR = '#22D3EE';
const SPLASH_BG = splashBg;

const PulseDot = ({ color = '#22C55E', size = 8 }) => (
  <div className="relative flex items-center justify-center"
       style={{ width: size * 3, height: size * 3 }}>
    <span className="absolute rounded-full animate-ping opacity-30"
          style={{ width: size * 2.5, height: size * 2.5, backgroundColor: color }} />
    <span className="relative rounded-full"
          style={{ width: size, height: size, backgroundColor: color,
                   boxShadow: `0 0 ${size * 2}px ${color}40` }} />
  </div>
);

const GlassCard = ({ children, className = '', borderColor, onClick, hover }) => (
  <div onClick={onClick}
       className={`relative rounded-2xl overflow-hidden
         ${hover ? 'cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5' : ''}
         ${className}`}
       style={{
         background: 'linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.01) 100%)',
         border: `1px solid ${borderColor || 'rgba(255,255,255,0.08)'}`,
         backdropFilter: 'blur(20px)',
       }}>
    {children}
  </div>
);

const TrainerDetail = ({ onLogout }) => {
  const nav = useNavigate();
  const location = useLocation();
  const trainer = location.state?.trainer;

  if (!trainer) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center space-y-4">
          <p className="text-white font-orbitron text-[16px]">Trainer not found</p>
          <button onClick={() => nav('/trainers')}
                  className="px-6 py-3 rounded-xl font-rajdhani text-white font-bold
                             text-[12px] tracking-[0.1em] uppercase"
                  style={{ background: `linear-gradient(135deg,${TRAINER_COLOR},#0ea5e9)` }}>
            Back to Trainers
          </button>
        </div>
      </div>
    );
  }

  const daysAsTrainer = trainer.assignedAt
    ? Math.floor((Date.now() - new Date(trainer.assignedAt).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', {
      day: 'numeric', month: 'short', year: 'numeric',
    });

  const handleRemove = () => {
    if (window.confirm(`Remove ${trainer.name} from trainer role?`)) {
      nav('/trainers');
    }
  };

  // ✅ THIS IS HOW YOU NAVIGATE TO ATTENDANCE LOG
  const handleViewAttendance = () => {
    nav('/trainer-attendance-log', { state: { trainer } });
  };

  return (
    <Layout title="TRAINER DETAIL" onLogout={onLogout}>
      <div className="relative min-h-screen">
        {/* Background */}
        <div className="fixed inset-0 z-0"
             style={{ backgroundImage: `url(${SPLASH_BG})`,
                      backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="fixed inset-0 z-[1]"
             style={{ background: `
               radial-gradient(ellipse at 20% 0%,rgba(34,211,238,0.04) 0%,transparent 50%),
               linear-gradient(180deg,rgba(0,0,0,0.90) 0%,rgba(0,0,0,0.96) 40%,#000000 100%)
             ` }} />

        <div className="relative z-10 px-8 py-6 max-w-[1400px] mx-auto space-y-5">

          {/* Back Button */}
          <button onClick={() => nav('/trainers')}
                  className="flex items-center gap-3 group pt-2">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08]
                            flex items-center justify-center
                            group-hover:bg-white/[0.06] transition-colors duration-200">
              <ArrowLeft size={16} className="text-white/60" />
            </div>
            <span className="font-rajdhani text-white/60 font-bold text-[11px]
                             tracking-[0.2em] uppercase
                             group-hover:text-white/80 transition-colors duration-200">
              Back to Trainers
            </span>
          </button>

          <div className="grid grid-cols-12 gap-6">

            {/* LEFT COLUMN */}
            <div className="col-span-12 lg:col-span-7 space-y-5">

              {/* Hero Card */}
              <GlassCard borderColor={`${TRAINER_COLOR}40`}>
                <div className="absolute inset-0 pointer-events-none"
                     style={{ background: `linear-gradient(135deg,${TRAINER_COLOR}08,transparent)` }} />
                <div className="p-7 relative z-10">
                  {/* Top Row */}
                  <div className="flex items-start gap-5 mb-6">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-[64px] h-[64px] rounded-2xl flex items-center justify-center"
                           style={{
                             background: `linear-gradient(135deg,${TRAINER_COLOR}20,${TRAINER_COLOR}08)`,
                             border: `3px solid ${TRAINER_COLOR}60`,
                           }}>
                        <span className="font-orbitron font-bold text-[20px]"
                              style={{ color: TRAINER_COLOR }}>
                          {trainer.name?.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-black
                                      flex items-center justify-center border-2 border-black">
                        <PulseDot color="#22C55E" size={6} />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      {/* Active Badge */}
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg w-fit mb-3"
                           style={{ background: `${TRAINER_COLOR}12`,
                                    border: `1px solid ${TRAINER_COLOR}25` }}>
                        <div className="w-2 h-2 rounded-full"
                             style={{ backgroundColor: TRAINER_COLOR }} />
                        <span className="font-rajdhani font-bold text-[10px] tracking-[0.15em] uppercase"
                              style={{ color: TRAINER_COLOR }}>
                          Active Trainer
                        </span>
                      </div>

                      <h2 className="font-orbitron text-white font-bold text-[20px] mb-2 truncate">
                        {trainer.name}
                      </h2>

                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-rajdhani text-zinc-500 text-[11px] tracking-wider">
                          ID: {trainer.memberId}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <div className="flex items-center gap-2">
                          <Calendar size={12} className="text-zinc-600" />
                          <span className="font-rajdhani text-zinc-600 text-[11px]">
                            Since {formatDate(trainer.assignedAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button onClick={handleRemove}
                            className="w-10 h-10 rounded-xl flex items-center justify-center
                                       bg-red-500/[0.08] border border-red-500/[0.2]
                                       hover:bg-red-500/[0.15] transition-colors duration-200">
                      <X size={16} className="text-red-400" />
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="h-px mb-5"
                       style={{ background: `linear-gradient(90deg,transparent,${TRAINER_COLOR}25,transparent)` }} />

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { icon: <Calendar size={16} style={{ color: TRAINER_COLOR }} />,
                        label: 'Days Active', val: daysAsTrainer,
                        valColor: 'text-white' },
                      { icon: <Clock size={16} className="text-zinc-500" />,
                        label: 'Assigned',
                        val: formatDate(trainer.assignedAt),
                        valColor: 'text-white', small: true },
                      { icon: <CheckCircle size={16} className="text-green-400" />,
                        label: 'Status', val: 'Active',
                        valColor: 'text-green-400' },
                    ].map((s) => (
                      <div key={s.label}
                           className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl"
                           style={{ background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.05)' }}>
                        {s.icon}
                        <p className={`font-orbitron font-bold ${s.small ? 'text-[10px]' : 'text-[16px]'} ${s.valColor}`}>
                          {s.val}
                        </p>
                        <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.15em] uppercase">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* ✅ VIEW ATTENDANCE BUTTON - Main CTA */}
              <GlassCard hover onClick={handleViewAttendance}
                         borderColor={`${TRAINER_COLOR}30`}
                         className="group">
                <div className="absolute inset-0 pointer-events-none opacity-0
                                group-hover:opacity-100 transition-opacity duration-300"
                     style={{ background: `linear-gradient(135deg,${TRAINER_COLOR}08,transparent)` }} />
                <div className="p-6 flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0
                                  transition-all duration-300 group-hover:scale-110"
                       style={{ background: `${TRAINER_COLOR}12`,
                                border: `1px solid ${TRAINER_COLOR}25` }}>
                    <ClipboardList size={24} style={{ color: TRAINER_COLOR }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.1em] mb-1">
                      ATTENDANCE LOG
                    </h3>
                    <p className="font-rajdhani text-zinc-500 text-[11px]">
                      View full check-in / check-out history
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl flex-shrink-0
                                  transition-all duration-300"
                       style={{ background: `${TRAINER_COLOR}10`,
                                border: `1px solid ${TRAINER_COLOR}20` }}>
                    <span className="font-rajdhani font-bold text-[10px] tracking-[0.1em] uppercase"
                          style={{ color: TRAINER_COLOR }}>
                      View
                    </span>
                    <ChevronRight size={14}
                                  className="group-hover:translate-x-1 transition-transform duration-300"
                                  style={{ color: TRAINER_COLOR }} />
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-span-12 lg:col-span-5 space-y-5">

              {/* Quick Actions */}
              <GlassCard>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-6 rounded-full"
                         style={{ background: `linear-gradient(180deg,${TRAINER_COLOR},${TRAINER_COLOR}20)` }} />
                    <h3 className="font-rajdhani text-white/50 font-bold text-[11px]
                                   tracking-[0.2em] uppercase">
                      Quick Actions
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        icon: <ClipboardList size={18} style={{ color: TRAINER_COLOR }} />,
                        iconBg: `${TRAINER_COLOR}12`,
                        label: 'View Attendance Log',
                        sub: 'Weekly, Monthly, Yearly',
                        // ✅ THIS IS THE KEY NAVIGATION
                        onClick: handleViewAttendance,
                        badge: null,
                        badgeColor: null,
                      },
                      {
                        icon: <Phone size={18} className="text-green-400" />,
                        iconBg: 'rgba(34,197,94,0.12)',
                        label: 'Call Trainer',
                        sub: trainer.phone || 'No phone',
                        onClick: () => window.open(`tel:${trainer.phone}`),
                        badge: null,
                      },
                      {
                        icon: <MessageCircle size={18} className="text-[#25D366]" />,
                        iconBg: 'rgba(37,211,102,0.12)',
                        label: 'WhatsApp',
                        sub: 'Send a message',
                        onClick: () => window.open(`https://wa.me/${trainer.phone?.replace(/\D/g,'')}`),
                        badge: null,
                      },
                    ].map((action, i) => (
                      <button key={i} onClick={action.onClick}
                              className="group w-full flex items-center gap-4 p-4 rounded-xl
                                         text-left transition-all duration-200
                                         hover:bg-white/[0.04]"
                              style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center
                                        flex-shrink-0 transition-all duration-300
                                        group-hover:scale-110"
                             style={{ background: action.iconBg }}>
                          {action.icon}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="font-rajdhani text-white font-bold text-[12px]
                                        tracking-[0.1em] uppercase">
                            {action.label}
                          </p>
                          <p className="font-rajdhani text-zinc-600 text-[10px] mt-0.5 truncate">
                            {action.sub}
                          </p>
                        </div>
                        <ChevronRight size={16}
                                      className="text-white/20 group-hover:text-white/40
                                                 group-hover:translate-x-1 transition-all duration-300" />
                      </button>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Trainer Info Card */}
              <GlassCard>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-6 rounded-full"
                         style={{ background: `linear-gradient(180deg,${TRAINER_COLOR},${TRAINER_COLOR}20)` }} />
                    <h3 className="font-rajdhani text-white/50 font-bold text-[11px]
                                   tracking-[0.2em] uppercase">
                      Trainer Info
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'Full Name',   val: trainer.name },
                      { label: 'Member ID',   val: trainer.memberId },
                      { label: 'Role',        val: 'Gym Trainer',
                        color: TRAINER_COLOR },
                      { label: 'Assigned On', val: formatDate(trainer.assignedAt) },
                      { label: 'Days Active', val: `${daysAsTrainer} days` },
                    ].map((row) => (
                      <div key={row.label}
                           className="flex items-center justify-between py-3"
                           style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <span className="font-rajdhani text-zinc-500 text-[11px]">
                          {row.label}
                        </span>
                        <span className="font-rajdhani font-semibold text-[12px]"
                              style={{ color: row.color || 'white' }}>
                          {row.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrainerDetail;