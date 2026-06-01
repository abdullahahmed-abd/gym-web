// ═══════════════════════════════════════════════════════════════
// 2. AdminTrainerProfile.jsx
// ═══════════════════════════════════════════════════════════════
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  ArrowLeft, Phone, MessageCircle, Smartphone, Clock,
  LogIn, LogOut, Calendar, Dumbbell, Activity, CheckCircle,
  AlertCircle, Mail, Shield, Timer, ArrowRight, X, UserPlus,
  Crown, Sparkles, Zap,
} from 'lucide-react';
import splashBg from '../../../../../src/assets/splash-bg.jpg';

const TRAINER_COLOR = '#22D3EE';
const SPLASH_BG = splashBg;

const TIER_TEMPLATES = {
  'ELITE TIER':     { badge:'ELITE',     iconColor:'#C5A059', icon: Crown    },
  'LEGENDARY TIER': { badge:'LEGENDARY', iconColor:'#A855F7', icon: Sparkles },
};
const TRIAL_CONFIG = { iconColor:'#3B82F6', badge:'TRIAL', icon: Zap };
const MEMBERSHIP_STATUS = {
  active:  { label:'ACTIVE',  color:'#22C55E', icon: CheckCircle, message:'Membership Active'  },
  expired: { label:'EXPIRED', color:'#EF4444', icon: AlertCircle, message:'Membership Expired' },
  trial:   { label:'TRIAL',   color:'#3B82F6', icon: Timer,       message:'Trial Period'       },
};

const getTierConfig   = t  => TIER_TEMPLATES[t]     || TIER_TEMPLATES['ELITE TIER'];
const getStatusConfig = st => MEMBERSHIP_STATUS[st]  || MEMBERSHIP_STATUS.active;

const formatDate = d => new Date(d).toLocaleDateString('en-US',{day:'numeric',month:'short',year:'numeric'});
const formatPhone = phone => {
  const c = phone?.replace(/\D/g,'') || '';
  return c.length===12 ? `+${c.slice(0,2)} ${c.slice(2,7)} ${c.slice(7)}` : phone;
};
const getDaysLeftText = m => {
  if (m.membershipStatus==='expired') return 'Expired';
  if (m.membershipStatus==='trial')   return `${m.daysLeft} days trial left`;
  return `${m.daysLeft} days left`;
};

/* ── Shared primitives ── */
const PulseDot = ({ color='#22C55E', size=8 }) => (
  <div className="relative flex items-center justify-center"
       style={{ width: size*3, height: size*3 }}>
    <span className="absolute rounded-full animate-ping opacity-30"
          style={{ width:size*2.5, height:size*2.5, backgroundColor:color }} />
    <span className="relative rounded-full"
          style={{ width:size, height:size, backgroundColor:color, boxShadow:`0 0 ${size*2}px ${color}40` }} />
  </div>
);

const GlassCard = ({ children, className='', borderColor, onClick, hover }) => (
  <div onClick={onClick}
       className={`relative rounded-2xl overflow-hidden
         ${hover?'cursor-pointer transition-all duration-300 hover:scale-[1.01]':''}
         ${className}`}
       style={{
         background:'linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.01) 100%)',
         border:`1px solid ${borderColor||'rgba(255,255,255,0.08)'}`,
         backdropFilter:'blur(20px)',
       }}>
    {children}
  </div>
);

/* ── Main Screen ── */
const AdminTrainerProfile = ({ onLogout }) => {
  const nav      = useNavigate();
  const location = useLocation();
  const member   = location.state?.member;

  const [isTrainer, setIsTrainer] = useState(member?.id === 'm1');
  const trainerAssignedAt = '2024-12-01T00:00:00Z';
  const daysAsTrainer = Math.floor(
    (Date.now() - new Date(trainerAssignedAt).getTime()) / (1000*60*60*24)
  );

  if (!member) return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <p className="text-white font-orbitron">Member not found</p>
    </div>
  );

  const isTrial      = member.membershipStatus === 'trial';
  const tierConfig   = isTrial ? null : getTierConfig(member.membershipType);
  const statusConfig = getStatusConfig(member.membershipStatus);
  const accentColor  = isTrial ? TRIAL_CONFIG.iconColor : tierConfig?.iconColor || '#EAB308';
  const StatusIcon   = statusConfig.icon;

  const handleCall  = () => window.open(`tel:${member.phone.replace(/\D/g,'')}`);
  const handleWA    = () => window.open(`https://wa.me/${member.phone.replace(/\D/g,'')}`);
  const handleEmail = () => member.email && window.open(`mailto:${member.email}`);

  const handleMakeTrainer = () => {
    if (window.confirm(`Assign ${member.name} as a trainer?`)) {
      setIsTrainer(true);
      alert(`${member.name} is now a trainer!`);
    }
  };
  const handleRemoveTrainer = () => {
    if (window.confirm(`Remove ${member.name} from trainer role?`)) {
      setIsTrainer(false);
      alert(`${member.name} is no longer a trainer.`);
    }
  };

  return (
    <Layout title="MEMBER PROFILE" onLogout={onLogout}>
      <div className="relative min-h-screen">
        <div className="fixed inset-0 z-0"
             style={{ backgroundImage:`url(${SPLASH_BG})`, backgroundSize:'cover', backgroundPosition:'center' }} />
        <div className="fixed inset-0 z-[1]"
             style={{ background:`radial-gradient(ellipse at 20% 0%,rgba(34,211,238,0.04) 0%,transparent 50%),
               linear-gradient(180deg,rgba(0,0,0,0.90) 0%,rgba(0,0,0,0.96) 40%,#000000 100%)` }} />

        <div className="relative z-10 px-8 py-6 max-w-[1400px] mx-auto space-y-5">

          {/* Back */}
          <button onClick={() => nav('/add-trainer')} className="flex items-center gap-3 group pt-2">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08]
                            flex items-center justify-center
                            group-hover:bg-white/[0.06] transition-colors duration-200">
              <ArrowLeft size={16} className="text-white/60" />
            </div>
            <span className="font-rajdhani text-white/60 font-bold text-[11px] tracking-[0.2em] uppercase
                             group-hover:text-white/80 transition-colors">
              Back to Members
            </span>
          </button>

          <div className="grid grid-cols-12 gap-6">
            {/* ── LEFT ── */}
            <div className="col-span-12 lg:col-span-7 space-y-5">

              {/* Hero Card */}
              <GlassCard borderColor={isTrainer ? `${TRAINER_COLOR}40` : `${accentColor}30`}>
                <div className="absolute -top-2 -right-4 opacity-[0.03] pointer-events-none">
                  <Shield size={150} style={{ color: isTrainer ? TRAINER_COLOR : accentColor }} strokeWidth={0.5} />
                </div>
                <div className="p-7 relative z-10">
                  {/* Avatar + Info */}
                  <div className="flex items-start gap-5 mb-6">
                    <div className="relative flex-shrink-0">
                      <div className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center"
                           style={{
                             border:`3px solid ${isTrainer ? `${TRAINER_COLOR}80` : `${accentColor}60`}`,
                             background: isTrainer ? `${TRAINER_COLOR}15` : `${accentColor}15`,
                           }}>
                        <span className="font-orbitron text-white font-bold text-[17px]">{member.avatar}</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-black
                                      flex items-center justify-center border-2 border-black">
                        {member.isLive
                          ? <PulseDot color="#22C55E" size={6} />
                          : <div className="w-2.5 h-2.5 rounded-full bg-white/25" />}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Badges */}
                      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {isTrainer ? (
                            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
                                 style={{ border:`1px solid ${TRAINER_COLOR}40`, background:`${TRAINER_COLOR}10` }}>
                              <Dumbbell size={11} style={{ color: TRAINER_COLOR }} />
                              <span className="font-rajdhani font-bold text-[9px] tracking-[0.1em] uppercase"
                                    style={{ color: TRAINER_COLOR }}>TRAINER</span>
                            </div>
                          ) : (
                            !isTrial && tierConfig && (
                              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
                                   style={{ border:`1px solid ${tierConfig.iconColor}40` }}>
                                <div className="w-1.5 h-1.5 rounded-full"
                                     style={{ backgroundColor: tierConfig.iconColor }} />
                                <span className="font-rajdhani text-zinc-400 font-bold text-[9px]
                                                 tracking-[0.1em] uppercase">
                                  {tierConfig.badge}
                                </span>
                              </div>
                            )
                          )}
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
                               style={{ border:`1px solid ${statusConfig.color}30` }}>
                            <StatusIcon size={10} style={{ color: statusConfig.color }} />
                            <span className="font-rajdhani text-zinc-400 font-bold text-[9px] tracking-[0.1em] uppercase">
                              {statusConfig.label}
                            </span>
                          </div>
                        </div>
                        {member.isLive ? (
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
                               style={{ background:'rgba(34,197,94,0.10)', border:'1px solid rgba(34,197,94,0.20)' }}>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                            <span className="font-orbitron text-green-400 font-bold text-[8px] tracking-wider">LIVE</span>
                          </div>
                        ) : (
                          <div className="px-2.5 py-1.5 rounded-lg bg-white/[0.02]">
                            <span className="font-orbitron text-white/30 font-bold text-[8px] tracking-wider">OFFLINE</span>
                          </div>
                        )}
                      </div>

                      <h2 className="font-orbitron text-white font-bold text-[17px] mb-2 truncate">{member.name}</h2>

                      {/* Workout badge */}
                      {isTrainer ? (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg w-fit mb-3"
                             style={{ background:`${TRAINER_COLOR}15` }}>
                          <Dumbbell size={12} style={{ color: TRAINER_COLOR }} />
                          <span className="font-rajdhani font-bold text-[10px] tracking-[0.1em] uppercase"
                                style={{ color: TRAINER_COLOR }}>GYM TRAINER</span>
                        </div>
                      ) : (
                        !isTrial && tierConfig && (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg w-fit mb-3"
                               style={{ background:`${accentColor}15` }}>
                            {member.workoutType==='cardio_weights'
                              ? <Activity size={12} style={{ color: accentColor }} />
                              : <Dumbbell size={12} style={{ color: accentColor }} />}
                            <span className="font-rajdhani text-white font-bold text-[10px] tracking-[0.1em] uppercase">
                              {member.workoutType==='cardio_weights' ? 'CARDIO + WEIGHTS' : 'WEIGHTS ONLY'}
                            </span>
                          </div>
                        )
                      )}

                      {/* Time */}
                      <div className="flex items-center gap-3 flex-wrap">
                        {member.isLive && member.checkinTime ? (
                          <>
                            <div className="flex items-center gap-1.5">
                              <LogIn size={12} className="text-green-400" />
                              <span className="font-orbitron text-white text-[10px]">{member.checkinTime}</span>
                            </div>
                            {member.duration && (
                              <>
                                <div className="w-1 h-1 rounded-full bg-white/20" />
                                <div className="flex items-center gap-1.5">
                                  <Clock size={12} style={{ color: accentColor }} />
                                  <span className="font-orbitron text-white text-[10px]">{member.duration}</span>
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <Clock size={12} className="text-white/30" />
                            <span className="font-orbitron text-white/40 text-[10px]">
                              Last: {member.lastCheckout || 'N/A'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px mb-5"
                       style={{ background:`linear-gradient(90deg,transparent,${
                         isTrainer?TRAINER_COLOR:accentColor}25,transparent)` }} />

                  {/* Contact + Quick Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                           style={{ background: isTrainer?`${TRAINER_COLOR}12`:`${accentColor}12` }}>
                        <Smartphone size={17} style={{ color: isTrainer?TRAINER_COLOR:accentColor }} />
                      </div>
                      <div>
                        <p className="font-rajdhani text-white/40 text-[9px] tracking-[0.15em] uppercase mb-0.5">Contact</p>
                        <p className="font-orbitron text-white text-[11px] tracking-wider">{formatPhone(member.phone)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {[
                        { fn: handleCall,  icon: <Phone size={16} className="text-green-400" /> },
                        { fn: handleWA,    icon: <MessageCircle size={16} className="text-[#25D366]" /> },
                        ...(member.email ? [{ fn: handleEmail, icon: <Mail size={16} className="text-blue-400" /> }] : []),
                      ].map((a, i) => (
                        <button key={i} onClick={a.fn}
                                className="w-10 h-10 rounded-xl flex items-center justify-center
                                           bg-white/[0.03] border border-white/[0.08]
                                           hover:bg-white/[0.06] transition-all duration-200">
                          {a.icon}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Mini Stats */}
              <GlassCard>
                <div className="p-5 flex items-center justify-around">
                  {[
                    { val: member.memberId,        label:'Member ID'    },
                    { val: member.totalVisits||0,  label:'Total Visits' },
                    { val:`${member.currentStreak||0}🔥`, label:'Streak' },
                  ].map((s,i,arr) => (
                    <React.Fragment key={s.label}>
                      <div className="flex flex-col items-center">
                        <span className="font-orbitron text-white/70 font-bold text-[13px] mb-1">{s.val}</span>
                        <span className="font-rajdhani text-white/40 text-[9px] tracking-[0.15em] uppercase">{s.label}</span>
                      </div>
                      {i < arr.length-1 && <div className="w-px h-9 bg-white/[0.06]" />}
                    </React.Fragment>
                  ))}
                </div>
              </GlassCard>

              {/* Trainer Role */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full"
                       style={{ background:`linear-gradient(180deg,${TRAINER_COLOR},${TRAINER_COLOR}20)` }} />
                  <div className="flex items-center gap-2">
                    <Dumbbell size={13} style={{ color: TRAINER_COLOR }} />
                    <h3 className="font-rajdhani text-white/50 font-bold text-[11px] tracking-[0.2em] uppercase">
                      Trainer Role
                    </h3>
                  </div>
                </div>

                {!isTrainer ? (
                  <GlassCard borderColor={`${TRAINER_COLOR}20`}>
                    <div className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center"
                             style={{ background:`${TRAINER_COLOR}08`, border:`1px solid ${TRAINER_COLOR}15` }}>
                          <Dumbbell size={24} style={{ color:`${TRAINER_COLOR}50` }} />
                        </div>
                        <div>
                          <h4 className="font-rajdhani text-zinc-300 font-bold text-[14px] mb-1">Not a Trainer</h4>
                          <p className="font-rajdhani text-zinc-600 text-[11px]">Assign as trainer</p>
                        </div>
                      </div>
                      <button onClick={handleMakeTrainer}
                              className="flex items-center gap-2 px-5 py-3 rounded-xl
                                         transition-all duration-300 hover:scale-105 active:scale-95"
                              style={{ background:`linear-gradient(135deg,${TRAINER_COLOR},#0ea5e9)` }}>
                        <UserPlus size={14} className="text-white" />
                        <span className="font-rajdhani text-white font-bold text-[11px] tracking-[0.1em] uppercase">
                          Make Trainer
                        </span>
                      </button>
                    </div>
                  </GlassCard>
                ) : (
                  <GlassCard borderColor={`${TRAINER_COLOR}30`}>
                    <div className="absolute inset-0 pointer-events-none"
                         style={{ background:`linear-gradient(135deg,${TRAINER_COLOR}10,${TRAINER_COLOR}03,transparent)` }} />
                    <div className="p-6 relative z-10">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                             style={{ background:`${TRAINER_COLOR}12`, border:`1px solid ${TRAINER_COLOR}25` }}>
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: TRAINER_COLOR }} />
                          <span className="font-rajdhani font-bold text-[10px] tracking-[0.15em] uppercase"
                                style={{ color: TRAINER_COLOR }}>Trainer Role Active</span>
                        </div>
                        <button onClick={handleRemoveTrainer}
                                className="w-9 h-9 rounded-xl flex items-center justify-center
                                           bg-red-500/[0.08] border border-red-500/[0.2]
                                           hover:bg-red-500/[0.15] transition-colors duration-200">
                          <X size={14} className="text-red-400" />
                        </button>
                      </div>
                      <div className="h-px mb-5"
                           style={{ background:`linear-gradient(90deg,transparent,${TRAINER_COLOR}20,transparent)` }} />
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                             style={{ background:`${TRAINER_COLOR}15`, border:`2px solid ${TRAINER_COLOR}40` }}>
                          <span className="font-orbitron font-bold text-[14px]"
                                style={{ color: TRAINER_COLOR }}>{member.avatar}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-rajdhani text-white font-bold text-[15px] mb-1">{member.name}</h4>
                          <p className="font-rajdhani text-zinc-400 text-[11px] mb-1">Gym Trainer</p>
                          <p className="font-rajdhani text-zinc-600 text-[10px]">
                            Assigned on {formatDate(trainerAssignedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { icon:<Calendar size={13} style={{ color:TRAINER_COLOR }}/>,
                            label:'Days as Trainer', val:daysAsTrainer, valColor:'text-white' },
                          { icon:<CheckCircle size={13} className="text-green-400"/>,
                            label:'Status', val:'Active', valColor:'text-green-400' },
                        ].map(s => (
                          <div key={s.label}
                               className="flex items-center gap-3 px-4 py-3 rounded-xl"
                               style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)' }}>
                            {s.icon}
                            <div className="flex-1">
                              <p className="font-rajdhani text-zinc-500 text-[9px] uppercase tracking-wider mb-0.5">
                                {s.label}
                              </p>
                              <p className={`font-orbitron font-bold text-[13px] ${s.valColor}`}>{s.val}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                )}
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div className="col-span-12 lg:col-span-5 space-y-5">

              {/* Contact Info */}
              <GlassCard>
                <div className="p-6">
                  <h3 className="font-rajdhani text-white/50 font-bold text-[11px] tracking-[0.2em] uppercase mb-5">
                    Contact Info
                  </h3>
                  {[
                    { fn:handleCall,  bgColor:'rgba(34,197,94,0.10)',
                      icon:<Smartphone size={17} className="text-green-400" />,
                      label:'Phone', val:formatPhone(member.phone) },
                    ...(member.email ? [{
                      fn:handleEmail, bgColor:'rgba(59,130,246,0.10)',
                      icon:<Mail size={17} className="text-blue-400" />,
                      label:'Email', val:member.email,
                    }] : []),
                  ].map((row,i) => (
                    <button key={i} onClick={row.fn}
                            className={`w-full flex items-center gap-3 group
                                        ${i>0?'mt-4':''}`}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center
                                      transition-colors duration-200"
                           style={{ background: row.bgColor }}>
                        {row.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-rajdhani text-white/50 text-[10px] mb-0.5">{row.label}</p>
                        <p className="font-rajdhani text-white font-semibold text-[13px] truncate">{row.val}</p>
                      </div>
                      <ArrowRight size={15} className="text-white/30 group-hover:text-white/50 transition-colors" />
                    </button>
                  ))}
                </div>
              </GlassCard>

              {/* Activity */}
              <GlassCard>
                <div className="p-6">
                  <h3 className="font-rajdhani text-white/50 font-bold text-[11px] tracking-[0.2em] uppercase mb-5">
                    Activity
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { icon:<LogIn size={17} className="text-green-400"/>, bg:'rgba(34,197,94,0.08)',
                        border:'rgba(34,197,94,0.15)', label:'Check-in',
                        val: member.checkinTime||'--:--', sub: member.isLive?'Today':'Last visit' },
                      { icon:<LogOut size={17} className="text-red-400"/>, bg:'rgba(239,68,68,0.08)',
                        border:'rgba(239,68,68,0.15)', label:'Check-out',
                        val: member.lastCheckout||'--:--', sub: member.isLive?'In progress':'Last visit' },
                    ].map(c => (
                      <div key={c.label} className="flex items-center gap-3 p-4 rounded-xl"
                           style={{ background:c.bg, border:`1px solid ${c.border}` }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                             style={{ background:`${c.border}80` }}>
                          {c.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-rajdhani text-white/60 text-[10px] mb-0.5">{c.label}</p>
                          <p className="font-orbitron text-white font-bold text-[12px] mb-0.5">{c.val}</p>
                          <p className="font-rajdhani text-white/40 text-[9px]">{c.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {member.duration && (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4"
                         style={{ background:`${accentColor}08`, border:`1px solid ${accentColor}15` }}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                           style={{ background:`${accentColor}15` }}>
                        <Clock size={15} style={{ color: accentColor }} />
                      </div>
                      <span className="flex-1 font-rajdhani text-white/60 text-[12px]">Session Duration</span>
                      <span className="font-orbitron font-bold text-[13px]"
                            style={{ color: accentColor }}>{member.duration}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-around py-5 rounded-xl"
                       style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex flex-col items-center">
                      <span className="font-orbitron text-white font-bold text-[20px] mb-1">
                        {member.totalVisits||0}
                      </span>
                      <span className="font-rajdhani text-white/60 text-[11px]">Total Visits</span>
                    </div>
                    <div className="w-px h-12 bg-white/[0.1]" />
                    <div className="flex flex-col items-center">
                      <span className="font-orbitron text-white font-bold text-[20px] mb-1">
                        {member.currentStreak||0}
                      </span>
                      <span className="font-rajdhani text-white/60 text-[11px]">Day Streak 🔥</span>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Membership */}
              <GlassCard borderColor={`${accentColor}20`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-rajdhani text-white/50 font-bold text-[11px] tracking-[0.2em] uppercase">
                      Membership
                    </h3>
                    <span className="font-rajdhani text-white/60 font-semibold text-[11px]">
                      {getDaysLeftText(member)}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {!isTrial && tierConfig && (
                      <div className="flex items-center justify-between">
                        <span className="font-rajdhani text-white/60 text-[12px]">Plan</span>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                             style={{ border:`1px solid ${tierConfig.iconColor}40` }}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor:tierConfig.iconColor }} />
                          <span className="font-rajdhani font-bold text-[10px] tracking-wider"
                                style={{ color:tierConfig.iconColor }}>{member.membershipType}</span>
                        </div>
                      </div>
                    )}
                    {!isTrial && tierConfig && (
                      <div className="flex items-center justify-between">
                        <span className="font-rajdhani text-white/60 text-[12px]">Workout</span>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                             style={{ background:`${accentColor}15` }}>
                          {member.workoutType==='cardio_weights'
                            ? <Activity size={11} style={{ color:accentColor }} />
                            : <Dumbbell size={11} style={{ color:accentColor }} />}
                          <span className="font-rajdhani text-white font-semibold text-[10px]">
                            {member.workoutType==='cardio_weights'?'Cardio + Weights':'Weights Only'}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="font-rajdhani text-white/60 text-[12px]">Status</span>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                           style={{ border:`1px solid ${statusConfig.color}30` }}>
                        <StatusIcon size={11} style={{ color:statusConfig.color }} />
                        <span className="font-rajdhani font-bold text-[10px] tracking-wider"
                              style={{ color:statusConfig.color }}>{statusConfig.label}</span>
                      </div>
                    </div>
                    {member.paidAmount>0 && (
                      <div className="flex items-center justify-between">
                        <span className="font-rajdhani text-white/60 text-[12px]">Paid</span>
                        <span className="font-orbitron font-bold text-[15px]"
                              style={{ color:accentColor }}>₹{member.paidAmount}</span>
                      </div>
                    )}
                  </div>
                  <div className="h-px bg-white/[0.06] my-5" />
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { icon:<Calendar size={13} className="text-green-400"/>,
                        label:'Joined', val:formatDate(member.joinDate), expired:false },
                      { icon:<Calendar size={13} style={{ color: member.membershipStatus==='expired'?'#EF4444':accentColor }}/>,
                        label: member.membershipStatus==='expired'?'Expired':'Expires',
                        val:formatDate(member.expiryDate), expired:member.membershipStatus==='expired' },
                    ].map(d => (
                      <div key={d.label} className="flex items-center gap-2.5 p-3 rounded-xl"
                           style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)' }}>
                        {d.icon}
                        <div className="flex-1">
                          <p className="font-rajdhani text-white/50 text-[9px] mb-0.5">{d.label}</p>
                          <p className={`font-orbitron text-[10px] font-semibold ${d.expired?'text-red-400':'text-white'}`}>
                            {d.val}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-2 py-3">
                    <StatusIcon size={15} style={{ color:statusConfig.color }} />
                    <span className="font-rajdhani font-bold text-[13px]" style={{ color:statusConfig.color }}>
                      {statusConfig.message}
                    </span>
                    {member.membershipStatus==='active' && (
                      <>
                        <span className="text-white/30">•</span>
                        <span className="font-rajdhani font-semibold text-[12px] opacity-80"
                              style={{ color:statusConfig.color }}>{member.daysLeft} days remaining</span>
                      </>
                    )}
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

export default AdminTrainerProfile;