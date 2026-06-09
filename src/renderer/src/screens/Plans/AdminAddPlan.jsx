// AdminAddPlan.jsx — DASHBOARD-MATCHING PREMIUM UI
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import { usePlans } from '../../context/PlansContext';
import {
  Shield, Activity, Dumbbell, DollarSign, Layers, Eye,
  Zap, X, Upload, CheckCircle, Crown, Sparkles, Package,
  ArrowLeft, ChevronRight, Calendar, Clock, Star,
  Loader2, AlertCircle, TrendingUp, Target,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════ */
/* CONFIGS                                                         */
/* ═══════════════════════════════════════════════════════════════ */
const TIER = {
  cardio_weights: {
    name: 'ELITE TIER', short: 'ELITE', icon: Crown, color: '#C5A059',
    subtitle: 'Cardio + Weight Lifting',
    features: ['Full Gym Access', 'Cardio + Weight Training', 'All Equipment Access', 'Fitness Assessment', 'Personal Locker'],
  },
  weights_only: {
    name: 'LEGENDARY TIER', short: 'LEGENDARY', icon: Sparkles, color: '#A855F7',
    subtitle: 'Weight Lifting Only',
    features: ['Weight Zone Access', 'Free Weights & Machines', 'Strength Programs', 'Progress Tracking', 'Personal Trainer Support'],
  },
};

const DURATIONS = ['1 Month', '3 Months', '6 Months', '12 Months', 'Custom'];
const DISCOUNT_TYPES = [
  { label: 'Percentage (%)', value: 'percentage' },
  { label: 'Fixed Amount (₹)', value: 'fixed' },
];

/* ═══════════════════════════════════════════════════════════════ */
/* GLASSPANEL (identical to dashboard)                             */
/* ═══════════════════════════════════════════════════════════════ */
const GlassPanel = ({ children, className = '', borderColor, glow, style = {} }) => (
  <div className={`relative rounded-3xl overflow-hidden ${className}`}
    style={{
      background: '#000000',
      border: `1px solid ${borderColor || 'rgba(255,255,255,0.08)'}`,
      backdropFilter: 'blur(24px)',
      boxShadow: glow ? `0 8px 32px ${glow}` : 'none',
      ...style,
    }}>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* SECTION HEADER                                                  */
/* ═══════════════════════════════════════════════════════════════ */
const SectionHeader = ({ icon: Icon, title, subtitle, color = '#C5A059' }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-1.5 h-8 rounded-full" style={{ background: `linear-gradient(to bottom, ${color}, ${color}30)` }} />
    <div className="flex items-center gap-3 flex-1">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: `${color}10`, border: `1px solid ${color}18` }}>
        <Icon size={16} style={{ color }} />
      </div>
      <div>
        <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.12em]">{title}</h3>
        {subtitle && (
          <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">{subtitle}</p>
        )}
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* FORM INPUT                                                      */
/* ═══════════════════════════════════════════════════════════════ */
const FormInput = ({ label, placeholder, value, onChange, type = 'text', prefix, color = '#C5A059' }) => (
  <div>
    {label && (
      <label className="block font-rajdhani text-zinc-500 text-[10px] tracking-[0.2em] uppercase font-semibold mb-2">
        {label}
      </label>
    )}
    <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300
                    focus-within:border-opacity-50"
      style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(255,255,255,0.08)` }}>
      {prefix && (
        <span className="font-orbitron text-[13px] font-bold" style={{ color: `${color}80` }}>{prefix}</span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="flex-1 bg-transparent text-white font-rajdhani text-[13px] tracking-wider
                   outline-none placeholder:text-zinc-700"
      />
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* TIER SELECT CARD                                                */
/* ═══════════════════════════════════════════════════════════════ */
const TierCard = ({ type, isSelected, onSelect }) => {
  const t = TIER[type];
  const TIcon = t.icon;

  return (
    <button onClick={() => onSelect(type)}
      className={`group relative flex-1 rounded-2xl p-5 text-left transition-all duration-300
                  overflow-hidden hover:scale-[1.02] active:scale-[0.98]
                  ${isSelected ? '' : 'hover:-translate-y-0.5'}`}
      style={{
        background: '#000000',
        border: `1px solid ${isSelected ? `${t.color}40` : 'rgba(255,255,255,0.06)'}`,
        boxShadow: isSelected ? `0 8px 32px ${t.color}10` : 'none',
      }}>

      {/* BG gradient */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${t.color}${isSelected ? '12' : '04'}, transparent 70%)`,
          opacity: isSelected ? 1 : 0.5,
        }} />

      {/* Watermark */}
      <div className="absolute -top-4 -right-4 pointer-events-none">
        <Shield size={80} strokeWidth={0.4}
          style={{ color: isSelected ? `${t.color}15` : 'rgba(255,255,255,0.02)' }} />
      </div>

      <div className="relative">
        {/* Icons row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {type === 'cardio_weights' ? (
              <>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: isSelected ? `${t.color}15` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isSelected ? `${t.color}25` : 'rgba(255,255,255,0.06)'}`,
                  }}>
                  <Activity size={15} style={{ color: isSelected ? t.color : '#52525B' }} />
                </div>
                <span className="font-orbitron text-[11px] font-bold"
                  style={{ color: isSelected ? t.color : '#3F3F46' }}>+</span>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: isSelected ? `${t.color}15` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isSelected ? `${t.color}25` : 'rgba(255,255,255,0.06)'}`,
                  }}>
                  <Dumbbell size={15} style={{ color: isSelected ? t.color : '#52525B' }} />
                </div>
              </>
            ) : (
              <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: isSelected ? `${t.color}15` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isSelected ? `${t.color}25` : 'rgba(255,255,255,0.06)'}`,
                }}>
                <Dumbbell size={15} style={{ color: isSelected ? t.color : '#52525B' }} />
              </div>
            )}
          </div>

          {/* Check */}
          {isSelected && (
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: `${t.color}20`, border: `1px solid ${t.color}35` }}>
              <CheckCircle size={14} style={{ color: t.color }} />
            </div>
          )}
        </div>

        {/* Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg mb-3 w-fit"
          style={{
            background: isSelected ? `${t.color}12` : 'rgba(255,255,255,0.03)',
            border: `1px solid ${isSelected ? `${t.color}22` : 'rgba(255,255,255,0.05)'}`,
          }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.color, opacity: isSelected ? 1 : 0.3 }} />
          <span className="font-orbitron text-[8px] font-bold tracking-[0.18em] uppercase"
            style={{ color: isSelected ? t.color : '#52525B' }}>
            {t.short} TIER
          </span>
        </div>

        {/* Name */}
        <h3 className="font-orbitron font-bold text-[15px] tracking-[0.10em] mb-1 transition-colors"
          style={{ color: isSelected ? t.color : '#A1A1AA' }}>
          {t.name}
        </h3>
        <p className="font-rajdhani text-[11px] tracking-wider uppercase"
          style={{ color: isSelected ? `${t.color}90` : '#3F3F46' }}>
          {t.subtitle}
        </p>
      </div>
    </button>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN                                                            */
/* ═══════════════════════════════════════════════════════════════ */
const AdminAddPlan = ({ onLogout }) => {
  const navigate = useNavigate();
  const { deployPlan } = usePlans();

  const [workoutType, setWorkoutType]       = useState('cardio_weights');
  const [durationOption, setDurationOption] = useState('1 Month');
  const [customDuration, setCustomDuration] = useState('');
  const [price, setPrice]                   = useState('');
  const [hasOffer, setHasOffer]             = useState(false);
  const [discountType, setDiscountType]     = useState('percentage');
  const [discountValue, setDiscountValue]   = useState('');
  const [deploying, setDeploying]           = useState(false);
  const [success, setSuccess]               = useState(false);

  const tier = TIER[workoutType];

  const calcFinal = () => {
    const p = parseFloat(price);
    const d = parseFloat(discountValue) || 0;
    if (!p || isNaN(p)) return null;
    if (!hasOffer || !d) return p;
    return Math.max(discountType === 'percentage' ? p - p * (d / 100) : p - d, 0);
  };

  const finalPrice = calcFinal();

  const handleDeploy = async () => {
    const dur = durationOption === 'Custom' ? customDuration : durationOption;
    if (!dur.trim()) return alert('Please select a duration');
    if (!price || isNaN(parseFloat(price))) return alert('Enter a valid price');

    setDeploying(true);
    try {
      await deployPlan({
        name: tier.name, duration: dur, price: parseFloat(price),
        finalPrice: finalPrice || parseFloat(price), workoutType, hasOffer,
        offer: hasOffer ? {
          type: discountType, value: parseFloat(discountValue) || 0,
          text: discountType === 'percentage' ? `${discountValue}% OFF` : `₹${discountValue} OFF`,
        } : null,
        features: tier.features,
      });
      setSuccess(true);
      setTimeout(() => navigate('/plans'), 1500);
    } catch { alert('Failed to deploy plan'); }
    finally { setDeploying(false); }
  };

  return (
    <Layout title="CREATE PLAN" onLogout={onLogout}>
      <div className="relative min-h-screen">

        {/* Background */}
        <div className="fixed inset-0 z-0" style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(234,179,8,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(168,85,247,0.03) 0%, transparent 50%),
            linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.97) 40%, #000000 100%)
          `,
        }} />

        <div className="relative z-10 p-8 lg:p-10 max-w-[1400px] mx-auto">

          {/* ═══════════════════════════════════════════════════════ */}
          {/* HEADER                                                 */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-5">
              <button onClick={() => navigate('/plans')}
                className="group w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{ background: '#000', border: '1px solid rgba(255,255,255,0.08)' }}>
                <ArrowLeft size={18} className="text-zinc-400 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
              </button>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `${tier.color}10`, border: `1px solid ${tier.color}18` }}>
                <Package size={24} style={{ color: tier.color }} />
              </div>
              <div>
                <p className="font-rajdhani text-[12px] tracking-[0.3em] uppercase font-bold mb-1"
                  style={{ color: tier.color }}>New Plan</p>
                <h1 className="font-orbitron text-white font-extrabold text-[28px] tracking-[0.15em]
                               bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  CREATE PLAN
                </h1>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* MAIN GRID                                              */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-12 gap-6">

            {/* ── LEFT: Form (span-8) ── */}
            <div className="col-span-12 xl:col-span-8 space-y-6">

              {/* ── Tier Selection ── */}
              <GlassPanel borderColor={`${tier.color}12`}>
                <div className="p-7">
                  <SectionHeader icon={Layers} title="SELECT TIER" subtitle="Choose membership type" color={tier.color} />

                  <div className="flex gap-4">
                    <TierCard type="cardio_weights" isSelected={workoutType === 'cardio_weights'} onSelect={setWorkoutType} />
                    <TierCard type="weights_only" isSelected={workoutType === 'weights_only'} onSelect={setWorkoutType} />
                  </div>
                </div>
              </GlassPanel>

              {/* ── Duration ── */}
              <GlassPanel>
                <div className="p-7">
                  <SectionHeader icon={Calendar} title="DURATION" subtitle="Select plan duration" color="#22D3EE" />

                  <div className="flex flex-wrap gap-3 mb-4">
                    {DURATIONS.map(opt => (
                      <button key={opt} onClick={() => setDurationOption(opt)}
                        className="px-5 py-3 rounded-2xl font-rajdhani text-[12px] font-bold tracking-[0.12em] uppercase
                                   transition-all duration-300 hover:scale-[1.03]"
                        style={{
                          background: durationOption === opt ? `${tier.color}12` : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${durationOption === opt ? `${tier.color}30` : 'rgba(255,255,255,0.07)'}`,
                          color: durationOption === opt ? tier.color : '#71717A',
                          boxShadow: durationOption === opt ? `0 4px 16px ${tier.color}08` : 'none',
                        }}>
                        {opt}
                      </button>
                    ))}
                  </div>

                  {durationOption === 'Custom' && (
                    <FormInput placeholder="e.g. 45 Days, 2 Weeks..." value={customDuration}
                      onChange={setCustomDuration} color={tier.color} />
                  )}
                </div>
              </GlassPanel>

              {/* ── Pricing ── */}
              <GlassPanel borderColor={`${tier.color}12`} glow={`${tier.color}05`}>
                {/* Gold top accent */}
                <div className="absolute top-0 left-8 right-8 h-[2px]"
                  style={{ background: `linear-gradient(90deg,transparent,${tier.color}40,transparent)` }} />

                <div className="p-7">
                  <SectionHeader icon={DollarSign} title="PRICING" subtitle="Set plan price" color={tier.color} />

                  <FormInput label="Plan Price" placeholder="Enter amount" value={price}
                    onChange={setPrice} type="number" prefix="₹" color={tier.color} />

                  {price && (
                    <div className="mt-4 flex items-center gap-3 px-5 py-3.5 rounded-2xl"
                      style={{ background: `${tier.color}06`, border: `1px solid ${tier.color}15` }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${tier.color}12` }}>
                        <TrendingUp size={14} style={{ color: tier.color }} />
                      </div>
                      <div>
                        <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.2em] uppercase">Base Price</p>
                        <p className="font-orbitron font-bold text-[18px]" style={{ color: tier.color }}>
                          ₹{parseFloat(price).toLocaleString('en-IN')}
                        </p>
                      </div>
                      <span className="font-rajdhani text-zinc-600 text-[11px] tracking-wider ml-1">
                        / {durationOption === 'Custom' ? customDuration || 'duration' : durationOption}
                      </span>
                    </div>
                  )}
                </div>
              </GlassPanel>

              {/* ── Promotional Offer ── */}
              <GlassPanel borderColor={hasOffer ? 'rgba(234,179,8,0.20)' : 'rgba(255,255,255,0.08)'}
                glow={hasOffer ? 'rgba(234,179,8,0.05)' : undefined}>
                <div className="p-7">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-400/20" />
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(234,179,8,0.10)', border: '1px solid rgba(234,179,8,0.18)' }}>
                        <Zap size={16} className="text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.12em]">
                          PROMOTIONAL OFFER
                        </h3>
                        <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">
                          Add discount to this plan
                        </p>
                      </div>
                    </div>

                    {/* Toggle */}
                    <button onClick={() => setHasOffer(!hasOffer)}
                      className="relative w-14 h-7 rounded-full transition-all duration-300"
                      style={{
                        background: hasOffer ? 'rgba(234,179,8,0.30)' : 'rgba(255,255,255,0.08)',
                        border: `1px solid ${hasOffer ? 'rgba(234,179,8,0.40)' : 'rgba(255,255,255,0.12)'}`,
                      }}>
                      <div className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-300
                        ${hasOffer ? 'left-8 bg-yellow-400' : 'left-1 bg-zinc-500'}`} />
                    </button>
                  </div>

                  {hasOffer && (
                    <div className="space-y-5 pt-2">
                      {/* Discount Type */}
                      <div>
                        <label className="block font-rajdhani text-zinc-500 text-[10px] tracking-[0.2em] uppercase font-semibold mb-3">
                          Discount Type
                        </label>
                        <div className="flex gap-3">
                          {DISCOUNT_TYPES.map(opt => (
                            <button key={opt.value} onClick={() => setDiscountType(opt.value)}
                              className="flex-1 py-3 rounded-2xl font-rajdhani text-[12px] font-bold tracking-wider uppercase
                                         transition-all duration-300 hover:scale-[1.02]"
                              style={{
                                background: discountType === opt.value ? 'rgba(234,179,8,0.10)' : 'rgba(255,255,255,0.02)',
                                border: `1px solid ${discountType === opt.value ? 'rgba(234,179,8,0.30)' : 'rgba(255,255,255,0.07)'}`,
                                color: discountType === opt.value ? '#EAB308' : '#71717A',
                              }}>
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Discount Value */}
                      <FormInput
                        label={discountType === 'percentage' ? 'Discount Percentage' : 'Discount Amount'}
                        placeholder={discountType === 'percentage' ? 'e.g. 20' : 'e.g. 500'}
                        value={discountValue}
                        onChange={setDiscountValue}
                        type="number"
                        prefix={discountType === 'percentage' ? '%' : '₹'}
                        color="#EAB308"
                      />

                      {/* Final Price Calculation */}
                      {finalPrice !== null && hasOffer && discountValue && (
                        <div className="flex items-center gap-4 px-5 py-4 rounded-2xl"
                          style={{ background: '#000', border: '1px solid rgba(234,179,8,0.20)' }}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.20)' }}>
                            <Zap size={16} className="text-yellow-400" />
                          </div>
                          <div className="flex-1">
                            <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.2em] uppercase mb-0.5">
                              Final Price After Discount
                            </p>
                            <div className="flex items-baseline gap-3">
                              <span className="font-rajdhani text-zinc-600 text-[13px] line-through">
                                ₹{price}
                              </span>
                              <span className="font-orbitron text-yellow-400 font-bold text-[22px]">
                                ₹{finalPrice.toFixed(0)}
                              </span>
                            </div>
                          </div>
                          <div className="px-3 py-1.5 rounded-xl"
                            style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.20)' }}>
                            <span className="font-orbitron text-green-400 text-[11px] font-bold">
                              SAVE ₹{(parseFloat(price) - finalPrice).toFixed(0)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </GlassPanel>
            </div>

            {/* ── RIGHT: Preview + Actions (span-4) ── */}
            <div className="col-span-12 xl:col-span-4 space-y-6">

              {/* Live Preview */}
              <GlassPanel borderColor={`${tier.color}15`} glow={`${tier.color}06`}>
                {/* Gold accent */}
                <div className="absolute top-0 left-6 right-6 h-[2px]"
                  style={{ background: `linear-gradient(90deg,transparent,${tier.color}40,transparent)` }} />

                <div className="p-7">
                  <div className="flex items-center gap-2 mb-5">
                    <Eye size={13} className="text-zinc-500" />
                    <span className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.2em] uppercase font-semibold">
                      Live Preview
                    </span>
                  </div>

                  {/* Preview Card */}
                  <div className="rounded-2xl p-6 relative overflow-hidden"
                    style={{ background: `${tier.color}04`, border: `1px solid ${tier.color}15` }}>

                    {/* Watermark */}
                    <div className="absolute -top-4 -right-4 pointer-events-none">
                      <tier.icon size={90} strokeWidth={0.4} style={{ color: `${tier.color}10` }} />
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg mb-4 w-fit"
                      style={{ background: `${tier.color}12`, border: `1px solid ${tier.color}20` }}>
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: tier.color }} />
                      <span className="font-orbitron text-[8px] font-bold tracking-[0.18em] uppercase"
                        style={{ color: tier.color }}>
                        {tier.short} TIER
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="font-orbitron font-bold text-[20px] tracking-[0.10em] mb-4"
                      style={{ color: tier.color }}>
                      {tier.name}
                    </h3>

                    {/* Price display */}
                    <div className="flex items-end gap-2 mb-1">
                      {hasOffer && finalPrice !== null && price ? (
                        <>
                          <span className="font-rajdhani text-zinc-600 line-through text-[14px]">₹{price}</span>
                          <span className="font-orbitron font-extralight text-[36px] leading-none"
                            style={{ color: tier.color }}>
                            ₹{finalPrice.toFixed(0)}
                          </span>
                        </>
                      ) : (
                        <span className="font-orbitron font-extralight text-[36px] leading-none"
                          style={{ color: tier.color }}>
                          ₹{price || '0'}
                        </span>
                      )}
                    </div>
                    <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.15em] uppercase mb-4">
                      / {durationOption === 'Custom' ? customDuration || 'duration' : durationOption}
                    </p>

                    {/* Offer badge */}
                    {hasOffer && discountValue && (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl mb-4 w-fit"
                        style={{ background: '#000', border: '1px solid rgba(234,179,8,0.22)' }}>
                        <Zap size={11} className="text-yellow-400" />
                        <span className="font-rajdhani font-bold text-yellow-400 text-[11px] tracking-wider uppercase">
                          {discountType === 'percentage' ? `${discountValue}% OFF` : `₹${discountValue} OFF`}
                        </span>
                      </div>
                    )}

                    {/* Divider */}
                    <div className="h-px my-4"
                      style={{ background: `linear-gradient(90deg,transparent,${tier.color}20,transparent)` }} />

                    {/* Features */}
                    <div className="space-y-2.5">
                      {tier.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <div className="w-4 h-4 rounded-md flex items-center justify-center flex-shrink-0"
                            style={{ background: `${tier.color}12`, border: `1px solid ${tier.color}18` }}>
                            <CheckCircle size={9} style={{ color: tier.color }} strokeWidth={3} />
                          </div>
                          <span className="font-rajdhani text-zinc-400 text-[11px] tracking-wide">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassPanel>

              {/* ── Action Buttons ── */}
              <div className="space-y-3">
                {/* Deploy */}
                <button onClick={handleDeploy} disabled={deploying || success}
                  className="group w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-orbitron text-[12px]
                             font-bold tracking-[0.15em] uppercase transition-all duration-300
                             hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: success
                      ? 'linear-gradient(135deg, #22C55E, #16A34A)'
                      : `linear-gradient(135deg, ${tier.color}, ${tier.color === '#C5A059' ? '#EAB308' : '#C084FC'})`,
                    color: success ? '#fff' : '#000',
                    boxShadow: success
                      ? '0 8px 32px rgba(34,197,94,0.30)'
                      : `0 8px 32px ${tier.color}30`,
                  }}>
                  {deploying ? (
                    <><Loader2 size={18} className="animate-spin" /> Deploying...</>
                  ) : success ? (
                    <><CheckCircle size={18} /> Plan Deployed!</>
                  ) : (
                    <><Upload size={18} /> Deploy Plan</>
                  )}
                </button>

                {/* Cancel */}
                <button onClick={() => navigate('/plans')}
                  className="group w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl
                             font-rajdhani text-zinc-400 text-[12px] tracking-[0.15em] uppercase font-bold
                             transition-all duration-300 hover:text-white hover:scale-[1.01]"
                  style={{ background: '#000', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <X size={14} /> Cancel
                </button>
              </div>

              {/* ── Info Notice ── */}
              <GlassPanel borderColor="rgba(197,160,89,0.10)">
                <div className="p-5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${tier.color}08`, border: `1px solid ${tier.color}12` }}>
                    <AlertCircle size={14} style={{ color: tier.color }} />
                  </div>
                  <div>
                    <p className="font-rajdhani text-white text-[11px] font-bold tracking-[0.12em] uppercase mb-1">
                      Plan Configuration
                    </p>
                    <p className="font-rajdhani text-zinc-500 text-[10px] tracking-wider leading-relaxed">
                      Plan will be available for new members immediately after deployment.
                      Existing members are not affected.
                    </p>
                  </div>
                </div>
              </GlassPanel>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminAddPlan;