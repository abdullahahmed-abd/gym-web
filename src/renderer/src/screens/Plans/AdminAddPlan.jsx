import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import GlassInput from '../../components/shared/GlassInput';
import { usePlans } from '../../context/PlansContext';
import {
  Shield, Activity, Dumbbell,
  DollarSign, Layers, Eye,
  Zap, X, Upload, CheckCircle,
} from 'lucide-react';

const TIER_TEMPLATES = {
  cardio_weights: {
    name: 'ELITE TIER',
    badge: 'ELITE',
    iconColor: '#C5A059',
    textColor: '#C5A059',
    subtitle: 'Cardio + Weight Lifting',
    features: [
      'Full Gym Access',
      'Cardio + Weight Training',
      'All Equipment Access',
      'Fitness Assessment',
      'Personal Locker',
    ],
  },
  weights_only: {
    name: 'LEGENDARY TIER',
    badge: 'LEGENDARY',
    iconColor: '#a855f7',
    textColor: '#c084fc',
    subtitle: 'Weight Lifting Only',
    features: [
      'Weight Zone Access',
      'Free Weights & Machines',
      'Strength Programs',
      'Progress Tracking',
      'Personal Trainer Support',
    ],
  },
};

const DURATION_OPTIONS = [
  '1 Month', '3 Months', '6 Months', '12 Months', 'Custom',
];

const DISCOUNT_OPTIONS = [
  { label: 'Percentage (%)', value: 'percentage' },
  { label: 'Fixed Amount (₹)', value: 'fixed' },
];

// ── Workout Type Card ──────────────────────────────────────────
const WorkoutTypeCard = ({ type, isSelected, onSelect }) => {
  const template = TIER_TEMPLATES[type];

  return (
    <button
      onClick={() => onSelect(type)}
      className="flex-1 relative rounded-2xl p-5 border bg-black
                 transition-all duration-200 overflow-hidden text-left"
      style={{
        borderColor: isSelected
          ? `${template.iconColor}50`
          : 'rgba(255,255,255,0.06)',
      }}
    >
      {isSelected && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${template.iconColor}12, transparent)`,
          }}
        />
      )}

      {/* BG Icon */}
      <div className="absolute -top-2 -right-2 pointer-events-none">
        <Shield
          size={70}
          strokeWidth={0.5}
          style={{
            color: isSelected
              ? `${template.iconColor}18`
              : 'rgba(255,255,255,0.03)',
          }}
        />
      </div>

      {/* Icons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {type === 'cardio_weights' ? (
            <>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: isSelected
                    ? `${template.iconColor}20`
                    : 'rgba(255,255,255,0.06)',
                }}
              >
                <Activity
                  size={14}
                  style={{
                    color: isSelected ? template.iconColor : '#71717a',
                  }}
                />
              </div>
              <span
                style={{
                  color: isSelected ? template.iconColor : '#71717a',
                  fontFamily: 'Orbitron',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                +
              </span>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: isSelected
                    ? `${template.iconColor}20`
                    : 'rgba(255,255,255,0.06)',
                }}
              >
                <Dumbbell
                  size={14}
                  style={{
                    color: isSelected ? template.iconColor : '#71717a',
                  }}
                />
              </div>
            </>
          ) : (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: isSelected
                  ? `${template.iconColor}20`
                  : 'rgba(255,255,255,0.06)',
              }}
            >
              <Dumbbell
                size={14}
                style={{
                  color: isSelected ? template.iconColor : '#71717a',
                }}
              />
            </div>
          )}
        </div>

        {isSelected && (
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: template.iconColor }}
          >
            <CheckCircle size={12} className="text-black" />
          </div>
        )}
      </div>

      {/* Tier Badge */}
      <div
        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded
                   mb-2 text-xs font-rajdhani font-semibold tracking-widest uppercase"
        style={{
          backgroundColor: isSelected
            ? `${template.iconColor}15`
            : 'rgba(255,255,255,0.04)',
          color: isSelected ? template.iconColor : '#71717a',
        }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: template.iconColor,
          }}
        />
        {template.badge}
      </div>

      <h3
        className="font-orbitron font-bold text-sm tracking-wider mb-1"
        style={{ color: isSelected ? template.textColor : 'white' }}
      >
        {template.name}
      </h3>
      <p
        className="font-rajdhani text-xs tracking-wide"
        style={{
          color: isSelected
            ? `${template.iconColor}90`
            : '#52525b',
        }}
      >
        {template.subtitle}
      </p>
    </button>
  );
};

// ── Main ───────────────────────────────────────────────────────
const AdminAddPlan = () => {
  const navigate = useNavigate();
  const { deployPlan } = usePlans();

  const [workoutType, setWorkoutType] = useState('cardio_weights');
  const [durationOption, setDurationOption] = useState('1 Month');
  const [customDuration, setCustomDuration] = useState('');
  const [price, setPrice] = useState('');
  const [hasOffer, setHasOffer] = useState(false);
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [deploying, setDeploying] = useState(false);
  const [success, setSuccess] = useState(false);

  const template = TIER_TEMPLATES[workoutType];

  const calculateFinalPrice = () => {
    if (!price) return null;
    const p = parseFloat(price);
    const d = parseFloat(discountValue) || 0;
    if (isNaN(p)) return null;
    const final =
      discountType === 'percentage' ? p - p * (d / 100) : p - d;
    return Math.max(final, 0);
  };

  const handleDeploy = async () => {
    const duration =
      durationOption === 'Custom' ? customDuration : durationOption;
    if (!duration.trim()) return alert('Please select a duration');
    if (!price || isNaN(parseFloat(price))) return alert('Enter a valid price');

    setDeploying(true);
    try {
      const finalPrice = calculateFinalPrice();
      await deployPlan({
        name: template.name,
        duration,
        price: parseFloat(price),
        finalPrice: finalPrice || parseFloat(price),
        workoutType,
        hasOffer,
        offer: hasOffer
          ? {
              type: discountType,
              value: parseFloat(discountValue) || 0,
              text:
                discountType === 'percentage'
                  ? `${discountValue}% OFF`
                  : `₹${discountValue} OFF`,
            }
          : null,
        features: template.features,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/plans');
      }, 1500);
    } catch {
      alert('Failed to deploy plan');
    } finally {
      setDeploying(false);
    }
  };

  return (
    <Layout title="CREATE NEW PLAN">
      <div className="flex h-full overflow-hidden">

        {/* Left - Form */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Back */}
          <button
            onClick={() => navigate('/plans')}
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300
                       transition-colors font-rajdhani tracking-widest uppercase text-sm"
          >
            ← Back to Plans
          </button>

          {/* ── Select Tier ── */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers size={14} style={{ color: template.iconColor }} />
              <span
                className="font-rajdhani font-semibold text-xs tracking-widest uppercase"
                style={{ color: template.iconColor }}
              >
                Select Membership Tier
              </span>
            </div>
            <p className="font-rajdhani text-zinc-600 text-xs tracking-wide mb-4">
              Choose the tier type — design auto-assigned
            </p>

            <div className="flex gap-4">
              <WorkoutTypeCard
                type="cardio_weights"
                isSelected={workoutType === 'cardio_weights'}
                onSelect={setWorkoutType}
              />
              <WorkoutTypeCard
                type="weights_only"
                isSelected={workoutType === 'weights_only'}
                onSelect={setWorkoutType}
              />
            </div>
          </div>

          {/* ── Pricing ── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign size={14} style={{ color: template.iconColor }} />
              <span
                className="font-rajdhani font-semibold text-xs tracking-widest uppercase"
                style={{ color: template.iconColor }}
              >
                Pricing & Duration
              </span>
            </div>

            <div
              className="rounded-2xl p-5 bg-black border relative overflow-hidden"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              {/* Duration */}
              <div className="mb-4">
                <label className="block font-rajdhani text-zinc-500 text-xs
                                  tracking-widest uppercase mb-2">
                  Duration
                </label>
                <div className="flex flex-wrap gap-2">
                  {DURATION_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setDurationOption(opt)}
                      className="px-4 py-2 rounded-xl text-sm font-rajdhani
                                 font-semibold tracking-wider uppercase border
                                 transition-all"
                      style={{
                        borderColor:
                          durationOption === opt
                            ? `${template.iconColor}50`
                            : 'rgba(255,255,255,0.08)',
                        backgroundColor:
                          durationOption === opt
                            ? `${template.iconColor}15`
                            : 'rgba(255,255,255,0.03)',
                        color:
                          durationOption === opt
                            ? template.iconColor
                            : '#71717a',
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {durationOption === 'Custom' && (
                <GlassInput
                  placeholder="e.g. 14 Days"
                  value={customDuration}
                  onChange={setCustomDuration}
                />
              )}

              <GlassInput
                label="Price (₹)"
                placeholder="0.00"
                value={price}
                onChange={setPrice}
                type="number"
                prefix="₹"
              />
            </div>
          </div>

          {/* ── Offer ── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-yellow-400" />
                <span className="font-rajdhani font-semibold text-yellow-400
                                 text-xs tracking-widest uppercase">
                  Promotional Offer
                </span>
              </div>
              <button
                onClick={() => setHasOffer(!hasOffer)}
                className={`
                  relative w-12 h-6 rounded-full transition-all duration-200
                  ${hasOffer ? 'bg-yellow-400' : 'bg-white/10'}
                `}
              >
                <div
                  className={`
                    absolute top-1 w-4 h-4 rounded-full bg-white
                    transition-all duration-200
                    ${hasOffer ? 'left-7' : 'left-1'}
                  `}
                />
              </button>
            </div>

            {hasOffer && (
              <div
                className="rounded-2xl p-5 bg-black border"
                style={{ borderColor: 'rgba(234,179,8,0.15)' }}
              >
                {/* Discount Type */}
                <div className="mb-4">
                  <label className="block font-rajdhani text-zinc-500 text-xs
                                    tracking-widest uppercase mb-2">
                    Discount Type
                  </label>
                  <div className="flex gap-3">
                    {DISCOUNT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setDiscountType(opt.value)}
                        className="flex-1 py-2.5 rounded-xl text-sm font-rajdhani
                                   font-semibold tracking-wider border transition-all"
                        style={{
                          borderColor:
                            discountType === opt.value
                              ? 'rgba(234,179,8,0.4)'
                              : 'rgba(255,255,255,0.08)',
                          backgroundColor:
                            discountType === opt.value
                              ? 'rgba(234,179,8,0.10)'
                              : 'rgba(255,255,255,0.03)',
                          color:
                            discountType === opt.value
                              ? '#EAB308'
                              : '#71717a',
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <GlassInput
                  label={
                    discountType === 'percentage'
                      ? 'Percentage Off (%)'
                      : 'Amount Deducted (₹)'
                  }
                  placeholder={discountType === 'percentage' ? '20' : '150'}
                  value={discountValue}
                  onChange={setDiscountValue}
                  type="number"
                />

                {/* Calculated */}
                {calculateFinalPrice() !== null && (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl
                                  bg-yellow-500/5 border border-yellow-500/12">
                    <Zap size={13} className="text-yellow-400" />
                    <span className="font-rajdhani text-zinc-400 text-sm">
                      Final Price:{' '}
                      <span className="font-orbitron text-yellow-400 font-bold text-lg">
                        ₹{calculateFinalPrice()?.toFixed(2)}
                      </span>
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right - Preview */}
        <div className="w-80 border-l border-white/5 p-6 overflow-y-auto
                        flex flex-col gap-4">

          {/* Preview Header */}
          <div className="flex items-center gap-2 mb-2">
            <Eye size={14} className="text-zinc-500" />
            <span className="font-rajdhani text-zinc-500 text-xs tracking-widest
                             uppercase">
              Live Preview
            </span>
          </div>

          {/* Preview Card */}
          <div
            className="relative rounded-2xl p-5 bg-black border overflow-hidden"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${template.iconColor}18, transparent)`,
              }}
            />
            <div className="absolute -top-3 -right-3 pointer-events-none">
              <Shield
                size={80}
                strokeWidth={0.5}
                style={{ color: `${template.iconColor}18` }}
              />
            </div>

            {/* Active Badge */}
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
              Active Plan
            </div>

            <h3
              className="font-orbitron font-bold text-xl tracking-widest mb-2"
              style={{ color: template.textColor }}
            >
              {template.name}
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              {hasOffer && calculateFinalPrice() !== null && price ? (
                <>
                  <span className="font-rajdhani text-zinc-600 line-through text-sm">
                    ₹{price}
                  </span>
                  <span
                    className="font-orbitron font-bold text-2xl"
                    style={{ color: template.textColor }}
                  >
                    ₹{calculateFinalPrice()?.toFixed(0)}
                  </span>
                </>
              ) : (
                <span
                  className="font-orbitron font-bold text-2xl"
                  style={{ color: template.textColor }}
                >
                  ₹{price || '0'}
                </span>
              )}
              <span className="font-rajdhani text-zinc-500 text-sm">
                /{durationOption === 'Custom' ? customDuration || 'duration' : durationOption}
              </span>
            </div>

            {hasOffer && discountValue && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg
                              bg-yellow-500/12 border border-yellow-500/25 mb-3">
                <Zap size={10} className="text-yellow-400" />
                <span className="font-rajdhani font-semibold text-yellow-400 text-xs">
                  {discountType === 'percentage'
                    ? `${discountValue}% OFF`
                    : `₹${discountValue} OFF`}
                </span>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-auto">
            <button
              onClick={handleDeploy}
              disabled={deploying || success}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl
                         font-orbitron font-bold text-sm tracking-widest
                         transition-all disabled:opacity-50"
              style={{
                backgroundColor: success ? '#22C55E' : template.iconColor,
                color: 'white',
              }}
            >
              {deploying ? (
                'DEPLOYING...'
              ) : success ? (
                <>
                  <CheckCircle size={16} /> DEPLOYED!
                </>
              ) : (
                <>
                  <Upload size={16} /> DEPLOY PLAN
                </>
              )}
            </button>

            <button
              onClick={() => navigate('/plans')}
              className="flex items-center justify-center gap-2 py-3 rounded-xl
                         border border-white/8 bg-white/3 hover:bg-white/6
                         font-rajdhani font-semibold text-zinc-500 text-sm
                         tracking-widest uppercase transition-all"
            >
              <X size={13} /> Cancel
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminAddPlan;