import React from 'react';
import Sidebar from './Sidebar';

const BG_IMAGE = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80';

const Layout = ({ children, title, onLogout }) => {
  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-black">
      {/* ── Background Image ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <img
          src={BG_IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-15 blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black" />
      </div>

      {/* ── Sidebar ── */}
      <Sidebar onLogout={onLogout} />

      {/* ── Main Area ── */}
      <div className="relative z-20 flex flex-1 flex-col min-w-0">
        {/* Header */}
        <header className="relative z-30 flex items-center justify-between
                          px-8 py-4 border-b border-white/5 bg-black/40
                          backdrop-blur-xl shrink-0">
          <div>
            <h1 className="font-orbitron text-white font-bold text-xl tracking-[0.25em]">
              {title || 'DASHBOARD'}
            </h1>
            <p className="font-rajdhani text-zinc-500 text-xs tracking-wider mt-0.5">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Admin badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl
                         bg-[#C5A059]/10 border border-[#C5A059]/20">
            <div className="w-6 h-6 rounded-lg bg-[#C5A059]/20 flex items-center
                           justify-center font-orbitron text-[#C5A059] text-xs font-bold">
              A
            </div>
            <span className="font-rajdhani text-[#C5A059] text-sm font-semibold
                            tracking-[0.15em] uppercase">
              Admin
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="relative z-20 flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;