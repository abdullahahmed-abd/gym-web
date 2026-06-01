// AdminExpenses.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import {
  ArrowLeft, Plus, Trash2, X, CheckCircle, TrendingUp, TrendingDown,
  DollarSign, CreditCard, Wallet, PieChart, BarChart3, ArrowUpRight,
  ArrowDownRight, Calendar, Filter, Search, Download, ChevronRight,
  Zap, Building2, Droplets, Wrench, Users, ClipboardList, Pencil,
  IndianRupee, Receipt, CircleDollarSign, Target, Activity,
  Eye, Sparkles, ArrowRight
} from 'lucide-react';

import splashBg from '../../../../../src/assets/splash-bg.jpg';
import gymLogo from '../../../../../src/assets/gym-logo.png';

const SPLASH_BG = splashBg;
const GYM_LOGO = gymLogo;

// ── Color Palette ──────────────────────────────────────────────
const COLORS = {
  gold: '#C5A059',
  goldLight: '#D4B483',
  goldDark: '#A8873A',
  green: '#16A34A',
  greenLight: '#22C55E',
  greenGlow: 'rgba(22,163,74,0.15)',
  red: '#DC2626',
  redLight: '#EF4444',
  redGlow: 'rgba(220,38,38,0.15)',
  blue: '#2563EB',
  blueLight: '#3B82F6',
  cyan: '#0891B2',
  cyanLight: '#22D3EE',
  purple: '#7C3AED',
  purpleLight: '#A855F7',
  orange: '#EA580C',
  orangeLight: '#F97316',
};

// ── Constants ──────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'electricity', label: 'Electricity', icon: Zap,          color: COLORS.gold,        bg: 'rgba(197,160,89,0.10)' },
  { id: 'staff',       label: 'Staff Salary', icon: Users,        color: COLORS.blueLight,   bg: 'rgba(59,130,246,0.10)' },
  { id: 'trainer',     label: 'Trainer Salary', icon: Activity,   color: COLORS.cyanLight,   bg: 'rgba(34,211,238,0.10)' },
  { id: 'maintenance', label: 'Machine Repair', icon: Wrench,     color: COLORS.redLight,    bg: 'rgba(220,38,38,0.10)'  },
  { id: 'rent',        label: 'Rent',           icon: Building2,  color: COLORS.purpleLight, bg: 'rgba(168,85,247,0.10)' },
  { id: 'water',       label: 'Water Bill',     icon: Droplets,   color: COLORS.cyanLight,   bg: 'rgba(6,182,212,0.10)'  },
  { id: 'other',       label: 'Other',          icon: ClipboardList, color: COLORS.orangeLight, bg: 'rgba(234,88,12,0.10)' },
  { id: 'custom',      label: 'Custom',         icon: Pencil,     color: COLORS.purpleLight, bg: 'rgba(124,58,237,0.10)' },
];

const INITIAL_EXPENSES = [
  { id: 'e1', categoryId: 'electricity', label: 'Electricity Bill',   amount: 8500,  note: 'January 2025',   date: '2025-01-15' },
  { id: 'e2', categoryId: 'staff',       label: 'Staff Salary',        amount: 25000, note: '3 Staff Members', date: '2025-01-01' },
  { id: 'e3', categoryId: 'trainer',     label: 'Trainer Salary',      amount: 18000, note: '2 Trainers',      date: '2025-01-01' },
  { id: 'e4', categoryId: 'maintenance', label: 'Treadmill Repair',    amount: 3200,  note: 'Belt replacement', date: '2025-01-10' },
  { id: 'e5', categoryId: 'rent',        label: 'Gym Rent',            amount: 35000, note: 'January',         date: '2025-01-01' },
  { id: 'e6', categoryId: 'water',       label: 'Water Bill',          amount: 1800,  note: 'January',         date: '2025-01-12' },
  { id: 'e7', categoryId: 'other',       label: 'Cleaning Supplies',   amount: 1200,  note: 'Monthly',         date: '2025-01-05' },
];

const REVENUE_DATA = {
  monthly: { total: 185000, memberships: 152000, others: 33000 },
  yearly:  { total: 2150000, memberships: 1820000, others: 330000 },
};

const CASH_DATA = {
  monthly: { cash: 48000,  online: 137000  },
  yearly:  { cash: 520000, online: 1630000 },
};

const fmt       = (n) => `₹${n.toLocaleString('en-IN')}`;
const getCat    = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[6];
const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

/* ═══════════════════════════════════════════════════════════════ */
/* ANIMATED COUNTER                                               */
/* ═══════════════════════════════════════════════════════════════ */
const AnimatedNumber = ({ value, duration = 1200 }) => {
  const [display, setDisplay] = useState(0);
  const numValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) : value;

  useEffect(() => {
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * numValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [numValue, duration]);

  return display.toLocaleString('en-IN');
};

/* ═══════════════════════════════════════════════════════════════ */
/* GLASS PANEL                                                    */
/* ═══════════════════════════════════════════════════════════════ */
const GlassPanel = ({ children, className = '', onClick, hover = false, borderColor, glow }) => (
  <div
    onClick={onClick}
    className={`
      relative rounded-3xl overflow-hidden
      ${hover ? 'cursor-pointer transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1' : ''}
      ${onClick ? 'cursor-pointer' : ''}
      ${className}
    `}
    style={{
      background:   '#000000',
      border:       `1px solid ${borderColor || 'rgba(255,255,255,0.08)'}`,
      boxShadow:    glow ? `0 8px 32px ${glow}` : 'none',
    }}
  >
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* PULSE DOT                                                      */
/* ═══════════════════════════════════════════════════════════════ */
const PulseDot = ({ color = COLORS.greenLight, size = 6 }) => (
  <div className="relative flex items-center justify-center" style={{ width: size * 3, height: size * 3 }}>
    <span className="absolute rounded-full animate-ping opacity-30"
      style={{ width: size * 2.5, height: size * 2.5, backgroundColor: color }} />
    <span className="relative rounded-full"
      style={{ width: size, height: size, backgroundColor: color, boxShadow: `0 0 ${size * 2}px ${color}40` }} />
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/* ADD EXPENSE MODAL                                              */
/* ═══════════════════════════════════════════════════════════════ */
const AddExpenseModal = ({ onClose, onAdd }) => {
  const [catId,       setCatId]       = useState('electricity');
  const [amount,      setAmount]      = useState('');
  const [note,        setNote]        = useState('');
  const [customLabel, setCustomLabel] = useState('');

  const selectedCat = getCat(catId);
  const CatIcon     = selectedCat.icon;

  const handleAdd = () => {
    if (!amount || isNaN(parseFloat(amount))) return alert('Enter a valid amount');
    if (catId === 'custom' && !customLabel.trim()) return alert('Enter expense name');

    onAdd({
      id:         `e_${Date.now()}`,
      categoryId: catId,
      label:      catId === 'custom' ? customLabel.trim() : selectedCat.label,
      amount:     parseFloat(amount),
      note:       note.trim(),
      date:       new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg rounded-3xl border border-white/[0.08] max-h-[90vh] overflow-y-auto"
        style={{ background: '#000000' }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-10 right-10 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${selectedCat.color}80, transparent)` }}
        />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
                style={{
                  background:  `${selectedCat.color}15`,
                  border:      `1px solid ${selectedCat.color}30`,
                  boxShadow:   `0 4px 20px ${selectedCat.color}15`,
                }}
              >
                <CatIcon size={20} style={{ color: selectedCat.color }} />
              </div>
              <div>
                <h3 className="font-orbitron text-white font-bold text-[16px] tracking-[0.15em]">
                  ADD EXPENSE
                </h3>
                <p className="font-rajdhani text-zinc-600 text-[11px] tracking-[0.15em] uppercase">
                  Record a new expense entry
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08]
                         flex items-center justify-center hover:bg-red-500/[0.1]
                         hover:border-red-500/[0.2] transition-all duration-200
                         hover:scale-105 active:scale-95"
            >
              <X size={16} className="text-zinc-500" />
            </button>
          </div>

          {/* Category Selection */}
          <div className="mb-6">
            <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.2em] uppercase font-semibold mb-3">
              Select Category
            </p>
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => {
                const sel  = catId === cat.id;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCatId(cat.id)}
                    className="group flex flex-col items-center gap-2 px-3 py-4 rounded-2xl
                               border transition-all duration-300 hover:scale-[1.03]"
                    style={{
                      borderColor:     sel ? `${cat.color}50` : 'rgba(255,255,255,0.06)',
                      backgroundColor: sel ? `${cat.color}12` : 'transparent',
                      boxShadow:       sel ? `0 4px 20px ${cat.color}15` : 'none',
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center
                                  transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `${cat.color}${sel ? '20' : '08'}`,
                        border:     `1px solid ${cat.color}${sel ? '35' : '15'}`,
                      }}
                    >
                      <Icon size={16} style={{ color: sel ? cat.color : `${cat.color}70` }} />
                    </div>
                    <span
                      className="font-rajdhani text-[9px] tracking-[0.12em] uppercase font-bold text-center leading-tight"
                      style={{ color: sel ? cat.color : '#71717a' }}
                    >
                      {cat.label}
                    </span>
                    {sel && (
                      <div className="w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: `${cat.color}25` }}>
                        <CheckCircle size={10} style={{ color: cat.color }} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Label */}
          {catId === 'custom' && (
            <div className="mb-5">
              <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.2em] uppercase font-semibold mb-2">
                Expense Name
              </p>
              <input
                value={customLabel}
                onChange={(e) => setCustomLabel(e.target.value)}
                placeholder="e.g. Gym Towels..."
                className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-purple-500/[0.2]
                           font-rajdhani text-white text-[14px] outline-none
                           placeholder:text-zinc-700 focus:border-purple-500/[0.4]
                           transition-colors duration-200"
              />
            </div>
          )}

          {/* Amount */}
          <div className="mb-5">
            <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.2em] uppercase font-semibold mb-2">
              Amount
            </p>
            <div
              className="flex items-center gap-3 px-5 py-4 rounded-2xl
                          bg-white/[0.03] border border-white/[0.08]
                          focus-within:border-white/[0.2] transition-colors duration-200"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `${selectedCat.color}12`,
                  border:     `1px solid ${selectedCat.color}25`,
                }}
              >
                <IndianRupee size={16} style={{ color: selectedCat.color }} />
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="flex-1 bg-transparent font-orbitron text-white text-[28px] font-bold
                           outline-none placeholder:text-zinc-800 tracking-wider"
              />
            </div>
          </div>

          {/* Note */}
          <div className="mb-8">
            <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.2em] uppercase font-semibold mb-2">
              Note (optional)
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note..."
              rows={2}
              className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]
                         font-rajdhani text-white text-[14px] outline-none
                         placeholder:text-zinc-700 resize-none focus:border-white/[0.2]
                         transition-colors duration-200"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl
                       font-orbitron font-bold text-[13px] tracking-[0.15em] text-black
                       transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background:  `linear-gradient(135deg, ${selectedCat.color} 0%, ${selectedCat.color}CC 100%)`,
              boxShadow:   `0 8px 32px ${selectedCat.color}35`,
            }}
          >
            <Plus size={18} />
            ADD EXPENSE
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* EXPENSE ROW                                                    */
/* ═══════════════════════════════════════════════════════════════ */
const ExpenseRow = ({ expense, onDelete }) => {
  const cat     = getCat(expense.categoryId);
  const CatIcon = cat.icon;

  return (
    <div
      className="group flex items-center gap-4 p-4 rounded-2xl
                  border border-white/[0.04] mb-3 hover:border-white/[0.1]
                  transition-all duration-300 hover:scale-[1.005]"
      style={{ background: 'rgba(255,255,255,0.015)' }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0
                    transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
        style={{
          background: `${cat.color}12`,
          border:     `1px solid ${cat.color}25`,
          boxShadow:  `0 4px 14px ${cat.color}10`,
        }}
      >
        <CatIcon size={18} style={{ color: cat.color }} />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-rajdhani font-bold text-white text-[14px] tracking-wide truncate">
            {expense.label}
          </p>
          <div className="px-2 py-0.5 rounded-md" style={{ background: `${cat.color}12` }}>
            <span
              className="font-rajdhani text-[8px] tracking-[0.15em] uppercase font-bold"
              style={{ color: `${cat.color}90` }}
            >
              {cat.label}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {expense.note && (
            <p className="font-rajdhani text-zinc-600 text-[11px]">{expense.note}</p>
          )}
          <div className="flex items-center gap-1">
            <Calendar size={10} className="text-zinc-700" />
            <p className="font-rajdhani text-zinc-700 text-[10px] tracking-wider">
              {formatDate(expense.date)}
            </p>
          </div>
        </div>
      </div>

      {/* Amount + Delete */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <span
            className="font-orbitron font-bold text-[15px] block"
            style={{ color: cat.color }}
          >
            {fmt(expense.amount)}
          </span>
        </div>
        <button
          onClick={() => onDelete(expense.id)}
          className="w-9 h-9 rounded-xl bg-red-900/[0.15] border border-red-700/[0.2]
                     flex items-center justify-center
                     opacity-0 group-hover:opacity-100
                     hover:bg-red-700/[0.25] hover:border-red-600/[0.4]
                     transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <Trash2 size={14} style={{ color: COLORS.redLight }} />
        </button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* OVERVIEW STAT CARD                                             */
/* ═══════════════════════════════════════════════════════════════ */
const OverviewCard = ({ icon: Icon, label, value, color, sub, trend, trendUp }) => (
  <GlassPanel hover className="group" glow={`${color}08`}>
    <div className="p-6">
      {/* Top accent */}
      <div
        className="absolute top-0 left-8 right-8 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }}
      />

      <div className="flex items-start justify-between mb-5">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center
                      transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{
            background: `${color}12`,
            border:     `1px solid ${color}25`,
            boxShadow:  `0 4px 20px ${color}12`,
          }}
        >
          <Icon size={18} style={{ color }} />
        </div>

        {trend && (
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
            style={{
              background:   trendUp ? 'rgba(22,163,74,0.10)'  : 'rgba(220,38,38,0.10)',
              border:       trendUp ? '1px solid rgba(22,163,74,0.25)' : '1px solid rgba(220,38,38,0.25)',
            }}
          >
            {trendUp
              ? <ArrowUpRight   size={11} style={{ color: COLORS.greenLight }} />
              : <ArrowDownRight size={11} style={{ color: COLORS.redLight   }} />
            }
            <span
              className="font-orbitron text-[9px] font-bold"
              style={{ color: trendUp ? COLORS.greenLight : COLORS.redLight }}
            >
              {trend}
            </span>
          </div>
        )}
      </div>

      <p
        className="font-orbitron font-bold text-[28px] leading-none mb-2
                    transition-all duration-300 group-hover:text-[30px]"
        style={{ color }}
      >
        ₹<AnimatedNumber value={value} />
      </p>
      <p className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.2em] uppercase font-semibold">
        {label}
      </p>

      {sub && (
        <>
          <div className="h-px bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-white/[0.04] my-3" />
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${color}60` }} />
            <span className="font-rajdhani text-zinc-600 text-[9px] tracking-[0.1em] uppercase">{sub}</span>
          </div>
        </>
      )}
    </div>
  </GlassPanel>
);

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN COMPONENT                                                 */
/* ═══════════════════════════════════════════════════════════════ */
const AdminExpenses = ({ onLogout }) => {
  const navigate = useNavigate();
  const [expenses,     setExpenses]     = useState(INITIAL_EXPENSES);
  const [showModal,    setShowModal]    = useState(false);
  const [period,       setPeriod]       = useState('monthly');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery,  setSearchQuery]  = useState('');

  const revenue      = REVENUE_DATA[period];
  const cash         = CASH_DATA[period];
  const totalExp     = expenses.reduce((sum, e) => sum + e.amount, 0);
  const net          = revenue.total - totalExp;
  const spentPercent = Math.round((totalExp / revenue.total) * 100);

  const catTotals = CATEGORIES.map((c) => ({
    ...c,
    total: expenses.filter((e) => e.categoryId === c.id).reduce((sum, e) => sum + e.amount, 0),
    count: expenses.filter((e) => e.categoryId === c.id).length,
  })).filter((c) => c.total > 0);

  const filtered = expenses
    .filter((e) => activeFilter === 'all' || e.categoryId === activeFilter)
    .filter((e) =>
      searchQuery === '' ||
      e.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.note && e.note.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const handleDelete = (id) => {
    if (window.confirm('Delete this expense?')) {
      setExpenses((p) => p.filter((e) => e.id !== id));
    }
  };

  return (
    <Layout title="FINANCE" onLogout={onLogout}>
      <div className="relative min-h-screen">

        {/* ── Background ── */}
        <div className="fixed inset-0 z-0"
          style={{ backgroundImage: `url(${SPLASH_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="fixed inset-0 z-[1]"
          style={{
            background: `
              radial-gradient(ellipse at 20% 0%,   rgba(197,160,89,0.05)  0%, transparent 50%),
              radial-gradient(ellipse at 80% 100%, rgba(220,38,38,0.04)   0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%,  rgba(22,163,74,0.03)   0%, transparent 70%),
              linear-gradient(180deg, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.97) 40%, #000000 100%)
            `,
          }}
        />

        {/* ── Content ── */}
        <div className="relative z-10 p-8 lg:p-10 space-y-8 max-w-[1600px] mx-auto">

          {/* ═══════════════════════════════════════════════════════ */}
          {/* HEADER                                                  */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <button
                onClick={() => navigate(-1)}
                className="w-12 h-12 rounded-2xl bg-black border border-white/[0.08]
                           flex items-center justify-center hover:bg-white/[0.04]
                           transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <ArrowLeft size={18} className="text-zinc-500" />
              </button>
              <div>
                <p className="font-rajdhani text-[11px] tracking-[0.3em] uppercase font-bold mb-1
                              flex items-center gap-2"
                  style={{ color: COLORS.gold }}>
                  <span>Financial Overview</span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/40">{period === 'monthly' ? 'This Month' : 'This Year'}</span>
                </p>
                <h1 className="font-orbitron text-white font-extrabold text-[28px] tracking-[0.2em]
                               bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  FINANCE CENTER
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Period Toggle */}
              <div className="flex bg-black border border-white/[0.08] rounded-2xl p-1.5">
                {['monthly', 'yearly'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-5 py-2.5 rounded-xl text-[11px] font-rajdhani font-bold
                                tracking-[0.15em] uppercase transition-all duration-300
                                ${period === p
                        ? 'bg-white/[0.08] text-white border border-white/[0.12]'
                        : 'text-zinc-600 hover:text-zinc-400'
                      }`}
                  >
                    {p === 'monthly' ? 'Monthly' : 'Yearly'}
                  </button>
                ))}
              </div>

              {/* Add Button */}
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl
                           font-rajdhani font-bold text-[12px] tracking-[0.15em] uppercase
                           text-black transition-all duration-300
                           hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldLight} 100%)`,
                  boxShadow:  `0 8px 32px rgba(197,160,89,0.30)`,
                }}
              >
                <Plus size={16} />
                Add Expense
              </button>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* TOP METRIC CARDS                                        */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <OverviewCard
              icon={TrendingUp}
              label="Total Revenue"
              value={revenue.total}
              color={COLORS.green}
              trend="+12%"
              trendUp={true}
              sub={period === 'monthly' ? 'this month collection' : 'annual collection'}
            />
            <OverviewCard
              icon={TrendingDown}
              label="Total Expenses"
              value={totalExp}
              color={COLORS.red}
              trend="-5%"
              trendUp={false}
              sub={`${expenses.length} transactions`}
            />
            <OverviewCard
              icon={CircleDollarSign}
              label="Net Profit"
              value={Math.abs(net)}
              color={net >= 0 ? COLORS.gold : COLORS.red}
              trend={net >= 0 ? '+8%' : '-3%'}
              trendUp={net >= 0}
              sub={net >= 0 ? 'profit margin' : 'loss recorded'}
            />
            <OverviewCard
              icon={Target}
              label="Budget Used"
              value={totalExp}
              color={COLORS.purpleLight}
              sub={`${spentPercent}% of revenue spent`}
            />
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* MAIN GRID                                               */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-12 gap-6">

            {/* ────────────────────────────────────────────────────
                LEFT COLUMN  (5 cols)
            ──────────────────────────────────────────────────── */}
            <div className="col-span-12 xl:col-span-5 space-y-6">

              {/* Revenue vs Expense */}
              <GlassPanel
                className="relative overflow-hidden"
                borderColor={`${COLORS.green}20`}
                glow={`${COLORS.green}06`}
              >
                {GYM_LOGO && (
                  <img
                    src={GYM_LOGO} alt=""
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-[180px] h-[90px]
                               object-contain opacity-[0.03] pointer-events-none"
                  />
                )}
                <div className="p-7 relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-1.5 h-8 rounded-full"
                      style={{ background: `linear-gradient(to bottom, ${COLORS.greenLight}, ${COLORS.green}30)` }}
                    />
                    <div>
                      <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.15em]">
                        OVERVIEW
                      </h3>
                      <p className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.15em] uppercase">
                        Revenue vs Expenses
                      </p>
                    </div>
                  </div>

                  {/* Revenue Bar */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.green }} />
                        <span className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.12em] uppercase font-semibold">
                          Revenue
                        </span>
                      </div>
                      <span className="font-orbitron text-[14px] font-bold" style={{ color: COLORS.green }}>
                        {fmt(revenue.total)}
                      </span>
                    </div>
                    <div className="h-3 bg-white/[0.04] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width:      '100%',
                          background: `linear-gradient(90deg, ${COLORS.green} 0%, ${COLORS.greenLight} 100%)`,
                          boxShadow:  `0 0 16px ${COLORS.green}40`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Expense Bar */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.red }} />
                        <span className="font-rajdhani text-zinc-400 text-[11px] tracking-[0.12em] uppercase font-semibold">
                          Expenses
                        </span>
                      </div>
                      <span className="font-orbitron text-[14px] font-bold" style={{ color: COLORS.red }}>
                        {fmt(totalExp)}
                      </span>
                    </div>
                    <div className="h-3 bg-white/[0.04] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width:      `${spentPercent}%`,
                          background: `linear-gradient(90deg, ${COLORS.red} 0%, ${COLORS.redLight} 100%)`,
                          boxShadow:  `0 0 16px ${COLORS.red}40`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent my-5" />

                  {/* Net Profit/Loss */}
                  <div
                    className="flex items-center justify-between px-5 py-4 rounded-2xl"
                    style={{
                      background: net >= 0 ? `${COLORS.gold}08`  : `${COLORS.red}08`,
                      border:     net >= 0 ? `1px solid ${COLORS.gold}20` : `1px solid ${COLORS.red}20`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: net >= 0 ? `${COLORS.gold}15` : `${COLORS.red}15` }}
                      >
                        {net >= 0
                          ? <TrendingUp   size={16} style={{ color: COLORS.gold }} />
                          : <TrendingDown size={16} style={{ color: COLORS.red  }} />
                        }
                      </div>
                      <div>
                        <p
                          className="font-rajdhani text-[11px] tracking-[0.12em] uppercase font-bold"
                          style={{ color: net >= 0 ? COLORS.gold : COLORS.red }}
                        >
                          Net {net >= 0 ? 'Profit' : 'Loss'}
                        </p>
                        <p className="font-rajdhani text-zinc-600 text-[9px] tracking-[0.1em] uppercase">
                          {100 - spentPercent}% margin
                        </p>
                      </div>
                    </div>
                    <span
                      className="font-orbitron font-bold text-[20px]"
                      style={{ color: net >= 0 ? COLORS.gold : COLORS.red }}
                    >
                      {fmt(Math.abs(net))}
                    </span>
                  </div>
                </div>
              </GlassPanel>

              {/* Cash Collection */}
              <GlassPanel borderColor={`${COLORS.blue}20`} glow={`${COLORS.blue}05`}>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-1.5 h-8 rounded-full"
                      style={{ background: `linear-gradient(to bottom, ${COLORS.blueLight}, ${COLORS.blue}30)` }}
                    />
                    <div>
                      <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.15em]">
                        COLLECTION
                      </h3>
                      <p className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.15em] uppercase">
                        Payment method breakdown
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        icon: Wallet,     label: 'CASH',   value: cash.cash,
                        color: COLORS.green,
                        percent: Math.round((cash.cash   / (cash.cash + cash.online)) * 100),
                      },
                      {
                        icon: CreditCard, label: 'ONLINE', value: cash.online,
                        color: COLORS.blueLight,
                        percent: Math.round((cash.online / (cash.cash + cash.online)) * 100),
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="group rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          background:   `${item.color}06`,
                          borderColor:  `${item.color}18`,
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4
                                      transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                          style={{
                            background: `${item.color}12`,
                            border:     `1px solid ${item.color}22`,
                          }}
                        >
                          <item.icon size={16} style={{ color: item.color }} />
                        </div>
                        <p
                          className="font-rajdhani font-bold text-[10px] tracking-[0.2em] uppercase mb-1"
                          style={{ color: `${item.color}80` }}
                        >
                          {item.label}
                        </p>
                        <p className="font-orbitron text-white font-bold text-[20px] mb-3">
                          {fmt(item.value)}
                        </p>
                        <div className="h-[3px] bg-white/[0.04] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width:      `${item.percent}%`,
                              background: `linear-gradient(90deg, ${item.color} 0%, ${item.color}70 100%)`,
                              boxShadow:  `0 0 8px ${item.color}35`,
                            }}
                          />
                        </div>
                        <p
                          className="font-orbitron text-[10px] font-bold mt-2"
                          style={{ color: `${item.color}80` }}
                        >
                          {item.percent}%
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassPanel>

              {/* Revenue Breakdown */}
              <GlassPanel borderColor={`${COLORS.gold}20`} glow={`${COLORS.gold}05`}>
                <div className="p-7">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-1.5 h-8 rounded-full"
                        style={{ background: `linear-gradient(to bottom, ${COLORS.gold}, ${COLORS.gold}20)` }}
                      />
                      <div>
                        <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.15em]">
                          REVENUE
                        </h3>
                        <p className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.15em] uppercase">
                          Income breakdown
                        </p>
                      </div>
                    </div>
                    <span className="font-orbitron text-[16px] font-bold" style={{ color: COLORS.green }}>
                      {fmt(revenue.total)}
                    </span>
                  </div>

                  {[
                    { label: 'Memberships', value: revenue.memberships, color: COLORS.gold,      icon: CreditCard },
                    { label: 'Others',      value: revenue.others,      color: COLORS.cyanLight,  icon: Receipt    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-4 py-4 border-b border-white/[0.04]
                                  last:border-0 hover:bg-white/[0.02] rounded-xl px-3
                                  transition-all duration-300 -mx-3"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center
                                    transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `${item.color}10`,
                          border:     `1px solid ${item.color}18`,
                        }}
                      >
                        <item.icon size={14} style={{ color: item.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="font-rajdhani text-zinc-400 text-[12px] font-semibold tracking-wider">
                          {item.label}
                        </p>
                        <div className="h-[3px] bg-white/[0.04] rounded-full overflow-hidden mt-2">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width:      `${Math.round((item.value / revenue.total) * 100)}%`,
                              background: `linear-gradient(90deg, ${item.color} 0%, ${item.color}70 100%)`,
                              boxShadow:  `0 0 8px ${item.color}30`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-orbitron text-white text-[14px] font-bold block">
                          {fmt(item.value)}
                        </span>
                        <span className="font-rajdhani text-zinc-600 text-[10px] tracking-wider">
                          {Math.round((item.value / revenue.total) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </div>

            {/* ────────────────────────────────────────────────────
                RIGHT COLUMN  (7 cols)
            ──────────────────────────────────────────────────── */}
            <div className="col-span-12 xl:col-span-7 space-y-6">

              {/* Category Breakdown */}
              <GlassPanel borderColor={`${COLORS.red}20`} glow={`${COLORS.red}05`}>
                <div className="p-7">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-1.5 h-8 rounded-full"
                        style={{ background: `linear-gradient(to bottom, ${COLORS.redLight}, ${COLORS.red}30)` }}
                      />
                      <div>
                        <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.15em]">
                          EXPENSE CATEGORIES
                        </h3>
                        <p className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.15em] uppercase">
                          Spending distribution
                        </p>
                      </div>
                    </div>
                    <span className="font-orbitron text-[16px] font-bold" style={{ color: COLORS.red }}>
                      {fmt(totalExp)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {catTotals.map((cat) => {
                      const CatIcon = cat.icon;
                      const percent = Math.round((cat.total / totalExp) * 100);
                      const active  = activeFilter === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveFilter(active ? 'all' : cat.id)}
                          className="group text-left p-4 rounded-2xl border transition-all duration-300
                                     hover:scale-[1.02]"
                          style={{
                            background:   active ? `${cat.color}12` : 'rgba(255,255,255,0.015)',
                            borderColor:  active ? `${cat.color}35` : 'rgba(255,255,255,0.07)',
                            boxShadow:    active ? `0 4px 20px ${cat.color}12` : 'none',
                          }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center
                                          transition-all duration-300 group-hover:scale-110"
                              style={{ background: `${cat.color}12` }}
                            >
                              <CatIcon size={14} style={{ color: cat.color }} />
                            </div>
                            <span
                              className="font-orbitron text-[9px] font-bold"
                              style={{ color: `${cat.color}90` }}
                            >
                              {percent}%
                            </span>
                          </div>
                          <p className="font-orbitron text-white font-bold text-[14px] mb-1">
                            {fmt(cat.total)}
                          </p>
                          <p
                            className="font-rajdhani text-[9px] tracking-[0.12em] uppercase font-semibold"
                            style={{ color: `${cat.color}80` }}
                          >
                            {cat.label}
                          </p>
                          <div className="h-[2px] bg-white/[0.04] rounded-full overflow-hidden mt-3">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{
                                width:      `${percent}%`,
                                background: `linear-gradient(90deg, ${cat.color} 0%, ${cat.color}60 100%)`,
                                boxShadow:  `0 0 6px ${cat.color}30`,
                              }}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </GlassPanel>

              {/* Transactions List */}
              <GlassPanel className="flex flex-col" borderColor="rgba(255,255,255,0.07)">

                {/* List Header */}
                <div className="p-6 border-b border-white/[0.05]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-white/40 to-white/[0.05]" />
                      <div>
                        <h3 className="font-orbitron text-white font-bold text-[14px] tracking-[0.15em]">
                          TRANSACTIONS
                        </h3>
                        <p className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.15em] uppercase">
                          {filtered.length}{' '}
                          {activeFilter !== 'all' ? getCat(activeFilter).label : ''} expenses
                        </p>
                      </div>
                    </div>

                    {activeFilter !== 'all' && (
                      <button
                        onClick={() => setActiveFilter('all')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                                   bg-white/[0.04] border border-white/[0.08]
                                   hover:bg-red-900/[0.15] hover:border-red-700/[0.2]
                                   transition-all duration-200"
                      >
                        <X size={12} className="text-zinc-500" />
                        <span className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.12em] uppercase font-bold">
                          Clear Filter
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Search */}
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl
                                bg-white/[0.03] border border-white/[0.06]
                                focus-within:border-white/[0.15] transition-colors duration-200"
                  >
                    <Search size={16} className="text-zinc-600" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search expenses..."
                      className="flex-1 bg-transparent font-rajdhani text-white text-[13px]
                                 outline-none placeholder:text-zinc-700 tracking-wider"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="w-6 h-6 rounded-lg bg-white/[0.06] flex items-center justify-center
                                   hover:bg-white/[0.1] transition-all"
                      >
                        <X size={10} className="text-zinc-500" />
                      </button>
                    )}
                  </div>
                </div>

                {/* List Body */}
                <div className="flex-1 overflow-y-auto p-6 max-h-[600px]">
                  {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div
                        className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08]
                                    flex items-center justify-center mb-4"
                      >
                        <Receipt size={24} className="text-zinc-700" />
                      </div>
                      <p className="font-orbitron text-zinc-600 text-[13px] tracking-wider mb-1">
                        No expenses found
                      </p>
                      <p className="font-rajdhani text-zinc-700 text-[11px] tracking-wider">
                        {searchQuery ? 'Try a different search' : 'Add your first expense'}
                      </p>
                    </div>
                  ) : (
                    filtered.map((exp) => (
                      <ExpenseRow key={exp.id} expense={exp} onDelete={handleDelete} />
                    ))
                  )}
                </div>

                {/* List Footer */}
                {filtered.length > 0 && (
                  <div className="px-6 py-4 border-t border-white/[0.05]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{
                            background: `${COLORS.red}10`,
                            border:     `1px solid ${COLORS.red}20`,
                          }}
                        >
                          <BarChart3 size={14} style={{ color: COLORS.redLight }} />
                        </div>
                        <div>
                          <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.12em] uppercase font-semibold">
                            {activeFilter !== 'all'
                              ? `${getCat(activeFilter).label} Total`
                              : 'Filtered Total'}
                          </p>
                          <p
                            className="font-orbitron font-bold text-[16px]"
                            style={{ color: COLORS.red }}
                          >
                            {fmt(filtered.reduce((sum, e) => sum + e.amount, 0))}
                          </p>
                        </div>
                      </div>
                      <div
                        className="flex items-center gap-2 px-4 py-2 rounded-xl
                                    bg-white/[0.03] border border-white/[0.06]"
                      >
                        <Receipt size={12} className="text-zinc-600" />
                        <span className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.12em] uppercase font-bold">
                          {filtered.length} entries
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </GlassPanel>
            </div>
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showModal && (
        <AddExpenseModal
          onClose={() => setShowModal(false)}
          onAdd={(exp) => {
            setExpenses((p) => [exp, ...p]);
            setShowModal(false);
          }}
        />
      )}
    </Layout>
  );
};

export default AdminExpenses;