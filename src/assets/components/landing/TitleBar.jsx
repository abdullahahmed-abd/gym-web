// src/components/TitleBar.jsx
export default function TitleBar() {
  const isMac = window.electronAPI?.platform === 'darwin'

  const handleMinimize = () => window.electronAPI?.minimizeWindow()
  const handleMaximize = () => window.electronAPI?.maximizeWindow()
  const handleClose    = () => window.electronAPI?.closeWindow()

  return (
    <div className="drag-region fixed top-0 left-0 right-0 h-10 z-[9999] flex items-center justify-between px-4 bg-black/50 backdrop-blur-sm border-b border-white/[0.04]">

      {/* Left - App Name */}
      <div className="flex items-center gap-2">
        {/* On Mac, traffic lights are on left - add spacing */}
        {isMac && <div className="w-16" />}
        <span className="font-orbitron text-xs font-bold tracking-[3px] text-zinc-600">
          GYMPRO ADMIN
        </span>
      </div>

      {/* Right - Window Controls (Windows/Linux only) */}
      {!isMac && (
        <div className="no-drag flex items-center gap-1">
          {/* Minimize */}
          <button
            onClick={handleMinimize}
            className="w-8 h-8 rounded flex items-center justify-center hover:bg-white/10 transition-colors group"
          >
            <div className="w-3 h-px bg-zinc-500 group-hover:bg-white transition-colors" />
          </button>

          {/* Maximize */}
          <button
            onClick={handleMaximize}
            className="w-8 h-8 rounded flex items-center justify-center hover:bg-white/10 transition-colors group"
          >
            <div className="w-3 h-3 border border-zinc-500 group-hover:border-white transition-colors rounded-sm" />
          </button>

          {/* Close */}
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded flex items-center justify-center hover:bg-red-500/80 transition-colors group"
          >
            <span className="text-zinc-500 group-hover:text-white text-sm leading-none transition-colors">✕</span>
          </button>
        </div>
      )}
    </div>
  )
}