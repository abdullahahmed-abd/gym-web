// src/components/admin/pages/DashboardHome.jsx
import { Users, Dumbbell, CreditCard, TrendingUp, Activity, Clock } from 'lucide-react'

const STATS = [
  { label: 'Total Members', value: '128', icon: Users,       color: 'yellow', change: '+12 this month' },
  { label: 'Active Trainers', value: '8', icon: Dumbbell,    color: 'cyan',   change: '2 added recently' },
  { label: 'Monthly Revenue', value: '₹1.85L', icon: CreditCard, color: 'green', change: '+18% vs last month' },
  { label: 'Live Right Now', value: '15',  icon: Activity,   color: 'purple', change: 'Members in gym' },
]

const COLORS = {
  yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/20' },
  cyan:   { bg: 'bg-cyan-400/10',   text: 'text-cyan-400',   border: 'border-cyan-400/20'   },
  green:  { bg: 'bg-green-500/10',  text: 'text-green-500',  border: 'border-green-500/20'  },
  purple: { bg: 'bg-purple-400/10', text: 'text-purple-400', border: 'border-purple-400/20' },
}

const LIVE_MEMBERS = [
  { name: 'Abdullah Ahmed', avatar: 'AA', checkin: '6:30 AM', duration: '2h 15m', tier: 'ELITE'     },
  { name: 'Sneha Gupta',    avatar: 'SG', checkin: '6:50 AM', duration: '1h 55m', tier: 'LEGENDARY' },
  { name: 'Karan Malhotra', avatar: 'KM', checkin: '7:00 AM', duration: '1h 45m', tier: 'ELITE'     },
  { name: 'Rahul Verma',    avatar: 'RV', checkin: '7:15 AM', duration: '1h 30m', tier: 'TRIAL'     },
]

const TIER_COLORS = {
  ELITE:     'text-yellow-500',
  LEGENDARY: 'text-purple-400',
  TRIAL:     'text-blue-400',
}

export default function DashboardHome({ adminData }) {
  return (
    <div className="p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="font-rajdhani text-sm text-zinc-500 tracking-wider uppercase mb-1">
          Administrator
        </p>
        <h1 className="font-orbitron text-2xl font-bold text-white tracking-wide">
          CONTROL PANEL
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat, i) => {
          const c = COLORS[stat.color]
          return (
            <div key={i} className={`glass rounded-2xl p-5 border ${c.border}`}>
              <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-4`}>
                <stat.icon className={`w-5 h-5 ${c.text}`} />
              </div>
              <p className="font-orbitron text-2xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="font-rajdhani text-xs text-zinc-500 tracking-wider uppercase mb-1">
                {stat.label}
              </p>
              <p className="font-rajdhani text-xs text-zinc-700">
                {stat.change}
              </p>
            </div>
          )
        })}
      </div>

      {/* Two Column */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Live Members */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h3 className="font-orbitron text-sm font-bold text-white tracking-wide">
                LIVE IN GYM
              </h3>
            </div>
            <span className="font-orbitron text-xs text-green-500 bg-green-500/10 px-3 py-1 rounded-lg border border-green-500/20">
              {LIVE_MEMBERS.length} Members
            </span>
          </div>

          <div className="space-y-3">
            {LIVE_MEMBERS.map((member, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                  <span className="font-orbitron text-xs font-bold text-zinc-400">
                    {member.avatar}
                  </span>
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-rajdhani text-sm font-semibold text-white truncate">
                    {member.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-zinc-600" />
                    <span className="font-rajdhani text-xs text-zinc-600">
                      {member.checkin} • {member.duration}
                    </span>
                  </div>
                </div>
                {/* Tier */}
                <span className={`font-orbitron text-[9px] font-bold ${TIER_COLORS[member.tier]}`}>
                  {member.tier}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Summary */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-orbitron text-sm font-bold text-white tracking-wide">
              REVENUE TODAY
            </h3>
            <span className="font-rajdhani text-xs text-zinc-600 tracking-wider">
              20 Jan 2025
            </span>
          </div>

          <p className="font-orbitron text-3xl font-bold text-yellow-500 mb-1">
            ₹45,200
          </p>
          <p className="font-rajdhani text-sm text-zinc-500 mb-6">
            Total collection today
          </p>

          {/* Progress */}
          <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
              style={{ width: '75%' }}
            />
          </div>
          <div className="flex justify-between">
            <span className="font-rajdhani text-xs text-zinc-600">75% of daily target</span>
            <span className="font-rajdhani text-xs text-zinc-600">Target: ₹60K</span>
          </div>

          {/* Breakdown */}
          <div className="mt-6 pt-5 border-t border-white/[0.06] grid grid-cols-3 gap-4">
            {[
              { label: 'Memberships', value: '₹32K', color: 'text-yellow-500' },
              { label: 'Renewals',    value: '₹8K',  color: 'text-purple-400' },
              { label: 'Others',      value: '₹5.2K', color: 'text-cyan-400'  },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <p className={`font-orbitron text-sm font-bold ${item.color}`}>{item.value}</p>
                <p className="font-rajdhani text-[10px] text-zinc-600 uppercase tracking-wider mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}