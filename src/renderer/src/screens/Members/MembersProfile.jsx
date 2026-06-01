import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import GlassCard from '../../components/shared/GlassCard';
import {
  Shield,
  Phone,
  Mail,
  Activity,
  Dumbbell,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit2,
  Trash2,
} from 'lucide-react';

const TRAINER_COLOR = '#22D3EE';

const STATUS_CONFIG = {
  active: { label: 'ACTIVE', color: '#22C55E', icon: CheckCircle },
  expired: { label: 'EXPIRED', color: '#EF4444', icon: AlertCircle },
  trial: { label: 'TRIAL', color: '#3B82F6', icon: Clock },
};

const TIER_COLORS = {
  'ELITE TIER': '#C5A059',
  'LEGENDARY TIER': '#a855f7',
};

const MembersProfile = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const member = location.state?.member;

  if (!member) {
    return (
      <Layout title="MEMBER PROFILE" onLogout={onLogout}>
        <div className="p-8 text-center text-zinc-500">
          Member not found.
        </div>
      </Layout>
    );
  }

  const status = STATUS_CONFIG[member.membershipStatus];
  const tierColor =
    TIER_COLORS[member.membershipType] || '#3B82F6';

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <Layout title="MEMBER PROFILE" onLogout={onLogout}>
      <div className="p-8 space-y-6">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-zinc-500 hover:text-zinc-300 font-rajdhani tracking-widest uppercase text-sm"
        >
          ← Back
        </button>

        {/* ───────────────── HERO CARD ───────────────── */}
        <GlassCard className="p-6 relative overflow-hidden">

          {/* BG Icon */}
          <div className="absolute -top-4 -right-4 opacity-10">
            <Shield size={100} color={tierColor} />
          </div>

          <div className="flex items-start gap-6 relative z-10">

            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center
                         font-orbitron font-bold text-white text-xl"
              style={{
                backgroundColor: `${tierColor}20`,
                border: `2px solid ${tierColor}40`,
              }}
            >
              {member.avatar}
            </div>

            <div className="flex-1">

              {/* Badges */}
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="px-2 py-1 rounded text-xs font-rajdhani uppercase tracking-wider border"
                  style={{
                    borderColor: `${tierColor}40`,
                    color: tierColor,
                  }}
                >
                  {member.membershipType}
                </span>

                <span
                  className="px-2 py-1 rounded text-xs font-rajdhani uppercase tracking-wider"
                  style={{ color: status.color }}
                >
                  {status.label}
                </span>

                {member.isLive && (
                  <span className="text-green-400 text-xs font-orbitron">
                    LIVE
                  </span>
                )}
              </div>

              <h2 className="font-orbitron text-white text-xl font-bold">
                {member.name}
              </h2>

              <div className="flex items-center gap-2 mt-2 text-xs text-zinc-400">
                {member.workoutType === 'cardio_weights'
                  ? <Activity size={14} color={tierColor} />
                  : <Dumbbell size={14} color={tierColor} />
                }
                {member.workoutType === 'cardio_weights'
                  ? 'Cardio + Weights'
                  : 'Weights Only'}
              </div>

              <div className="flex items-center gap-2 mt-2 text-xs text-zinc-400">
                <Clock size={14} />
                {member.duration || 'No active session'}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* ───────────────── CONTACT CARD ───────────────── */}
        <GlassCard className="p-6 space-y-4">
          <h4 className="font-rajdhani text-sm tracking-widest uppercase text-zinc-500">
            Contact Info
          </h4>

          <div className="flex items-center gap-3 text-sm">
            <Phone size={16} className="text-green-400" />
            {member.phone}
          </div>

          {member.email && (
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-blue-400" />
              {member.email}
            </div>
          )}
        </GlassCard>

        {/* ───────────────── ACTIVITY CARD ───────────────── */}
        <GlassCard className="p-6 space-y-4">
          <h4 className="font-rajdhani text-sm tracking-widest uppercase text-zinc-500">
            Activity
          </h4>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-zinc-500">Check-in</p>
              <p className="font-orbitron text-white">
                {member.checkinTime || '--:--'}
              </p>
            </div>
            <div>
              <p className="text-zinc-500">Check-out</p>
              <p className="font-orbitron text-white">
                {member.lastCheckout || '--:--'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-zinc-500">Total Visits</p>
              <p className="font-orbitron text-white">
                {member.totalVisits || 0}
              </p>
            </div>
            <div>
              <p className="text-zinc-500">Streak 🔥</p>
              <p className="font-orbitron text-white">
                {member.currentStreak || 0}
              </p>
            </div>
          </div>
        </GlassCard>

        {/* ───────────────── MEMBERSHIP CARD ───────────────── */}
        <GlassCard className="p-6 space-y-4">
          <h4 className="font-rajdhani text-sm tracking-widest uppercase text-zinc-500">
            Membership
          </h4>

          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Joined</span>
            <span className="text-white font-orbitron">
              {formatDate(member.joinDate)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Expires</span>
            <span className="text-white font-orbitron">
              {formatDate(member.expiryDate)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Paid</span>
            <span className="text-white font-orbitron">
              ₹{member.paidAmount || 0}
            </span>
          </div>
        </GlassCard>

        {/* ───────────────── ACTIONS ───────────────── */}
        <div className="flex gap-4">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
                       bg-blue-500/10 border border-blue-500/30
                       font-rajdhani tracking-widest uppercase text-blue-400"
          >
            <Edit2 size={16} />
            Edit
          </button>

          <button
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
                       bg-red-500/10 border border-red-500/30
                       font-rajdhani tracking-widest uppercase text-red-400"
          >
            <Trash2 size={16} />
            Remove
          </button>
        </div>

      </div>
    </Layout>
  );
};

export default MembersProfile;