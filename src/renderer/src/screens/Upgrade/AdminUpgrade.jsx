import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  Crown,
  Check,
  QrCode,
  ArrowLeft,
  Shield,
  Loader2,
  Copy,
  CheckCircle,
  Sparkles,
  Zap,
  Star,
} from 'lucide-react';

const BRAND = {
  name: 'GYMVERSE',
  gold: '#C5A059',
  goldLight: '#EAB308',
  goldDark: '#8B7335',
};

const PLAN_FEATURES = [
  'All Features Unlocked',
  'Unlimited Members',
  'WhatsApp & SMS Alerts',
  'Analytics & Reports',
  'Auto Backup',
  'Priority Support',
];

const PLANS = [
  { id: '1m', duration: '1 Month', price: 1500, perMonth: 1500, popular: false, save: null, months: 1 },
  { id: '3m', duration: '3 Months', price: 4000, perMonth: 1333, popular: true, save: '11%', months: 3 },
  { id: '6m', duration: '6 Months', price: 7500, perMonth: 1250, popular: false, save: '17%', months: 6 },
  { id: '9m', duration: '9 Months', price: 10500, perMonth: 1167, popular: false, save: '22%', months: 9 },
  { id: '1y', duration: '1 Year', price: 13500, perMonth: 1125, popular: false, save: '25%', months: 12 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

// Seeded random so QR pattern stays same (no flicker)
function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const GlassCard = ({ children, className = '', borderColor = 'rgba(255,255,255,0.08)' }) => (
  <div
    className={`rounded-3xl overflow-hidden ${className}`}
    style={{
      background: 'rgba(10,10,10,0.90)',
      border: `1px solid ${borderColor}`,
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
    }}
  >
    {children}
  </div>
);

const FakeQR = ({ seed = 12345 }) => {
  const rand = useMemo(() => mulberry32(seed), [seed]);
  const blocks = useMemo(() => Array.from({ length: 14 * 14 }, () => rand() > 0.55), [rand]);

  return (
    <div
      className="w-60 h-60 rounded-2xl p-3 mx-auto"
      style={{ background: '#fff', border: `4px solid ${BRAND.gold}40` }}
    >
      <div className="grid grid-cols-14 gap-[2px] w-full h-full">
        {blocks.map((isBlack, i) => (
          <div key={i} style={{ background: isBlack ? '#000' : '#fff' }} />
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────────────────────────────────────────

const AdminUpgrade = ({ onLogout, adminData }) => {
  const nav = useNavigate();

  const [step, setStep] = useState('SELECT'); // SELECT | QR | SUCCESS
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [copied, setCopied] = useState(false);

  const upiId = 'gymverse@razorpay';
  const orderId = useMemo(() => `ORDER_${Date.now()}`, []);
  const qrSeed = useMemo(() => {
    const n = orderId.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return n;
  }, [orderId]);

  // Auto-scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Safe logout handler
  const handleLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout();
    } else {
      // Fallback logout
      localStorage.removeItem('gym_admin_logged_in');
      localStorage.removeItem('gym_admin_data');
      nav('/login');
    }
  };

  const handleBack = () => {
    if (step === 'QR') {
      setStep('SELECT');
      setSelectedPlan(null);
      return;
    }
    nav('/dashboard');
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setStep('QR');
  };

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = upiId;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (err) {
        console.error('Copy failed:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleVerify = async () => {
    if (!selectedPlan) return;

    setVerifying(true);
    try {
      await new Promise((r) => setTimeout(r, 1800));

      const now = new Date();
      const expiresAt = addMonths(now, selectedPlan.months);

      const subscription = {
        status: 'active',
        planId: selectedPlan.id,
        planLabel: selectedPlan.duration,
        price: selectedPlan.price,
        purchasedAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
        orderId,
      };

      localStorage.setItem('gymverse_subscription', JSON.stringify(subscription));
      setStep('SUCCESS');
    } catch (error) {
      console.error('Payment verification failed:', error);
    } finally {
      setVerifying(false);
    }
  };

  const handleGoToDashboard = () => {
    // Force page reload to ensure fresh state
    window.location.href = '#/dashboard';
    window.location.reload();
  };

  return (
    <Layout title="UPGRADE TO PREMIUM" onLogout={handleLogout}>
      <div
        className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-10"
        style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)' }}
      >
        {/* Background Effects */}
        <div
          className="fixed inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(197,160,89,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(197,160,89,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            zIndex: 0,
          }}
        />

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">

          {/* ═══════════════════════════════════════════════════════════════
              HEADER
          ═══════════════════════════════════════════════════════════════ */}
          <GlassCard borderColor="rgba(197,160,89,0.15)">
            <div className="p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND.gold}20, ${BRAND.gold}08)`,
                    border: `1px solid ${BRAND.gold}30`,
                  }}
                >
                  <Crown size={24} color={BRAND.gold} />
                </div>

                <div>
                  <h1 className="font-orbitron text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wider">
                    UPGRADE TO{' '}
                    <span style={{ color: BRAND.gold }}>PREMIUM</span>
                  </h1>
                  <p className="font-rajdhani text-zinc-500 text-xs sm:text-sm tracking-wider uppercase mt-1">
                    {step === 'SELECT' && '✨ Choose Your Perfect Plan'}
                    {step === 'QR' && '💳 Complete Payment'}
                    {step === 'SUCCESS' && '🎉 Activation Complete'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleBack}
                className="px-4 py-2.5 rounded-xl font-rajdhani text-zinc-300 text-xs tracking-wider uppercase font-bold hover:text-white hover:scale-105 transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.10)',
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <ArrowLeft size={14} />
                  {step === 'SELECT' ? 'Dashboard' : 'Back'}
                </span>
              </button>
            </div>
          </GlassCard>

          {/* ═══════════════════════════════════════════════════════════════
              STEP: SELECT PLAN
          ═══════════════════════════════════════════════════════════════ */}
          {step === 'SELECT' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Premium Benefits Banner */}
              <GlassCard borderColor="rgba(197,160,89,0.12)">
                <div className="p-6 sm:p-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{
                      background: `${BRAND.gold}10`,
                      border: `1px solid ${BRAND.gold}30`,
                    }}>
                      <Sparkles size={14} color={BRAND.gold} />
                      <span className="font-rajdhani text-[#C5A059] text-xs tracking-widest uppercase font-bold">
                        Premium Benefits
                      </span>
                    </div>
                    <h2 className="font-orbitron text-white text-xl sm:text-2xl font-bold tracking-wider mb-3">
                      Unlock Full Potential
                    </h2>
                    <p className="font-rajdhani text-zinc-400 text-sm tracking-wide max-w-2xl mx-auto">
                      Get access to all premium features and take your gym management to the next level
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {PLAN_FEATURES.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'rgba(197,160,89,0.04)',
                          border: '1px solid rgba(197,160,89,0.10)',
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `${BRAND.gold}15`,
                            border: `1px solid ${BRAND.gold}30`,
                          }}
                        >
                          <Check size={14} color={BRAND.gold} strokeWidth={3} />
                        </div>
                        <span className="font-rajdhani text-zinc-300 text-sm tracking-wide">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Plans Grid */}
              <GlassCard>
                <div className="p-6 sm:p-8">
                  <div className="text-center mb-8">
                    <h3 className="font-orbitron text-white text-lg font-bold tracking-wider mb-2">
                      Choose Your Plan
                    </h3>
                    <p className="font-rajdhani text-zinc-500 text-xs tracking-wider uppercase">
                      All plans include full features • Save more with longer commitments
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {PLANS.map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => handleSelectPlan(plan)}
                        className="relative group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl text-left"
                        style={{
                          background: plan.popular
                            ? 'rgba(197,160,89,0.06)'
                            : 'rgba(255,255,255,0.02)',
                          border: plan.popular
                            ? `2px solid ${BRAND.gold}40`
                            : '2px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        {/* Popular Badge */}
                        {plan.popular && (
                          <>
                            <div
                              className="absolute -top-px left-8 right-8 h-[3px] rounded-full"
                              style={{
                                background: `linear-gradient(90deg, transparent, ${BRAND.gold}, transparent)`,
                              }}
                            />
                            <div className="text-center mb-4">
                              <span
                                className="px-3 py-1.5 rounded-full font-rajdhani text-[10px] font-bold tracking-widest uppercase inline-flex items-center gap-1"
                                style={{
                                  background: `${BRAND.gold}20`,
                                  color: BRAND.gold,
                                  border: `1px solid ${BRAND.gold}40`,
                                }}
                              >
                                <Star size={10} fill={BRAND.gold} />
                                Most Popular
                              </span>
                            </div>
                          </>
                        )}

                        {/* Duration */}
                        <p className="font-rajdhani text-zinc-400 text-xs tracking-widest uppercase text-center mb-1">
                          {plan.duration}
                        </p>

                        {/* Price */}
                        <div className="text-center my-4">
                          <div className="flex items-start justify-center gap-1">
                            <span className="font-rajdhani text-zinc-500 text-base mt-1">₹</span>
                            <span className="font-orbitron text-white text-3xl font-bold">
                              {plan.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <p className="font-rajdhani text-zinc-600 text-[11px] tracking-wider uppercase mt-1">
                            ₹{plan.perMonth.toLocaleString('en-IN')}/month
                          </p>
                        </div>

                        {/* Save Badge */}
                        {plan.save && (
                          <div className="text-center mb-4">
                            <span
                              className="px-3 py-1 rounded-full font-rajdhani text-[10px] tracking-wider uppercase font-bold"
                              style={{
                                background: 'rgba(34,197,94,0.10)',
                                color: '#22C55E',
                                border: '1px solid rgba(34,197,94,0.20)',
                              }}
                            >
                              💰 Save {plan.save}
                            </span>
                          </div>
                        )}

                        {/* Features Preview */}
                        <div className="space-y-2.5 my-5 min-h-[100px]">
                          {PLAN_FEATURES.slice(0, 3).map((f) => (
                            <div key={f} className="flex items-start gap-2">
                              <Check size={12} color={BRAND.gold} className="flex-shrink-0 mt-0.5" strokeWidth={3} />
                              <span className="font-rajdhani text-zinc-400 text-[11px] leading-relaxed tracking-wide">
                                {f}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <div
                          className="w-full py-3 rounded-xl text-center font-rajdhani text-xs font-bold tracking-widest uppercase transition-all duration-300 group-hover:scale-105"
                          style={
                            plan.popular
                              ? {
                                  background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`,
                                  color: '#000',
                                  boxShadow: `0 4px 20px ${BRAND.gold}30`,
                                }
                              : {
                                  background: `${BRAND.gold}08`,
                                  color: BRAND.gold,
                                  border: `1px solid ${BRAND.gold}20`,
                                }
                          }
                        >
                          Select Plan →
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{
                      background: 'rgba(34,197,94,0.06)',
                      border: '1px solid rgba(34,197,94,0.15)',
                    }}>
                      <Shield size={14} color="#22C55E" />
                      <span className="font-rajdhani text-green-400 text-xs tracking-wide font-bold">
                        30-Day Money Back Guarantee
                      </span>
                    </div>
                    
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{
                      background: `${BRAND.gold}08`,
                      border: `1px solid ${BRAND.gold}20`,
                    }}>
                      <CheckCircle size={14} color={BRAND.gold} />
                      <span className="font-rajdhani text-xs tracking-wide font-bold" style={{ color: BRAND.gold }}>
                        Secure Payment Gateway
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {/* QR & SUCCESS steps remain the same as before... */}
          {/* Copy the QR and SUCCESS sections from the previous code */}

          {step === 'QR' && selectedPlan && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
              {/* Payment Summary */}
              <GlassCard borderColor="rgba(197,160,89,0.20)">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${BRAND.gold}15`,
                        border: `1px solid ${BRAND.gold}30`,
                      }}
                    >
                      <Shield size={18} color={BRAND.gold} />
                    </div>
                    <p className="font-orbitron text-white text-sm tracking-wider font-bold uppercase">
                      Payment Summary
                    </p>
                  </div>

                  <div
                    className="p-6 rounded-2xl mb-6"
                    style={{
                      background: 'rgba(197,160,89,0.06)',
                      border: '1px solid rgba(197,160,89,0.15)',
                    }}
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <p className="font-rajdhani text-zinc-500 text-xs tracking-wider uppercase mb-1">
                          Selected Plan
                        </p>
                        <p className="font-orbitron text-white text-lg font-bold">
                          {selectedPlan.duration}
                        </p>
                        <p className="font-rajdhani text-zinc-600 text-xs tracking-wide mt-1">
                          ₹{selectedPlan.perMonth}/month
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-rajdhani text-zinc-500 text-xs tracking-wider uppercase mb-1">
                          Total Amount
                        </p>
                        <p className="font-orbitron text-2xl font-bold" style={{ color: BRAND.gold }}>
                          ₹{selectedPlan.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    {selectedPlan.save && (
                      <div
                        className="px-4 py-2 rounded-xl text-center"
                        style={{
                          background: 'rgba(34,197,94,0.10)',
                          border: '1px solid rgba(34,197,94,0.20)',
                        }}
                      >
                        <span className="font-rajdhani text-green-400 text-xs tracking-wide font-bold">
                          🎉 You're saving {selectedPlan.save}!
                        </span>
                      </div>
                    )}
                  </div>

                  <div
                    className="p-4 rounded-xl mb-6"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <p className="font-rajdhani text-zinc-500 text-[10px] tracking-widest uppercase mb-1">
                      Order ID
                    </p>
                    <p className="font-mono text-zinc-300 text-xs">
                      {orderId}
                    </p>
                  </div>

                  <div
                    className="p-4 rounded-xl flex items-center justify-between gap-3 mb-6"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.10)',
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-rajdhani text-zinc-500 text-[10px] tracking-widest uppercase mb-1">
                        UPI ID (Demo)
                      </p>
                      <p className="font-mono text-white text-sm truncate">
                        {upiId}
                      </p>
                    </div>
                    <button
                      onClick={handleCopyUPI}
                      className="px-4 py-2 rounded-xl font-rajdhani text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-all duration-300 hover:scale-105 flex-shrink-0"
                      style={{
                        background: copied ? 'rgba(34,197,94,0.15)' : `${BRAND.gold}12`,
                        border: `1px solid ${copied ? 'rgba(34,197,94,0.30)' : BRAND.gold + '25'}`,
                        color: copied ? '#22C55E' : BRAND.gold,
                      }}
                    >
                      {copied ? (
                        <>
                          <CheckCircle size={14} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={handleVerify}
                    disabled={verifying}
                    className="w-full py-4 rounded-2xl font-orbitron text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: verifying
                        ? 'rgba(197,160,89,0.30)'
                        : `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`,
                      color: '#000',
                      boxShadow: verifying ? 'none' : `0 10px 40px ${BRAND.gold}40`,
                    }}
                  >
                    {verifying ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Shield size={18} />
                        I Have Paid (Demo)
                      </>
                    )}
                  </button>

                  <div
                    className="mt-5 p-4 rounded-xl"
                    style={{
                      background: 'rgba(234,179,8,0.08)',
                      border: '1px solid rgba(234,179,8,0.20)',
                    }}
                  >
                    <p className="font-rajdhani text-yellow-400 text-xs tracking-wide text-center">
                      ⚠️ Demo mode • Production will use Razorpay
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="p-6 sm:p-8 h-full flex flex-col">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <QrCode size={18} color={BRAND.gold} />
                    <p className="font-orbitron text-white text-sm tracking-wider font-bold uppercase">
                      Scan QR Code
                    </p>
                  </div>

                  <div className="flex-1 flex items-center justify-center py-8">
                    <FakeQR seed={qrSeed} />
                  </div>

                  <div
                    className="p-5 rounded-2xl text-center"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <p className="font-rajdhani text-zinc-400 text-sm tracking-wide leading-relaxed">
                      Demo QR • Real Razorpay QR in production
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {step === 'SUCCESS' && selectedPlan && (
            <GlassCard borderColor="rgba(34,197,94,0.25)">
              <div className="p-8 sm:p-12 text-center animate-fadeIn">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce"
                  style={{
                    background: 'rgba(34,197,94,0.12)',
                    border: '3px solid rgba(34,197,94,0.30)',
                    boxShadow: '0 0 60px rgba(34,197,94,0.2)',
                  }}
                >
                  <CheckCircle size={48} color="#22C55E" strokeWidth={2.5} />
                </div>

                <h2 className="font-orbitron text-white text-2xl sm:text-3xl font-bold tracking-wider mb-4">
                  PAYMENT SUCCESSFUL! 🎉
                </h2>

                <p className="font-rajdhani text-zinc-400 text-base tracking-wide mb-2">
                  Your premium subscription is now active
                </p>

                <p className="font-rajdhani text-lg tracking-wide mb-8">
                  Plan:{' '}
                  <span className="font-bold" style={{ color: BRAND.gold }}>
                    {selectedPlan.duration}
                  </span>
                </p>

                <div
                  className="inline-block px-8 py-5 rounded-2xl mb-8"
                  style={{
                    background: 'rgba(197,160,89,0.08)',
                    border: '1px solid rgba(197,160,89,0.20)',
                  }}
                >
                  <p className="font-rajdhani text-zinc-500 text-xs tracking-widest uppercase mb-2">
                    Valid Until
                  </p>
                  <p className="font-orbitron text-white text-xl font-bold">
                    {formatDate(addMonths(new Date(), selectedPlan.months))}
                  </p>
                </div>

                <button
                  onClick={handleGoToDashboard}
                  className="px-10 py-4 rounded-2xl font-orbitron text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`,
                    color: '#000',
                    boxShadow: `0 10px 40px ${BRAND.gold}40`,
                  }}
                >
                  Go to Dashboard →
                </button>
              </div>
            </GlassCard>
          )}

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </Layout>
  );
};

export default AdminUpgrade;