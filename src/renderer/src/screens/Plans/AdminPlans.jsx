// AdminPlans.jsx — FIXED OFFER STRIP COLORS
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import { usePlans } from '../../context/PlansContext';
import {
  Plus, Activity, Dumbbell, Edit2, Trash2, Zap, Users,
  Calendar, DollarSign, Crown, Sparkles, ChevronRight, Package,
  Eye, Filter, Search, X, Shield, Loader2,
} from 'lucide-react';

const TIER = {
  cardio_weights: {
    name: 'ELITE', badge: 'ELITE TIER', icon: Crown,
    color: '#C5A059', subtitle: 'Cardio + Weight Lifting',
  },
  weights_only: {
    name: 'LEGENDARY', badge: 'LEGENDARY TIER', icon: Sparkles,
    color: '#A855F7', subtitle: 'Weight Lifting Only',
  },
};

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

const AnimatedNumber = ({ value, duration = 800 }) => {
  const [display, setDisplay] = useState(0);
  const num = typeof value === 'number' ? value : parseInt(value) || 0;
  React.useEffect(() => {
    const start = performance.now();
    const animate = t => {
      const p = Math.min((t - start) / duration, 1);
      setDisplay(Math.floor((1 - Math.pow(1 - p, 3)) * num));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [num, duration]);
  return display;
};

const StatCard = ({ icon: Icon, label, value, color, sub }) => (
  <GlassPanel hover className="group" glow={`${color}08`}>
    <div className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center
                        transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{ background: `linear-gradient(135deg, ${color}15, ${color}08)`, border: `1px solid ${color}20` }}>
          <Icon size={17} style={{ color }} />
        </div>
      </div>
      <p className="font-orbitron text-white font-bold text-[26px] leading-none mb-1
                    transition-all duration-300 group-hover:text-[28px]">
        {typeof value === 'number' ? <AnimatedNumber value={value} /> : value}
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
/* COMPACT PLAN CARD — FIXED OFFER COLORS                          */
/* ═══════════════════════════════════════════════════════════════ */
const PlanCard = ({ plan, onEdit, onDelete }) => {
  const tier = TIER[plan.workoutType] || TIER.cardio_weights;
  const TierIcon = tier.icon;
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Delete "${plan.name}"? This cannot be undone.`)) {
      setDeleting(true);
      try { await onDelete(plan.id); } finally { setDeleting(false); }
    }
  };

  const savings = plan.hasOffer ? plan.price - plan.finalPrice : 0;

  return (
    <GlassPanel hover className="group" borderColor={`${tier.color}12`} glow={`${tier.color}05`}>
      {/* Top accent */}
      <div className="absolute top-0 left-6 right-6 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg,transparent,${tier.color}50,transparent)` }} />

      {/* BG */}
      <div className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${tier.color}05, transparent 50%)` }} />

      {/* Watermark */}
      <div className="absolute -top-4 -right-4 pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
        <TierIcon size={80} style={{ color: tier.color }} strokeWidth={0.3} className="opacity-[0.04]" />
      </div>

      <div className="relative p-5">

        {/* ── Row 1: Icon + Name + Actions ── */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                          transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
            style={{
              background: `linear-gradient(135deg, ${tier.color}15, ${tier.color}06)`,
              border: `1px solid ${tier.color}22`,
              boxShadow: `0 4px 12px ${tier.color}08`,
            }}>
            <TierIcon size={16} style={{ color: tier.color }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-orbitron font-bold text-[15px] tracking-[0.08em] truncate"
                style={{ color: tier.color }}>
                {plan.name}
              </h3>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg flex-shrink-0"
                style={{ background: `${tier.color}10`, border: `1px solid ${tier.color}18` }}>
                <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: tier.color }} />
                <span className="font-orbitron text-[7px] font-bold tracking-[0.15em] uppercase"
                  style={{ color: tier.color }}>{tier.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {plan.workoutType === 'cardio_weights'
                ? <Activity size={10} style={{ color: `${tier.color}70` }} />
                : <Dumbbell size={10} style={{ color: `${tier.color}70` }} />}
              <span className="font-rajdhani text-[10px] tracking-[0.12em] uppercase font-semibold"
                style={{ color: `${tier.color}80` }}>{tier.subtitle}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
            <button onClick={() => onEdit(plan)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              style={{ background: `${tier.color}08`, border: `1px solid ${tier.color}18` }}>
              <Edit2 size={12} style={{ color: tier.color }} />
            </button>
            <button onClick={handleDelete} disabled={deleting}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-30"
              style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
              {deleting
                ? <Loader2 size={12} className="text-red-400 animate-spin" />
                : <Trash2 size={12} className="text-red-400" />}
            </button>
          </div>
        </div>

        {/* ── Row 2: Stats inline ── */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl flex-1"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <Calendar size={11} className="text-cyan-400/70 flex-shrink-0" />
            <span className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.12em] uppercase mr-1">Dur</span>
            <span className="font-orbitron text-white font-bold text-[11px] tracking-wider">{plan.duration}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl flex-1"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <DollarSign size={11} style={{ color: `${tier.color}70` }} className="flex-shrink-0" />
            {plan.hasOffer ? (
              <div className="flex items-center gap-1.5">
                <span className="font-rajdhani text-zinc-600 text-[10px] line-through">₹{plan.price}</span>
                <span className="font-orbitron font-bold text-[11px]" style={{ color: tier.color }}>
                  ₹{plan.finalPrice}
                </span>
              </div>
            ) : (
              <span className="font-orbitron text-white font-bold text-[11px]">₹{plan.price}</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <Users size={11} className="text-green-400/70 flex-shrink-0" />
            <span className="font-orbitron text-white font-bold text-[11px]">{plan.memberCount || 0}</span>
          </div>
        </div>

        {/* ── Row 3: Offer strip —  FIXED COLORS ── */}
        {plan.hasOffer && plan.offer && (
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl mb-3"
            style={{
              background: 'rgba(234,179,8,0.04)',
              border: '1px solid rgba(234,179,8,0.15)',
            }}>
            {/* Zap icon */}
            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: 'rgba(234,179,8,0.12)',
                border: '1px solid rgba(234,179,8,0.20)',
              }}>
              <Zap size={11} className="#C5A059" />
            </div>

            {/* Offer text */}
            <span className="font-rajdhani font-bold #C5A059 text-[10px] tracking-[0.10em] uppercase flex-1">
              {plan.offer.text}
            </span>

            {/*  FIXED: Save badge with proper yellow/green theme */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
              style={{
                background: 'rgba(34,197,94,0.10)',
                border: '1px solid rgba(34,197,94,0.22)',
              }}>
              <span className="font-orbitron text-green-400 text-[9px] font-bold">
                SAVE ₹{savings}
              </span>
            </div>
          </div>
        )}

        {/* ── Row 4: Footer CTA ── */}
        <div className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-300"
          style={{ background: `${tier.color}04`, border: `1px solid ${tier.color}10` }}
          onClick={() => onEdit(plan)}>
          <div className="flex items-center gap-2">
            <Eye size={12} style={{ color: `${tier.color}60` }} />
            <span className="font-rajdhani text-[10px] font-bold tracking-[0.12em] uppercase"
              style={{ color: `${tier.color}70` }}>View Details</span>
          </div>
          <ChevronRight size={14} style={{ color: `${tier.color}35` }}
            className="group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </GlassPanel>
  );
};

const EmptyState = ({ onAdd }) => (
  <GlassPanel borderColor="rgba(197,160,89,0.12)">
    <div className="flex flex-col items-center justify-center py-28">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{ background: 'rgba(197,160,89,0.06)', border: '1px solid rgba(197,160,89,0.15)' }}>
          <Package size={44} className="text-[#C5A059]/25" strokeWidth={1.5} />
        </div>
        <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: '#000', border: '1px solid rgba(197,160,89,0.25)' }}>
          <Plus size={16} className="text-[#C5A059]" />
        </div>
      </div>
      <h3 className="font-orbitron text-white font-bold text-[20px] tracking-[0.15em] mb-3
                     bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">NO PLANS YET</h3>
      <p className="font-rajdhani text-zinc-500 text-[13px] tracking-wider text-center max-w-sm leading-relaxed mb-8">
        Create your first membership plan to start enrolling members
      </p>
      <button onClick={onAdd}
        className="group flex items-center gap-3 px-7 py-3.5 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, rgba(197,160,89,0.15), rgba(197,160,89,0.05))',
          border: '1px solid rgba(197,160,89,0.30)', boxShadow: '0 6px 24px rgba(197,160,89,0.10)',
        }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
          style={{ background: 'rgba(197,160,89,0.15)', border: '1px solid rgba(197,160,89,0.25)' }}>
          <Plus size={16} className="text-[#C5A059]" />
        </div>
        <span className="font-orbitron text-[#C5A059] font-bold text-[12px] tracking-[0.15em]">CREATE FIRST PLAN</span>
        <ChevronRight size={16} className="text-[#C5A059]/40 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all" />
      </button>
    </div>
  </GlassPanel>
);

const AdminPlans = ({ onLogout }) => {
  const navigate = useNavigate();
  const { plans, deletePlan } = usePlans();
  const [filter, setFilter] = useState('all');

  const eliteCount     = plans.filter(p => p.workoutType === 'cardio_weights').length;
  const legendaryCount = plans.filter(p => p.workoutType === 'weights_only').length;
  const offerCount     = plans.filter(p => p.hasOffer).length;

  const filtered = plans.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'elite') return p.workoutType === 'cardio_weights';
    if (filter === 'legendary') return p.workoutType === 'weights_only';
    if (filter === 'offers') return p.hasOffer;
    return true;
  });

  const filterTabs = [
    { id: 'all',       label: 'All Plans',   count: plans.length,   icon: Package,  color: '#C5A059' },
    { id: 'elite',     label: 'Elite',       count: eliteCount,     icon: Crown,    color: '#C5A059' },
    { id: 'legendary', label: 'Legendary',   count: legendaryCount, icon: Sparkles, color: '#A855F7' },
    { id: 'offers',    label: 'With Offers', count: offerCount,     icon: Zap,      color: '#EAB308' },
  ];

  return (
    <Layout title="PLANS" onLogout={onLogout}>
      <div className="relative min-h-screen">
        <div className="fixed inset-0 z-0" style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(234,179,8,0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(168,85,247,0.04) 0%, transparent 50%),
            linear-gradient(180deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.96) 40%, #000000 100%)
          `,
        }} />

        <div className="relative z-10 p-8 lg:p-10 space-y-6 max-w-[1400px] mx-auto">

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(197,160,89,0.10)', border: '1px solid rgba(197,160,89,0.18)',
                         boxShadow: '0 4px 16px rgba(197,160,89,0.06)' }}>
                <Package size={24} className="text-[#C5A059]" />
              </div>
              <div>
                <p className="font-rajdhani text-[#C5A059] text-[12px] tracking-[0.3em] uppercase font-bold mb-1">Plan Manager</p>
                <h1 className="font-orbitron text-white font-extrabold text-[20px] tracking-[0.15em]
                               bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  MEMBERSHIP PLANS
                </h1>
              </div>
            </div>
            <button onClick={() => navigate('/plans/add')}
              className="group flex items-center gap-3 h-12 px-6 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, rgba(197,160,89,0.15), rgba(197,160,89,0.05))',
                border: '1px solid rgba(197,160,89,0.25)', boxShadow: '0 4px 20px rgba(197,160,89,0.08)',
              }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                style={{ background: 'rgba(197,160,89,0.15)', border: '1px solid rgba(197,160,89,0.25)' }}>
                <Plus size={16} className="text-[#C5A059]" />
              </div>
              <span className="font-orbitron text-[#C5A059] font-bold text-[11px] tracking-[0.15em]">ADD NEW PLAN</span>
            </button>
          </div>

          {plans.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={Package}  label="Total Plans"     value={plans.length}   color="#C5A059" />
              <StatCard icon={Crown}    label="Elite Plans"     value={eliteCount}     color="#C5A059" sub="cardio + weights" />
              <StatCard icon={Sparkles} label="Legendary Plans" value={legendaryCount} color="#A855F7" sub="weights only" />
              <StatCard icon={Zap}      label="Active Offers"   value={offerCount}     color="#EAB308" sub="special pricing" />
            </div>
          )}

          {plans.length > 0 && (
            <GlassPanel>
              <div className="p-5">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 mr-2">
                    <Filter size={13} className="text-zinc-600" />
                    <span className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.15em] uppercase font-semibold">Filter</span>
                  </div>
                  {filterTabs.map(tab => {
                    const isActive = filter === tab.id;
                    return (
                      <button key={tab.id} onClick={() => setFilter(tab.id)}
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-[1.03]"
                        style={{
                          background: isActive ? `${tab.color}12` : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${isActive ? `${tab.color}28` : 'rgba(255,255,255,0.06)'}`,
                        }}>
                        <tab.icon size={13} style={{ color: isActive ? tab.color : '#71717A' }} />
                        <span className="font-rajdhani text-[11px] font-bold tracking-[0.12em] uppercase"
                          style={{ color: isActive ? tab.color : '#71717A' }}>{tab.label}</span>
                        <span className="font-orbitron text-[9px] font-bold px-2 py-0.5 rounded-lg"
                          style={{
                            background: isActive ? `${tab.color}15` : 'rgba(255,255,255,0.03)',
                            color: isActive ? tab.color : '#52525B',
                            border: `1px solid ${isActive ? `${tab.color}20` : 'rgba(255,255,255,0.05)'}`,
                          }}>{tab.count}</span>
                      </button>
                    );
                  })}
                  {filter !== 'all' && (
                    <button onClick={() => setFilter('all')}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg ml-auto transition-all hover:scale-105"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <X size={10} className="text-zinc-500" />
                      <span className="font-rajdhani text-zinc-400 text-[10px] tracking-wider uppercase font-bold">Clear</span>
                    </button>
                  )}
                </div>
              </div>
            </GlassPanel>
          )}

          {plans.length > 0 && (
            <div className="flex items-center gap-2 px-2">
              <Eye size={12} className="text-zinc-600" />
              <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.12em] uppercase font-medium">
                Showing <span className="text-white font-bold">{filtered.length}</span> of{' '}
                <span className="text-zinc-400">{plans.length}</span> plans
              </p>
            </div>
          )}

          {plans.length === 0 ? (
            <EmptyState onAdd={() => navigate('/plans/add')} />
          ) : filtered.length === 0 ? (
            <GlassPanel>
              <div className="flex flex-col items-center justify-center py-24">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Search size={28} className="text-zinc-800" strokeWidth={1.5} />
                </div>
                <p className="font-orbitron text-zinc-600 text-[14px] tracking-[0.15em] mb-2">NO PLANS FOUND</p>
                <p className="font-rajdhani text-zinc-700 text-[12px] tracking-wider mb-5">No plans match the selected filter</p>
                <button onClick={() => setFilter('all')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover:scale-105"
                  style={{ background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.18)' }}>
                  <X size={12} className="text-[#C5A059]" />
                  <span className="font-rajdhani text-[#C5A059] text-[11px] tracking-wider uppercase font-bold">Clear Filter</span>
                </button>
              </div>
            </GlassPanel>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(plan => (
                <PlanCard key={plan.id} plan={plan}
                  onEdit={p => navigate(`/plans/edit/${p.id}`)} onDelete={deletePlan} />
              ))}
            </div>
          )}

          <GlassPanel borderColor="rgba(197,160,89,0.10)">
            <div className="p-5 flex items-center gap-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.15)' }}>
                <Shield size={16} className="text-[#C5A059]" />
              </div>
              <div className="flex-1">
                <p className="font-rajdhani text-white text-[12px] font-bold tracking-[0.12em] uppercase mb-0.5">Plans Configuration</p>
                <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.1em] uppercase font-medium">
                  Changes apply to new members only · Existing members retain their plan
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl flex-shrink-0"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-rajdhani text-green-400 text-[9px] tracking-[0.12em] uppercase font-bold">Saved</span>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPlans;