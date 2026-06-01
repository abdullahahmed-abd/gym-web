import React, { useState } from 'react';

const GlassInput = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  prefix,
  className = '',
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label className="block font-rajdhani text-zinc-500 text-[11px]
                          tracking-[0.15em] uppercase mb-1.5 px-0.5 font-semibold">
          {label}
        </label>
      )}
      <div
        className={`
          flex items-center gap-2 px-4 py-3 rounded-xl
          bg-white/[0.03] border transition-all duration-200
          ${focused ? 'border-[#C5A059]/40' : 'border-white/8'}
        `}
      >
        {prefix && (
          <span className="font-orbitron text-[#C5A059] font-bold text-base">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent font-rajdhani text-white
                     text-base tracking-wide outline-none
                     placeholder:text-zinc-700"
        />
      </div>
    </div>
  );
};

export default GlassInput;