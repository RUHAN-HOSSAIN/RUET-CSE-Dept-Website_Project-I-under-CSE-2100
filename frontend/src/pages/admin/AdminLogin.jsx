
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ADMIN_ROUTES } from '../../constants/adminData'

const Login = () => {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    const result = await login(userId, password)
    if (result.ok) {
      navigate(ADMIN_ROUTES.dashboard)
    } else {
      setError(result.message)
    }
    setLoading(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="min-h-[90vh] sm:min-h-[89vh] lg:min-h-[85vh] w-screen p-3 relative overflow-hidden flex items-center justify-center bg-white">

      {/* ── Background: grid + glows ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #BBDCFF 1px, transparent 1px),
            linear-gradient(to bottom, #BBDCFF 1px, transparent 1px),
            radial-gradient(circle 700px at 0% 40%, #1a5fc8cc, transparent),
            radial-gradient(circle 700px at 100% 60%, #1a5fc8cc, transparent),
            radial-gradient(circle 400px at 50% 100%, #0d2d6e, transparent)
          `,
          backgroundSize: `96px 64px, 96px 64px, 100% 100%, 100% 100%, 100% 100%`,
        }}
      />

      {/* ── Floating blobs (screenshot er 3D shapes approximate) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Top center arc */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, #2563eb88 0%, transparent 70%)', filter: 'blur(2px)' }} />

        {/* Left shape */}
        <div className="absolute top-1/3 -left-10 w-56 h-56"
          style={{
            background: 'linear-gradient(135deg, #3b82f6cc, #1d4ed8cc)',
            borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
            filter: 'blur(1px)',
            transform: 'rotate(-20deg)',
          }} />
        <div className="absolute top-[55%] left-16 w-28 h-28"
          style={{
            background: 'linear-gradient(135deg, #60a5faaa, #2563ebaa)',
            borderRadius: '40% 60% 30% 70% / 60% 40% 70% 30%',
            filter: 'blur(1px)',
            transform: 'rotate(15deg)',
          }} />

        {/* Right shape */}
        <div className="absolute top-1/4 -right-8 w-48 h-72"
          style={{
            background: 'linear-gradient(135deg, #1e40afcc, #3b82f6cc)',
            borderRadius: '30% 70% 50% 50% / 60% 30% 70% 40%',
            filter: 'blur(1px)',
            transform: 'rotate(10deg)',
          }} />
        <div className="absolute bottom-10 right-20 w-32 h-32"
          style={{
            background: 'linear-gradient(135deg, #60a5fa99, #1d4ed899)',
            borderRadius: '70% 30% 50% 50% / 40% 60% 40% 60%',
            filter: 'blur(2px)',
          }} />

        {/* Bottom left small */}
        <div className="absolute bottom-16 left-1/4 w-20 h-20"
          style={{
            background: 'linear-gradient(135deg, #93c5fdaa, #3b82f6aa)',
            borderRadius: '50% 50% 30% 70% / 60% 40% 60% 40%',
            filter: 'blur(1px)',
          }} />
      </div>

      {/* ── Login Card ── */}
      <div
        className="relative z-10 w-full max-w-sm mx-4 rounded-2xl px-8 py-10"
        style={{
          background: 'rgba(30, 64, 175, 0.45)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(147, 197, 253, 0.2)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      >

        {/* Heading */}
        <h1 className="text-white text-center text-2xl font-semibold mb-5">Admin Login</h1>

        {/* User ID */}
        <div className="mb-4">
          <label className="block text-white/80 text-sm mb-1.5">User ID</label>
          <input
            type="text"
            placeholder="Enter your user ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyDown={handleKey}
            className="w-full bg-white text-gray-800 text-sm rounded-lg px-4 py-2.5 outline-none placeholder-gray-400
              focus:ring-2 focus:ring-blue-300 transition"
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-white/80 text-sm mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKey}
              className="w-full bg-white text-gray-800 text-sm rounded-lg px-4 py-2.5 pr-10 outline-none placeholder-gray-400
                focus:ring-2 focus:ring-blue-300 transition"
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {showPass ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-300 text-xs pt-2">{error}</p>
        )}

        {/* Sign In Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-7 bg-dark-blue-2/80 hover:bg-dark-blue-2 cursor-pointer text-white font-semibold text-sm
            py-3 rounded-lg transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"

        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Signing in...
            </>
          ) : 'Sign in'}
        </button>
      </div>
    </div>
  )
}

export default Login
