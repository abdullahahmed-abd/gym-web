import React, { useState } from 'react';
import Layout from '../../components/shared/Layout';
import GlassCard from '../../components/shared/GlassCard';
import {
  Users,
  Search,
  Phone,
  Shield,
  Activity,
  Dumbbell,
  CheckCircle,
  AlertCircle,
  Clock,
  X,
} from 'lucide-react';

const TRAINER_COLOR = '#22D3EE';

const DUMMY_MEMBERS = [
  {
    id: '1',
    name: 'Abdullah Ahmed',
    avatar: 'AA',
    memberId: 'GYM001',
    phone: '+91 88171 59218',
    membershipType: 'ELITE TIER',
    membershipStatus: 'active',
    workoutType: 'cardio_weights',
    isLive: true,
  },
  {
    id: '2',
    name: 'Priya Patel',
    avatar: 'PP',
    memberId: 'GYM002',
    phone: '+91 98765 43211',
    membershipType: 'LEGENDARY TIER',
    membershipStatus: 'expired',
    workoutType: 'weights_only',
    isLive: false,
  },
];

const STATUS_CONFIG = {
  active: { label: 'ACTIVE', color: '#22C55E', icon: CheckCircle },
  expired: { label: 'EXPIRED', color: '#EF4444', icon: AlertCircle },
  trial: { label: 'TRIAL', color: '#3B82F6', icon: Clock },
};

const TIER_COLORS = {
  'ELITE TIER': '#C5A059',
  'LEGENDARY TIER': '#a855f7',
};

const AdminUsersDetail = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('members');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredMembers = DUMMY_MEMBERS.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.memberId.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === 'all' ||
      (filter === 'live' && m.isLive) ||
      (filter === 'offline' && !m.isLive);

    return matchesSearch && matchesFilter;
  });

  return (
    <Layout title="MEMBERS" onLogout={onLogout}>
      <div className="p-8 space-y-6">

        {/* ───── Stats Row ───── */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'PENDING', value: 3, color: '#C5A059', },
            { label: 'LIVE', value: 8, color: '#22C55E' },
            { label: 'TRAINERS', value: 2, color: TRAINER_COLOR },
            { label: 'TOTAL', value: DUMMY_MEMBERS.length, color: '#ffffff' },
          ].map((stat) => (
            <GlassCard key={stat.label} className="p-4 text-center">
              <p
                className="font-orbitron text-xl font-bold"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="font-rajdhani text-xs tracking-widest uppercase text-zinc-500">
                {stat.label}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* ───── Tabs ───── */}
        <div className="flex gap-3">
          {['requests', 'members'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-rajdhani tracking-widest uppercase border transition-all ${
                activeTab === tab
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-white/5 border-white/10 text-zinc-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'members' && (
          <>
            {/* ───── Search Bar ───── */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl
                            bg-white/5 border border-white/10">
              <Search size={16} className="text-zinc-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name or ID..."
                className="flex-1 bg-transparent text-white font-rajdhani
                           outline-none placeholder:text-zinc-600"
              />
              {search && (
                <button onClick={() => setSearch('')}>
                  <X size={14} className="text-zinc-500" />
                </button>
              )}
            </div>

            {/* ───── Filter Row ───── */}
            <div className="flex gap-3">
              {['all', 'live', 'offline'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-rajdhani
                               tracking-widest uppercase border transition-all ${
                    filter === f
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-white/5 border-white/10 text-zinc-500'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* ───── Members Grid ───── */}
            <div className="grid grid-cols-2 gap-5">
              {filteredMembers.map((member) => {
                const status = STATUS_CONFIG[member.membershipStatus];
                const tierColor =
                  TIER_COLORS[member.membershipType] || '#3B82F6';

                return (
                  <GlassCard
                    key={member.id}
                    className="p-5 relative overflow-hidden hover:border-white/20 transition-all"
                  >
                    {/* BG Icon */}
                    <div className="absolute -top-4 -right-4 opacity-10">
                      <Shield size={80} color={tierColor} />
                    </div>

                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-orbitron font-bold text-white"
                        style={{
                          backgroundColor: `${tierColor}20`,
                          border: `1px solid ${tierColor}40`,
                        }}
                      >
                        {member.avatar}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-orbitron text-white text-sm">
                            {member.name}
                          </h3>

                          <span
                            className="text-xs font-rajdhani uppercase tracking-wider"
                            style={{ color: status.color }}
                          >
                            {status.label}
                          </span>
                        </div>

                        <p className="text-xs text-zinc-500 font-rajdhani">
                          {member.memberId}
                        </p>

                        <div className="flex items-center gap-2 mt-2 text-xs">
                          {member.workoutType === 'cardio_weights' ? (
                            <Activity size={12} color={tierColor} />
                          ) : (
                            <Dumbbell size={12} color={tierColor} />
                          )}
                          <span className="text-zinc-400 font-rajdhani uppercase">
                            {member.workoutType === 'cardio_weights'
                              ? 'Cardio + Weights'
                              : 'Weights Only'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-white/10 my-4" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <Phone size={12} />
                        {member.phone}
                      </div>

                      {member.isLive && (
                        <span className="text-green-400 text-xs font-orbitron">
                          LIVE
                        </span>
                      )}
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </>
        )}

        {activeTab === 'requests' && (
          <div className="text-center text-zinc-500 font-rajdhani mt-10">
            Membership request UI coming next…
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminUsersDetail;