// AdminSettings.jsx — FULL DASHBOARD-MATCHING PREMIUM UI
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  LogOut, Mail, Phone, Shield, Bell, Save, CreditCard,
  ChevronRight, User, Camera, Lock, Key, Globe, Database,
  HardDrive, Cloud, Palette, AlertTriangle, Trash2,
  Download, Upload, RefreshCw, Clock, CheckCircle, Edit3,
  Crown, Zap, ArrowLeft, Activity, IndianRupee, Calendar,
  MapPin, Users, X, Monitor, Sparkles, TrendingUp, Star,
} from 'lucide-react';

import gymLogo from '../../../../assets/gym-logo.png';
const GYM_LOGO = gymLogo;

/* ═══════════════════════════════════════════════════════════════ */
/* ANIMATED NUMBER                                                 */
/* ═══════════════════════════════════════════════════════════════ */
const AnimatedNumber = ({ value, duration = 1200 }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const startTime = performance.now();
    const animate = (t) => {
      const p = Math.min((t - startTime) / duration, 1);
      setDisplay(Math.floor((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, duration]);
  return display;
};

/* ═══════════════════════════════════════════════════════════════ */
/* PULSE DOT (dashboard style)                                     */
/* ═══════════════════════════════════════════════════════════════ */
const PulseDot = ({ color = '#22C55E', size = 8 }) => (
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
/* STAT CARD (same as dashboard top metrics)                       */
/* ═══════════════════════════════════════════════════════════════ */
const StatCard = ({ icon: Icon, label, value, color, sub }) => (
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
      </div>
      <p className="font-orbitron text-white font-bold text-[26px] leading-none mb-1
                    transition-all duration-300 group-hover:text-[28px]">
        <AnimatedNumber value={value} />
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
/* SECTION HEADER                                                  */
/* ═══════════════════════════════════════════════════════════════ */
const SectionHeader = ({ title, subtitle, color = '#C5A059', icon: Icon, danger = false }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-1.5 h-8 rounded-full"
      style={{ background: `linear-gradient(180deg, ${danger ? '#EF4444' : color}, ${danger ? '#EF444420' : `${color}20`})` }} />
    {Icon && (
      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${danger ? '#EF4444' : color}10`, border: `1px solid ${danger ? '#EF4444' : color}18` }}>
        <Icon size={16} style={{ color: danger ? '#EF4444' : color }} />
      </div>
    )}
    <div>
      <h3 className="font-orbitron font-bold text-[14px] tracking-[0.15em]"
        style={{ color: danger ? '#EF4444' : 'white' }}>{title}</h3>
      {subtitle && (
        <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">{subtitle}</p>
      )}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* SETTING ROW (dashboard CommandButton style)                     */
/* ═══════════════════════════════════════════════════════════════ */
const SettingRow = ({ icon: Icon, label, value, color = '#C5A059', onClick, badge }) => (
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
      <Icon size={16} style={{ color }} />
    </div>
    <div className="flex-1 min-w-0 z-10">
      <p className="font-rajdhani text-white text-[13px] font-bold tracking-[0.10em] uppercase">{label}</p>
      <p className="font-rajdhani text-zinc-500 text-[11px] tracking-wide mt-0.5">{value}</p>
    </div>
    {badge && (
      <span className="px-2.5 py-1 rounded-lg text-[9px] font-orbitron font-bold z-10"
        style={{ background: `${color}12`, color, border: `1px solid ${color}22` }}>{badge}</span>
    )}
    <ChevronRight size={16} className="text-white/15 group-hover:text-white/40 group-hover:translate-x-1 transition-all z-10" />
  </button>
);

/* ═══════════════════════════════════════════════════════════════ */
/* TOGGLE ROW                                                      */
/* ═══════════════════════════════════════════════════════════════ */
const ToggleRow = ({ icon: Icon, label, sublabel, value, onChange, color = '#C5A059' }) => (
  <div className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300"
    style={{ background: '#000', border: `1px solid ${value ? `${color}15` : 'rgba(255,255,255,0.07)'}` }}>
    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{
        background: value ? `${color}12` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${value ? `${color}22` : 'rgba(255,255,255,0.07)'}`,
        transition: 'all 0.3s',
      }}>
      <Icon size={16} style={{ color: value ? color : '#52525B', transition: 'color 0.3s' }} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-rajdhani text-white text-[13px] font-bold tracking-[0.10em] uppercase">{label}</p>
      {sublabel && (
        <p className="font-rajdhani text-zinc-500 text-[11px] tracking-wide mt-0.5">{sublabel}</p>
      )}
    </div>
    <button onClick={onChange}
      className="relative w-14 h-7 rounded-full transition-all duration-500 flex-shrink-0"
      style={{
        background: value ? `linear-gradient(135deg, ${color}, ${color}CC)` : 'rgba(255,255,255,0.08)',
        border: `1px solid ${value ? `${color}40` : 'rgba(255,255,255,0.10)'}`,
        boxShadow: value ? `0 4px 16px ${color}30` : 'none',
      }}>
      <div className={`absolute top-[3px] w-5 h-5 rounded-full bg-white shadow-lg
                        transition-all duration-500 ${value ? 'left-[31px]' : 'left-[3px]'}`}
        style={{ boxShadow: value ? `0 2px 8px ${color}40` : '0 2px 8px rgba(0,0,0,0.3)' }} />
    </button>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* EDIT PROFILE MODAL                                              */
/* ═══════════════════════════════════════════════════════════════ */
const EditProfileModal = ({ onClose }) => {
  const [name,  setName]  = useState('Admin Manager');
  const [email, setEmail] = useState('admin@fitzone.com');
  const [phone, setPhone] = useState('+91 9876543210');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)' }}>
      <div className="w-full max-w-lg rounded-3xl overflow-hidden"
        style={{ background: '#000', border: '1px solid rgba(197,160,89,0.20)', boxShadow: '0 32px 100px rgba(0,0,0,0.9)' }}>

        {/* Gold accent */}
        <div className="absolute top-0 left-10 right-10 h-[2px]"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(197,160,89,0.6),transparent)' }} />

        {/* Header */}
        <div className="p-7 flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(197,160,89,0.12)', border: '1px solid rgba(197,160,89,0.22)' }}>
              <Edit3 size={20} className="text-[#C5A059]" />
            </div>
            <div>
              <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.12em]">EDIT PROFILE</h3>
              <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">Update your information</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <X size={15} color="#71717A" />
          </button>
        </div>

        {/* Avatar */}
        <div className="px-7 pt-7 pb-5 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg,rgba(197,160,89,0.15),rgba(197,160,89,0.05))',
                border: '2px solid rgba(197,160,89,0.28)',
                boxShadow: '0 8px 32px rgba(197,160,89,0.12)',
              }}>
              <span className="font-orbitron text-[#C5A059] text-[28px] font-bold">AM</span>
            </div>
            <button className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl flex items-center justify-center
                               transition-all duration-300 hover:scale-110"
              style={{ background: 'linear-gradient(135deg,#C5A059,#EAB308)', boxShadow: '0 4px 16px rgba(197,160,89,0.4)' }}>
              <Camera size={14} className="text-black" />
            </button>
          </div>
        </div>

        {/* Fields */}
        <div className="px-7 pb-7 space-y-4">
          {[
            { label: 'Full Name', value: name, set: setName, icon: User, color: '#C5A059' },
            { label: 'Email Address', value: email, set: setEmail, icon: Mail, color: '#3B82F6' },
            { label: 'Phone Number', value: phone, set: setPhone, icon: Phone, color: '#22C55E' },
          ].map((f) => (
            <div key={f.label}>
              <label className="block font-rajdhani text-zinc-500 text-[10px] tracking-[0.2em] uppercase font-semibold mb-2">
                {f.label}
              </label>
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${f.color}10`, border: `1px solid ${f.color}15` }}>
                  <f.icon size={14} style={{ color: f.color }} />
                </div>
                <input value={f.value} onChange={e => f.set(e.target.value)}
                  className="flex-1 bg-transparent font-rajdhani text-white text-[13px] outline-none placeholder:text-zinc-700 tracking-wider" />
              </div>
            </div>
          ))}

          {/* Save */}
          <button onClick={onClose}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-orbitron font-bold
                       text-[12px] tracking-[0.15em] text-black transition-all duration-300 hover:scale-[1.01] mt-2"
            style={{
              background: 'linear-gradient(135deg,#C5A059,#EAB308)',
              boxShadow: '0 8px 32px rgba(197,160,89,0.30)',
            }}>
            <Save size={16} /> SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN COMPONENT                                                  */
/* ═══════════════════════════════════════════════════════════════ */
const AdminSettings = ({ onLogout }) => {
  const navigate = useNavigate();
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [darkMode,             setDarkMode]             = useState(true);
  const [autoBackup,           setAutoBackup]           = useState(true);
  const [memberAlerts,         setMemberAlerts]         = useState(true);
  const [paymentAlerts,        setPaymentAlerts]        = useState(true);
  const [showEditModal,        setShowEditModal]        = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) onLogout();
  };

  return (
    <Layout title="SETTINGS" onLogout={onLogout}>
      <div className="relative min-h-screen">

        {/* ── Background (same as dashboard) ── */}
        <div className="fixed inset-0 z-0" style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(234,179,8,0.05) 0%, transparent 50%),
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
              <button onClick={() => navigate(-1)}
                className="group w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{ background: '#000', border: '1px solid rgba(255,255,255,0.08)' }}>
                <ArrowLeft size={18} className="text-zinc-400 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
              </button>
              <div>
                <p className="font-rajdhani text-[#C5A059] text-[12px] tracking-[0.3em] uppercase font-bold mb-1
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

            {/* System status */}
            <GlassPanel className="hidden lg:block">
              <div className="px-5 py-3 flex items-center gap-3">
                <PulseDot color="#22C55E" size={5} />
                <div>
                  <span className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.2em] uppercase block">System Status</span>
                  <span className="font-orbitron text-green-400 text-[11px] font-bold tracking-wider">ALL SYSTEMS ONLINE</span>
                </div>
              </div>
            </GlassPanel>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* STATS ROW                                              */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Users}       label="Total Members"  value={128} color="#C5A059" sub="registered" />
            <StatCard icon={Activity}    label="Active Today"   value={15}  color="#22C55E" sub="checked in" />
            <StatCard icon={IndianRupee} label="Revenue (K)"    value={185} color="#A855F7" sub="this month" />
            <StatCard icon={TrendingUp}  label="Active Rate"    value={84}  color="#22D3EE" sub="percentage" />
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* MAIN GRID                                              */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-12 gap-6">

            {/* ── LEFT COLUMN (span-5) ── */}
            <div className="col-span-12 xl:col-span-5 space-y-6">

              {/* ── PROFILE CARD ── */}
              <GlassPanel borderColor="rgba(197,160,89,0.18)" glow="rgba(197,160,89,0.06)">
                {/* Gold top accent */}
                <div className="absolute top-0 left-10 right-10 h-[2px]"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(197,160,89,0.5),transparent)' }} />

                {/* Logo watermark */}
                {GYM_LOGO && (
                  <img src={GYM_LOGO} alt=""
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-[200px] h-[100px] object-contain opacity-[0.03] pointer-events-none" />
                )}

                <div className="p-8 relative z-10">
                  {/* Avatar + Info */}
                  <div className="flex items-start gap-5 mb-6">
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg,rgba(197,160,89,0.15),rgba(197,160,89,0.05))',
                          border: '2px solid rgba(197,160,89,0.25)',
                          boxShadow: '0 8px 32px rgba(197,160,89,0.12)',
                        }}>
                        <span className="font-orbitron text-[#C5A059] text-[24px] font-bold">AM</span>
                      </div>
                      <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: '#000', border: '2px solid rgba(34,197,94,0.40)' }}>
                        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                          style={{ background: 'rgba(197,160,89,0.10)', border: '1px solid rgba(197,160,89,0.20)' }}>
                          <Crown size={10} className="text-[#C5A059]" />
                          <span className="font-orbitron text-[#C5A059] text-[8px] font-bold tracking-[0.15em]">ADMIN</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }}>
                          <PulseDot color="#22C55E" size={4} />
                          <span className="font-orbitron text-green-400 text-[8px] font-bold tracking-[0.15em]">ONLINE</span>
                        </div>
                      </div>
                      <h3 className="font-orbitron text-white font-bold text-[18px] tracking-[0.10em] mb-1">
                        ADMIN MANAGER
                      </h3>
                      <p className="font-rajdhani text-zinc-500 text-[12px] tracking-wider">
                        admin@fitzone.com
                      </p>
                    </div>
                  </div>

                  {/* Info grid */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {[
                      { icon: Phone,    label: '+91 9876543210', color: '#22C55E' },
                      { icon: MapPin,   label: 'Mumbai, India',  color: '#3B82F6' },
                      { icon: Calendar, label: 'Jan 2024',       color: '#A855F7' },
                      { icon: Clock,    label: '2 min ago',      color: '#EAB308' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <item.icon size={11} style={{ color: `${item.color}80` }} />
                        <span className="font-rajdhani text-zinc-500 text-[10px] tracking-wide truncate">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px mb-5" style={{ background: 'linear-gradient(90deg,transparent,rgba(197,160,89,0.15),transparent)' }} />

                  {/* Edit button */}
                  <button onClick={() => setShowEditModal(true)}
                    className="group flex items-center justify-between w-full px-5 py-3.5 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
                    style={{ background: 'rgba(197,160,89,0.06)', border: '1px solid rgba(197,160,89,0.15)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6"
                        style={{ background: 'rgba(197,160,89,0.12)', border: '1px solid rgba(197,160,89,0.20)' }}>
                        <Edit3 size={14} className="text-[#C5A059]" />
                      </div>
                      <span className="font-rajdhani text-white font-bold text-[12px] tracking-[0.12em] uppercase">Edit Profile</span>
                    </div>
                    <ChevronRight size={16} className="text-[#C5A059]/40 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </GlassPanel>

              {/* ── BILLING CARD ── */}
              <GlassPanel borderColor="rgba(168,85,247,0.15)" glow="rgba(168,85,247,0.05)">
                <div className="absolute top-0 left-8 right-8 h-[2px]"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(168,85,247,0.4),transparent)' }} />

                <div className="p-7">
                  <SectionHeader title="BILLING & PLAN" subtitle="Subscription overview" icon={CreditCard} color="#A855F7" />

                  {/* Plan display */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.22)' }}>
                        <Crown size={20} className="text-purple-400" />
                      </div>
                      <div>
                        <p className="font-orbitron text-white font-bold text-[16px] tracking-wider mb-1">PREMIUM</p>
                        <p className="font-rajdhani text-purple-400/60 text-[10px] tracking-[0.12em] uppercase">Annual Plan</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                      style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="font-rajdhani text-green-400 text-[9px] tracking-[0.12em] uppercase font-bold">Active</span>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="flex items-end gap-2 mb-5">
                    <span className="font-orbitron text-[#C5A059] font-extralight text-[36px] leading-none">₹12,999</span>
                    <span className="font-rajdhani text-zinc-600 text-[11px] tracking-wider mb-1">/year</span>
                  </div>

                  {/* Progress */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.12em] uppercase">8 months used</span>
                      <span className="font-orbitron text-purple-400 text-[10px] font-bold">4 left</span>
                    </div>
                    <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000"
                        style={{ width: '67%', background: 'linear-gradient(90deg,#A855F7,#A855F760)', boxShadow: '0 0 8px rgba(168,85,247,0.4)' }} />
                    </div>
                  </div>

                  <div className="h-px my-5" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)' }} />

                  {/* Features */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Unlimited', icon: Users },
                      { label: 'Analytics', icon: Activity },
                      { label: 'Cloud',     icon: Cloud },
                    ].map((f, i) => (
                      <div key={i} className="flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl text-center"
                        style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.12)' }}>
                        <CheckCircle size={13} className="text-purple-400" />
                        <span className="font-rajdhani text-zinc-500 text-[9px] tracking-wider uppercase">{f.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassPanel>

              {/* ── DEVICE MANAGEMENT SHORTCUT ── */}
              <GlassPanel hover borderColor="rgba(34,211,238,0.12)" glow="rgba(34,211,238,0.04)"
                onClick={() => navigate('/device-management')}>
                <div className="absolute top-0 left-8 right-8 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(34,211,238,0.4),transparent)' }} />
                <div className="p-6 flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: 'rgba(34,211,238,0.10)', border: '1px solid rgba(34,211,238,0.18)' }}>
                    <Monitor size={20} className="text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-orbitron text-white font-bold text-[13px] tracking-[0.12em] mb-0.5">DEVICE MANAGEMENT</p>
                    <p className="font-rajdhani text-zinc-500 text-[11px] tracking-wide">
                      Manage registered devices · 3 max
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-2.5 py-1 rounded-lg"
                      style={{ background: 'rgba(34,211,238,0.10)', border: '1px solid rgba(34,211,238,0.18)' }}>
                      <span className="font-orbitron text-cyan-400 text-[10px] font-bold">3</span>
                    </div>
                    <ChevronRight size={16} className="text-cyan-400/30 group-hover:text-cyan-400/70 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </GlassPanel>
            </div>

            {/* ── RIGHT COLUMN (span-7) ── */}
            <div className="col-span-12 xl:col-span-7 space-y-6">

              {/* ── ACCOUNT ── */}
              <GlassPanel>
                <div className="p-7">
                  <SectionHeader title="ACCOUNT" subtitle="Manage your credentials" icon={Shield} color="#3B82F6" />
                  <div className="space-y-3">
                    <SettingRow icon={Mail}  label="Email Address" value="admin@fitzone.com" color="#3B82F6" />
                    <SettingRow icon={Phone} label="Phone Number"  value="+91 9876543210"   color="#22C55E" />
                    <SettingRow icon={Lock}  label="Change Password" value="Last changed 30 days ago" color="#EF4444" />
                    <SettingRow icon={Key}   label="Two-Factor Auth" value="Enabled via SMS" color="#A855F7" badge="ON" />
                    <SettingRow icon={Globe} label="Language" value="English (India)" color="#EAB308" />
                  </div>
                </div>
              </GlassPanel>

              {/* ── NOTIFICATIONS ── */}
              <GlassPanel borderColor="rgba(234,179,8,0.12)">
                <div className="p-7">
                  <SectionHeader title="NOTIFICATIONS" subtitle="Alert preferences" icon={Bell} color="#EAB308" />
                  <div className="space-y-3">
                    <ToggleRow icon={Bell}        label="Push Notifications" sublabel="Receive push alerts on device"
                      value={enableNotifications} onChange={() => setEnableNotifications(!enableNotifications)} color="#EAB308" />
                    <ToggleRow icon={Users}       label="Member Alerts" sublabel="New registrations & expirations"
                      value={memberAlerts}        onChange={() => setMemberAlerts(!memberAlerts)}             color="#22C55E" />
                    <ToggleRow icon={IndianRupee} label="Payment Alerts" sublabel="Payments received & pending"
                      value={paymentAlerts}       onChange={() => setPaymentAlerts(!paymentAlerts)}           color="#3B82F6" />
                  </div>
                </div>
              </GlassPanel>

              {/* ── PREFERENCES ── */}
              <GlassPanel>
                <div className="p-7">
                  <SectionHeader title="PREFERENCES" subtitle="Customize your experience" icon={Palette} color="#22D3EE" />
                  <div className="space-y-3">
                    <ToggleRow icon={Star}  label="Dark Mode"    sublabel="Enable dark theme"           value={darkMode}    onChange={() => setDarkMode(!darkMode)}       color="#A855F7" />
                    <ToggleRow icon={Cloud} label="Auto Backup"  sublabel="Automatically backup to cloud" value={autoBackup} onChange={() => setAutoBackup(!autoBackup)}   color="#22D3EE" />
                  </div>
                </div>
              </GlassPanel>

              {/* ── DATA MANAGEMENT ── */}
              <GlassPanel>
                <div className="p-7">
                  <SectionHeader title="DATA MANAGEMENT" subtitle="Export, import & storage" icon={Database} color="#F97316" />
                  <div className="space-y-3">
                    <SettingRow icon={Download}   label="Export Data"   value="Download all gym data as CSV"        color="#22C55E" />
                    <SettingRow icon={Upload}     label="Import Data"   value="Import members from spreadsheet"     color="#3B82F6" />
                    <SettingRow icon={RefreshCw}  label="Sync Now"      value="Last synced 5 minutes ago"           color="#F97316" badge="SYNC" />
                    <SettingRow icon={HardDrive}  label="Storage Used"  value="2.4 GB of 10 GB used"               color="#A855F7" />
                  </div>
                </div>
              </GlassPanel>

              {/* ── DANGER ZONE ── */}
              <GlassPanel borderColor="rgba(239,68,68,0.15)" glow="rgba(239,68,68,0.04)">
                <div className="p-7">
                  <SectionHeader title="DANGER ZONE" subtitle="Irreversible actions" icon={AlertTriangle} danger />

                  <div className="space-y-3">
                    {/* Logout */}
                    <button onClick={handleLogout}
                      className="group relative flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-left
                                 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
                      style={{ background: '#000', border: '1px solid rgba(239,68,68,0.18)' }}>
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ background: 'radial-gradient(circle at 30% 50%,rgba(239,68,68,0.06) 0%,transparent 70%)' }} />
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 z-10
                                      transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                        style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.20)', boxShadow: '0 4px 12px rgba(239,68,68,0.08)' }}>
                        <LogOut size={16} className="text-red-400" />
                      </div>
                      <div className="flex-1 min-w-0 z-10">
                        <p className="font-rajdhani text-red-400 text-[13px] font-bold tracking-[0.10em] uppercase">Logout</p>
                        <p className="font-rajdhani text-red-400/40 text-[11px] tracking-wide mt-0.5">Sign out of your account</p>
                      </div>
                      <ChevronRight size={16} className="text-red-400/25 group-hover:text-red-400/60 group-hover:translate-x-1 transition-all z-10" />
                    </button>

                    {/* Delete Account */}
                    <button className="group relative flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-left
                                       transition-all duration-300 hover:scale-[1.01]"
                      style={{ background: '#000', border: '1px solid rgba(239,68,68,0.10)' }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                                      transition-all duration-300 group-hover:scale-110"
                        style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}>
                        <Trash2 size={16} className="text-red-400/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-rajdhani text-red-400/70 text-[13px] font-bold tracking-[0.10em] uppercase">Delete Account</p>
                        <p className="font-rajdhani text-red-400/30 text-[11px] tracking-wide mt-0.5">Permanently delete all data</p>
                      </div>
                      <ChevronRight size={16} className="text-red-400/15 group-hover:text-red-400/35 group-hover:translate-x-1 transition-all" />
                    </button>
                  </div>
                </div>
              </GlassPanel>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* FOOTER                                                 */}
          {/* ═══════════════════════════════════════════════════════ */}
          <GlassPanel borderColor="rgba(255,255,255,0.06)">
            <div className="p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {GYM_LOGO && (
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center p-1.5"
                    style={{ background: '#000', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <img src={GYM_LOGO} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                )}
                <div>
                  <p className="font-orbitron text-zinc-500 text-[10px] tracking-[0.15em]">JERAI FITNESS</p>
                  <p className="font-rajdhani text-zinc-700 text-[9px] tracking-wider">Powered by Elite Gym Management</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                  style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-rajdhani text-green-400 text-[9px] tracking-[0.12em] uppercase font-bold">v1.0.0</span>
                </div>
                <span className="font-rajdhani text-zinc-700 text-[9px] tracking-wider">Jan 2025</span>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>

      {showEditModal && <EditProfileModal onClose={() => setShowEditModal(false)} />}
    </Layout>
  );
};

export default AdminSettings;