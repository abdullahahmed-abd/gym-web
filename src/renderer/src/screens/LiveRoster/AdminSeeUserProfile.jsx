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
  Clock,
  CheckCircle,
  AlertCircle,
  Timer,
  Edit2,
  Trash2,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

const TIER_COLORS = {
  'ELITE TIER': '#C5A059',
  'LEGENDARY TIER': '#a855f7',
};

const STATUS_CONFIG = {
  active: { label: 'ACTIVE', color: '#22C55E', icon: CheckCircle },
  expired: { label: 'EXPIRED', color: '#EF4444', icon: AlertCircle },
  trial: { label: 'TRIAL', color: '#3B82F6', icon: Timer },
};

const AdminSeeUserProfile = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const member = location.state?.member;

  if (!member) {
    return (
      <Layout title="MEMBER PROFILE" onLogout={onLogout}>
        <div className="p-8 text-center text-zinc-500">
          Member not found
        </div>
      </Layout>
    );
  }

  const tierColor =
    TIER_COLORS[member.membershipType] || '#3B82F6';

  const status = STATUS_CONFIG[member.membershipStatus];

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const getDaysLeftText = () => {
    if (member.membershipStatus === 'expired') return 'Expired';
    if (member.membershipStatus === 'trial')
      return `${member.daysLeft} days trial left`;
    return `${member.daysLeft} days left`;
  };

  return (
    <Layout title="MEMBER PROFILE" onLogout={onLogout}>
      <div className="p-8 space-y-6">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 font-rajdhani uppercase tracking-widest text-sm"
        >
          <ArrowLeft size={16} />
          Back to Roster
        </button>

        {/* ───────── HERO CARD ───────── */}
        <GlassCard className="p-6 relative overflow-hidden">

          {/* Background watermark */}
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
                  {member.membershipType || 'TRIAL'}
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

        {/* ───────── ALERT CARD (Expired / Trial) ───────── */}
        {(member.membershipStatus === 'expired' ||
          member.membershipStatus === 'trial') && (
          <GlassCard className="p-5 border border-red-500/20 bg-red-500/5">
            <div className="flex items-center gap-4">
              <AlertCircle size={20} className="text-red-400" />
              <div className="flex-1">
                <h4 className="font-orbitron text-red-400 text-sm font-bold tracking-widest uppercase">
                  {member.membershipStatus === 'expired'
                    ? 'Membership Expired'
                    : 'Trial Period'}
                </h4>
                <p className="text-zinc-400 text-sm">
                  {member.membershipStatus === 'expired'
                    ? `Expired on ${formatDate(member.expiryDate)}`
                    : `${member.daysLeft} days remaining`}
                </p>
              </div>

              <button
                className="px-4 py-2 rounded-xl bg-[#C5A059] text-black
                           font-orbitron text-xs tracking-widest uppercase flex items-center gap-2"
              >
                <Sparkles size={14} />
                {member.membershipStatus === 'expired'
                  ? 'Renew'
                  : 'Upgrade'}
              </button>
            </div>
          </GlassCard>
        )}

        {/* ───────── CONTACT ───────── */}
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

        {/* ───────── MEMBERSHIP ───────── */}
        <GlassCard className="p-6 space-y-4">
          <h4 className="font-rajdhani text-sm tracking-widest uppercase text-zinc-500">
            Membership
          </h4>

          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Joined</span>
            <span className="font-orbitron text-white">
              {formatDate(member.joinDate)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Expires</span>
            <span className="font-orbitron text-white">
              {formatDate(member.expiryDate)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Status</span>
            <span style={{ color: status.color }} className="font-orbitron">
              {status.label}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Remaining</span>
            <span className="font-orbitron text-white">
              {getDaysLeftText()}
            </span>
          </div>
        </GlassCard>

        {/* ───────── ACTION BUTTONS ───────── */}
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

export default AdminSeeUserProfile;