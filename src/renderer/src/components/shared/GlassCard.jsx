import React from 'react';

const GlassCard = ({ children, className = '', onClick, style = {} }) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`
        relative rounded-2xl overflow-hidden
        bg-black/60 backdrop-blur-xl
        border border-white/6
        ${onClick ? 'cursor-pointer hover:border-white/15 active:scale-[0.995] transition-all duration-200' : ''}
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassCard;