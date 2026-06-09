// AdminUpgrade.jsx - DASHBOARD-MATCHING UI
import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  Crown, Check, QrCode, ArrowLeft, Shield, Loader2,
  Copy, CheckCircle, Sparkles, Star, ArrowRight,
  CreditCard, Monitor, Smartphone, Laptop, Lock,
  Bell, BarChart3, Database, Users, ChevronRight,
  Zap, Timer, Wifi, TrendingUp, Package, HeadphonesIcon,
} from 'lucide-react';

const BRAND = { gold: '#C5A059', goldLight: '#EAB308' };

const PLANS = [
  { id: '1m', duration: '1 Month',  price: 1500,  perMonth: 1500, popular: false, save: null,  months: 1  },
  { id: '3m', duration: '3 Months', price: 4000,  perMonth: 1333, popular: true,  save: '11%', months: 3  },
  { id: '6m', duration: '6 Months', price: 7500,  perMonth: 1250, popular: false, save: '17%', months: 6  },
  { id: '9m', duration: '9 Months', price: 10500, perMonth: 1167, popular: false, save: '22%', months: 9  },
  { id: '1y', duration: '1 Year',   price: 13500, perMonth: 1125, popular: false, save: '25%', months: 12 },
];

const FEATURES = [
  { icon: Users,          label: 'Unlimited Members',     sub: 'No registration cap'         },
  { icon: Bell,           label: 'WhatsApp & SMS',        sub: 'Instant notifications'        },
  { icon: BarChart3,      label: 'Analytics & Reports',   sub: 'Deep business insights'       },
  { icon: Database,       label: 'Auto Cloud Backup',     sub: 'Never lose your data'         },
  { icon: Monitor,        label: '3 Device Access',       sub: 'Desktop · Laptop · Mobile'    },
  { icon: Shield,         label: 'Priority Support',      sub: '24/7 dedicated help'          },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function addMonths(date, n) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
}
function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
function mulberry32(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Shared: GlassPanel (matches dashboard)  ───────────────────────────────────
const GlassPanel = ({ children, className = '', onClick, hover = false, borderColor, glow, style = {} }) => (
  <div
    onClick={onClick}
    className={`
      relative rounded-3xl overflow-hidden
      ${hover ? 'cursor-pointer transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1' : ''}
      ${onClick ? 'cursor-pointer' : ''}
      ${className}
    `}
    style={{
      background: '#000000',
      border: `1px solid ${borderColor || 'rgba(255,255,255,0.08)'}`,
      backdropFilter: 'blur(24px)',
      boxShadow: glow ? `0 8px 32px ${glow}` : 'none',
      ...style,
    }}
  >
    {children}
  </div>
);

// ── FakeQR ────────────────────────────────────────────────────────────────────
const FakeQR = ({ seed = 12345 }) => {
  const rand   = useMemo(() => mulberry32(seed), [seed]);
  const blocks = useMemo(() => Array.from({ length: 196 }, () => rand() > 0.52), [rand]);
  return (
    <div className="w-52 h-52 rounded-2xl p-3 mx-auto"
      style={{ background: '#fff', border: `3px solid rgba(197,160,89,0.30)` }}>
      <div className="grid gap-[1.5px] w-full h-full"
        style={{ gridTemplateColumns: 'repeat(14,1fr)' }}>
        {blocks.map((b, i) => (
          <div key={i} style={{ background: b ? '#111' : '#fff', borderRadius: 1 }} />
        ))}
      </div>
    </div>
  );
};

// ── CommandButton (matches dashboard style) ───────────────────────────────────
const PlanCard = ({ plan, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => onSelect(plan)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative w-full text-left rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
      style={{
        background: plan.popular ? 'rgba(197,160,89,0.06)' : '#000000',
        border: plan.popular
          ? '1px solid rgba(197,160,89,0.30)'
          : hovered ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow: plan.popular ? '0 8px 32px rgba(197,160,89,0.08)' : 'none',
      }}
    >
      {/* Gold top line for popular */}
      {plan.popular && (
        <div className="absolute top-0 left-8 right-8 h-[2px] rounded-full"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(197,160,89,0.6),transparent)' }} />
      )}

      <div className="p-6">
        {plan.popular && (
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-rajdhani text-[10px] font-bold tracking-widest uppercase"
              style={{ background: 'rgba(197,160,89,0.12)', color: BRAND.gold, border: '1px solid rgba(197,160,89,0.25)' }}>
              <Star size={9} fill={BRAND.gold} color={BRAND.gold} /> Most Popular
            </span>
          </div>
        )}

        <p className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.25em] uppercase text-center mb-1">
          {plan.duration}
        </p>

        <div className="text-center my-5">
          <div className="flex items-start justify-center gap-1">
            <span className="font-rajdhani text-zinc-500 text-sm mt-2">₹</span>
            <span className="font-orbitron text-white font-bold text-[34px] leading-none">
              {plan.price.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="font-rajdhani text-zinc-500 text-[11px] tracking-wider uppercase mt-2">
            ₹{plan.perMonth.toLocaleString('en-IN')}/month
          </p>
        </div>

        {plan.save ? (
          <div className="flex justify-center mb-5">
            <span className="px-3 py-1 rounded-xl font-rajdhani text-[10px] tracking-wider uppercase font-bold"
              style={{ background: 'rgba(34,197,94,0.10)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.20)' }}>
              Save {plan.save}
            </span>
          </div>
        ) : <div className="mb-5 h-[26px]" />}

        <div className="space-y-2.5 mb-6">
          {['All Features', '3 Devices', 'Priority Support'].map(f => (
            <div key={f} className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(197,160,89,0.12)', border: '1px solid rgba(197,160,89,0.20)' }}>
                <Check size={9} color={BRAND.gold} strokeWidth={3} />
              </div>
              <span className="font-rajdhani text-zinc-400 text-[11px] tracking-wide">{f}</span>
            </div>
          ))}
        </div>

        <div className="w-full py-3 rounded-xl text-center font-rajdhani text-[11px] font-bold tracking-widest uppercase
                        flex items-center justify-center gap-2 transition-all duration-300 group-hover:gap-3"
          style={plan.popular ? {
            background: `linear-gradient(135deg,${BRAND.gold},${BRAND.goldLight})`,
            color: '#000',
            boxShadow: `0 6px 24px rgba(197,160,89,0.30)`,
          } : {
            background: 'rgba(197,160,89,0.08)',
            color: BRAND.gold,
            border: '1px solid rgba(197,160,89,0.20)',
          }}>
          Select Plan <ChevronRight size={13} />
        </div>
      </div>
    </button>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const AdminUpgrade = ({ onLogout }) => {
  const nav = useNavigate();
  const [step, setStep]           = useState('SELECT');
  const [selectedPlan, setSelect] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [copied, setCopied]       = useState(false);

  const upiId  = 'gymverse@razorpay';
  const orderId = useMemo(() => `GV_${Date.now()}`, []);
  const qrSeed  = useMemo(() => orderId.split('').reduce((a, c) => a + c.charCodeAt(0), 0), [orderId]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);

  const handleBack = () => {
    if (step === 'QR') { setStep('SELECT'); setSelect(null); return; }
    nav('/dashboard');
  };

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(upiId); }
    catch { const el = document.createElement('textarea'); el.value = upiId; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el); }
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  };

  const handleVerify = async () => {
    setVerifying(true);
    await new Promise(r => setTimeout(r, 1800));
    const now = new Date();
    localStorage.setItem('gymverse_subscription', JSON.stringify({
      status: 'active', planId: selectedPlan.id, planLabel: selectedPlan.duration,
      price: selectedPlan.price, purchasedAt: now.toISOString(),
      expiresAt: addMonths(now, selectedPlan.months).toISOString(), orderId,
    }));
    setVerifying(false);
    setStep('SUCCESS');
  };

  // ─────────────────────────────────────────────────────────────────────────
  // SELECT STEP
  // ─────────────────────────────────────────────────────────────────────────
  if (step === 'SELECT') return (
    <Layout title="UPGRADE" onLogout={onLogout}>
      <div className="relative min-h-screen">
        {/* Bg gradients matching dashboard */}
        <div className="fixed inset-0 z-0" style={{
          background: 'radial-gradient(ellipse at 20% 0%,rgba(234,179,8,0.05) 0%,transparent 50%), radial-gradient(ellipse at 80% 100%,rgba(168,85,247,0.04) 0%,transparent 50%), linear-gradient(180deg,rgba(0,0,0,0.95) 0%,#000 100%)',
        }} />

        <div className="relative z-10 p-8 lg:p-10 space-y-8 max-w-[1400px] mx-auto">

          {/* ── Header ── */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(197,160,89,0.10)', border: '1px solid rgba(197,160,89,0.20)' }}>
                <Crown size={26} color={BRAND.gold} />
              </div>
              <div>
                <p className="font-rajdhani text-[#C5A059] text-[12px] tracking-[0.3em] uppercase font-bold mb-1">
                  Premium Upgrade
                </p>
                <h1 className="font-orbitron text-white font-extrabold text-[28px] tracking-[0.15em]
                               bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  UNLOCK FULL ACCESS
                </h1>
              </div>
            </div>
            <button onClick={handleBack}
              className="flex items-center gap-2 h-12 px-5 rounded-2xl font-rajdhani text-zinc-300 text-[12px] tracking-[0.15em] uppercase font-bold transition-all duration-300 hover:scale-105 hover:text-white"
              style={{ background: '#000000', border: '1px solid rgba(255,255,255,0.10)' }}>
              <ArrowLeft size={15} /> Dashboard
            </button>
          </div>

          {/* ── Features Banner ── */}
          <GlassPanel borderColor="rgba(197,160,89,0.12)">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#C5A059] to-[#C5A059]/20" />
                <div>
                  <h2 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em]">
                    EVERYTHING INCLUDED
                  </h2>
                  <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.15em] uppercase">
                    All features · One price · No hidden fees
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {FEATURES.map(({ icon: Icon, label, sub }, i) => (
                  <div key={i}
                    className="group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                    style={{ background: '#000000', border: '1px solid rgba(197,160,89,0.10)' }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                      style={{ background: 'rgba(197,160,89,0.10)', border: '1px solid rgba(197,160,89,0.18)' }}>
                      <Icon size={18} color={BRAND.gold} />
                    </div>
                    <div>
                      <p className="font-rajdhani text-white text-[12px] font-bold tracking-[0.10em] uppercase">{label}</p>
                      <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.08em] mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3-device highlight strip — matches trainer strip in dashboard */}
              <div className="flex items-center justify-between px-5 py-4 rounded-2xl"
                style={{ background: '#000000', border: '1px solid rgba(197,160,89,0.18)' }}>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    {[Monitor, Laptop, Smartphone].map((DevIcon, i) => (
                      <div key={i} className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(197,160,89,0.10)', border: '1px solid rgba(197,160,89,0.18)' }}>
                        <DevIcon size={15} color={BRAND.gold} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-rajdhani text-[#C5A059] text-[12px] font-bold tracking-[0.12em] uppercase leading-none mb-1">
                      3 Device Access Included
                    </p>
                    <p className="font-rajdhani text-[#C5A059]/60 text-[10px] tracking-[0.10em] uppercase font-medium">
                      Desktop · Laptop · Mobile
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-orbitron text-[#C5A059] text-[24px] font-bold">3</span>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                    <span className="font-rajdhani text-[#C5A059] text-[9px] tracking-[0.1em] uppercase font-bold">Devices</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>

          {/* ── Plans ── */}
          <GlassPanel>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#C5A059] to-[#C5A059]/20" />
                <div>
                  <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em]">
                    CHOOSE YOUR PLAN
                  </h3>
                  <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.15em] uppercase">
                    All plans include full features · Save more with longer commitment
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {PLANS.map(plan => (
                  <PlanCard key={plan.id} plan={plan} onSelect={p => { setSelect(p); setStep('QR'); }} />
                ))}
              </div>

              {/* Trust badges — matching dashboard alert style */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent my-6" />
              <div className="flex flex-wrap items-center justify-center gap-4">
                {[
                  { icon: Shield,   color: '#22C55E', label: '30-Day Money Back' },
                  { icon: Lock,     color: BRAND.gold, label: 'Secure Payment'   },
                  { icon: Zap,      color: '#A855F7',  label: 'Instant Access'   },
                ].map(({ icon: Icon, color, label }, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                    style={{ background: '#000000', border: `1px solid ${color}20` }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}10` }}>
                      <Icon size={15} color={color} />
                    </div>
                    <span className="font-rajdhani text-[12px] font-bold tracking-[0.12em] uppercase" style={{ color }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </Layout>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // QR STEP
  // ─────────────────────────────────────────────────────────────────────────
  if (step === 'QR' && selectedPlan) return (
    <Layout title="PAYMENT" onLogout={onLogout}>
      <div className="relative min-h-screen">
        <div className="fixed inset-0 z-0" style={{
          background: 'linear-gradient(180deg,rgba(0,0,0,0.95) 0%,#000 100%)',
        }} />

        <div className="relative z-10 p-8 lg:p-10 space-y-8 max-w-[1200px] mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(197,160,89,0.10)', border: '1px solid rgba(197,160,89,0.20)' }}>
                <QrCode size={24} color={BRAND.gold} />
              </div>
              <div>
                <p className="font-rajdhani text-[#C5A059] text-[12px] tracking-[0.3em] uppercase font-bold mb-1">
                  Step 2 of 2
                </p>
                <h1 className="font-orbitron text-white font-extrabold text-[28px] tracking-[0.15em]
                               bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  COMPLETE PAYMENT
                </h1>
              </div>
            </div>
            <button onClick={handleBack}
              className="flex items-center gap-2 h-12 px-5 rounded-2xl font-rajdhani text-zinc-300 text-[12px] tracking-[0.15em] uppercase font-bold transition-all duration-300 hover:scale-105 hover:text-white"
              style={{ background: '#000000', border: '1px solid rgba(255,255,255,0.10)' }}>
              <ArrowLeft size={15} /> Back
            </button>
          </div>

          <div className="grid grid-cols-12 gap-6">

            {/* Left — Summary */}
            <div className="col-span-12 xl:col-span-7 space-y-6">

              {/* Plan Summary Card */}
              <GlassPanel borderColor="rgba(197,160,89,0.15)" glow="rgba(197,160,89,0.06)">
                {/* Gold top accent */}
                <div className="absolute top-0 left-10 right-10 h-[2px]"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(197,160,89,0.4),transparent)' }} />

                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                      style={{ background: 'rgba(197,160,89,0.10)', border: '1px solid rgba(197,160,89,0.15)' }}>
                      <CreditCard size={20} color={BRAND.gold} />
                    </div>
                    <div>
                      <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em] mb-1">
                        ORDER SUMMARY
                      </h3>
                      <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.15em] uppercase">
                        Review your selection
                      </p>
                    </div>
                  </div>

                  {/* Plan display */}
                  <div className="flex items-center justify-between mb-6 p-5 rounded-2xl"
                    style={{ background: 'rgba(197,160,89,0.05)', border: '1px solid rgba(197,160,89,0.12)' }}>
                    <div>
                      <p className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.2em] uppercase mb-1">
                        Selected Plan
                      </p>
                      <p className="font-orbitron text-white font-bold text-[22px] leading-none mb-1">
                        {selectedPlan.duration}
                      </p>
                      <p className="font-rajdhani text-zinc-500 text-[11px] tracking-wide">
                        ₹{selectedPlan.perMonth.toLocaleString('en-IN')}/month
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.2em] uppercase mb-1">
                        Total Amount
                      </p>
                      <p className="font-orbitron font-extralight text-[42px] leading-none" style={{ color: BRAND.gold }}>
                        ₹{selectedPlan.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {selectedPlan.save && (
                    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl mb-6"
                      style={{ background: '#000000', border: '1px solid rgba(34,197,94,0.20)' }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(34,197,94,0.10)' }}>
                        <TrendingUp size={15} color="#22C55E" />
                      </div>
                      <span className="font-rajdhani text-green-400 text-[12px] font-bold tracking-[0.12em] uppercase">
                        You're saving {selectedPlan.save} vs monthly billing
                      </span>
                    </div>
                  )}

                  {/* What's included */}
                  <div className="space-y-2.5 mb-6">
                    {['All Premium Features Unlocked', '3 Device Access (Desktop · Laptop · Mobile)', 'Priority 24/7 Support', 'Auto Cloud Backup'].map(f => (
                      <div key={f} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.20)' }}>
                          <Check size={10} color="#22C55E" strokeWidth={3} />
                        </div>
                        <span className="font-rajdhani text-zinc-300 text-[12px] tracking-wide">{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-6" />

                  {/* Order ID */}
                  <div className="px-5 py-3 rounded-2xl mb-4"
                    style={{ background: '#000000', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.25em] uppercase mb-1">Order ID</p>
                    <p className="font-mono text-zinc-300 text-[12px]">{orderId}</p>
                  </div>

                  {/* UPI ID */}
                  <div className="flex items-center gap-4 px-5 py-4 rounded-2xl mb-6"
                    style={{ background: '#000000', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="flex-1 min-w-0">
                      <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.25em] uppercase mb-1">UPI ID</p>
                      <p className="font-mono text-white text-[13px] truncate">{upiId}</p>
                    </div>
                    <button onClick={handleCopy}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-rajdhani text-[11px] font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 flex-shrink-0"
                      style={{
                        background: copied ? 'rgba(34,197,94,0.10)' : 'rgba(197,160,89,0.10)',
                        border: `1px solid ${copied ? 'rgba(34,197,94,0.25)' : 'rgba(197,160,89,0.25)'}`,
                        color: copied ? '#22C55E' : BRAND.gold,
                      }}>
                      {copied ? <><CheckCircle size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
                    </button>
                  </div>

                  {/* CTA */}
                  <button onClick={handleVerify} disabled={verifying}
                    className="w-full py-4 rounded-2xl font-orbitron text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: verifying ? 'rgba(197,160,89,0.25)' : `linear-gradient(135deg,${BRAND.gold},${BRAND.goldLight})`,
                      color: '#000',
                      boxShadow: verifying ? 'none' : '0 8px 32px rgba(197,160,89,0.30)',
                    }}>
                    {verifying
                      ? <><Loader2 size={18} className="animate-spin" /> Verifying Payment...</>
                      : <><Shield size={18} /> I Have Paid — Activate Now</>}
                  </button>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent my-4" />

                  <div className="px-5 py-3 rounded-2xl text-center"
                    style={{ background: '#000000', border: '1px solid rgba(234,179,8,0.15)' }}>
                    <p className="font-rajdhani text-yellow-500/80 text-[11px] tracking-wide">
                      ⚠️ Demo mode · Production will use Razorpay SDK
                    </p>
                  </div>
                </div>
              </GlassPanel>
            </div>

            {/* Right — QR */}
            <div className="col-span-12 xl:col-span-5 space-y-6">
              <GlassPanel>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#C5A059] to-[#C5A059]/20" />
                    <div>
                      <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.15em]">
                        SCAN & PAY
                      </h3>
                      <p className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.15em] uppercase">
                        Any UPI app works
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center mb-6">
                    <FakeQR seed={qrSeed} />
                  </div>

                  <div className="text-center mb-6">
                    <p className="font-orbitron text-[#C5A059] font-extralight text-[36px] leading-none mb-1">
                      ₹{selectedPlan.price.toLocaleString('en-IN')}
                    </p>
                    <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.2em] uppercase">
                      {selectedPlan.duration} Plan
                    </p>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-5" />

                  {/* Steps */}
                  <div className="space-y-3">
                    {[
                      { n: '1', label: 'Open any UPI app', sub: 'GPay, PhonePe, Paytm, etc.' },
                      { n: '2', label: 'Scan the QR code',  sub: 'Point camera at QR above'  },
                      { n: '3', label: 'Click "I Have Paid"', sub: 'After completing payment'  },
                    ].map(({ n, label, sub }) => (
                      <div key={n} className="flex items-center gap-4 px-4 py-3.5 rounded-2xl"
                        style={{ background: '#000000', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-orbitron text-[12px] font-bold"
                          style={{ background: 'rgba(197,160,89,0.12)', color: BRAND.gold, border: '1px solid rgba(197,160,89,0.20)' }}>
                          {n}
                        </div>
                        <div>
                          <p className="font-rajdhani text-white text-[12px] font-bold tracking-[0.10em] uppercase">{label}</p>
                          <p className="font-rajdhani text-zinc-500 text-[10px] tracking-wide mt-0.5">{sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent my-4" />
                  <p className="font-rajdhani text-zinc-600 text-[10px] tracking-widest uppercase text-center">
                    Demo QR · Real Razorpay in production
                  </p>
                </div>
              </GlassPanel>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // SUCCESS STEP
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <Layout title="SUCCESS" onLogout={onLogout}>
      <div className="relative min-h-screen flex items-center justify-center p-8">
        <div className="fixed inset-0 z-0" style={{
          background: 'radial-gradient(ellipse at 50% 30%,rgba(34,197,94,0.05) 0%,transparent 60%), linear-gradient(180deg,rgba(0,0,0,0.95) 0%,#000 100%)',
        }} />

        <div className="relative z-10 w-full max-w-lg">
          <GlassPanel borderColor="rgba(34,197,94,0.20)" glow="rgba(34,197,94,0.06)">
            {/* Green top accent */}
            <div className="absolute top-0 left-10 right-10 h-[2px]"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(34,197,94,0.5),transparent)' }} />

            <div className="p-10 text-center">
              {/* Icon */}
              <div className="relative inline-flex items-center justify-center mb-8">
                <div className="w-32 h-32 rounded-full animate-pulse absolute"
                  style={{ background: 'rgba(34,197,94,0.06)' }} />
                <div className="w-24 h-24 rounded-full flex items-center justify-center relative"
                  style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.25)' }}>
                  <CheckCircle size={52} color="#22C55E" strokeWidth={2} />
                </div>
              </div>

              <p className="font-rajdhani text-green-400 text-[11px] tracking-[0.3em] uppercase font-bold mb-3">
                Payment Successful
              </p>
              <h2 className="font-orbitron text-white font-extrabold text-[28px] tracking-[0.15em] mb-2
                             bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                PREMIUM ACTIVATED
              </h2>
              <p className="font-rajdhani text-zinc-400 text-[13px] tracking-wide mb-8">
                Your subscription is now live and ready to use
              </p>

              {/* Details */}
              <div className="space-y-3 mb-8 text-left">
                {[
                  { label: 'Plan',          value: selectedPlan.duration,                              color: BRAND.gold  },
                  { label: 'Valid Until',   value: formatDate(addMonths(new Date(), selectedPlan.months)), color: '#22C55E' },
                  { label: 'Device Access', value: '3 Devices',                                        color: '#A855F7'  },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-center justify-between px-5 py-3.5 rounded-2xl"
                    style={{ background: '#000000', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <span className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.2em] uppercase font-semibold">
                      {label}
                    </span>
                    <span className="font-orbitron text-[13px] font-bold" style={{ color }}>{value}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => { window.location.href = '#/dashboard'; window.location.reload(); }}
                className="w-full py-4 rounded-2xl font-orbitron text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background: `linear-gradient(135deg,${BRAND.gold},${BRAND.goldLight})`,
                  color: '#000',
                  boxShadow: '0 8px 32px rgba(197,160,89,0.30)',
                }}>
                Go to Dashboard <ArrowRight size={18} />
              </button>
            </div>
          </GlassPanel>
        </div>
      </div>
    </Layout>
  );
};

export default AdminUpgrade;