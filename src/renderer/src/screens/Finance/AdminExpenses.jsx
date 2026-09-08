// AdminExpenses.jsx — WITH AMOUNT VISIBILITY TOGGLE
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  ArrowLeft, Plus, Trash2, X, TrendingUp, TrendingDown,
  DollarSign, CreditCard, Wallet, BarChart3, ArrowUpRight, ArrowDownRight,
  Calendar, Search, Receipt, Target, Activity, Zap, Building2,
  Droplets, Wrench, Users, ClipboardList, Pencil, IndianRupee,
  Eye, EyeOff, Loader2,
} from 'lucide-react';

import splashBg from '../../../../../src/assets/splash-bg.jpg';
import gymLogo  from '../../../../../src/assets/gym-logo.png';

const SPLASH_BG = splashBg;
const GYM_LOGO  = gymLogo;

const GOLD   = '#C5A059';
const GOLD_L = '#EAB308';
const RED    = '#EF4444';
const GREEN  = '#22C55E';
const WHITE8 = 'rgba(255,255,255,0.08)';

const CATEGORIES = [
  { id: 'electricity', label: 'Electricity',    icon: Zap,           color: GOLD },
  { id: 'staff',       label: 'Staff Salary',   icon: Users,         color: GOLD },
  { id: 'trainer',     label: 'Trainer Pay',     icon: Activity,      color: GOLD },
  { id: 'maintenance', label: 'Machine Repair',  icon: Wrench,        color: RED  },
  { id: 'rent',        label: 'Rent',            icon: Building2,     color: GOLD },
  { id: 'water',       label: 'Water Bill',      icon: Droplets,      color: GOLD },
  { id: 'other',       label: 'Other',           icon: ClipboardList, color: GOLD },
  { id: 'custom',      label: 'Custom',          icon: Pencil,        color: GOLD },
];

const INITIAL_EXPENSES = [
  { id: 'e1', categoryId: 'electricity', label: 'Electricity Bill',  amount: 8500,  note: 'January 2025',     date: '2025-01-15' },
  { id: 'e2', categoryId: 'staff',       label: 'Staff Salary',      amount: 25000, note: '3 Staff Members',  date: '2025-01-01' },
  { id: 'e3', categoryId: 'trainer',     label: 'Trainer Salary',    amount: 18000, note: '2 Trainers',       date: '2025-01-01' },
  { id: 'e4', categoryId: 'maintenance', label: 'Treadmill Repair',  amount: 3200,  note: 'Belt replacement', date: '2025-01-10' },
  { id: 'e5', categoryId: 'rent',        label: 'Gym Rent',          amount: 35000, note: 'January',          date: '2025-01-01' },
  { id: 'e6', categoryId: 'water',       label: 'Water Bill',        amount: 1800,  note: 'January',          date: '2025-01-12' },
  { id: 'e7', categoryId: 'other',       label: 'Cleaning Supplies', amount: 1200,  note: 'Monthly',          date: '2025-01-05' },
];

const REVENUE_DATA = {
  monthly: { total: 185000, memberships: 152000, others: 33000 },
  yearly:  { total: 2150000, memberships: 1820000, others: 330000 },
};

const CASH_DATA = {
  monthly: { cash: 48000,  online: 137000  },
  yearly:  { cash: 520000, online: 1630000 },
};

const fmt        = n => `₹${Number(n).toLocaleString('en-IN')}`;
const getCat     = id => CATEGORIES.find(c => c.id === id) || CATEGORIES[6];
const formatDate = d => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

/* ═══════════════════════════════════════════════════════════════ */
/* MASKED AMOUNT — shows ₹******* when hidden                     */
/* ═══════════════════════════════════════════════════════════════ */
const MaskedAmount = ({ value, visible, className = '', style = {}, prefix = '₹' }) => {
  if (!visible) {
    return (
      <span className={className} style={style}>
        <span style={{ letterSpacing: '0.05em' }}>{prefix}</span>
        <span style={{ letterSpacing: '0.12em', fontFamily: 'inherit' }}>{'●●●●●●●'}</span>
      </span>
    );
  }
  return <span className={className} style={style}>{prefix}{typeof value === 'string' ? value : Number(value).toLocaleString('en-IN')}</span>;
};

/* ═══════════════════════════════════════════════════════════════ */
/* ANIMATED NUMBER                                                 */
/* ═══════════════════════════════════════════════════════════════ */
const AnimatedNumber = ({ value, duration = 1200, visible }) => {
  const [display, setDisplay] = useState(0);
  const num = typeof value === 'number' ? value : parseInt(String(value).replace(/[^0-9]/g, '')) || 0;

  useEffect(() => {
    const t0 = performance.now();
    const tick = t => {
      const p = Math.min((t - t0) / duration, 1);
      setDisplay(Math.floor((1 - Math.pow(1 - p, 3)) * num));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [num, duration]);

  if (!visible) {
    return <span style={{ letterSpacing: '0.12em' }}>●●●●●●●</span>;
  }
  return <>{display.toLocaleString('en-IN')}</>;
};

/* ═══════════════════════════════════════════════════════════════ */
/* GLASSPANEL                                                      */
/* ═══════════════════════════════════════════════════════════════ */
const GlassPanel = ({ children, className = '', onClick, hover = false, borderColor, glow }) => (
  <div onClick={onClick}
    className={`relative rounded-3xl overflow-hidden
      ${hover ? 'cursor-pointer transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1' : ''}
      ${onClick ? 'cursor-pointer' : ''} ${className}`}
    style={{
      background: '#000000',
      border: `1px solid ${borderColor || WHITE8}`,
      backdropFilter: 'blur(24px)',
      boxShadow: glow ? `0 8px 32px ${glow}` : 'none',
    }}>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* PULSE DOT                                                       */
/* ═══════════════════════════════════════════════════════════════ */
const PulseDot = ({ color = GREEN, size = 8 }) => (
  <div className="relative flex items-center justify-center" style={{ width: size * 3, height: size * 3 }}>
    <span className="absolute rounded-full animate-ping opacity-30"
      style={{ width: size * 2.5, height: size * 2.5, backgroundColor: color }} />
    <span className="absolute rounded-full animate-pulse opacity-20"
      style={{ width: size * 1.8, height: size * 1.8, backgroundColor: color }} />
    <span className="relative rounded-full"
      style={{ width: size, height: size, backgroundColor: color, boxShadow: `0 0 ${size * 2}px ${color}40` }} />
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* STAT CARD                                                       */
/* ═══════════════════════════════════════════════════════════════ */
const StatCard = ({ icon: Icon, label, value, color, sub, change, changeUp, visible }) => (
  <GlassPanel hover className="group" glow={`${color}08`}>
    <div className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center
                        transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{ background: `linear-gradient(135deg,${color}15,${color}08)`, border: `1px solid ${color}20` }}>
          <Icon size={20} style={{ color }} />
        </div>
        {change && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
            style={{
              background: changeUp ? 'rgba(34,197,94,0.10)' : 'rgba(239,68,68,0.10)',
              border: changeUp ? '1px solid rgba(34,197,94,0.20)' : '1px solid rgba(239,68,68,0.20)',
            }}>
            {changeUp
              ? <ArrowUpRight size={12} className="text-green-400" />
              : <ArrowDownRight size={12} className="text-red-400" />}
            <span className={`font-orbitron text-[10px] font-bold ${changeUp ? 'text-green-400' : 'text-red-400'}`}>
              {change}
            </span>
          </div>
        )}
      </div>

      {/* Amount row */}
      <p className="font-orbitron text-white font-bold text-[20px] leading-none mb-2
                    transition-all duration-300 group-hover:text-[34px]" style={{ color }}>
        ₹<AnimatedNumber value={value} visible={visible} />
      </p>

      <p className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.15em] uppercase font-semibold">{label}</p>
      {sub && (
        <>
          <div className="h-px bg-gradient-to-r from-white/[0.05] via-white/[0.1] to-white/[0.05] my-3" />
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${color}70` }} />
            <span className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.1em] uppercase">{sub}</span>
          </div>
        </>
      )}
    </div>
  </GlassPanel>
);

/* ═══════════════════════════════════════════════════════════════ */
/* ADD EXPENSE MODAL                                               */
/* ═══════════════════════════════════════════════════════════════ */
const AddExpenseModal = ({ onClose, onAdd }) => {
  const [catId, setCatId]             = useState('electricity');
  const [amount, setAmount]           = useState('');
  const [note, setNote]               = useState('');
  const [customLabel, setCustomLabel] = useState('');
  const [adding, setAdding]           = useState(false);

  const cat     = getCat(catId);
  const CatIcon = cat.icon;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleAdd = async () => {
    if (!amount || isNaN(parseFloat(amount))) return alert('Enter a valid amount');
    if (catId === 'custom' && !customLabel.trim()) return alert('Enter expense name');
    setAdding(true);
    await new Promise(r => setTimeout(r, 600));
    onAdd({
      id: `e_${Date.now()}`,
      categoryId: catId,
      label: catId === 'custom' ? customLabel.trim() : cat.label,
      amount: parseFloat(amount),
      note: note.trim(),
      date: new Date().toISOString().split('T')[0],
    });
    setAdding(false);
    onClose();
  };

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
      style={{
        zIndex: 99999,
        background: 'rgba(0,0,0,0.90)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="absolute inset-0" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden flex flex-col"
        style={{
          background: '#000000',
          border: '1px solid rgba(197,160,89,0.22)',
          boxShadow: '0 32px 100px rgba(0,0,0,0.95), 0 0 80px rgba(197,160,89,0.08)',
          maxHeight: 'calc(100vh - 80px)',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <div className="h-[2px] flex-shrink-0"
          style={{ background: `linear-gradient(90deg, transparent, ${GOLD}60, transparent)` }} />

        <div className="p-5 sm:p-6 flex items-center justify-between flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(197,160,89,0.12)', border: '1px solid rgba(197,160,89,0.22)' }}>
              <Plus size={18} color={GOLD} />
            </div>
            <div>
              <h3 className="font-orbitron text-white font-bold text-[14px] sm:text-[15px] tracking-[0.12em]">
                ADD EXPENSE
              </h3>
              <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.15em] uppercase">
                Record new entry
              </p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95
                       hover:bg-red-500/10 hover:border-red-500/20"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <X size={15} color="#71717A" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5"
          style={{ overscrollBehavior: 'contain' }}>

          {/* Category */}
          <div>
            <label className="block font-rajdhani text-zinc-500 text-[10px] tracking-[0.2em] uppercase font-semibold mb-3">
              Category
            </label>
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.map(c => {
                const sel  = catId === c.id;
                const Icon = c.icon;
                return (
                  <button key={c.id} onClick={() => setCatId(c.id)}
                    className="flex flex-col items-center gap-2 py-3 px-1 rounded-2xl border transition-all duration-200
                               hover:scale-[1.03] active:scale-95"
                    style={{
                      background:  sel ? 'rgba(197,160,89,0.10)' : 'rgba(255,255,255,0.02)',
                      borderColor: sel ? 'rgba(197,160,89,0.35)' : 'rgba(255,255,255,0.06)',
                    }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                      style={{
                        background: sel ? 'rgba(197,160,89,0.18)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${sel ? 'rgba(197,160,89,0.30)' : 'rgba(255,255,255,0.06)'}`,
                      }}>
                      <Icon size={15} style={{ color: sel ? GOLD : '#52525B' }} />
                    </div>
                    <span className="font-rajdhani text-[8px] tracking-[0.08em] uppercase font-bold text-center leading-tight"
                      style={{ color: sel ? GOLD : '#52525B' }}>
                      {c.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {catId === 'custom' && (
            <div>
              <label className="block font-rajdhani text-zinc-500 text-[10px] tracking-[0.2em] uppercase font-semibold mb-2">
                Expense Name
              </label>
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Pencil size={14} color="#52525B" />
                <input value={customLabel} onChange={e => setCustomLabel(e.target.value)}
                  placeholder="e.g. Gym Towels..."
                  className="flex-1 bg-transparent font-rajdhani text-white text-[13px] outline-none
                             placeholder:text-zinc-700 tracking-wider" />
              </div>
            </div>
          )}

          {/* Amount */}
          <div>
            <label className="block font-rajdhani text-zinc-500 text-[10px] tracking-[0.2em] uppercase font-semibold mb-2">
              Amount
            </label>
            <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl"
              style={{ background: 'rgba(197,160,89,0.05)', border: '1px solid rgba(197,160,89,0.20)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(197,160,89,0.12)', border: '1px solid rgba(197,160,89,0.22)' }}>
                <IndianRupee size={16} color={GOLD} />
              </div>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                placeholder="0"
                className="flex-1 bg-transparent font-orbitron text-white text-[24px] sm:text-[28px] font-bold
                           outline-none placeholder:text-zinc-800 tracking-wider min-w-0" />
              {amount && (
                <span className="font-orbitron text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-lg flex-shrink-0"
                  style={{ background: 'rgba(197,160,89,0.12)', color: GOLD }}>
                  {fmt(parseFloat(amount) || 0)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 mt-2.5 flex-wrap">
              {[500, 1000, 5000, 10000, 25000].map(q => (
                <button key={q} onClick={() => setAmount(String(q))}
                  className="px-2.5 sm:px-3 py-1.5 rounded-xl font-orbitron text-[8px] sm:text-[9px] font-bold
                             transition-all hover:scale-105"
                  style={{
                    background: amount === String(q) ? 'rgba(197,160,89,0.15)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${amount === String(q) ? 'rgba(197,160,89,0.30)' : 'rgba(255,255,255,0.06)'}`,
                    color: amount === String(q) ? GOLD : '#52525B',
                  }}>
                  ₹{q >= 1000 ? `${q / 1000}K` : q}
                </button>
              ))}
            </div>
          </div>

          {/* Note */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.2em] uppercase font-semibold">
                Note
              </label>
              <span className="font-rajdhani text-zinc-700 text-[9px] tracking-wider">Optional</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <Receipt size={14} color="#52525B" />
              <input value={note} onChange={e => setNote(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 bg-transparent font-rajdhani text-white text-[13px] outline-none
                           placeholder:text-zinc-700 tracking-wider" />
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 flex gap-3 flex-shrink-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <button onClick={onClose}
            className="px-5 py-3 rounded-2xl font-rajdhani text-zinc-400 text-[12px] tracking-[0.12em] uppercase
                       font-bold transition-all hover:text-white hover:scale-[1.01]"
            style={{ background: '#000', border: '1px solid rgba(255,255,255,0.10)' }}>
            Cancel
          </button>
          <button onClick={handleAdd} disabled={adding}
            className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-2xl font-orbitron text-[11px] sm:text-[12px]
                       font-bold tracking-[0.12em] text-black transition-all duration-300
                       hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: `linear-gradient(135deg,${GOLD},${GOLD_L})`,
              boxShadow: '0 8px 32px rgba(197,160,89,0.30)',
            }}>
            {adding ? <Loader2 size={16} className="animate-spin text-black" /> : <Plus size={16} />}
            {adding ? 'Adding...' : 'Add Expense'}
            {amount && !adding && (
              <span className="ml-1 px-2 py-0.5 rounded-lg text-[9px] font-bold"
                style={{ background: 'rgba(0,0,0,0.18)', color: 'rgba(0,0,0,0.65)' }}>
                {fmt(parseFloat(amount) || 0)}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

/* ═══════════════════════════════════════════════════════════════ */
/* EXPENSE ROW                                                     */
/* ═══════════════════════════════════════════════════════════════ */
const ExpenseRow = ({ expense, onDelete, visible }) => {
  const cat     = getCat(expense.categoryId);
  const CatIcon = cat.icon;

  return (
    <div className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.005]"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0
                      transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
        style={{ background: 'rgba(197,160,89,0.10)', border: '1px solid rgba(197,160,89,0.20)',
                 boxShadow: '0 4px 12px rgba(197,160,89,0.08)' }}>
        <CatIcon size={18} color={GOLD} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-orbitron text-white font-bold text-[13px] tracking-[0.06em] truncate">
            {expense.label}
          </p>
          <div className="px-2 py-0.5 rounded-lg flex-shrink-0"
            style={{ background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.15)' }}>
            <span className="font-rajdhani text-[8px] tracking-[0.15em] uppercase font-bold"
              style={{ color: `${GOLD}BB` }}>{cat.label}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {expense.note && (
            <span className="font-rajdhani text-zinc-500 text-[11px] tracking-wide">{expense.note}</span>
          )}
          <div className="flex items-center gap-1">
            <Calendar size={10} className="text-zinc-700" />
            <span className="font-rajdhani text-zinc-600 text-[10px] tracking-wider">
              {formatDate(expense.date)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Masked amount in row */}
        {visible ? (
          <span className="font-orbitron font-bold text-[15px]" style={{ color: GOLD }}>
            {fmt(expense.amount)}
          </span>
        ) : (
          <span className="font-orbitron font-bold text-[15px] tracking-widest" style={{ color: GOLD }}>
            ₹●●●●●●●
          </span>
        )}
        <button onClick={() => onDelete(expense.id)}
          className="w-9 h-9 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100
                     transition-all duration-300 hover:scale-110 active:scale-95"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}>
          <Trash2 size={14} color={RED} />
        </button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* AMOUNT TOGGLE BUTTON                                           */
/* ═══════════════════════════════════════════════════════════════ */
const AmountToggleBtn = ({ visible, onToggle }) => (
  <button
    onClick={onToggle}
    className="group relative flex items-center gap-2.5 h-10 px-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
    style={{
      background: visible ? 'rgba(197,160,89,0.08)' : 'rgba(239,68,68,0.08)',
      border: visible ? '1px solid rgba(197,160,89,0.22)' : '1px solid rgba(239,68,68,0.22)',
      boxShadow: visible ? '0 4px 16px rgba(197,160,89,0.10)' : '0 4px 16px rgba(239,68,68,0.10)',
    }}
    title={visible ? 'Hide all amounts' : 'Show all amounts'}
  >
    {/* Animated icon swap */}
    <div className="relative w-[18px] h-[18px] flex items-center justify-center">
      <Eye
        size={16}
        style={{
          color: GOLD,
          position: 'absolute',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(90deg)',
          transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      />
      <EyeOff
        size={16}
        style={{
          color: RED,
          position: 'absolute',
          opacity: visible ? 0 : 1,
          transform: visible ? 'scale(0.5) rotate(-90deg)' : 'scale(1) rotate(0deg)',
          transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      />
    </div>
    <span
      className="font-rajdhani text-[10px] font-bold tracking-[0.14em] uppercase transition-colors duration-300"
      style={{ color: visible ? GOLD : RED }}
    >
      {visible ? 'Hide' : 'Show'}
    </span>

    {/* Subtle pulse ring when hidden */}
    {!visible && (
      <span
        className="absolute inset-0 rounded-2xl animate-ping pointer-events-none"
        style={{ background: 'rgba(239,68,68,0.06)', animationDuration: '2s' }}
      />
    )}
  </button>
);

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN                                                            */
/* ═══════════════════════════════════════════════════════════════ */
const AdminExpenses = ({ onLogout }) => {
  const navigate = useNavigate();
  const [expenses,     setExpenses]     = useState(INITIAL_EXPENSES);
  const [showModal,    setShowModal]    = useState(false);
  const [period,       setPeriod]       = useState('monthly');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery,  setSearchQuery]  = useState('');

  // ✅ Global amount visibility state
  const [amountsVisible, setAmountsVisible] = useState(true);

  const revenue  = REVENUE_DATA[period];
  const cash     = CASH_DATA[period];
  const totalExp = expenses.reduce((s, e) => s + e.amount, 0);
  const net      = revenue.total - totalExp;
  const spentPct = Math.round((totalExp / revenue.total) * 100);

  const catTotals = CATEGORIES.map(c => ({
    ...c,
    total: expenses.filter(e => e.categoryId === c.id).reduce((s, e) => s + e.amount, 0),
    count: expenses.filter(e => e.categoryId === c.id).length,
  })).filter(c => c.total > 0);

  const filtered = expenses
    .filter(e => activeFilter === 'all' || e.categoryId === activeFilter)
    .filter(e =>
      !searchQuery ||
      e.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.note && e.note.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const handleDelete = id => {
    if (window.confirm('Delete this expense?')) setExpenses(p => p.filter(e => e.id !== id));
  };

  /* helper — mask or show a formatted rupee string */
  const M = (val) => amountsVisible ? fmt(val) : '₹●●●●●●●';
  const Mpct = (pct) => amountsVisible ? `${pct}%` : '••%';

  return (
    <Layout title="FINANCE" onLogout={onLogout}>
      <div className="relative min-h-screen">
        <div className="fixed inset-0 z-0"
          style={{ backgroundImage: `url(${SPLASH_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="fixed inset-0 z-[1]" style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(197,160,89,0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(168,85,247,0.04) 0%, transparent 50%),
            linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.97) 40%, #000000 100%)
          `,
        }} />

        <div className="relative z-10 p-8 lg:p-10 space-y-8 max-w-[1600px] mx-auto">

          {/* ══════════════════════════════════════════ HEADER */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">

              {/* Back button */}
              <button onClick={() => navigate(-1)}
                className="group w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{ background: '#000', border: WHITE8 }}>
                <ArrowLeft size={18} className="text-zinc-400 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
              </button>

              {/* ✅ Eye toggle — right next to back button, top-left area */}
              <AmountToggleBtn
                visible={amountsVisible}
                onToggle={() => setAmountsVisible(v => !v)}
              />

              <div>
                <p className="font-rajdhani text-[12px] tracking-[0.3em] uppercase font-bold mb-1 flex items-center gap-2"
                  style={{ color: GOLD }}>
                  Financial Overview
                  <span className="text-white/20">•</span>
                  <span className="text-white/40">{period === 'monthly' ? 'This Month' : 'This Year'}</span>
                </p>
                <h1 className="font-orbitron text-white font-extrabold text-[20px] tracking-[0.2em]
                               bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  FINANCE CENTER
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <GlassPanel className="flex p-1.5 gap-1">
                {['monthly', 'yearly'].map(p => (
                  <button key={p} onClick={() => setPeriod(p)}
                    className="px-5 py-2 rounded-xl font-rajdhani text-[11px] font-bold tracking-[0.12em] uppercase transition-all duration-300"
                    style={{
                      background: period === p ? 'rgba(197,160,89,0.12)' : 'transparent',
                      border: period === p ? '1px solid rgba(197,160,89,0.25)' : '1px solid transparent',
                      color: period === p ? GOLD : '#52525B',
                    }}>
                    {p === 'monthly' ? 'Monthly' : 'Yearly'}
                  </button>
                ))}
              </GlassPanel>

              <button onClick={() => setShowModal(true)}
                className="group flex items-center gap-3 h-12 px-6 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg,${GOLD},${GOLD_L})`,
                  boxShadow: '0 8px 32px rgba(197,160,89,0.30)', color: '#000',
                }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-black/10 transition-all group-hover:scale-110 group-hover:rotate-12">
                  <Plus size={16} />
                </div>
                <span className="font-orbitron text-[11px] font-bold tracking-[0.15em]">ADD EXPENSE</span>
              </button>
            </div>
          </div>

          {/* ══════════════════════════════════════════ STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard icon={TrendingUp}  label="Total Revenue"  value={revenue.total}     color={GREEN} change="+12%" changeUp   sub="memberships + others"                          visible={amountsVisible} />
            <StatCard icon={TrendingDown} label="Total Expenses" value={totalExp}          color={RED}   change="-5%"  changeUp={false} sub={`${expenses.length} transactions`}       visible={amountsVisible} />
            <StatCard icon={DollarSign}   label="Net Profit"     value={Math.abs(net)}     color={GOLD}  change={net >= 0 ? '+8%' : '-3%'} changeUp={net >= 0} sub={net >= 0 ? 'profit this period' : 'loss recorded'} visible={amountsVisible} />
            <StatCard icon={Target}       label="Budget Used"    value={totalExp}          color={net >= 0 ? GOLD : RED} sub={`${Mpct(spentPct)} of revenue spent`}                  visible={amountsVisible} />
          </div>

          {/* ══════════════════════════════════════════ MAIN GRID */}
          <div className="grid grid-cols-12 gap-6">

            {/* LEFT */}
            <div className="col-span-12 xl:col-span-5 space-y-6">

              {/* Overview */}
              <GlassPanel borderColor="rgba(197,160,89,0.15)" glow="rgba(197,160,89,0.06)">
                <div className="absolute top-0 left-10 right-10 h-[2px]"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(197,160,89,0.45),transparent)' }} />
                {GYM_LOGO && (
                  <img src={GYM_LOGO} alt=""
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-[180px] h-[90px] object-contain opacity-[0.03] pointer-events-none" />
                )}
                <div className="p-8 relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#C5A059] to-[#C5A059]/20" />
                    <div>
                      <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em]">OVERVIEW</h3>
                      <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.15em] uppercase">Revenue vs Expenses</p>
                    </div>
                  </div>

                  {/* Revenue bar */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                        <span className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.12em] uppercase font-semibold">Revenue</span>
                      </div>
                      <span className="font-orbitron text-green-400 text-[14px] font-bold">{M(revenue.total)}</span>
                    </div>
                    <div className="h-2.5 bg-white/[0.05] rounded-full overflow-hidden">
                      <div className="h-full rounded-full"
                        style={{ width: '100%', background: 'linear-gradient(90deg,#22C55E,#16A34A)', boxShadow: '0 0 12px rgba(34,197,94,0.35)' }} />
                    </div>
                  </div>

                  {/* Expenses bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <span className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.12em] uppercase font-semibold">Expenses</span>
                      </div>
                      <span className="font-orbitron text-red-400 text-[14px] font-bold">{M(totalExp)}</span>
                    </div>
                    <div className="h-2.5 bg-white/[0.05] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${spentPct}%`, background: 'linear-gradient(90deg,#EF4444,#DC2626)', boxShadow: '0 0 12px rgba(239,68,68,0.35)' }} />
                    </div>
                  </div>

                  <div className="h-px mb-6" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)' }} />

                  {/* Net */}
                  <div className="flex items-center justify-between px-5 py-4 rounded-2xl"
                    style={{
                      background: net >= 0 ? 'rgba(197,160,89,0.07)' : 'rgba(239,68,68,0.07)',
                      border: net >= 0 ? '1px solid rgba(197,160,89,0.20)' : '1px solid rgba(239,68,68,0.20)',
                    }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: net >= 0 ? 'rgba(197,160,89,0.15)' : 'rgba(239,68,68,0.12)' }}>
                        {net >= 0 ? <TrendingUp size={18} color={GOLD} /> : <TrendingDown size={18} color={RED} />}
                      </div>
                      <div>
                        <p className="font-orbitron font-bold text-[12px] tracking-[0.12em]"
                          style={{ color: net >= 0 ? GOLD : RED }}>NET {net >= 0 ? 'PROFIT' : 'LOSS'}</p>
                        <p className="font-rajdhani text-zinc-600 text-[10px] tracking-wider">
                          {amountsVisible ? `${100 - spentPct}% margin` : '••% margin'}
                        </p>
                      </div>
                    </div>
                    <span className="font-orbitron font-extralight text-[26px] leading-none"
                      style={{ color: net >= 0 ? GOLD : RED }}>
                      {M(Math.abs(net))}
                    </span>
                  </div>
                </div>
              </GlassPanel>

              {/* Collection */}
              <GlassPanel>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#C5A059] to-[#C5A059]/20" />
                    <div>
                      <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em]">COLLECTION</h3>
                      <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.15em] uppercase">Payment breakdown</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Wallet,     label: 'CASH',   value: cash.cash,   pct: Math.round((cash.cash / (cash.cash + cash.online)) * 100) },
                      { icon: CreditCard, label: 'ONLINE', value: cash.online, pct: Math.round((cash.online / (cash.cash + cash.online)) * 100) },
                    ].map(item => (
                      <div key={item.label} className="group rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]"
                        style={{ background: 'rgba(197,160,89,0.05)', border: '1px solid rgba(197,160,89,0.15)' }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110 group-hover:rotate-6"
                          style={{ background: 'rgba(197,160,89,0.12)', border: '1px solid rgba(197,160,89,0.22)' }}>
                          <item.icon size={16} color={GOLD} />
                        </div>
                        <p className="font-rajdhani font-bold text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: `${GOLD}80` }}>{item.label}</p>
                        <p className="font-orbitron text-white font-bold text-[20px] mb-3">
                          {M(item.value)}
                        </p>
                        <div className="h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000"
                            style={{ width: `${item.pct}%`, background: `linear-gradient(90deg,${GOLD},${GOLD_L})`, boxShadow: '0 0 8px rgba(197,160,89,0.30)' }} />
                        </div>
                        <p className="font-orbitron text-[10px] font-bold mt-2" style={{ color: `${GOLD}80` }}>
                          {Mpct(item.pct)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassPanel>

              {/* Revenue */}
              <GlassPanel borderColor="rgba(197,160,89,0.12)" glow="rgba(197,160,89,0.04)">
                <div className="absolute top-0 left-8 right-8 h-[2px]"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(197,160,89,0.35),transparent)' }} />
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#C5A059] to-[#C5A059]/20" />
                      <div>
                        <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em]">REVENUE</h3>
                        <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.15em] uppercase">Income sources</p>
                      </div>
                    </div>
                    <span className="font-orbitron font-extralight text-[24px]" style={{ color: GOLD }}>
                      {M(revenue.total)}
                    </span>
                  </div>
                  {[
                    { label: 'Memberships', value: revenue.memberships, icon: CreditCard },
                    { label: 'Others',      value: revenue.others,      icon: Receipt },
                  ].map((item, i) => {
                    const pct = Math.round((item.value / revenue.total) * 100);
                    return (
                      <div key={i} className="group flex items-center gap-4 py-4 rounded-2xl px-3 -mx-3 transition-all hover:bg-white/[0.02]"
                        style={{ borderBottom: i === 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                          style={{ background: 'rgba(197,160,89,0.10)', border: '1px solid rgba(197,160,89,0.18)' }}>
                          <item.icon size={15} color={GOLD} />
                        </div>
                        <div className="flex-1">
                          <p className="font-rajdhani text-zinc-300 text-[12px] font-semibold tracking-wider mb-2">{item.label}</p>
                          <div className="h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-1000"
                              style={{ width: `${pct}%`, background: `linear-gradient(90deg,${GOLD},${GOLD_L})`, boxShadow: '0 0 8px rgba(197,160,89,0.30)' }} />
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-orbitron text-white text-[14px] font-bold block">{M(item.value)}</span>
                          <span className="font-orbitron text-[10px] font-bold" style={{ color: `${GOLD}80` }}>{Mpct(pct)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassPanel>
            </div>

            {/* RIGHT */}
            <div className="col-span-12 xl:col-span-7 space-y-6">

              {/* Expense Breakdown */}
              <GlassPanel borderColor="rgba(239,68,68,0.15)" glow="rgba(239,68,68,0.04)">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-red-400 to-red-400/20" />
                      <div>
                        <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em]">EXPENSE BREAKDOWN</h3>
                        <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.15em] uppercase">By category</p>
                      </div>
                    </div>
                    <span className="font-orbitron text-red-400 font-extralight text-[22px]">{M(totalExp)}</span>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {catTotals.map(cat => {
                      const CatIcon = cat.icon;
                      const pct     = Math.round((cat.total / totalExp) * 100);
                      const active  = activeFilter === cat.id;
                      return (
                        <button key={cat.id} onClick={() => setActiveFilter(active ? 'all' : cat.id)}
                          className="group text-left p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02]"
                          style={{
                            background: active ? 'rgba(197,160,89,0.10)' : 'rgba(255,255,255,0.02)',
                            borderColor: active ? 'rgba(197,160,89,0.28)' : 'rgba(255,255,255,0.06)',
                            boxShadow: active ? '0 4px 20px rgba(197,160,89,0.10)' : 'none',
                          }}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6"
                              style={{ background: active ? 'rgba(197,160,89,0.18)' : 'rgba(197,160,89,0.08)' }}>
                              <CatIcon size={14} color={active ? GOLD : `${GOLD}70`} />
                            </div>
                            <span className="font-orbitron text-[9px] font-bold" style={{ color: active ? GOLD : '#52525B' }}>
                              {Mpct(pct)}
                            </span>
                          </div>
                          {/* Category card amount */}
                          <p className="font-orbitron text-white font-bold text-[14px] mb-1 truncate">
                            {M(cat.total)}
                          </p>
                          <p className="font-rajdhani text-[9px] tracking-[0.12em] uppercase font-semibold mb-3 truncate"
                            style={{ color: active ? `${GOLD}BB` : '#52525B' }}>{cat.label}</p>
                          <div className="h-[2px] bg-white/[0.05] rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-1000"
                              style={{ width: `${pct}%`, background: `linear-gradient(90deg,${GOLD},${GOLD_L})`, boxShadow: '0 0 6px rgba(197,160,89,0.25)' }} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </GlassPanel>

              {/* Transactions */}
              <GlassPanel className="flex flex-col">
                <div className="p-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-white/40 to-white/[0.05]" />
                      <div>
                        <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em]">TRANSACTIONS</h3>
                        <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.15em] uppercase">
                          {filtered.length} {activeFilter !== 'all' ? getCat(activeFilter).label : ''} entries
                        </p>
                      </div>
                    </div>
                    {activeFilter !== 'all' && (
                      <button onClick={() => setActiveFilter('all')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all hover:scale-105"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <X size={10} className="text-zinc-500" />
                        <span className="font-rajdhani text-zinc-400 text-[10px] tracking-wider uppercase font-bold">Clear</span>
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <Search size={15} className="text-zinc-600 flex-shrink-0" />
                    <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search expenses..."
                      className="flex-1 bg-transparent font-rajdhani text-white text-[13px] outline-none placeholder:text-zinc-700 tracking-wider" />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/[0.06] transition-colors"
                        style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                        <X size={11} className="text-zinc-500" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-3 max-h-[520px]">
                  {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <Receipt size={26} className="text-zinc-800" strokeWidth={1.5} />
                      </div>
                      <p className="font-orbitron text-zinc-600 text-[13px] tracking-[0.15em] mb-2">NO EXPENSES FOUND</p>
                      <p className="font-rajdhani text-zinc-700 text-[11px] tracking-wider">
                        {searchQuery ? 'Try a different search' : 'Add your first expense'}
                      </p>
                    </div>
                  ) : (
                    filtered.map(exp => (
                      <ExpenseRow
                        key={exp.id}
                        expense={exp}
                        onDelete={handleDelete}
                        visible={amountsVisible}
                      />
                    ))
                  )}
                </div>

                {filtered.length > 0 && (
                  <div className="p-5 flex items-center justify-between"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
                        <BarChart3 size={16} color={RED} />
                      </div>
                      <div>
                        <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.12em] uppercase font-semibold">
                          {activeFilter !== 'all' ? `${getCat(activeFilter).label} Total` : 'Filtered Total'}
                        </p>
                        <p className="font-orbitron font-bold text-[18px]" style={{ color: RED }}>
                          {M(filtered.reduce((s, e) => s + e.amount, 0))}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <Eye size={12} className="text-zinc-600" />
                      <span className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.12em] uppercase font-bold">
                        {filtered.length} entries
                      </span>
                    </div>
                  </div>
                )}
              </GlassPanel>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <AddExpenseModal
          onClose={() => setShowModal(false)}
          onAdd={exp => { setExpenses(p => [exp, ...p]); setShowModal(false); }}
        />
      )}
    </Layout>
  );
};

export default AdminExpenses;