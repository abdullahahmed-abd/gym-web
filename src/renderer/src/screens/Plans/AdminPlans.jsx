// AdminPlans.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import { usePlans } from '../../context/PlansContext';
import {
  Plus, Shield, Activity, Dumbbell,
  Edit2, Trash2, Zap, Users,
  Calendar, DollarSign, Crown, Star,
  Sparkles, ChevronRight, Package,
  ArrowUpRight, Target, Clock, Eye,
  Flame, Award, TrendingUp, BarChart3,
  Filter, Grid3X3, List, Search,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════ */
/* TIER CONFIG                                                     */
/* ═══════════════════════════════════════════════════════════════ */
const TIER_CONFIG = {
  cardio_weights: {
    name: 'ELITE',
    badge: 'ELITE TIER',
    icon: Crown,
    color: '#C5A059',
    gradient: 'linear-gradient(135deg, rgba(197,160,89,0.12) 0%, rgba(197,160,89,0.03) 100%)',
    borderColor: 'rgba(197,160,89,0.20)',
    glowColor: 'rgba(197,160,89,0.08)',
    subtitle: 'Cardio + Weight Lifting',
    accentGradient: 'linear-gradient(135deg, #C5A059, #EAB308)',
  },
  weights_only: {
    name: 'LEGENDARY',
    badge: 'LEGENDARY TIER',
    icon: Sparkles,
    color: '#A855F7',
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(168,85,247,0.03) 100%)',
    borderColor: 'rgba(168,85,247,0.20)',
    glowColor: 'rgba(168,85,247,0.08)',
    subtitle: 'Weight Lifting Only',
    accentGradient: 'linear-gradient(135deg, #A855F7, #C084FC)',
  },
};

/* ═══════════════════════════════════════════════════════════════ */
/* ANIMATED NUMBER                                                 */
/* ═══════════════════════════════════════════════════════════════ */
const AnimatedNumber = ({ value }) => {
  const [display, setDisplay] = React.useState(0);
  const numValue = typeof value === 'number' ? value : parseInt(value) || 0;

  React.useEffect(() => {
    const startTime = performance.now();
    const duration = 800;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * numValue));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [numValue]);

  return display;
};

/* ═══════════════════════════════════════════════════════════════ */
/* PLAN CARD                                                       */
/* ═══════════════════════════════════════════════════════════════ */
const PlanCard = ({ plan, onEdit, onDelete, index }) => {
  const tier = TIER_CONFIG[plan.workoutType] || TIER_CONFIG.cardio_weights;
  const TierIcon = tier.icon;
  const [deleting, setDeleting] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Delete "${plan.name}"? This action cannot be undone.`)) {
      setDeleting(true);
      try {
        await onDelete(plan.id);
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <div
      className="group relative rounded-3xl overflow-hidden transition-all duration-500
                 hover:scale-[1.01] hover:-translate-y-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#000000',
        border: `1px solid ${hovered ? tier.borderColor : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered ? `0 12px 40px ${tier.glowColor}` : 'none',
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* ── Top Accent Line ── */}
      <div
        className="absolute top-0 left-8 right-8 h-[2px] transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${tier.color}60 50%, transparent 100%)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* ── BG Glow ── */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: tier.gradient,
          opacity: hovered ? 1 : 0.5,
        }}
      />

      {/* ── Watermark Icon ── */}
      <div className="absolute -top-6 -right-6 pointer-events-none transition-all duration-500
                      group-hover:scale-110 group-hover:rotate-12">
        <TierIcon
          size={120}
          style={{ color: tier.color }}
          strokeWidth={0.3}
          className="opacity-[0.06]"
        />
      </div>

      <div className="relative p-7">
        {/* ═══════════ HEADER ═══════════ */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            {/* Tier Badge */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center
                            transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{
                  background: `${tier.color}12`,
                  border: `1px solid ${tier.color}25`,
                  boxShadow: `0 4px 16px ${tier.color}10`,
                }}
              >
                <TierIcon size={18} style={{ color: tier.color }} />
              </div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl"
                style={{
                  backgroundColor: `${tier.color}10`,
                  border: `1px solid ${tier.color}20`,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: tier.color }}
                />
                <span
                  className="font-orbitron text-[9px] font-bold tracking-[0.2em] uppercase"
                  style={{ color: tier.color }}
                >
                  {tier.badge}
                </span>
              </div>
            </div>

            {/* Plan Name */}
            <h3
              className="font-orbitron font-bold text-[22px] tracking-[0.12em] mb-2
                          transition-all duration-300"
              style={{ color: tier.color }}
            >
              {plan.name}
            </h3>

            {/* Workout Type */}
            <div className="flex items-center gap-2">
              {plan.workoutType === 'cardio_weights' ? (
                <Activity size={12} style={{ color: `${tier.color}80` }} />
              ) : (
                <Dumbbell size={12} style={{ color: `${tier.color}80` }} />
              )}
              <span
                className="font-rajdhani text-[11px] tracking-[0.15em] uppercase font-semibold"
                style={{ color: `${tier.color}90` }}
              >
                {tier.subtitle}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => onEdit(plan)}
              className="w-10 h-10 rounded-xl border flex items-center justify-center
                         transition-all duration-300 hover:scale-110 active:scale-95"
              style={{
                borderColor: `${tier.color}25`,
                background: `${tier.color}08`,
              }}
            >
              <Edit2 size={14} style={{ color: tier.color }} />
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="w-10 h-10 rounded-xl border border-red-500/20 flex items-center
                         justify-center transition-all duration-300 hover:scale-110
                         hover:bg-red-500/10 active:scale-95 disabled:opacity-30
                         bg-red-500/5"
            >
              <Trash2 size={14} className="text-red-400" />
            </button>
          </div>
        </div>

        {/* ═══════════ DIVIDER ═══════════ */}
        <div
          className="h-px mb-6"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${tier.color}30 50%, transparent 100%)`,
          }}
        />

        {/* ═══════════ STATS GRID ═══════════ */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          {/* Duration */}
          <div
            className="rounded-2xl p-4 transition-all duration-300 group-hover:scale-[1.02]"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(34,211,238,0.10)' }}
              >
                <Calendar size={14} className="text-cyan-400" />
              </div>
            </div>
            <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase font-semibold mb-1">
              Duration
            </p>
            <p className="font-orbitron text-white font-bold text-[15px] tracking-wider">
              {plan.duration}
            </p>
          </div>

          {/* Price */}
          <div
            className="rounded-2xl p-4 transition-all duration-300 group-hover:scale-[1.02]"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${tier.color}10` }}
              >
                <DollarSign size={14} style={{ color: tier.color }} />
              </div>
            </div>
            <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase font-semibold mb-1">
              Price
            </p>
            <div className="flex items-baseline gap-1.5">
              {plan.hasOffer && (
                <span className="font-rajdhani text-zinc-600 text-[11px] line-through">
                  ₹{plan.price}
                </span>
              )}
              <p
                className="font-orbitron font-bold text-[15px] tracking-wider"
                style={{ color: plan.hasOffer ? tier.color : 'white' }}
              >
                ₹{plan.hasOffer ? plan.finalPrice : plan.price}
              </p>
            </div>
          </div>

          {/* Members */}
          <div
            className="rounded-2xl p-4 transition-all duration-300 group-hover:scale-[1.02]"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(34,197,94,0.10)' }}
              >
                <Users size={14} className="text-green-400" />
              </div>
            </div>
            <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase font-semibold mb-1">
              Members
            </p>
            <p className="font-orbitron text-white font-bold text-[15px] tracking-wider">
              {plan.memberCount || 0}
            </p>
          </div>
        </div>

        {/* ═══════════ OFFER BADGE ═══════════ */}
        {plan.hasOffer && plan.offer && (
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl
                        transition-all duration-300 group-hover:scale-[1.01]"
            style={{
              background: 'rgba(234,179,8,0.06)',
              border: '1px solid rgba(234,179,8,0.15)',
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(234,179,8,0.12)' }}
            >
              <Zap size={14} className="text-yellow-400" />
            </div>
            <div className="flex-1">
              <span className="font-rajdhani font-bold text-yellow-400 text-[12px]
                               tracking-[0.12em] uppercase">
                {plan.offer.text}
              </span>
            </div>
            <div
              className="px-2.5 py-1 rounded-lg"
              style={{
                background: 'rgba(234,179,8,0.12)',
                border: '1px solid rgba(234,179,8,0.20)',
              }}
            >
              <span className="font-orbitron text-yellow-400 text-[10px] font-bold">
                SAVE ₹{plan.price - plan.finalPrice}
              </span>
            </div>
          </div>
        )}

        {/* ═══════════ FOOTER CTA ═══════════ */}
        <div
          className="mt-5 flex items-center justify-between px-4 py-3 rounded-xl
                      border transition-all duration-300 cursor-pointer
                      group-hover:border-opacity-50"
          style={{
            background: `${tier.color}05`,
            borderColor: `${tier.color}15`,
          }}
          onClick={() => onEdit(plan)}
        >
          <div className="flex items-center gap-2">
            <Eye size={14} style={{ color: `${tier.color}80` }} />
            <span
              className="font-rajdhani text-[11px] font-bold tracking-[0.12em] uppercase"
              style={{ color: `${tier.color}80` }}
            >
              View & Edit Details
            </span>
          </div>
          <ChevronRight
            size={16}
            style={{ color: `${tier.color}50` }}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* EMPTY STATE                                                     */
/* ═══════════════════════════════════════════════════════════════ */
const EmptyState = ({ onAdd }) => (
  <div className="flex flex-col items-center justify-center py-28">
    {/* Icon */}
    <div className="relative mb-8">
      <div
        className="w-28 h-28 rounded-3xl flex items-center justify-center
                    border border-white/[0.06]"
        style={{
          background: 'rgba(197,160,89,0.05)',
          boxShadow: '0 8px 32px rgba(197,160,89,0.06)',
        }}
      >
        <Package size={48} className="text-[#C5A059]/30" strokeWidth={1} />
      </div>
      <div
        className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl
                    flex items-center justify-center border border-white/[0.08]"
        style={{ background: '#000000' }}
      >
        <Plus size={18} className="text-[#C5A059]" />
      </div>
    </div>

    {/* Text */}
    <h3 className="font-orbitron text-white font-bold text-[22px] tracking-[0.15em] mb-3">
      NO PLANS YET
    </h3>
    <p className="font-rajdhani text-zinc-500 text-[13px] text-center mb-8
                  tracking-[0.1em] max-w-sm leading-relaxed">
      Create your first membership plan to start enrolling members
      and managing subscriptions
    </p>

    {/* CTA */}
    <button
      onClick={onAdd}
      className="group flex items-center gap-3 px-8 py-4 rounded-2xl
                 transition-all duration-300 hover:scale-105 active:scale-95
                 border border-[#C5A059]/30 hover:border-[#C5A059]/50"
      style={{
        background: 'linear-gradient(135deg, rgba(197,160,89,0.15) 0%, rgba(197,160,89,0.05) 100%)',
        boxShadow: '0 8px 32px rgba(197,160,89,0.10)',
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center
                    bg-[#C5A059]/15 border border-[#C5A059]/25
                    group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
      >
        <Plus size={18} className="text-[#C5A059]" />
      </div>
      <span className="font-orbitron text-[#C5A059] font-bold text-[13px] tracking-[0.15em]">
        CREATE FIRST PLAN
      </span>
      <ChevronRight
        size={18}
        className="text-[#C5A059]/50 group-hover:text-[#C5A059]
                   group-hover:translate-x-1 transition-all duration-300"
      />
    </button>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* STAT MINI CARD                                                  */
/* ═══════════════════════════════════════════════════════════════ */
const StatMini = ({ icon: Icon, label, value, color, suffix }) => (
  <div
    className="rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]"
    style={{
      background: '#000000',
      border: '1px solid rgba(255,255,255,0.06)',
    }}
  >
    <div className="flex items-center justify-between mb-4">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: `${color}10`,
          border: `1px solid ${color}20`,
        }}
      >
        <Icon size={16} style={{ color }} />
      </div>
    </div>
    <p className="font-orbitron text-white font-bold text-[24px] leading-none mb-1">
      {typeof value === 'number' ? <AnimatedNumber value={value} /> : value}
      {suffix && (
        <span className="text-[14px] font-normal text-zinc-500 ml-1">{suffix}</span>
      )}
    </p>
    <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase font-semibold">
      {label}
    </p>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN COMPONENT                                                  */
/* ═══════════════════════════════════════════════════════════════ */
const AdminPlans = () => {
  const navigate = useNavigate();
  const { plans, deletePlan } = usePlans();
  const [filter, setFilter] = useState('all');

  const eliteCount = plans.filter((p) => p.workoutType === 'cardio_weights').length;
  const legendaryCount = plans.filter((p) => p.workoutType === 'weights_only').length;

  const filteredPlans = plans.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'elite') return p.workoutType === 'cardio_weights';
    if (filter === 'legendary') return p.workoutType === 'weights_only';
    return true;
  });

  const handleDelete = async (id) => {
    await deletePlan(id);
  };

  const filterTabs = [
    {
      id: 'all',
      label: 'All Plans',
      count: plans.length,
      icon: Grid3X3,
      color: '#C5A059',
    },
    {
      id: 'elite',
      label: 'Elite',
      count: eliteCount,
      icon: Crown,
      color: '#C5A059',
    },
    {
      id: 'legendary',
      label: 'Legendary',
      count: legendaryCount,
      icon: Sparkles,
      color: '#A855F7',
    },
  ];

  return (
    <Layout title="MEMBERSHIP PLANS">
      <div className="min-h-screen bg-black">

        {/* ═══════════════════════════════════════════════════════ */}
        {/* HEADER SECTION                                         */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div
          className="border-b"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Left */}
              <div className="flex items-center gap-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'rgba(197,160,89,0.10)',
                    border: '1px solid rgba(197,160,89,0.15)',
                    boxShadow: '0 4px 16px rgba(197,160,89,0.08)',
                  }}
                >
                  <Package size={20} className="text-[#C5A059]" />
                </div>
                <div>
                  <h1 className="font-orbitron text-white font-bold text-[20px] tracking-[0.15em] mb-1">
                    PLANS MANAGER
                  </h1>
                  <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.15em] uppercase font-medium">
                    Create & manage membership tiers
                  </p>
                </div>
              </div>

              {/* Right */}
              <button
                onClick={() => navigate('/plans/add')}
                className="group flex items-center gap-3 px-6 py-3.5 rounded-2xl
                           transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, rgba(197,160,89,0.20) 0%, rgba(197,160,89,0.08) 100%)',
                  border: '1px solid rgba(197,160,89,0.30)',
                  boxShadow: '0 4px 20px rgba(197,160,89,0.12)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center
                              bg-[#C5A059]/15 border border-[#C5A059]/25
                              group-hover:scale-110 group-hover:rotate-12
                              transition-all duration-300"
                >
                  <Plus size={16} className="text-[#C5A059]" />
                </div>
                <span className="font-orbitron text-[#C5A059] font-bold text-[12px] tracking-[0.15em]">
                  ADD NEW PLAN
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* STATS ROW                                              */}
        {/* ═══════════════════════════════════════════════════════ */}
        {plans.length > 0 && (
          <div className="px-8 pt-6">
            <div className="grid grid-cols-4 gap-4">
              <StatMini
                icon={Package}
                label="Total Plans"
                value={plans.length}
                color="#C5A059"
              />
              <StatMini
                icon={Crown}
                label="Elite Plans"
                value={eliteCount}
                color="#C5A059"
              />
              <StatMini
                icon={Sparkles}
                label="Legendary Plans"
                value={legendaryCount}
                color="#A855F7"
              />
              <StatMini
                icon={Zap}
                label="Active Offers"
                value={plans.filter((p) => p.hasOffer).length}
                color="#EAB308"
              />
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ */}
        {/* FILTER TABS                                            */}
        {/* ═══════════════════════════════════════════════════════ */}
        {plans.length > 0 && (
          <div
            className="px-8 py-5 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 mr-2">
                <Filter size={14} className="text-zinc-600" />
                <span className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.15em] uppercase font-semibold">
                  Filter
                </span>
              </div>
              {filterTabs.map((tab) => {
                const isActive = filter === tab.id;
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl
                               transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: isActive ? `${tab.color}12` : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${isActive ? `${tab.color}30` : 'rgba(255,255,255,0.06)'}`,
                      boxShadow: isActive ? `0 4px 16px ${tab.color}10` : 'none',
                    }}
                  >
                    <TabIcon
                      size={14}
                      style={{ color: isActive ? tab.color : '#71717a' }}
                      className="transition-colors duration-300"
                    />
                    <span
                      className="font-rajdhani text-[12px] font-bold tracking-[0.12em] uppercase
                                  transition-colors duration-300"
                      style={{ color: isActive ? tab.color : '#a1a1aa' }}
                    >
                      {tab.label}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-md text-[10px] font-orbitron font-bold
                                  transition-all duration-300"
                      style={{
                        background: isActive ? `${tab.color}15` : 'rgba(255,255,255,0.04)',
                        color: isActive ? tab.color : '#71717a',
                      }}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ */}
        {/* PLANS GRID                                             */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div
          className="p-8 overflow-y-auto"
          style={{ height: 'calc(100vh - 200px)' }}
        >
          {plans.length === 0 ? (
            <EmptyState onAdd={() => navigate('/plans/add')} />
          ) : filteredPlans.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5
                            border border-white/[0.06]"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <Search size={32} className="text-zinc-700" strokeWidth={1} />
              </div>
              <p className="font-orbitron text-zinc-600 text-[14px] tracking-[0.15em] mb-2">
                NO PLANS FOUND
              </p>
              <p className="font-rajdhani text-zinc-700 text-[12px] tracking-[0.1em]">
                No plans match the selected filter
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPlans.map((plan, index) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  index={index}
                  onEdit={(p) => navigate(`/plans/edit/${p.id}`)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminPlans;