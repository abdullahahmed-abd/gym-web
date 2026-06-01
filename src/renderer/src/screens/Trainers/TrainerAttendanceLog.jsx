// ═══════════════════════════════════════════════════════════════
// 4. TrainerAttendanceLog.jsx
// ═══════════════════════════════════════════════════════════════
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import { ArrowLeft, Clock, Calendar, LogIn, LogOut, CheckCircle, X } from 'lucide-react';
import splashBg from '../../../../../src/assets/splash-bg.jpg';

const TRAINER_COLOR = '#22D3EE';
const SPLASH_BG = splashBg;

const WEEKLY_LOG = [
  { date:'20 Jan', day:'Mon', status:'present', checkin:'6:15 AM', checkout:null,       duration:'2h 30m (ongoing)' },
  { date:'19 Jan', day:'Sun', status:'present', checkin:'6:10 AM', checkout:'3:00 PM',  duration:'8h 50m' },
  { date:'18 Jan', day:'Sat', status:'absent',  checkin:null,       checkout:null,       duration:null },
  { date:'17 Jan', day:'Fri', status:'present', checkin:'6:30 AM', checkout:'2:30 PM',  duration:'8h 00m' },
  { date:'16 Jan', day:'Thu', status:'present', checkin:'6:05 AM', checkout:'2:50 PM',  duration:'8h 45m' },
  { date:'15 Jan', day:'Wed', status:'present', checkin:'6:20 AM', checkout:'3:10 PM',  duration:'8h 50m' },
  { date:'14 Jan', day:'Tue', status:'present', checkin:'6:25 AM', checkout:'2:40 PM',  duration:'8h 15m' },
];
const MONTHLY_LOG = [
  ...WEEKLY_LOG,
  { date:'13 Jan', day:'Mon', status:'present', checkin:'6:20 AM', checkout:'2:55 PM',  duration:'8h 35m' },
  { date:'12 Jan', day:'Sun', status:'absent',  checkin:null,       checkout:null,       duration:null },
  { date:'11 Jan', day:'Sat', status:'present', checkin:'6:30 AM', checkout:'3:00 PM',  duration:'8h 30m' },
  { date:'10 Jan', day:'Fri', status:'present', checkin:'6:15 AM', checkout:'2:45 PM',  duration:'8h 30m' },
  { date:'9 Jan',  day:'Thu', status:'present', checkin:'6:10 AM', checkout:'2:50 PM',  duration:'8h 40m' },
  { date:'8 Jan',  day:'Wed', status:'absent',  checkin:null,       checkout:null,       duration:null },
  { date:'7 Jan',  day:'Tue', status:'present', checkin:'6:25 AM', checkout:'3:05 PM',  duration:'8h 40m' },
];
const YEARLY_LOG = [
  ...MONTHLY_LOG,
  { date:'6 Jan',  day:'Mon', status:'present', checkin:'6:20 AM', checkout:'2:40 PM',  duration:'8h 20m' },
  { date:'5 Jan',  day:'Sun', status:'present', checkin:'6:30 AM', checkout:'3:10 PM',  duration:'8h 40m' },
  { date:'4 Jan',  day:'Sat', status:'absent',  checkin:null,       checkout:null,       duration:null },
  { date:'3 Jan',  day:'Fri', status:'present', checkin:'6:15 AM', checkout:'2:50 PM',  duration:'8h 35m' },
  { date:'2 Jan',  day:'Thu', status:'present', checkin:'6:10 AM', checkout:'2:45 PM',  duration:'8h 35m' },
  { date:'1 Jan',  day:'Wed', status:'present', checkin:'7:00 AM', checkout:'1:00 PM',  duration:'6h 00m' },
];

/* ── Shared primitives ── */
const PulseDot = ({ color='#22C55E', size=5 }) => (
  <div className="relative flex items-center justify-center"
       style={{ width:size*2.5, height:size*2.5 }}>
    <span className="absolute rounded-full animate-ping opacity-30"
          style={{ width:size*2, height:size*2, backgroundColor:color }} />
    <span className="relative rounded-full" style={{ width:size, height:size, backgroundColor:color }} />
  </div>
);

const GlassCard = ({ children, className='', borderColor }) => (
  <div className={`relative rounded-2xl overflow-hidden ${className}`}
       style={{
         background:'linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.01) 100%)',
         border:`1px solid ${borderColor||'rgba(255,255,255,0.08)'}`,
         backdropFilter:'blur(20px)',
       }}>
    {children}
  </div>
);

/* ── Log Row ── */
const LogRow = ({ log }) => {
  const isPresent = log.status === 'present';
  const isOngoing = log.checkout === null && isPresent;

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
      {/* Day Badge */}
      <div className="flex flex-col items-center justify-center w-11 py-2 rounded-xl flex-shrink-0"
           style={{ background: isPresent ? `${TRAINER_COLOR}10` : 'rgba(239,68,68,0.08)' }}>
        <span className="font-rajdhani font-bold text-[10px] tracking-wider"
              style={{ color: isPresent ? TRAINER_COLOR : '#EF4444' }}>{log.day}</span>
        <span className="font-rajdhani text-zinc-600 text-[9px] mt-0.5">{log.date?.split(' ')[0]}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
          <span className="font-rajdhani text-zinc-300 font-semibold text-[11px]">{log.date}</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
               style={{
                 background: isPresent?'rgba(34,197,94,0.10)':'rgba(239,68,68,0.10)',
                 border:`1px solid ${isPresent?'rgba(34,197,94,0.25)':'rgba(239,68,68,0.25)'}`,
               }}>
            {isOngoing && <PulseDot color="#22C55E" size={4} />}
            <span className="font-rajdhani font-bold text-[9px] tracking-[0.1em]"
                  style={{ color: isPresent?'#22C55E':'#EF4444' }}>
              {isOngoing ? 'IN GYM' : isPresent ? 'PRESENT' : 'ABSENT'}
            </span>
          </div>
        </div>

        {/* Time Info */}
        {isPresent ? (
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              <LogIn size={11} className="text-green-400" />
              <span className="font-rajdhani text-zinc-500 text-[9px]">In</span>
              <span className="font-orbitron text-zinc-300 text-[9px]">{log.checkin}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <div className="flex items-center gap-1">
              <LogOut size={11} style={{ color: isOngoing ? TRAINER_COLOR : '#EF4444' }} />
              <span className="font-rajdhani text-zinc-500 text-[9px]">Out</span>
              <span className="font-orbitron text-[9px]"
                    style={{ color: isOngoing ? TRAINER_COLOR : '#9CA3AF' }}>
                {isOngoing ? 'Still here' : log.checkout}
              </span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <div className="flex items-center gap-1">
              <Clock size={11} className="text-zinc-500" />
              <span className="font-rajdhani text-zinc-500 text-[9px]">Time</span>
              <span className="font-orbitron text-zinc-300 text-[9px]">{log.duration}</span>
            </div>
          </div>
        ) : (
          <p className="font-rajdhani text-zinc-600 text-[10px]">Did not check in</p>
        )}
      </div>
    </div>
  );
};

/* ── Main Screen ── */
const TrainerAttendanceLog = ({ onLogout }) => {
  const nav      = useNavigate();
  const location = useLocation();
  const trainer  = location.state?.trainer;
  const [activeTab, setActiveTab] = useState('weekly');

  if (!trainer) return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <p className="text-white font-orbitron">Trainer not found</p>
    </div>
  );

  const getLog = () =>
    activeTab === 'weekly' ? WEEKLY_LOG : activeTab === 'monthly' ? MONTHLY_LOG : YEARLY_LOG;

  const logData      = getLog();
  const presentCount = logData.filter(l => l.status === 'present').length;
  const absentCount  = logData.filter(l => l.status === 'absent').length;

  const getTabLabel = () =>
    activeTab === 'weekly' ? 'Last 7 Days' : activeTab === 'monthly' ? 'Last 30 Days' : 'This Year';

  const getLogTitle = () =>
    activeTab === 'weekly' ? 'WEEKLY LOG' : activeTab === 'monthly' ? 'MONTHLY LOG' : 'YEARLY LOG';

  return (
    <Layout title="ATTENDANCE LOG" onLogout={onLogout}>
      <div className="relative min-h-screen">
        <div className="fixed inset-0 z-0"
             style={{ backgroundImage:`url(${SPLASH_BG})`, backgroundSize:'cover', backgroundPosition:'center' }} />
        <div className="fixed inset-0 z-[1]"
             style={{ background:`radial-gradient(ellipse at 20% 0%,rgba(34,211,238,0.04) 0%,transparent 50%),
               linear-gradient(180deg,rgba(0,0,0,0.90) 0%,rgba(0,0,0,0.96) 40%,#000000 100%)` }} />

        <div className="relative z-10 px-8 py-6 max-w-[1400px] mx-auto space-y-5">

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-5 pt-2">
            {[
              { icon:<CheckCircle size={22} className="text-green-400"/>, bg:'rgba(34,197,94,0.12)',
                border:'rgba(34,197,94,0.20)', val:presentCount, valColor:'#22C55E', label:'Present' },
              { icon:<X size={22} className="text-red-400"/>, bg:'rgba(239,68,68,0.12)',
                border:'rgba(239,68,68,0.20)', val:absentCount, valColor:'#EF4444', label:'Absent' },
              { icon:<Calendar size={22} style={{ color:TRAINER_COLOR }}/>, bg:`${TRAINER_COLOR}12`,
                border:`${TRAINER_COLOR}20`, val:logData.length, valColor:TRAINER_COLOR, label:'Total Days' },
            ].map(s => (
              <GlassCard key={s.label}>
                <div className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                       style={{ background:s.bg, border:`1px solid ${s.border}` }}>
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-orbitron font-bold text-[22px] leading-none mb-1"
                       style={{ color:s.valColor }}>{s.val}</p>
                    <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">{s.label}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Tabs */}
          <GlassCard>
            <div className="p-1.5 flex items-center gap-1">
              {['weekly','monthly','yearly'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                        className="flex-1 py-3 rounded-xl transition-all duration-300"
                        style={{ background: activeTab===tab ? `${TRAINER_COLOR}15` : 'transparent' }}>
                  <span className="font-rajdhani font-bold text-[11px] tracking-[0.15em] uppercase"
                        style={{ color: activeTab===tab ? TRAINER_COLOR : '#71717a' }}>
                    {tab==='weekly'?'Weekly':tab==='monthly'?'Monthly':'Yearly'}
                  </span>
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Back */}
          <button onClick={() => nav('/trainer-detail', { state:{ trainer } })}
                  className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08]
                            flex items-center justify-center
                            group-hover:bg-white/[0.06] transition-colors duration-200">
              <ArrowLeft size={16} className="text-white/60" />
            </div>
            <span className="font-rajdhani text-white/60 font-bold text-[11px] tracking-[0.2em] uppercase
                             group-hover:text-white/80 transition-colors duration-200">
              Back to Trainer
            </span>
          </button>

          {/* Trainer Mini Card */}
          <GlassCard borderColor={`${TRAINER_COLOR}20`}>
            <div className="absolute inset-0 opacity-40 pointer-events-none"
                 style={{ background:`linear-gradient(135deg,${TRAINER_COLOR}08,transparent)` }} />
            <div className="p-4 flex items-center gap-4 relative z-10">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                   style={{ background:`${TRAINER_COLOR}15`, border:`1px solid ${TRAINER_COLOR}40` }}>
                <span className="font-orbitron font-bold text-[13px]" style={{ color:TRAINER_COLOR }}>
                  {trainer.name?.slice(0,2).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-orbitron text-white font-bold text-[13px] mb-1 truncate">{trainer.name}</h3>
                <p className="font-rajdhani text-zinc-500 text-[10px]">ID: {trainer.memberId}</p>
              </div>
              <div className="px-3 py-1.5 rounded-lg flex-shrink-0"
                   style={{ background:`${TRAINER_COLOR}12`, border:`1px solid ${TRAINER_COLOR}25` }}>
                <span className="font-rajdhani font-semibold text-[9px]" style={{ color:TRAINER_COLOR }}>
                  {getTabLabel()}
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full"
                   style={{ background:`linear-gradient(180deg,${TRAINER_COLOR},${TRAINER_COLOR}20)` }} />
              <div className="flex items-center gap-2">
                <LogIn size={14} style={{ color:TRAINER_COLOR }} />
                <h2 className="font-rajdhani text-white/60 font-bold text-[11px] tracking-[0.2em] uppercase">
                  {getLogTitle()}
                </h2>
              </div>
            </div>
            <span className="font-rajdhani text-zinc-600 text-[10px]">{logData.length} entries</span>
          </div>

          {/* Log Entries */}
          <div className="space-y-2">
            {logData.map((log, i) => (
              <LogRow key={`${activeTab}-${i}`} log={log} />
            ))}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default TrainerAttendanceLog;