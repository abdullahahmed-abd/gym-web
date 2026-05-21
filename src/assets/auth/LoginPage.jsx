// src/components/auth/LoginPage.jsx
import { useState } from 'react'
import { Dumbbell, Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function LoginPage({ onLogin }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // ── Dummy login for now (replace with API later) ──
    setTimeout(() => {
      if (email === 'admin@gym.com' && password === 'admin123') {
        onLogin({
          name: 'Abdullah Ahmed',
          email: email,
          gymName: 'PowerFit Gym',
          gymCode: 'GYM4X2',
          role: 'admin',
        })
      } else {
        setError('Invalid email or password')
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-[calc(100vh-40px)] flex items-center justify-center relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      </div>

      {/* Glows */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-[100px]" />

      {/* Login Card */}
      <div className="relative w-full max-w-md mx-auto px-4">
        <div className="glass rounded-2xl p-8 sm:p-10">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-4">
              <Dumbbell className="w-7 h-7 text-yellow-500" />
            </div>
            <h1 className="font-orbitron text-xl font-bold tracking-[3px] text-white mb-1">
              GYMPRO
            </h1>
            <p className="font-rajdhani text-sm text-zinc-500 tracking-wider uppercase">
              Admin Dashboard
            </p>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="font-orbitron text-lg font-bold text-white tracking-wider mb-1">
              Welcome Back
            </h2>
            <p className="font-rajdhani text-sm text-zinc-500">
              Sign in to your admin account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="font-rajdhani text-sm text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email */}
            <div>
              <label className="font-rajdhani text-xs text-zinc-500 tracking-wider uppercase block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gym.com"
                required
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 font-rajdhani text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-yellow-500/40 focus:bg-yellow-500/[0.02] transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="font-rajdhani text-xs text-zinc-500 tracking-wider uppercase block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 pr-12 font-rajdhani text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-yellow-500/40 focus:bg-yellow-500/[0.02] transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  {showPass
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />
                  }
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="flex justify-end">
              <button type="button" className="font-rajdhani text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 font-orbitron text-xs font-bold tracking-[2px] py-3.5 rounded-xl bg-yellow-500 text-black hover:bg-yellow-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  SIGN IN
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 pt-6 border-t border-white/[0.06]">
            <p className="font-rajdhani text-xs text-zinc-700 text-center">
              Demo: admin@gym.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}