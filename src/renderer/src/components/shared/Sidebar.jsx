import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Shield, Users, Dumbbell,
  DollarSign, Radio, Settings, LogOut,
} from 'lucide-react';

const NAV = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Plans', path: '/plans', icon: Shield },
  { label: 'Members', path: '/members', icon: Users },
  { label: 'Trainers', path: '/trainers', icon: Dumbbell },
  { label: 'Finance', path: '/expenses', icon: DollarSign },
  { label: 'Live Roster', path: '/live-roster', icon: Radio },
  { label: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="relative z-30 w-60 shrink-0 flex flex-col
                      border-r border-white/5 bg-black/80 backdrop-blur-2xl">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#C5A059]/15 border border-[#C5A059]/25
                         flex items-center justify-center">
            <div className="w-3 h-3 bg-[#C5A059] rounded-sm" />
          </div>
          <div>
            <p className="font-orbitron text-white text-sm tracking-[0.3em] font-bold leading-none">
              GYM
            </p>
            <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.2em] uppercase mt-0.5">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2.5 py-3 space-y-1 overflow-y-auto">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active =
            location.pathname === item.path ||
            (item.path === '/plans' && location.pathname.startsWith('/plans'));

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={`
                w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl
                border transition-all duration-200 text-left
                ${active
                  ? 'bg-white/8 border-white/10'
                  : 'bg-transparent border-transparent hover:bg-white/4 hover:border-white/6'
                }
              `}
            >
              <Icon
                size={17}
                className={active ? 'text-[#C5A059]' : 'text-zinc-500'}
              />
              <span
                className={`
                  font-rajdhani text-[13px] font-semibold tracking-[0.15em] uppercase
                  ${active ? 'text-white' : 'text-zinc-400'}
                `}
              >
                {item.label}
              </span>

              {/* Live indicator */}
              {item.label === 'Live Roster' && (
                <div className="ml-auto flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="font-orbitron text-green-400 text-[10px] font-bold">
                    15
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-2.5 py-3 border-t border-white/5">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl
                     border border-transparent text-left
                     hover:bg-red-500/8 hover:border-red-500/15
                     transition-all duration-200"
        >
          <LogOut size={17} className="text-zinc-600" />
          <span className="font-rajdhani text-[13px] font-semibold tracking-[0.15em]
                          uppercase text-zinc-500">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;