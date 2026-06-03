import React, { useMemo, useState } from 'react';
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
} from 'lucide-react';

const BRAND = {
  name: 'GYMVERSE',
  gold: '#C5A059',
  goldLight: '#EAB308',
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
      background: '#000',
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
      className="w-60 h-60 rounded-2xl p-3"
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

const AdminUpgrade = ({ onLogout }) => {
  const nav = useNavigate();

  const [step, setStep] = useState('SELECT'); // SELECT | QR | SUCCESS
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [copied, setCopied] = useState(false);

  const upiId = 'gymverse@razorpay';
  const orderId = useMemo(() => `ORDER_${Date.now()}`, []);
  const qrSeed = useMemo(() => {
    // convert orderId to number-ish seed
    const n = orderId.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return n;
  }, [orderId]);

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
      // ignore
    }
  };

  const handleVerify = async () => {
    if (!selectedPlan) return;

    setVerifying(true);
    try {
      await new Promise((r) => setTimeout(r, 1600));

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
    } finally {
      setVerifying(false);
    }
  };

  return (
    <Layout title="UPGRADE" onLogout={onLogout}>
      <div
        className="min-h-screen p-6 md:p-8 lg:p-10"
        style={{ background: 'linear-gradient(180deg,#050505 0%,#0a0a0a 100%)' }}
      >
        <div className="max-w-6xl mx-auto space-y-6">

          {/* Header */}
          <GlassCard borderColor="rgba(197,160,89,0.15)">
            <div className="p-7 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(197,160,89,0.10)' }}
                >
                  <Crown size={22} color={BRAND.gold} />
                </div>

                <div>
                  <h1 className="font-orbitron text-white text-[18px] md:text-[22px] font-bold tracking-[0.15em]">
                    UPGRADE PLAN
                  </h1>
                  <p className="font-rajdhani text-zinc-400 text-[12px] tracking-[0.12em] uppercase mt-1">
                    Choose plan → Pay via QR (Demo)
                  </p>
                </div>
              </div>

              <button
                onClick={handleBack}
                className="px-4 py-2 rounded-xl font-rajdhani text-zinc-300 text-[12px] tracking-[0.12em] uppercase font-bold hover:opacity-80 transition"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <ArrowLeft size={14} />
                  Back
                </span>
              </button>
            </div>
          </GlassCard>

          {/* STEP: SELECT PLAN (Landing page wala plan cards UI) */}
          {step === 'SELECT' && (
            <GlassCard>
              <div className="p-8">
                <div className="text-center mb-8">
                  <p className="font-rajdhani text-zinc-500 text-[12px] tracking-[0.15em] uppercase">
                    Premium Plans
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                  {PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => handleSelectPlan(plan)}
                      className="relative p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 text-left"
                      style={{
                        background: plan.popular
                          ? 'rgba(197,160,89,0.03)'
                          : 'rgba(255,255,255,0.01)',
                        border: plan.popular
                          ? '1px solid rgba(197,160,89,0.30)'
                          : '1px solid rgba(255,255,255,0.04)',
                      }}
                    >
                      {plan.popular && (
                        <>
                          <div
                            className="absolute -top-px left-6 right-6 h-[2px]"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${BRAND.gold}, transparent)`,
                            }}
                          />
                          <div className="text-center mb-3">
                            <span
                              className="px-3 py-1 rounded-full font-rajdhani text-[9px] font-bold tracking-[0.18em] uppercase"
                              style={{
                                background: `${BRAND.gold}15`,
                                color: BRAND.gold,
                              }}
                            >
                              ★ Popular
                            </span>
                          </div>
                        </>
                      )}

                      <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.15em] uppercase text-center">
                        {plan.duration}
                      </p>

                      <div className="text-center my-3">
                        <span className="font-rajdhani text-zinc-600 text-[14px]">₹</span>
                        <span className="font-orbitron text-white text-[26px] font-bold">
                          {plan.price.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <p className="text-center font-rajdhani text-zinc-600 text-[10px] tracking-[0.1em] uppercase">
                        ₹{plan.perMonth.toLocaleString('en-IN')}/mo
                      </p>

                      {plan.save && (
                        <div className="text-center mt-2 mb-3">
                          <span
                            className="px-2.5 py-0.5 rounded-full font-rajdhani text-[9px] tracking-[0.12em] uppercase font-bold"
                            style={{
                              background: 'rgba(34,197,94,0.08)',
                              color: '#22C55E',
                              border: '1px solid rgba(34,197,94,0.15)',
                            }}
                          >
                            Save {plan.save}
                          </span>
                        </div>
                      )}

                      <div className="space-y-2 my-4">
                        {PLAN_FEATURES.slice(0, 4).map((f) => (
                          <div key={f} className="flex items-center gap-2">
                            <Check size={10} color={BRAND.gold} />
                            <span className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.04em]">
                              {f}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div
                        className="block w-full py-2.5 rounded-lg text-center font-rajdhani text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300"
                        style={
                          plan.popular
                            ? {
                                background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`,
                                color: '#000',
                              }
                            : {
                                background: `${BRAND.gold}06`,
                                color: BRAND.gold,
                                border: `1px solid ${BRAND.gold}15`,
                              }
                        }
                      >
                        Select
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>
          )}

          {/* STEP: QR */}
          {step === 'QR' && selectedPlan && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Summary */}
              <GlassCard borderColor="rgba(197,160,89,0.20)">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield size={18} color={BRAND.gold} />
                    <p className="font-orbitron text-white text-[13px] tracking-[0.15em] font-bold">
                      PAYMENT SUMMARY
                    </p>
                  </div>

                  <div
                    className="p-5 rounded-2xl"
                    style={{
                      background: 'rgba(197,160,89,0.06)',
                      border: '1px solid rgba(197,160,89,0.15)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.12em] uppercase">
                          Plan
                        </p>
                        <p className="font-orbitron text-white text-[16px] font-bold mt-1">
                          {selectedPlan.duration}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.12em] uppercase">
                          Amount
                        </p>
                        <p className="font-orbitron text-[#C5A059] text-[22px] font-bold mt-1">
                          ₹{selectedPlan.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.12em] uppercase">
                        Order
                      </p>
                      <p className="font-orbitron text-zinc-200 text-[12px] mt-1">
                        {orderId}
                      </p>
                    </div>
                  </div>

                  <div
                    className="mt-6 p-4 rounded-2xl flex items-center justify-between"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div>
                      <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.12em] uppercase">
                        UPI ID (Demo)
                      </p>
                      <p className="font-orbitron text-white text-[12px] mt-1">
                        {upiId}
                      </p>
                    </div>
                    <button
                      onClick={handleCopyUPI}
                      className="px-3 py-2 rounded-xl font-rajdhani text-[11px] font-bold tracking-[0.12em] uppercase flex items-center gap-2"
                      style={{
                        background: 'rgba(197,160,89,0.08)',
                        border: '1px solid rgba(197,160,89,0.18)',
                        color: BRAND.gold,
                      }}
                    >
                      <Copy size={14} />
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <button
                    onClick={handleVerify}
                    disabled={verifying}
                    className="w-full mt-6 py-4 rounded-2xl font-orbitron text-[11px] font-bold tracking-[0.18em] uppercase flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-60"
                    style={{
                      background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`,
                      color: '#000',
                    }}
                  >
                    {verifying ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Shield size={16} />
                        I HAVE PAID (DEMO)
                      </>
                    )}
                  </button>

                  <p className="font-rajdhani text-zinc-600 text-[11px] tracking-[0.12em] uppercase mt-4 text-center">
                    Demo flow (Razorpay QR later)
                  </p>
                </div>
              </GlassCard>

              {/* QR */}
              <GlassCard>
                <div className="p-8 text-center">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <QrCode size={18} color={BRAND.gold} />
                    <p className="font-orbitron text-white text-[13px] tracking-[0.15em] font-bold">
                      SCAN QR (FAKE)
                    </p>
                  </div>

                  <div className="flex justify-center mb-6">
                    <FakeQR seed={qrSeed} />
                  </div>

                  <p className="font-rajdhani text-zinc-400 text-[12px] tracking-[0.08em]">
                    This is a fake QR for demo. Production me Razorpay QR image yaha aayegi.
                  </p>
                </div>
              </GlassCard>
            </div>
          )}

          {/* STEP: SUCCESS */}
          {step === 'SUCCESS' && selectedPlan && (
            <GlassCard borderColor="rgba(34,197,94,0.20)">
              <div className="p-10 text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{
                    background: 'rgba(34,197,94,0.10)',
                    border: '2px solid rgba(34,197,94,0.25)',
                  }}
                >
                  <CheckCircle size={42} color="#22C55E" />
                </div>

                <h2 className="font-orbitron text-white text-[20px] font-bold tracking-[0.15em]">
                  PAYMENT SUCCESS
                </h2>

                <p className="font-rajdhani text-zinc-400 text-[13px] tracking-[0.08em] mt-3">
                  Plan activated:{' '}
                  <span style={{ color: BRAND.gold }}>
                    {selectedPlan.duration}
                  </span>
                </p>

                <div
                  className="mt-6 inline-block px-6 py-4 rounded-2xl text-left"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.12em] uppercase">
                    Expires On
                  </p>
                  <p className="font-orbitron text-white text-[16px] font-bold mt-1">
                    {formatDate(addMonths(new Date(), selectedPlan.months))}
                  </p>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => nav('/dashboard')}
                    className="px-8 py-4 rounded-2xl font-orbitron text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`,
                      color: '#000',
                    }}
                  >
                    Go to Dashboard
                  </button>
                </div>

                <p className="font-rajdhani text-zinc-600 text-[11px] tracking-[0.12em] uppercase mt-5">
                  Saved: <span style={{ color: BRAND.gold }}>gymverse_subscription</span>
                </p>
              </div>
            </GlassCard>
          )}

        </div>
      </div>
    </Layout>
  );
};

export default AdminUpgrade;