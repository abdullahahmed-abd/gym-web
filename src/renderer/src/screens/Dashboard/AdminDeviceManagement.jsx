// AdminDeviceManagement.jsx - DASHBOARD-MATCHING UI
import React, { useState, useCallback } from 'react';
import Layout from '../../components/shared/Layout';
import {
  Monitor, Laptop, Smartphone, Shield, Crown, Calendar,
  HardDrive, Trash2, CheckCircle, AlertTriangle, Activity,
  X, Loader2, WifiOff, ChevronRight, Plus, Lock,
  Users, Bell, BarChart3,
} from 'lucide-react';

const GOLD      = '#C5A059';
const GOLD_L    = '#EAB308';
const MAX_DEV   = 3;

const SUB = { plan: 'Premium', maxDevices: MAX_DEV, expiresAt: '15 Dec 2026' };

const INIT_DEVICES = [
  { id: 1, name: 'Dell Inspiron',      type: 'desktop', os: 'Windows 11 Pro', lastActive: '2 min ago',  current: true  },
  { id: 2, name: 'MacBook Pro',        type: 'laptop',  os: 'macOS Sonoma',   lastActive: 'Yesterday',  current: false },
  { id: 3, name: 'Samsung Galaxy S24', type: 'mobile',  os: 'Android 14',     lastActive: '3 days ago', current: false },
];

const getIcon = t => ({ desktop: Monitor, laptop: Laptop, mobile: Smartphone }[t] || HardDrive);

// ── GlassPanel (identical to dashboard) ──────────────────────────────────────
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

// ── Toast ─────────────────────────────────────────────────────────────────────
const Toast = ({ message, type, visible }) => (
  <div className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-500
    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
    style={{
      background: '#000000',
      border: `1px solid ${type === 'success' ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
      boxShadow: `0 8px 32px ${type === 'success' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)'}`,
    }}>
    {type === 'success'
      ? <CheckCircle size={17} color="#22C55E" />
      : <AlertTriangle size={17} color="#EF4444" />}
    <span className="font-rajdhani text-white text-[12px] tracking-[0.12em] uppercase font-bold">
      {message}
    </span>
  </div>
);

// ── Confirm Modal ─────────────────────────────────────────────────────────────
const ConfirmModal = ({ isOpen, deviceName, onConfirm, onCancel, loading }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{ background: '#000000', border: '1px solid rgba(239,68,68,0.22)', boxShadow: '0 24px 80px rgba(0,0,0,0.8)' }}>

        <div className="p-6 flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.18)' }}>
              <Trash2 size={18} color="#EF4444" />
            </div>
            <div>
              <h2 className="font-orbitron text-white text-[14px] font-bold tracking-[0.15em]">REMOVE DEVICE</h2>
              <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">This cannot be undone</p>
            </div>
          </div>
          <button onClick={onCancel} disabled={loading}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <X size={15} color="#71717A" />
          </button>
        </div>

        <div className="p-6">
          <div className="px-5 py-4 rounded-2xl mb-4"
            style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)' }}>
            <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.15em] uppercase mb-1">Removing Device</p>
            <p className="font-orbitron text-red-400 text-[16px] font-bold">{deviceName}</p>
          </div>
          <p className="font-rajdhani text-zinc-400 text-[13px] tracking-wide leading-relaxed">
            This will immediately revoke access and sign the device out.
            <span className="text-red-400 font-bold"> Cannot be undone.</span>
          </p>
        </div>

        <div className="p-6 flex gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <button onClick={onCancel} disabled={loading}
            className="flex-1 py-3 rounded-2xl font-rajdhani text-zinc-300 text-[12px] tracking-[0.15em] uppercase font-bold transition-all duration-300 hover:scale-[1.01] hover:text-white"
            style={{ background: '#000000', border: '1px solid rgba(255,255,255,0.10)' }}>
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 py-3 rounded-2xl font-rajdhani text-red-400 text-[12px] tracking-[0.15em] uppercase font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.20)' }}>
            {loading
              ? <><Loader2 size={14} color="#EF4444" className="animate-spin" /> Removing...</>
              : <><Trash2 size={14} color="#EF4444" /> Remove Device</>}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── DeviceCard ────────────────────────────────────────────────────────────────
const DeviceCard = ({ device, onRemove, removing }) => {
  const Icon      = getIcon(device.type);
  const isRemoving = removing === device.id;
  const typeLabel  = { desktop: 'Desktop', laptop: 'Laptop', mobile: 'Mobile' }[device.type] || 'Device';

  return (
    <GlassPanel
      hover={!isRemoving}
      className={`group transition-opacity duration-300 ${isRemoving ? 'opacity-40' : ''}`}
      borderColor={device.current ? 'rgba(197,160,89,0.25)' : 'rgba(255,255,255,0.08)'}
      glow={device.current ? 'rgba(197,160,89,0.05)' : undefined}
    >
      {/* Gold top accent for current */}
      {device.current && (
        <div className="absolute top-0 left-10 right-10 h-[2px]"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(197,160,89,0.4),transparent)' }} />
      )}

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">

          {/* Left */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: device.current ? 'rgba(197,160,89,0.10)' : 'rgba(255,255,255,0.04)',
                  border: device.current ? '1px solid rgba(197,160,89,0.20)' : '1px solid rgba(255,255,255,0.08)',
                }}>
                {isRemoving
                  ? <Loader2 size={24} color="#EF4444" className="animate-spin" />
                  : <Icon size={24} color={device.current ? GOLD : '#a1a1aa'} />}
              </div>
              {device.current && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: '#000', border: '2px solid rgba(34,197,94,0.40)' }}>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-orbitron text-white font-bold text-[15px] tracking-wide">{device.name}</h3>
                <span className="px-2 py-0.5 rounded-lg font-rajdhani text-[9px] font-bold tracking-widest uppercase"
                  style={{ background: 'rgba(255,255,255,0.04)', color: '#52525B', border: '1px solid rgba(255,255,255,0.07)' }}>
                  {typeLabel}
                </span>
              </div>
              <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.15em] uppercase mb-2">{device.os}</p>
              <div className="flex items-center gap-2">
                <Activity size={11} color="#22C55E" />
                <span className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.08em] uppercase">
                  {device.lastActive}
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          {device.current ? (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-shrink-0"
              style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }}>
              <CheckCircle size={13} color="#22C55E" />
              <span className="font-rajdhani text-green-400 text-[10px] font-bold tracking-[0.15em] uppercase">
                This Device
              </span>
            </div>
          ) : (
            <button onClick={() => onRemove(device)} disabled={isRemoving}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl flex-shrink-0 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}>
              {isRemoving
                ? <Loader2 size={13} color="#EF4444" className="animate-spin" />
                : <Trash2 size={13} color="#EF4444" />}
              <span className="font-rajdhani text-red-400 text-[11px] font-bold tracking-[0.12em] uppercase">
                {isRemoving ? 'Removing…' : 'Remove'}
              </span>
            </button>
          )}
        </div>
      </div>
    </GlassPanel>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const AdminDeviceManagement = ({ onLogout }) => {
  const [devices,       setDevices]       = useState(INIT_DEVICES);
  const [confirmDevice, setConfirmDevice] = useState(null);
  const [removingId,    setRemovingId]    = useState(null);
  const [error,         setError]         = useState(null);
  const [toast,         setToast]         = useState({ visible: false, message: '', type: 'success' });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3500);
  }, []);

  const handleRemoveClick  = useCallback(d => { setConfirmDevice(d); setError(null); }, []);
  const handleCancelRemove = useCallback(() => { if (!removingId) setConfirmDevice(null); }, [removingId]);

  const handleConfirmRemove = useCallback(async () => {
    if (!confirmDevice) return;
    const { id, name } = confirmDevice;
    setRemovingId(id);
    try {
      await new Promise(r => setTimeout(r, 1200));
      setDevices(prev => prev.filter(d => d.id !== id));
      setConfirmDevice(null);
      showToast(`${name} removed`);
    } catch {
      setError('Failed to remove. Please try again.');
      setConfirmDevice(null);
      showToast('Failed to remove device', 'error');
    } finally { setRemovingId(null); }
  }, [confirmDevice, showToast]);

  const used     = devices.length;
  const usagePct = (used / MAX_DEV) * 100;
  const slotsLeft = MAX_DEV - used;

  return (
    <Layout title="DEVICE MANAGEMENT" onLogout={onLogout}>
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
      <ConfirmModal
        isOpen={!!confirmDevice}
        deviceName={confirmDevice?.name ?? ''}
        loading={removingId === confirmDevice?.id}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
      />

      <div className="relative min-h-screen">
        {/* Same bg as dashboard */}
        <div className="fixed inset-0 z-0" style={{
          background: 'radial-gradient(ellipse at 20% 0%,rgba(234,179,8,0.05) 0%,transparent 50%), radial-gradient(ellipse at 80% 100%,rgba(168,85,247,0.04) 0%,transparent 50%), linear-gradient(180deg,rgba(0,0,0,0.90) 0%,rgba(0,0,0,0.96) 40%,#000000 100%)',
        }} />

        <div className="relative z-10 p-8 lg:p-10 space-y-8 max-w-[1200px] mx-auto">

          {/* ── Header (matches dashboard header style) ── */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(197,160,89,0.10)', border: '1px solid rgba(197,160,89,0.18)' }}>
                <Shield size={26} color={GOLD} />
              </div>
              <div>
                <p className="font-rajdhani text-[#C5A059] text-[12px] tracking-[0.3em] uppercase font-bold mb-1">
                  Account Security
                </p>
                <h1 className="font-orbitron text-white font-extrabold text-[32px] tracking-[0.2em]
                               bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  DEVICE MANAGEMENT
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{ background: '#000000', border: '1px solid rgba(197,160,89,0.18)' }}>
              <Lock size={15} color={GOLD} />
              <span className="font-rajdhani text-[#C5A059] text-[12px] font-bold tracking-[0.15em] uppercase">
                Premium Security
              </span>
            </div>
          </div>

          {/* ── Error ── */}
          {error && (
            <GlassPanel borderColor="rgba(239,68,68,0.18)">
              <div className="p-5 flex items-center gap-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(239,68,68,0.10)' }}>
                  <AlertTriangle size={18} color="#EF4444" />
                </div>
                <span className="font-rajdhani text-red-400 text-[12px] tracking-[0.12em] uppercase font-bold flex-1">
                  {error}
                </span>
                <button onClick={() => setError(null)}
                  className="font-rajdhani text-zinc-500 text-[11px] tracking-widest uppercase hover:text-zinc-300 transition-colors">
                  Dismiss
                </button>
              </div>
            </GlassPanel>
          )}

          {/* ── Subscription Card (matches revenue card style) ── */}
          <GlassPanel borderColor="rgba(197,160,89,0.15)" glow="rgba(197,160,89,0.06)">
            {/* Gold accent */}
            <div className="absolute top-0 left-10 right-10 h-[2px]"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(197,160,89,0.4),transparent)' }} />

            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(197,160,89,0.10)', border: '1px solid rgba(197,160,89,0.15)' }}>
                    <Crown size={20} color={GOLD} />
                  </div>
                  <div>
                    <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em] mb-1">
                      SUBSCRIPTION
                    </h3>
                    <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.15em] uppercase">
                      Active premium plan
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/[0.08] border border-green-500/[0.15]">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-orbitron text-green-400 text-[11px] font-bold">Active</span>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                {/* Plan info */}
                <div className="col-span-12 xl:col-span-5">
                  <p className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.2em] uppercase mb-2">Current Plan</p>
                  <p className="font-orbitron text-white font-extralight text-[52px] leading-none mb-4">
                    {SUB.plan}
                  </p>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                    style={{ background: '#000000', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Calendar size={15} color="#71717A" />
                    <div>
                      <p className="font-rajdhani text-zinc-500 text-[9px] tracking-[0.2em] uppercase">Expires</p>
                      <p className="font-rajdhani text-white text-[12px] font-bold tracking-[0.12em] uppercase">
                        {SUB.expiresAt}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Usage */}
                <div className="col-span-12 xl:col-span-7">
                  <p className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.2em] uppercase mb-4">
                    Device Usage
                  </p>

                  {/* Slot visualizer */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {Array.from({ length: MAX_DEV }).map((_, i) => {
                      const dev    = devices[i];
                      const filled = !!dev;
                      const DIcon  = dev ? getIcon(dev.type) : Plus;
                      const tLabel = dev ? { desktop: 'Desktop', laptop: 'Laptop', mobile: 'Mobile' }[dev.type] : null;
                      return (
                        <div key={i} className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl transition-all duration-300"
                          style={{
                            background: filled ? 'rgba(197,160,89,0.06)' : '#000000',
                            border: filled ? '1px solid rgba(197,160,89,0.20)' : '1px dashed rgba(255,255,255,0.08)',
                          }}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{
                              background: filled ? 'rgba(197,160,89,0.10)' : 'rgba(255,255,255,0.03)',
                              border: filled ? '1px solid rgba(197,160,89,0.18)' : '1px solid rgba(255,255,255,0.06)',
                            }}>
                            <DIcon size={18} color={filled ? GOLD : '#3f3f46'} />
                          </div>
                          {tLabel ? (
                            <>
                              <span className="font-rajdhani text-[10px] tracking-widest uppercase font-bold" style={{ color: GOLD }}>
                                {tLabel}
                              </span>
                              {dev.current && (
                                <span className="font-rajdhani text-green-400 text-[8px] tracking-widest uppercase font-bold">
                                  Active
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="font-rajdhani text-zinc-700 text-[10px] tracking-widest uppercase">Empty</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Monitor size={12} className="text-zinc-500" />
                        <span className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.12em] uppercase font-medium">
                          Slots Used
                        </span>
                      </div>
                      <span className="font-orbitron text-[#C5A059] text-[13px] font-bold">
                        {used} / {MAX_DEV}
                      </span>
                    </div>
                    <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${usagePct}%`,
                          background: usagePct >= 100
                            ? 'linear-gradient(90deg,#EF4444,#F97316)'
                            : `linear-gradient(90deg,${GOLD},${GOLD_L})`,
                          boxShadow: `0 0 12px rgba(197,160,89,0.3)`,
                        }} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: slotsLeft === 0 ? '#EF4444' : '#22C55E' }} />
                    <span className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.1em] uppercase font-medium">
                      {slotsLeft === 0 ? 'All device slots used' : `${slotsLeft} slot${slotsLeft !== 1 ? 's' : ''} available`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>

          {/* ── Devices Section ── */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#C5A059] to-[#C5A059]/20" />
                <div>
                  <h2 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em]">
                    REGISTERED DEVICES
                  </h2>
                  <p className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.15em] uppercase">
                    Manage active sessions
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl"
                style={{ background: '#000000', border: '1px solid rgba(197,160,89,0.18)' }}>
                <span className="font-orbitron text-[#C5A059] text-[14px] font-bold">{used}</span>
                <span className="font-rajdhani text-zinc-600 text-[10px]">/ {MAX_DEV}</span>
              </div>
            </div>

            <div className="space-y-4">
              {devices.map(d => (
                <DeviceCard key={d.id} device={d} onRemove={handleRemoveClick} removing={removingId} />
              ))}

              {/* Empty slots */}
              {slotsLeft > 0 && (
                <GlassPanel>
                  <div className="p-5 flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.08)' }}>
                      <Plus size={20} color="#3f3f46" />
                    </div>
                    <div>
                      <p className="font-orbitron text-zinc-600 text-[13px] font-bold tracking-[0.15em] mb-1">
                        {slotsLeft} SLOT{slotsLeft !== 1 ? 'S' : ''} AVAILABLE
                      </p>
                      <p className="font-rajdhani text-zinc-700 text-[11px] tracking-[0.1em] uppercase">
                        You can register {slotsLeft} more device{slotsLeft !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </GlassPanel>
              )}

              {/* Full warning */}
              {slotsLeft === 0 && (
                <GlassPanel borderColor="rgba(239,68,68,0.15)">
                  <div className="p-5 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.18)' }}>
                      <AlertTriangle size={20} color="#EF4444" />
                    </div>
                    <div className="flex-1">
                      <p className="font-rajdhani text-white text-[13px] font-bold tracking-[0.12em] uppercase mb-1">
                        Maximum Device Limit Reached
                      </p>
                      <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.1em] uppercase font-medium">
                        Remove a device to add a new one (limit: {MAX_DEV})
                      </p>
                    </div>
                    <div className="px-3 py-2 rounded-xl" style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.20)' }}>
                      <span className="font-orbitron text-red-400 text-[14px] font-bold">{MAX_DEV}</span>
                    </div>
                  </div>
                </GlassPanel>
              )}
            </div>
          </div>

          {/* ── Security Notice (matches alerts card) ── */}
          <GlassPanel borderColor="rgba(239,68,68,0.12)" className="hover:border-red-500/20 transition-all duration-300">
            <div className="p-6 flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.15)', boxShadow: '0 4px 16px rgba(239,68,68,0.08)' }}>
                <AlertTriangle size={18} color="#EF4444" />
              </div>
              <div className="flex-1">
                <p className="font-rajdhani text-white text-[13px] font-bold tracking-[0.12em] uppercase mb-1">
                  Security Notice
                </p>
                <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.1em] uppercase font-medium">
                  Premium plan supports up to <span style={{ color: GOLD }} className="font-bold">{MAX_DEV} devices</span> · Removing revokes access immediately ·
                  <span className="text-red-400 font-bold"> Cannot be undone</span>
                </p>
              </div>
              <div className="px-3 py-2 rounded-xl bg-red-500/[0.10] border border-red-500/[0.20]">
                <span className="font-orbitron text-red-400 text-[14px] font-bold">{MAX_DEV}</span>
              </div>
            </div>
          </GlassPanel>

        </div>
      </div>
    </Layout>
  );
};

export default AdminDeviceManagement;