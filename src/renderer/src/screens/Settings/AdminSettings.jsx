// AdminSettings.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  LogOut, Mail, Phone, Shield, Bell, Moon, Save, CreditCard,
  ChevronRight, User, Camera, Lock, Key, Globe, Database,
  HardDrive, Cloud, Palette,
  AlertTriangle, Trash2, Download, Upload, RefreshCw,
  Clock, CheckCircle, Edit3,
  Crown, Zap, ArrowLeft, Activity,
  IndianRupee, Calendar, MapPin, Users, X
} from 'lucide-react';

import gymLogo from '../../../../assets/gym-logo.png';

const GYM_LOGO = gymLogo;

/* ═══════════════════════════════════════════════════════════════ */
/* ANIMATED NUMBER                                                */
/* ═══════════════════════════════════════════════════════════════ */
const AnimatedNumber = ({ value, duration = 1200 }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, duration]);
  return display;
};

/* ═══════════════════════════════════════════════════════════════ */
/* PULSE DOT                                                      */
/* ═══════════════════════════════════════════════════════════════ */
const PulseDot = ({ color = '#22C55E', size = 6 }) => (
  <div className="relative flex items-center justify-center" style={{ width: size * 3, height: size * 3 }}>
    <span className="absolute rounded-full animate-ping opacity-30"
      style={{ width: size * 2.5, height: size * 2.5, backgroundColor: color }} />
    <span className="relative rounded-full"
      style={{ width: size, height: size, backgroundColor: color, boxShadow: `0 0 ${size * 2}px ${color}40` }} />
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* GLASS PANEL                                                    */
/* ═══════════════════════════════════════════════════════════════ */
const GlassPanel = ({ children, className = '', onClick, hover = false, borderColor, glow }) => (
  <div
    onClick={onClick}
    className={`
      relative rounded-3xl overflow-hidden
      ${hover ? 'cursor-pointer transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1' : ''}
      ${onClick ? 'cursor-pointer' : ''}
      ${className}
    `}
    style={{
      background: '#0a0a0a',
      border: `1px solid ${borderColor || 'rgba(255,255,255,0.08)'}`,
      boxShadow: glow ? `0 8px 32px ${glow}` : 'none',
    }}
  >
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* SECTION HEADER                                                 */
/* ═══════════════════════════════════════════════════════════════ */
const SectionHeader = ({ title, subtitle, color = '#C5A059', icon: Icon, danger = false }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-1.5 h-8 rounded-full"
      style={{ background: `linear-gradient(to bottom, ${danger ? '#EF4444' : color}, ${danger ? '#EF444430' : `${color}20`})` }} />
    {Icon && (
      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{
          background: `${danger ? '#EF4444' : color}10`,
          border: `1px solid ${danger ? '#EF4444' : color}20`
        }}>
        <Icon size={14} style={{ color: danger ? '#EF4444' : color }} />
      </div>
    )}
    <div>
      <h3 className="font-orbitron font-bold text-[14px] tracking-[0.15em]"
        style={{ color: danger ? '#EF4444' : 'white' }}>
        {title}
      </h3>
      {subtitle && (
        <p className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.15em] uppercase">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* SETTING ROW                                                    */
/* ═══════════════════════════════════════════════════════════════ */
const SettingRow = ({ icon: Icon, label, value, color = '#C5A059', onClick, badge }) => (
  <button
    onClick={onClick}
    className="group flex items-center gap-4 w-full p-4 rounded-2xl
               border border-white/[0.04] text-left
               hover:border-white/[0.08] transition-all duration-300
               hover:scale-[1.005]"
    style={{ background: 'rgba(255,255,255,0.02)' }}
  >
    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                    transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
      style={{
        background: `${color}10`,
        border: `1px solid ${color}20`,
        boxShadow: `0 4px 12px ${color}08`
      }}>
      <Icon size={16} style={{ color }} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-rajdhani text-white text-[13px] font-bold tracking-wider">{label}</p>
      <p className="font-rajdhani text-zinc-600 text-[11px] tracking-wider">{value}</p>
    </div>
    {badge && (
      <span className="px-2.5 py-1 rounded-lg text-[9px] font-orbitron font-bold"
        style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}>
        {badge}
      </span>
    )}
    <ChevronRight size={16}
      className="text-white/15 group-hover:text-white/30
                 group-hover:translate-x-1 transition-all duration-300" />
  </button>
);

/* ═══════════════════════════════════════════════════════════════ */
/* TOGGLE ROW                                                     */
/* ═══════════════════════════════════════════════════════════════ */
const ToggleRow = ({ icon: Icon, label, sublabel, value, onChange, color = '#C5A059', }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/[0.04]
                  transition-all duration-300 hover:border-white/[0.08]"
    style={{ background: 'rgba(255,255,255,0.02)' }}
  >
    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{
        background: value ? `${color}15` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${value ? `${color}25` : 'rgba(255,255,255,0.06)'}`,
        boxShadow: value ? `0 4px 12px ${color}10` : 'none'
      }}>
      <Icon size={16} style={{ color: value ? color : '#71717a' }} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-rajdhani text-white text-[13px] font-bold tracking-wider">{label}</p>
      {sublabel && (
        <p className="font-rajdhani text-zinc-600 text-[10px] tracking-wider">{sublabel}</p>
      )}
    </div>
    <button onClick={onChange}
      className="relative w-14 h-7 rounded-full transition-all duration-500 flex-shrink-0"
      style={{
        background: value
          ? `linear-gradient(135deg, ${color}, ${color}CC)`
          : 'rgba(255,255,255,0.08)',
        border: `1px solid ${value ? `${color}40` : 'rgba(255,255,255,0.1)'}`,
        boxShadow: value ? `0 4px 16px ${color}30` : 'none'
      }}
    >
      <div className={`absolute top-[3px] w-5 h-5 rounded-full bg-white
                        shadow-lg transition-all duration-500 ${value ? 'left-[31px]' : 'left-[3px]'}`}
        style={{ boxShadow: value ? `0 2px 8px ${color}40` : '0 2px 8px rgba(0,0,0,0.3)' }}
      />
    </button>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* STAT MINI CARD                                                 */
/* ═══════════════════════════════════════════════════════════════ */
const StatMini = ({ icon: Icon, label, value, color }) => (
  <div className="group flex flex-col items-center gap-2 p-4 rounded-2xl border
                  transition-all duration-300 hover:scale-[1.03]"
    style={{ background: `${color}06`, borderColor: `${color}12` }}
  >
    <div className="w-10 h-10 rounded-xl flex items-center justify-center
                    transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
      style={{ background: `${color}12`, border: `1px solid ${color}20` }}>
      <Icon size={16} style={{ color }} />
    </div>
    <span className="font-orbitron text-white font-bold text-[18px]">
      <AnimatedNumber value={value} />
    </span>
    <span className="font-rajdhani text-[9px] tracking-[0.15em] uppercase font-semibold"
      style={{ color: `${color}80` }}>
      {label}
    </span>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* EDIT PROFILE MODAL                                             */
/* ═══════════════════════════════════════════════════════════════ */
const EditProfileModal = ({ onClose }) => {
  const [name, setName] = useState('Admin Manager');
  const [email, setEmail] = useState('admin@fitzone.com');
  const [phone, setPhone] = useState('+91 9876543210');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-3xl border border-white/[0.08]
                      max-h-[90vh] overflow-y-auto"
        style={{ background: '#0a0a0a' }}>
        <div className="absolute top-0 left-10 right-10 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.6), transparent)' }} />

        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(197,160,89,0.12)', border: '1px solid rgba(197,160,89,0.25)' }}>
                <Edit3 size={20} className="text-[#C5A059]" />
              </div>
              <div>
                <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em]">
                  EDIT PROFILE
                </h3>
                <p className="font-rajdhani text-zinc-600 text-[11px] tracking-[0.15em] uppercase">
                  Update your information
                </p>
              </div>
            </div>
            <button onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08]
                         flex items-center justify-center hover:bg-white/[0.08]
                         transition-all duration-200 hover:scale-105 active:scale-95">
              <X size={16} className="text-zinc-500" />
            </button>
          </div>

          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(197,160,89,0.15), rgba(197,160,89,0.05))',
                  border: '2px solid rgba(197,160,89,0.3)',
                  boxShadow: '0 8px 32px rgba(197,160,89,0.15)'
                }}>
                <span className="font-orbitron text-[#C5A059] text-[28px] font-bold">AM</span>
              </div>
              <button className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl
                                 bg-[#C5A059] flex items-center justify-center
                                 hover:scale-110 transition-all duration-300 shadow-lg"
                style={{ boxShadow: '0 4px 16px rgba(197,160,89,0.4)' }}>
                <Camera size={14} className="text-black" />
              </button>
            </div>
          </div>

          {[
            { label: 'Full Name', value: name, set: setName, icon: User, color: '#C5A059', },
            { label: 'Email Address', value: email, set: setEmail, icon: Mail, color: '#3B82F6' },
            { label: 'Phone Number', value: phone, set: setPhone, icon: Phone, color: '#22C55E' },
          ].map((field) => (
            <div key={field.label} className="mb-5">
              <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.2em] uppercase font-semibold mb-2">
                {field.label}
              </p>
              <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/[0.03]
                              border border-white/[0.08] focus-within:border-white/[0.2]
                              transition-colors duration-200">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${field.color}10`, border: `1px solid ${field.color}15` }}>
                  <field.icon size={14} style={{ color: field.color }} />
                </div>
                <input value={field.value} onChange={(e) => field.set(e.target.value)}
                  className="flex-1 bg-transparent font-rajdhani text-white text-[14px]
                             outline-none placeholder:text-zinc-700 tracking-wider" />
              </div>
            </div>
          ))}

          <button onClick={onClose}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl
                       font-orbitron font-bold text-[13px] tracking-[0.15em] text-black mt-4
                       transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: 'linear-gradient(135deg, #C5A059 0%, #EAB308 100%)',
              boxShadow: '0 8px 32px rgba(197,160,89,0.25)'
            }}>
            <Save size={16} />
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN COMPONENT                                                 */
/* ═══════════════════════════════════════════════════════════════ */
const AdminSettings = ({ onLogout }) => {
  const navigate = useNavigate();
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [memberAlerts, setMemberAlerts] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  return (
    <Layout title="SETTINGS" onLogout={onLogout}>
      {/* Page wrapper with dark bg */}
      <div className="min-h-screen bg-[#050505]">
        <div className="p-8 lg:p-10 space-y-8 max-w-[1400px] mx-auto">

          {/* ═══════════════════════════════════════════════ */}
          {/* HEADER                                         */}
          {/* ═══════════════════════════════════════════════ */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <button onClick={() => navigate(-1)}
                className="w-12 h-12 rounded-2xl border border-white/[0.08]
                           flex items-center justify-center hover:bg-white/[0.04]
                           transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: '#0a0a0a' }}>
                <ArrowLeft size={18} className="text-zinc-500" />
              </button>
              <div>
                <p className="font-rajdhani text-[#C5A059] text-[11px] tracking-[0.3em] uppercase font-bold mb-1
                              flex items-center gap-2">
                  <span>Administrator</span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/40">Configuration</span>
                </p>
                <h1 className="font-orbitron text-white font-extrabold text-[28px] tracking-[0.2em]
                               bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  SETTINGS
                </h1>
              </div>
            </div>

            <GlassPanel className="hidden lg:flex items-center gap-3 px-5 py-3">
              <PulseDot color="#22C55E" size={5} />
              <div>
                <span className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.15em] uppercase block">
                  System Status
                </span>
                <span className="font-orbitron text-green-400 text-[11px] font-bold tracking-wider">
                  ALL SYSTEMS ONLINE
                </span>
              </div>
            </GlassPanel>
          </div>

          {/* ═══════════════════════════════════════════════ */}
          {/* MAIN GRID                                      */}
          {/* ═══════════════════════════════════════════════ */}
          <div className="grid grid-cols-12 gap-6">

            {/* ─────────────────────────────────────────── */}
            {/* LEFT: Profile + Stats + Billing (5 cols)    */}
            {/* ─────────────────────────────────────────── */}
            <div className="col-span-12 xl:col-span-5 space-y-6">

              {/* Profile Card */}
              <GlassPanel className="relative overflow-hidden group"
                borderColor="rgba(197,160,89,0.15)" glow="rgba(197,160,89,0.06)">
                <div className="absolute top-0 left-10 right-10 h-[2px]"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.4), transparent)' }} />
                {GYM_LOGO && (
                  <img src={GYM_LOGO} alt=""
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-[200px] h-[100px]
                               object-contain opacity-[0.03] pointer-events-none" />
                )}

                <div className="p-8 relative z-10">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-3xl flex items-center justify-center
                                      transition-all duration-500 group-hover:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, rgba(197,160,89,0.15), rgba(197,160,89,0.05))',
                          border: '2px solid rgba(197,160,89,0.25)',
                          boxShadow: '0 8px 32px rgba(197,160,89,0.12)'
                        }}>
                        <span className="font-orbitron text-[#C5A059] text-[24px] font-bold">AM</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg
                                      bg-green-500 flex items-center justify-center border-2 border-[#0a0a0a]">
                        <CheckCircle size={12} className="text-white" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-orbitron text-white font-bold text-[18px] tracking-[0.12em] mb-1">
                        ADMIN MANAGER
                      </h3>
                      <p className="font-rajdhani text-zinc-500 text-[12px] tracking-wider mb-3">
                        admin@fitzone.com
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                                        bg-[#C5A059]/[0.08] border border-[#C5A059]/[0.2]">
                          <Crown size={10} className="text-[#C5A059]" />
                          <span className="font-rajdhani text-[#C5A059] text-[9px] tracking-[0.15em] uppercase font-bold">
                            Administrator
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                                        bg-green-500/[0.08] border border-green-500/[0.15]">
                          <PulseDot color="#22C55E" size={4} />
                          <span className="font-rajdhani text-green-400 text-[9px] tracking-[0.15em] uppercase font-bold">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { icon: Phone, label: '+91 9876543210', color: '#22C55E' },
                      { icon: MapPin, label: 'Mumbai, India', color: '#3B82F6' },
                      { icon: Calendar, label: 'Joined Jan 2024', color: '#A855F7' },
                      { icon: Clock, label: 'Last login: 2m ago', color: '#EAB308' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                                              border border-white/[0.04]"
                        style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <item.icon size={12} style={{ color: `${item.color}80` }} />
                        <span className="font-rajdhani text-zinc-500 text-[10px] tracking-wider truncate">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-[#C5A059]/[0.15] to-transparent mb-5" />

                  <button onClick={() => setShowEditModal(true)}
                    className="flex items-center justify-between w-full px-5 py-4 rounded-2xl
                               bg-[#C5A059]/[0.06] border border-[#C5A059]/[0.15]
                               hover:bg-[#C5A059]/[0.10] hover:border-[#C5A059]/[0.25]
                               transition-all duration-300 group/btn">
                    <div className="flex items-center gap-3">
                      <Edit3 size={14} className="text-[#C5A059]" />
                      <span className="font-rajdhani text-white font-bold text-[12px] tracking-[0.12em] uppercase">
                        Edit Profile
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-[#C5A059]/50
                                   group-hover/btn:text-[#C5A059] group-hover/btn:translate-x-1
                                   transition-all duration-300" />
                  </button>
                </div>
              </GlassPanel>

              {/* Stats */}
              <GlassPanel>
                <div className="p-7">
                  <SectionHeader title="QUICK STATS" subtitle="Your gym at a glance" icon={Activity} color="#22C55E" />
                  <div className="grid grid-cols-3 gap-3">
                    <StatMini icon={Users} label="Members" value={128} color="#C5A059" />
                    <StatMini icon={IndianRupee} label="Revenue" value={185} color="#22C55E" />
                    <StatMini icon={Activity} label="Active" value={108} color="#3B82F6" />
                  </div>
                </div>
              </GlassPanel>

              {/* Billing */}
              <GlassPanel borderColor="rgba(168,85,247,0.12)" glow="rgba(168,85,247,0.05)">
                <div className="p-7">
                  <SectionHeader title="BILLING & PLAN" subtitle="Subscription details" icon={CreditCard} color="#A855F7" />

                  <div className="p-5 rounded-2xl mb-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(234,179,8,0.04))',
                      border: '1px solid rgba(168,85,247,0.15)'
                    }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.25)' }}>
                          <Crown size={18} className="text-purple-400" />
                        </div>
                        <div>
                          <p className="font-orbitron text-white font-bold text-[14px] tracking-wider">
                            PREMIUM
                          </p>
                          <p className="font-rajdhani text-purple-400/60 text-[10px] tracking-[0.12em] uppercase">
                            Annual Plan
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                                      bg-green-500/[0.08] border border-green-500/[0.15]">
                        <CheckCircle size={10} className="text-green-400" />
                        <span className="font-rajdhani text-green-400 text-[9px] tracking-[0.12em] uppercase font-bold">
                          Active
                        </span>
                      </div>
                    </div>

                    <div className="flex items-end gap-2 mb-4">
                      <span className="font-orbitron text-[#C5A059] text-[32px] font-bold leading-none">
                        ₹12,999
                      </span>
                      <span className="font-rajdhani text-zinc-600 text-[11px] tracking-wider mb-1">/year</span>
                    </div>

                    <div className="h-[3px] bg-white/[0.04] rounded-full overflow-hidden mb-2">
                      <div className="h-full rounded-full"
                        style={{
                          width: '67%',
                          background: 'linear-gradient(90deg, #A855F7, #A855F760)',
                          boxShadow: '0 0 8px rgba(168,85,247,0.4)'
                        }} />
                    </div>
                    <div className="flex justify-between">
                      <span className="font-rajdhani text-zinc-600 text-[9px] tracking-wider uppercase">
                        8 months used
                      </span>
                      <span className="font-rajdhani text-purple-400/60 text-[9px] tracking-wider uppercase">
                        4 months left
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Unlimited Members', icon: Users },
                      { label: 'Analytics', icon: Activity },
                      { label: 'Cloud Backup', icon: Cloud },
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2.5 rounded-xl
                                              border border-white/[0.04]"
                        style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <CheckCircle size={10} className="text-purple-400 flex-shrink-0" />
                        <span className="font-rajdhani text-zinc-500 text-[9px] tracking-wider uppercase truncate">
                          {feature.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassPanel>
            </div>

            {/* ─────────────────────────────────────────── */}
            {/* RIGHT: All Settings (7 cols)                */}
            {/* ─────────────────────────────────────────── */}
            <div className="col-span-12 xl:col-span-7 space-y-6">

              {/* Account Settings */}
              <GlassPanel>
                <div className="p-7">
                  <SectionHeader title="ACCOUNT" subtitle="Manage your account details" icon={Shield} color="#3B82F6" />
                  <div className="space-y-3">
                    <SettingRow icon={Mail} label="Email Address" value="admin@fitzone.com" color="#3B82F6" />
                    <SettingRow icon={Phone} label="Phone Number" value="+91 9876543210" color="#22C55E" />
                    <SettingRow icon={Lock} label="Change Password" value="Last changed 30 days ago" color="#EF4444" />
                    <SettingRow icon={Key} label="Two-Factor Auth" value="Enabled via SMS"
                      color="#A855F7" badge="ON" />
                    <SettingRow icon={Globe} label="Language" value="English (India)" color="#EAB308" />
                  </div>
                </div>
              </GlassPanel>

              {/* Notifications */}
              <GlassPanel borderColor="rgba(234,179,8,0.12)">
                <div className="p-7">
                  <SectionHeader title="NOTIFICATIONS" subtitle="Control your alert preferences" icon={Bell} color="#EAB308" />
                  <div className="space-y-3">
                    <ToggleRow icon={Bell} label="Push Notifications"
                      sublabel="Receive push notifications on device"
                      value={enableNotifications}
                      onChange={() => setEnableNotifications(!enableNotifications)}
                      color="#EAB308" />
                    <ToggleRow icon={Users} label="Member Alerts"
                      sublabel="New registrations & expirations"
                      value={memberAlerts}
                      onChange={() => setMemberAlerts(!memberAlerts)}
                      color="#22C55E" />
                    <ToggleRow icon={IndianRupee} label="Payment Alerts"
                      sublabel="Payment received & pending reminders"
                      value={paymentAlerts}
                      onChange={() => setPaymentAlerts(!paymentAlerts)}
                      color="#3B82F6" />
                  </div>
                </div>
              </GlassPanel>

              {/* Preferences */}
              <GlassPanel>
                <div className="p-7">
                  <SectionHeader title="PREFERENCES" subtitle="Customize your experience" icon={Palette} color="#22D3EE" />
                  <div className="space-y-3">
                    <ToggleRow icon={Moon} label="Dark Mode"
                      sublabel="Enable dark theme across the app"
                      value={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                      color="#A855F7" />
                    <ToggleRow icon={Cloud} label="Auto Backup"
                      sublabel="Automatically backup data to cloud"
                      value={autoBackup}
                      onChange={() => setAutoBackup(!autoBackup)}
                      color="#22D3EE" />
                  </div>
                </div>
              </GlassPanel>

              {/* Data Management */}
              <GlassPanel>
                <div className="p-7">
                  <SectionHeader title="DATA MANAGEMENT" subtitle="Export, import & manage data" icon={Database} color="#F97316" />
                  <div className="space-y-3">
                    <SettingRow icon={Download} label="Export Data" value="Download all gym data as CSV" color="#22C55E" />
                    <SettingRow icon={Upload} label="Import Data" value="Import members from spreadsheet" color="#3B82F6" />
                    <SettingRow icon={RefreshCw} label="Sync Now" value="Last synced 5 minutes ago"
                      color="#F97316" badge="SYNC" />
                    <SettingRow icon={HardDrive} label="Storage Used" value="2.4 GB of 10 GB used" color="#A855F7" />
                  </div>
                </div>
              </GlassPanel>

              {/* Danger Zone */}
              <GlassPanel borderColor="rgba(239,68,68,0.15)" glow="rgba(239,68,68,0.04)">
                <div className="p-7">
                  <SectionHeader title="DANGER ZONE" subtitle="Irreversible actions" icon={AlertTriangle}
                    color="#EF4444" danger />
                  <div className="space-y-3">
                    <button onClick={handleLogout}
                      className="group flex items-center gap-4 w-full p-4 rounded-2xl
                                 bg-red-500/[0.04] border border-red-500/[0.12]
                                 hover:bg-red-500/[0.08] hover:border-red-500/[0.2]
                                 transition-all duration-300 text-left">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center
                                      transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                        style={{
                          background: 'rgba(239,68,68,0.12)',
                          border: '1px solid rgba(239,68,68,0.2)',
                          boxShadow: '0 4px 12px rgba(239,68,68,0.08)'
                        }}>
                        <LogOut size={16} className="text-red-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-rajdhani text-red-400 text-[13px] font-bold tracking-[0.12em] uppercase">
                          Logout
                        </p>
                        <p className="font-rajdhani text-red-400/40 text-[10px] tracking-wider">
                          Sign out of your account
                        </p>
                      </div>
                      <ChevronRight size={16}
                        className="text-red-400/30 group-hover:text-red-400/60
                                   group-hover:translate-x-1 transition-all duration-300" />
                    </button>

                    <button className="group flex items-center gap-4 w-full p-4 rounded-2xl
                                       bg-red-500/[0.02] border border-red-500/[0.08]
                                       hover:bg-red-500/[0.06] hover:border-red-500/[0.15]
                                       transition-all duration-300 text-left">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center
                                      transition-all duration-300 group-hover:scale-110"
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.12)' }}>
                        <Trash2 size={16} className="text-red-400/60" />
                      </div>
                      <div className="flex-1">
                        <p className="font-rajdhani text-red-400/70 text-[13px] font-bold tracking-[0.12em] uppercase">
                          Delete Account
                        </p>
                        <p className="font-rajdhani text-red-400/30 text-[10px] tracking-wider">
                          Permanently delete all data
                        </p>
                      </div>
                      <ChevronRight size={16}
                        className="text-red-400/20 group-hover:text-red-400/40
                                   group-hover:translate-x-1 transition-all duration-300" />
                    </button>
                  </div>
                </div>
              </GlassPanel>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════ */}
          {/* FOOTER                                         */}
          {/* ═══════════════════════════════════════════════ */}
          <div className="pt-6 pb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-6" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {GYM_LOGO && (
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/[0.06]
                                  flex items-center justify-center p-1.5"
                    style={{ backgroundColor: '#0a0a0a' }}>
                    <img src={GYM_LOGO} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                )}
                <div>
                  <p className="font-orbitron text-zinc-600 text-[10px] tracking-[0.15em]">
                    JERAI FITNESS
                  </p>
                  <p className="font-rajdhani text-zinc-800 text-[9px] tracking-wider">
                    Powered by Elite Gym Management
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-orbitron text-zinc-700 text-[9px] tracking-wider">
                  Version 1.0.0
                </p>
                <p className="font-rajdhani text-zinc-800 text-[9px] tracking-wider">
                  Last updated: Jan 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && <EditProfileModal onClose={() => setShowEditModal(false)} />}
    </Layout>
  );
};

export default AdminSettings;