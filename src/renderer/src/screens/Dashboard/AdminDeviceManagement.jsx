import React, { useState, useCallback } from 'react';
import Layout from '../../components/shared/Layout';
import {
  Monitor,
  Laptop,
  Smartphone,
  Shield,
  Crown,
  Calendar,
  HardDrive,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Activity,
  X,
  Loader2,
  WifiOff,
} from 'lucide-react';

// ─── Constants ───────────────────────────────────────────────────────────────

const COLORS = {
  gold: {
    base: '#C5A059',
    bg08: 'rgba(197,160,89,0.08)',
    bg10: 'rgba(197,160,89,0.10)',
    bg12: 'rgba(197,160,89,0.12)',
    bg15: 'rgba(197,160,89,0.15)',
    bg20: 'rgba(197,160,89,0.20)',
    bg25: 'rgba(197,160,89,0.25)',
    border15: 'rgba(197,160,89,0.15)',
    border20: 'rgba(197,160,89,0.20)',
    border25: 'rgba(197,160,89,0.25)',
  },
  red: {
    base: '#EF4444',
    bg08: 'rgba(239,68,68,0.08)',
    bg10: 'rgba(239,68,68,0.10)',
    bg15: 'rgba(239,68,68,0.15)',
    border20: 'rgba(239,68,68,0.20)',
  },
  green: {
    base: '#22C55E',
    bg10: 'rgba(34,197,94,0.10)',
    border20: 'rgba(34,197,94,0.20)',
  },
  white: {
    bg04: 'rgba(255,255,255,0.04)',
    bg05: 'rgba(255,255,255,0.05)',
    border08: 'rgba(255,255,255,0.08)',
    border15: 'rgba(255,255,255,0.15)',
  },
};

const SUBSCRIPTION = {
  plan: 'Premium',
  maxDevices: 5,
  expiresAt: '15 Dec 2026',
};

const INITIAL_DEVICES = [
  {
    id: 1,
    name: 'Dell Inspiron',
    type: 'desktop',
    os: 'Windows 11 Pro',
    lastActive: '2 min ago',
    current: true,
  },
  {
    id: 2,
    name: 'MacBook Pro',
    type: 'laptop',
    os: 'macOS Sonoma',
    lastActive: 'Yesterday',
    current: false,
  },
  {
    id: 3,
    name: 'Samsung Galaxy S24',
    type: 'mobile',
    os: 'Android 14',
    lastActive: '3 days ago',
    current: false,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getDeviceIcon = (type) => {
  switch (type) {
    case 'desktop': return Monitor;
    case 'laptop':  return Laptop;
    case 'mobile':  return Smartphone;
    default:        return HardDrive;
  }
};

// ─── GlassCard ───────────────────────────────────────────────────────────────

const GlassCard = ({
  children,
  className = '',
  borderColor = COLORS.white.border08,
  hover = false,
  style = {},
}) => (
  <div
    className={`
      relative overflow-hidden rounded-3xl
      ${hover ? 'hover:scale-[1.01] transition-all duration-300' : ''}
      ${className}
    `}
    style={{
      background: '#000000',
      border: `1px solid ${borderColor}`,
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      ...style,
    }}
  >
    {children}
  </div>
);

// ─── Toast ───────────────────────────────────────────────────────────────────

const Toast = ({ message, type = 'success', visible }) => {
  const isSuccess = type === 'success';

  return (
    <div
      className={`
        fixed top-6 right-6 z-[9999]
        flex items-center gap-3 px-5 py-4 rounded-2xl
        transition-all duration-500
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}
      style={{
        background: '#000000',
        border: `1px solid ${isSuccess ? COLORS.green.border20 : COLORS.red.border20}`,
        boxShadow: `0 8px 32px ${isSuccess ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'}`,
      }}
      role="alert"
      aria-live="polite"
    >
      {isSuccess ? (
        <CheckCircle size={18} color={COLORS.green.base} />
      ) : (
        <AlertTriangle size={18} color={COLORS.red.base} />
      )}
      <span className="font-rajdhani text-white text-[13px] tracking-[0.1em] uppercase">
        {message}
      </span>
    </div>
  );
};

// ─── Confirm Modal ────────────────────────────────────────────────────────────

const ConfirmModal = ({ isOpen, deviceName, onConfirm, onCancel, loading }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: '#000000',
          border: `1px solid ${COLORS.red.border20}`,
          boxShadow: '0 24px 80px rgba(0,0,0,0.8)',
        }}
      >
        {/* Modal Header */}
        <div
          className="p-6 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${COLORS.white.border08}` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: COLORS.red.bg10 }}
            >
              <Trash2 size={18} color={COLORS.red.base} />
            </div>
            <h2
              id="confirm-title"
              className="font-orbitron text-white text-[14px] tracking-[0.15em]"
            >
              REMOVE DEVICE
            </h2>
          </div>

          <button
            onClick={onCancel}
            disabled={loading}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
            style={{
              background: COLORS.white.bg04,
              border: `1px solid ${COLORS.white.border08}`,
            }}
          >
            <X size={16} color="#71717A" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <p className="font-rajdhani text-zinc-300 text-[14px] tracking-[0.08em] leading-relaxed mb-2">
            You are about to remove:
          </p>
          <p className="font-orbitron text-[#C5A059] text-[15px] font-bold mb-5">
            {deviceName}
          </p>
          <p className="font-rajdhani text-zinc-400 text-[13px] tracking-[0.08em] leading-relaxed">
            This will immediately revoke access and sign the device out of the
            system. This action cannot be undone.
          </p>
        </div>

        {/* Modal Footer */}
        <div
          className="p-6 flex items-center gap-3"
          style={{ borderTop: `1px solid ${COLORS.white.border08}` }}
        >
          {/* Cancel */}
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-3 rounded-xl font-rajdhani text-zinc-300 text-[12px] tracking-[0.15em] uppercase font-bold transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: COLORS.white.bg04,
              border: `1px solid ${COLORS.white.border08}`,
            }}
          >
            Cancel
          </button>

          {/* Confirm */}
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 rounded-xl font-rajdhani text-red-400 text-[12px] tracking-[0.15em] uppercase font-bold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              background: COLORS.red.bg08,
              border: `1px solid ${COLORS.red.border20}`,
            }}
          >
            {loading ? (
              <>
                <Loader2 size={14} color="#EF4444" className="animate-spin" />
                <span>Removing...</span>
              </>
            ) : (
              <>
                <Trash2 size={14} color="#EF4444" />
                <span>Remove Device</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyState = () => (
  <GlassCard borderColor={COLORS.white.border08}>
    <div className="p-12 flex flex-col items-center justify-center text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: COLORS.white.bg04 }}
      >
        <WifiOff size={28} color="#52525B" />
      </div>
      <h3 className="font-orbitron text-zinc-500 text-[13px] tracking-[0.18em] mb-2">
        NO ADDITIONAL DEVICES
      </h3>
      <p className="font-rajdhani text-zinc-600 text-[12px] tracking-[0.1em] uppercase">
        Only your current device is registered
      </p>
    </div>
  </GlassCard>
);

// ─── Error State ──────────────────────────────────────────────────────────────

const ErrorBanner = ({ message, onRetry }) => (
  <GlassCard borderColor={COLORS.red.border20}>
    <div className="p-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <AlertTriangle size={18} color={COLORS.red.base} />
        <span className="font-rajdhani text-red-400 text-[13px] tracking-[0.1em] uppercase">
          {message}
        </span>
      </div>
      <button
        onClick={onRetry}
        className="font-rajdhani text-[#C5A059] text-[12px] tracking-[0.12em] uppercase font-bold underline underline-offset-4 hover:opacity-70 transition-opacity"
      >
        Retry
      </button>
    </div>
  </GlassCard>
);

// ─── DeviceCard ───────────────────────────────────────────────────────────────

const DeviceCard = ({ device, onRemoveClick, removing }) => {
  const Icon = getDeviceIcon(device.type);
  const isRemoving = removing === device.id;

  return (
    <GlassCard
      hover={!isRemoving}
      className={`group transition-opacity duration-300 ${isRemoving ? 'opacity-50' : 'opacity-100'}`}
      borderColor={device.current ? COLORS.gold.border25 : COLORS.white.border08}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">

          {/* Left — Icon + Info */}
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: device.current ? COLORS.gold.bg12 : COLORS.white.bg04,
              }}
            >
              {isRemoving ? (
                <Loader2 size={24} color="#EF4444" className="animate-spin" />
              ) : (
                <Icon
                  size={24}
                  color={device.current ? COLORS.gold.base : '#ffffff'}
                  aria-hidden="true"
                />
              )}
            </div>

            <div>
              <h3 className="font-orbitron text-white text-[15px] font-bold tracking-wide">
                {device.name}
              </h3>

              <p className="font-rajdhani text-zinc-400 text-[12px] uppercase tracking-[0.15em] mt-1">
                {device.os}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <Activity
                  size={12}
                  color={COLORS.green.base}
                  aria-hidden="true"
                />
                <span className="font-rajdhani text-zinc-300 text-[11px] tracking-[0.1em] uppercase">
                  Last Active: {device.lastActive}
                </span>
              </div>
            </div>
          </div>

          {/* Right — Badge or Remove Button */}
          {device.current ? (
            <div
              className="px-3 py-2 rounded-xl flex items-center gap-2 flex-shrink-0"
              style={{
                background: COLORS.green.bg10,
                border: `1px solid ${COLORS.green.border20}`,
              }}
              aria-label="This is your current device"
            >
              <CheckCircle size={14} color={COLORS.green.base} aria-hidden="true" />
              <span className="font-rajdhani text-green-400 text-[10px] font-bold tracking-[0.15em] uppercase">
                Current Device
              </span>
            </div>
          ) : (
            <button
              onClick={() => onRemoveClick(device)}
              disabled={isRemoving}
              aria-label={`Remove device ${device.name}`}
              className="px-4 py-2 rounded-xl flex items-center gap-2 flex-shrink-0 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                background: COLORS.red.bg08,
                border: `1px solid ${COLORS.red.border20}`,
              }}
            >
              {isRemoving ? (
                <Loader2 size={14} color="#EF4444" className="animate-spin" />
              ) : (
                <Trash2 size={14} color="#EF4444" aria-hidden="true" />
              )}
              <span className="font-rajdhani text-red-400 text-[11px] font-bold tracking-[0.12em] uppercase">
                {isRemoving ? 'Removing...' : 'Remove Device'}
              </span>
            </button>
          )}

        </div>
      </div>
    </GlassCard>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const AdminDeviceManagement = ({ onLogout }) => {

  const [devices, setDevices]           = useState(INITIAL_DEVICES);
  const [confirmDevice, setConfirmDevice] = useState(null);   // device object to confirm
  const [removingId, setRemovingId]     = useState(null);     // id being removed
  const [error, setError]               = useState(null);
  const [toast, setToast]               = useState({ visible: false, message: '', type: 'success' });

  // ── Toast Helper ────────────────────────────────────────────────────────────

  const showToast = useCallback((message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3500);
  }, []);

  // ── Remove Flow ─────────────────────────────────────────────────────────────

  const handleRemoveClick = useCallback((device) => {
    setConfirmDevice(device);
    setError(null);
  }, []);

  const handleConfirmRemove = useCallback(async () => {
    if (!confirmDevice) return;

    const id = confirmDevice.id;
    const name = confirmDevice.name;

    setRemovingId(id);
    setError(null);

    try {
      // ── Simulate API call ──────────────────────────────────────────────────
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate occasional failure — remove this in production
          // Math.random() > 0.2 ? resolve() : reject(new Error('Server error'));
          resolve();
        }, 1200);
      });

      setDevices((prev) => prev.filter((d) => d.id !== id));
      setConfirmDevice(null);
      showToast(`${name} removed successfully`, 'success');

    } catch {
      setError('Failed to remove device. Please try again.');
      setConfirmDevice(null);
      showToast('Failed to remove device', 'error');
    } finally {
      setRemovingId(null);
    }
  }, [confirmDevice, showToast]);

  const handleCancelRemove = useCallback(() => {
    if (removingId) return; // prevent cancel while loading
    setConfirmDevice(null);
  }, [removingId]);

  const handleRetry = useCallback(() => {
    setError(null);
  }, []);

  // ── Derived State ────────────────────────────────────────────────────────────

  const usagePercent = (devices.length / SUBSCRIPTION.maxDevices) * 100;
  const slotsAvailable = SUBSCRIPTION.maxDevices - devices.length;
  const nonCurrentDevices = devices.filter((d) => !d.current);

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <Layout title="DEVICE MANAGEMENT" onLogout={onLogout}>

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={!!confirmDevice}
        deviceName={confirmDevice?.name ?? ''}
        loading={removingId === confirmDevice?.id}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
      />

      <div
        className="min-h-screen p-6 md:p-8 lg:p-10"
        style={{
          background: 'linear-gradient(180deg,#050505 0%,#0a0a0a 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto space-y-6">

          {/* ── HEADER ──────────────────────────────────────────────────────── */}

          <GlassCard borderColor={COLORS.gold.border15}>
            <div className="p-8">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: COLORS.gold.bg10 }}
                >
                  <Shield size={26} color={COLORS.gold.base} aria-hidden="true" />
                </div>

                <div>
                  <h1 className="font-orbitron text-white text-[26px] font-bold tracking-[0.15em]">
                    DEVICE MANAGEMENT
                  </h1>
                  <p className="font-rajdhani text-zinc-400 text-[12px] uppercase tracking-[0.15em] mt-1">
                    Manage your registered devices
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* ── ERROR BANNER ─────────────────────────────────────────────────── */}

          {error && (
            <ErrorBanner message={error} onRetry={handleRetry} />
          )}

          {/* ── SUBSCRIPTION CARD ────────────────────────────────────────────── */}

          <GlassCard borderColor={COLORS.gold.border20}>
            <div className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                {/* Plan Info */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Crown size={22} color={COLORS.gold.base} aria-hidden="true" />
                    <span className="font-orbitron text-[#C5A059] text-[13px] tracking-[0.18em] font-bold uppercase">
                      Subscription
                    </span>
                  </div>

                  <h2 className="font-orbitron text-white text-[34px] font-bold">
                    {SUBSCRIPTION.plan}
                  </h2>

                  <div className="flex items-center gap-2 mt-4">
                    <Calendar size={16} color="#A1A1AA" aria-hidden="true" />
                    <span className="font-rajdhani text-zinc-300 tracking-[0.12em] uppercase text-[12px]">
                      Active Until : {SUBSCRIPTION.expiresAt}
                    </span>
                  </div>
                </div>

                {/* Usage Bar */}
                <div className="min-w-[320px]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-rajdhani text-zinc-400 text-[12px] uppercase tracking-[0.12em]">
                      Devices Used
                    </span>
                    <span className="font-orbitron text-[#C5A059] text-[16px] font-bold">
                      {devices.length} / {SUBSCRIPTION.maxDevices}
                    </span>
                  </div>

                  <div
                    className="h-3 rounded-full overflow-hidden"
                    style={{ background: COLORS.white.bg05 }}
                    role="progressbar"
                    aria-valuenow={devices.length}
                    aria-valuemin={0}
                    aria-valuemax={SUBSCRIPTION.maxDevices}
                    aria-label="Device slots used"
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${usagePercent}%`,
                        background: 'linear-gradient(90deg,#C5A059,#EAB308)',
                      }}
                    />
                  </div>

                  <p className="font-rajdhani text-zinc-500 text-[11px] uppercase tracking-[0.12em] mt-3">
                    {slotsAvailable} Device Slot{slotsAvailable !== 1 ? 's' : ''} Available
                  </p>
                </div>

              </div>
            </div>
          </GlassCard>

          {/* ── REGISTERED DEVICES ───────────────────────────────────────────── */}

          <div>

            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-orbitron text-white text-[18px] tracking-[0.15em]">
                REGISTERED DEVICES
              </h2>

              <div
                className="px-4 py-2 rounded-xl"
                style={{
                  background: COLORS.gold.bg08,
                  border: `1px solid ${COLORS.gold.border15}`,
                }}
                aria-label={`${devices.length} device${devices.length !== 1 ? 's' : ''} registered`}
              >
                <span className="font-orbitron text-[#C5A059] text-[12px] font-bold">
                  {devices.length}
                </span>
              </div>
            </div>

            {/* Device List */}
            <div className="space-y-4">
              {devices.map((device) => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  onRemoveClick={handleRemoveClick}
                  removing={removingId}
                />
              ))}

              {/* Empty State — shown when only current device remains */}
              {nonCurrentDevices.length === 0 && (
                <EmptyState />
              )}
            </div>

          </div>

          {/* ── SECURITY NOTICE ──────────────────────────────────────────────── */}

          <GlassCard borderColor={COLORS.red.bg15}>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: COLORS.red.bg10 }}
                >
                  <AlertTriangle size={22} color={COLORS.red.base} aria-hidden="true" />
                </div>

                <div>
                  <h3 className="font-orbitron text-red-400 text-[13px] tracking-[0.15em] mb-2">
                    SECURITY NOTICE
                  </h3>
                  <p className="font-rajdhani text-zinc-300 text-[13px] leading-relaxed tracking-[0.08em]">
                    Removing a device will immediately revoke access and sign that
                    device out from the system. This action helps protect your account
                    and subscription license and{' '}
                    <span className="text-red-400 font-bold">cannot be undone</span>.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

        </div>
      </div>
    </Layout>
  );
};

export default AdminDeviceManagement;