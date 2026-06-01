import React from 'react';
import { Bell, Search } from 'lucide-react';

const Header = ({ title = 'DASHBOARD' }) => {
  return (
    <div className="flex items-center justify-between px-8 py-4
                    border-b border-white/5 bg-black/50 backdrop-blur-xl">
      {/* Title */}
      <div>
        <h1 className="font-orbitron text-white font-bold text-xl tracking-widest">
          {title}
        </h1>
        <p className="font-rajdhani text-zinc-500 text-sm tracking-wider mt-0.5">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl
                        bg-white/5 border border-white/8 hover:border-white/15
                        transition-all cursor-pointer group">
          <Search size={15} className="text-zinc-500 group-hover:text-zinc-300" />
          <span className="font-rajdhani text-zinc-500 text-sm tracking-wider">
            Quick Search...
          </span>
          <span className="font-rajdhani text-zinc-700 text-xs ml-2">⌘K</span>
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/8
                           flex items-center justify-center hover:bg-white/10
                           transition-all">
          <Bell size={16} className="text-zinc-400" />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full
                          bg-yellow-400 border border-black" />
        </button>

        {/* Admin Badge */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl
                        bg-yellow-500/10 border border-yellow-500/20">
          <div className="w-6 h-6 rounded-lg bg-yellow-500/20 flex items-center
                          justify-center font-orbitron text-yellow-400 text-xs font-bold">
            A
          </div>
          <span className="font-rajdhani text-yellow-400 text-sm font-semibold
                           tracking-wider uppercase">
            Admin
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;