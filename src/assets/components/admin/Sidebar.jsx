// src/components/admin/Sidebar.jsx
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Dumbbell,
  DollarSign,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard',  icon: LayoutDashboard },
  { id: 'members',   label: 'Members',    icon: Users            },
  { id: 'plans',     label: 'Plans',      icon: CreditCard       },
  { id: 'trainers',  label: 'Trainers',   icon: Dumbbell         },
  { id: 'expenses',  label: 'Expenses',   icon: DollarSign       },
  { id: 'settings',  label: 'Settings',   icon: Settings         },
]

export default function Sidebar({ activePage, onPageChange, adminData, onLogout }) {
  return (
    <aside className="w-56 min-h-[calc(100vh-40px)] bg-[#0a0a0a] border-r border-white/[0.06] flex flex-col">

      {/* Gym Info */}
      <div className="px-4 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
            <Dumbbell className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="min-w-0">
            <p className="font-orbitron text-xs font-bold text-white tracking-wide truncate">
              {adminData?.gymName || 'My Gym'}
            </p>
            <p className="font-rajdhani text-[10px] text-zinc-600 tracking-wider">
              Code: {adminData?.gymCode || 'GYM001'}
            </p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                isActive
                  ? 'bg-yellow-500/10 border border-yellow-500/20'
                  : 'hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              <item.icon className={`w-4 h-4 flex-shrink-0 transition-colors ${
                isActive ? 'text-yellow-500' : 'text-zinc-600 group-hover:text-zinc-400'
              }`} />
              <span className={`font-rajdhani text-sm font-semibold tracking-wide transition-colors ${
                isActive ? 'text-yellow-500' : 'text-zinc-600 group-hover:text-zinc-400'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <ChevronRight className="w-3 h-3 text-yellow-500/50 ml-auto" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom - User + Logout */}
      <div className="px-3 py-4 border-t border-white/[0.06] space-y-2">
        {/* User Info */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
            <span className="font-orbitron text-[10px] font-bold text-zinc-400">
              {adminData?.name?.slice(0, 2).toUpperCase() || 'AD'}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-rajdhani text-xs font-semibold text-zinc-400 truncate">
              {adminData?.name || 'Admin'}
            </p>
            <p className="font-rajdhani text-[10px] text-zinc-700 truncate">
              {adminData?.email || ''}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent hover:bg-red-500/[0.06] hover:border-red-500/20 transition-all duration-300 group"
        >
          <LogOut className="w-4 h-4 text-zinc-700 group-hover:text-red-500 transition-colors" />
          <span className="font-rajdhani text-sm font-semibold text-zinc-700 group-hover:text-red-500 transition-colors tracking-wide">
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  )
}