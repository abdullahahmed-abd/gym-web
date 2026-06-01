import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import GlassCard from '../../components/shared/GlassCard';
import { usePlans } from '../../context/PlansContext';
import {
  Plus, Shield, Activity, Dumbbell,
  Edit2, Trash2, Zap, Users,
  Calendar, DollarSign,
} from 'lucide-react';

const TIER_TEMPLATES = {
  cardio_weights: {
    name: 'ELITE TIER',
    badge: 'ELITE',
    iconColor: '#C5A059',
    textColor: '#C5A059',
    subtitle: 'Cardio + Weight Lifting',
  },
  weights_only: {
    name: 'LEGENDARY TIER',
    badge: 'LEGENDARY',
    iconColor: '#a855f7',
    textColor: '#c084fc',
    subtitle: 'Weight Lifting Only',
  },
};

// ── Plan Card ──────────────────────────────────────────────────
const PlanCard = ({ plan, onEdit, onDelete }) => {
  const template = TIER_TEMPLATES[plan.workoutType] || TIER_TEMPLATES.cardio_weights;
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Delete "${plan.name}"?`)) {
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
      className="relative rounded-2xl p-5 border bg-black overflow-hidden"
      style={{ borderColor: `${template.iconColor}20` }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${template.iconColor}10, transparent)`,
        }}
      />

      {/* BG Icon */}
      <div className="absolute -top-4 -right-4 opacity-20 pointer-events-none">
        <Shield size={80} style={{ color: template.iconColor }} strokeWidth={0.5} />
      </div>

      {/* Header */}
      <div className="relative flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg
                       text-xs font-rajdhani font-semibold tracking-widest
                       uppercase mb-2"
            style={{
              backgroundColor: `${template.iconColor}20`,
              color: template.iconColor,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: template.iconColor }}
            />
            {template.badge}
          </div>

          {/* Name */}
          <h3
            className="font-orbitron font-bold text-xl tracking-widest mb-2"
            style={{ color: template.textColor }}
          >
            {plan.name}
          </h3>

          {/* Workout Type */}
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs"
            style={{
              backgroundColor: `${template.iconColor}15`,
              color: template.iconColor,
            }}
          >
            {plan.workoutType === 'cardio_weights'
              ? <Activity size={10} />
              : <Dumbbell size={10} />
            }
            <span className="font-rajdhani font-semibold tracking-widest uppercase">
              {template.subtitle.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(plan)}
            className="w-9 h-9 rounded-xl border flex items-center justify-center
                       hover:bg-white/10 transition-all"
            style={{ borderColor: `${template.iconColor}30` }}
          >
            <Edit2 size={14} style={{ color: template.iconColor }} />
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="w-9 h-9 rounded-xl border border-red-500/30 flex items-center
                       justify-center hover:bg-red-500/10 transition-all
                       disabled:opacity-50"
          >
            <Trash2 size={14} className="text-red-400" />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px mb-4"
        style={{ backgroundColor: `${template.iconColor}30` }}
      />

      {/* Info Grid */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            icon: Calendar,
            label: 'Duration',
            value: plan.duration,
          },
          {
            icon: DollarSign,
            label: 'Price',
            value: plan.hasOffer
              ? `₹${plan.finalPrice}`
              : `₹${plan.price}`,
            original: plan.hasOffer ? `₹${plan.price}` : null,
          },
          {
            icon: Users,
            label: 'Members',
            value: plan.memberCount || 0,
          },
        ].map((info, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/6 flex items-center
                            justify-center flex-shrink-0">
              <info.icon size={14} className="text-zinc-400" />
            </div>
            <div>
              <p className="font-rajdhani text-zinc-500 text-xs tracking-widest
                            uppercase">
                {info.label}
              </p>
              <div className="flex items-baseline gap-1.5">
                {info.original && (
                  <span className="font-rajdhani text-zinc-600 text-xs
                                   line-through">
                    {info.original}
                  </span>
                )}
                <span
                  className="font-rajdhani font-bold text-sm"
                  style={{ color: info.original ? template.textColor : 'white' }}
                >
                  {info.value}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Offer Badge */}
      {plan.hasOffer && plan.offer && (
        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5
                        rounded-lg border border-yellow-500/30 bg-yellow-500/15">
          <Zap size={10} className="text-yellow-400" />
          <span className="font-rajdhani font-semibold text-yellow-400 text-xs
                           tracking-wider">
            {plan.offer.text}
          </span>
        </div>
      )}
    </div>
  );
};

// ── Empty State ────────────────────────────────────────────────
const EmptyState = ({ onAdd }) => (
  <div className="flex flex-col items-center justify-center py-32">
    <div className="w-32 h-32 rounded-full bg-white/3 border border-white/8
                    flex items-center justify-center mb-6">
      <Shield size={56} className="text-zinc-700" strokeWidth={1} />
    </div>
    <h3 className="font-orbitron text-white font-bold text-2xl tracking-wider mb-3">
      No Plans Yet
    </h3>
    <p className="font-rajdhani text-zinc-500 text-base text-center mb-8
                  tracking-wide max-w-xs">
      Create your first membership plan to get started
    </p>
    <button
      onClick={onAdd}
      className="flex items-center gap-2 px-6 py-3 rounded-xl
                 bg-yellow-400 hover:bg-yellow-300 transition-all
                 font-orbitron text-black font-bold text-sm tracking-widest"
    >
      <Plus size={18} />
      CREATE FIRST PLAN
    </button>
  </div>
);

// ── Main ───────────────────────────────────────────────────────
const AdminPlans = () => {
  const navigate = useNavigate();
  const { plans, deletePlan } = usePlans();
  const [filter, setFilter] = useState('all');

  const filteredPlans = plans.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'elite') return p.workoutType === 'cardio_weights';
    if (filter === 'legendary') return p.workoutType === 'weights_only';
    return true;
  });

  const handleDelete = async (id) => {
    await deletePlan(id);
  };

  return (
    <Layout title="MEMBERSHIP PLANS">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 py-4
                      border-b border-white/5">
        <div>
          <span className="font-orbitron text-yellow-400 font-bold text-3xl">
            {plans.length}
          </span>
          <span className="font-rajdhani text-zinc-500 text-sm tracking-widest
                           uppercase ml-3">
            Active Plans
          </span>
        </div>

        <button
          onClick={() => navigate('/plans/add')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                     bg-yellow-400 hover:bg-yellow-300 transition-all
                     font-orbitron text-black font-bold text-sm tracking-widest"
        >
          <Plus size={16} />
          ADD NEW PLAN
        </button>
      </div>

      {/* Filter Tabs */}
      {plans.length > 0 && (
        <div className="flex items-center gap-3 px-8 py-4 border-b border-white/5">
          {[
            { id: 'all', label: `All Plans (${plans.length})` },
            {
              id: 'elite',
              label: `Elite (${plans.filter((p) => p.workoutType === 'cardio_weights').length})`,
              color: '#C5A059',
            },
            {
              id: 'legendary',
              label: `Legendary (${plans.filter((p) => p.workoutType === 'weights_only').length})`,
              color: '#a855f7',
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm
                border transition-all font-rajdhani font-semibold
                tracking-widest uppercase
                ${filter === tab.id
                  ? 'bg-white/12 border-white/20 text-white'
                  : 'bg-white/3 border-white/8 text-zinc-500 hover:text-zinc-300'
                }
              `}
            >
              {tab.color && (
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: tab.color }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Plans Grid */}
      <div className="p-8 overflow-y-auto"
           style={{ height: 'calc(100vh - 200px)' }}>
        {plans.length === 0 ? (
          <EmptyState onAdd={() => navigate('/plans/add')} />
        ) : filteredPlans.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <p className="font-rajdhani text-zinc-600 text-lg tracking-wider">
              No plans in this category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5">
            {filteredPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onEdit={(p) => navigate(`/plans/edit/${p.id}`)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminPlans;