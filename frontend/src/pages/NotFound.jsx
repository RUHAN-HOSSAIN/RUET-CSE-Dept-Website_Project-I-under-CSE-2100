import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const NotFound = () => {

    const earthRef = useRef(null)

    const handleEarthHover = () => {
        if (earthRef.current) {
            earthRef.current.style.transition = 'transform 200s ease'
            earthRef.current.style.transform = 'rotate(-3600deg)'
        }
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden font-['Dosis',sans-serif] font-light select-none"
            style={{ background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)' }}>

            {/* ── Starfield ── */}
            <Stars />

            {/* ── Glowing stars ── */}
            <div className="absolute inset-0 pointer-events-none">
                {[
                    { top: '80%', left: '25%', delay: '1s' },
                    { top: '20%', left: '40%', delay: '3s' },
                    { top: '25%', left: '25%', delay: '5s' },
                    { top: '75%', left: '80%', delay: '7s' },
                    { top: '90%', left: '50%', delay: '9s' },
                    { top: '10%', left: '70%', delay: '2s' },
                    { top: '50%', left: '10%', delay: '4s' },
                    { top: '35%', left: '85%', delay: '6s' },
                ].map((s, i) => (
                    <div key={i} className="absolute rounded-full bg-white"
                        style={{
                            top: s.top, left: s.left,
                            width: '3px', height: '3px',
                            opacity: 0.3,
                            animation: `glowStar 2s infinite ease-in-out alternate ${s.delay}`,
                        }} />
                ))}
            </div>

            {/* ── Central 404 + button ── */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-100"
                style={{ paddingTop: '2%' }}>

                {/* 404 SVG text */}
                <svg viewBox="0 0 400 120" className="pointer-events-none"
                    style={{ width: 'clamp(220px, 40vw, 380px)', marginBottom: '24px' }}>
                    <defs>
                        <linearGradient id="txt404" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="100%" stopColor="#a0b4d0" />
                        </linearGradient>
                    </defs>
                    <text x="200" y="95" textAnchor="middle"
                        fontFamily="'Dosis', sans-serif" fontWeight="700"
                        fontSize="108" letterSpacing="8"
                        fill="url(#txt404)">
                        404
                    </text>
                </svg>

                <p className="text-white/60 text-sm tracking-[4px] uppercase mb-6">
                    Oops! Page not found.
                </p>

                <Link to="/"
                    className="text-white text-[11px] tracking-[2px] uppercase px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
                    style={{
                        border: '1px solid #3176ff',
                        textDecoration: 'none',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#3176ff'; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'white' }}
                >
                    GO BACK HOME
                </Link>
            </div>

            {/* ── Earth + Moon ── */}
            <div className="absolute pointer-events-none" style={{ top: '18%', left: '14%', zIndex: 90 }}>
                {/* Earth */}
                <div ref={earthRef} onMouseEnter={handleEarthHover}
                    className="pointer-events-auto cursor-pointer"
                    style={{ animation: 'spinEarth 100s linear infinite', width: 100, height: 100 }}>
                    <EarthSVG />
                </div>
                {/* Moon */}
                <div className="absolute" style={{ top: '-30px', left: '60px' }}>
                    <MoonSVG />
                </div>
            </div>

            {/* ── Rocket ── */}
            <div className="absolute pointer-events-none"
                style={{
                    top: '75%', left: '-60px', zIndex: 95,
                    animation: 'rocketMove 200s linear infinite both',
                }}>
                <RocketSVG />
            </div>

            {/* ── Astronaut ── */}
            <div className="absolute pointer-events-none"
                style={{
                    top: '55%', right: '18%', zIndex: 110,
                    animation: 'moveAstronaut 50s linear infinite alternate both',
                }}>
                <div style={{ animation: 'rotateAstronaut 200s linear infinite alternate both' }}>
                    <AstronautSVG />
                </div>
            </div>

            {/* ── CSS keyframes ── */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;700&display=swap');

        @keyframes spinEarth {
          100% { transform: rotate(-360deg); }
        }
        @keyframes rocketMove {
          100% { transform: translate(1200px, -600px); }
        }
        @keyframes moveAstronaut {
          100% { transform: translate(-160px, -160px); }
        }
        @keyframes rotateAstronaut {
          100% { transform: rotate(-720deg); }
        }
        @keyframes glowStar {
          40%       { opacity: 0.3; }
          90%, 100% { opacity: 1; transform: scale(1.3); border-radius: 9999px; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 0.1; }
        }
      `}</style>
        </div>
    )
}

/* ══════════════════════════════════════
   Stars canvas background
══════════════════════════════════════ */
const Stars = () => {
    const stars = Array.from({ length: 160 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() < 0.7 ? 1 : Math.random() < 0.9 ? 2 : 3,
        delay: `${(Math.random() * 8).toFixed(1)}s`,
        dur: `${(2 + Math.random() * 4).toFixed(1)}s`,
    }))
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {stars.map(s => (
                <div key={s.id} className="absolute rounded-full bg-white"
                    style={{
                        top: s.top, left: s.left,
                        width: s.size, height: s.size,
                        animation: `twinkle ${s.dur} infinite ease-in-out alternate ${s.delay}`,
                    }} />
            ))}
        </div>
    )
}

/* ══════════════════════════════════════
   Earth SVG (inline, no external image)
══════════════════════════════════════ */
const EarthSVG = () => (
    <svg width="100" height="100" viewBox="0 0 100 100">
        <defs>
            <radialGradient id="earthGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#4fc3f7" />
                <stop offset="40%" stopColor="#1565c0" />
                <stop offset="100%" stopColor="#0a1f5c" />
            </radialGradient>
            <clipPath id="earthClip"><circle cx="50" cy="50" r="46" /></clipPath>
        </defs>
        <circle cx="50" cy="50" r="46" fill="url(#earthGrad)" stroke="#1e3a5f" strokeWidth="1.5" />
        {/* continents */}
        <g clipPath="url(#earthClip)" fill="#2e7d32" opacity="0.85">
            <ellipse cx="38" cy="38" rx="14" ry="10" transform="rotate(-20 38 38)" />
            <ellipse cx="62" cy="42" rx="9" ry="13" transform="rotate(15 62 42)" />
            <ellipse cx="45" cy="60" rx="12" ry="8" transform="rotate(10 45 60)" />
            <ellipse cx="72" cy="65" rx="7" ry="5" transform="rotate(-10 72 65)" />
            <ellipse cx="25" cy="62" rx="6" ry="8" transform="rotate(5 25 62)" />
        </g>
        {/* cloud wisps */}
        <g clipPath="url(#earthClip)" fill="white" opacity="0.25">
            <ellipse cx="50" cy="28" rx="20" ry="4" />
            <ellipse cx="30" cy="50" rx="12" ry="3" />
            <ellipse cx="65" cy="58" rx="16" ry="3" />
        </g>
        {/* atmosphere rim */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="#4fc3f7" strokeWidth="3" opacity="0.2" />
        {/* top-left sheen */}
        <ellipse cx="32" cy="28" rx="14" ry="8" fill="white" opacity="0.12" transform="rotate(-25 32 28)" />
    </svg>
)

/* ══════════════════════════════════════
   Moon SVG
══════════════════════════════════════ */
const MoonSVG = () => (
    <svg width="50" height="50" viewBox="0 0 50 50">
        <defs>
            <radialGradient id="moonGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#e0e0e0" />
                <stop offset="100%" stopColor="#8a8a8a" />
            </radialGradient>
        </defs>
        <circle cx="25" cy="25" r="22" fill="url(#moonGrad)" />
        {/* craters */}
        <circle cx="18" cy="20" r="4" fill="#aaa" opacity="0.5" />
        <circle cx="30" cy="30" r="3" fill="#aaa" opacity="0.4" />
        <circle cx="22" cy="32" r="2" fill="#aaa" opacity="0.3" />
        <circle cx="32" cy="18" r="2" fill="#aaa" opacity="0.35" />
        {/* sheen */}
        <ellipse cx="18" cy="16" rx="7" ry="4" fill="white" opacity="0.18" transform="rotate(-20 18 16)" />
    </svg>
)

/* ══════════════════════════════════════
   Rocket SVG
══════════════════════════════════════ */
const RocketSVG = () => (
    <svg width="44" height="80" viewBox="0 0 44 80" className='max-sm:opacity-50'>
        <defs>
            <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cfd8dc" />
                <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
        </defs>
        {/* flame */}
        <ellipse cx="22" cy="75" rx="6" ry="10" fill="#ff6d00" opacity="0.9" />
        <ellipse cx="22" cy="72" rx="4" ry="7" fill="#ffca28" />
        {/* body */}
        <rect x="14" y="25" width="16" height="35" rx="3" fill="url(#rocketBody)" />
        {/* nose cone */}
        <path d="M14 25 Q22 4 30 25 Z" fill="url(#rocketBody)" />
        {/* fins */}
        <path d="M14 52 L6 65 L14 60 Z" fill="#90a4ae" />
        <path d="M30 52 L38 65 L30 60 Z" fill="#90a4ae" />
        {/* window */}
        <circle cx="22" cy="36" r="5" fill="#4fc3f7" opacity="0.8" stroke="#b0bec5" strokeWidth="1" />
        <circle cx="22" cy="36" r="3" fill="#e3f2fd" opacity="0.6" />
        {/* stripe */}
        <rect x="14" y="46" width="16" height="3" fill="#ef5350" opacity="0.8" />
    </svg>
)

/* ══════════════════════════════════════
   Astronaut SVG
══════════════════════════════════════ */
const AstronautSVG = () => (
    <svg width="140" height="140" viewBox="0 0 140 140" className='max-sm:opacity-50'>
        <defs>
            <radialGradient id="suitGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#b0bec5" />
            </radialGradient>
            <radialGradient id="visorGrad" cx="30%" cy="25%" r="70%">
                <stop offset="0%"   stopColor="#a8d4ff" />
                <stop offset="50%"  stopColor="#3176ff" />
                <stop offset="100%" stopColor="#003bb2" />
            </radialGradient>
        </defs>

        {/* tether line */}
        <path d="M110 30 Q130 60 115 90" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 3" />

        {/* backpack */}
        <rect x="62" y="70" width="20" height="26" rx="4" fill="#90a4ae" />
        <rect x="65" y="73" width="14" height="8" rx="2" fill="#607d8b" />

        {/* body / suit */}
        <ellipse cx="72" cy="85" rx="26" ry="30" fill="url(#suitGrad)" />
        {/* suit detail lines */}
        <path d="M54 82 Q72 88 90 82" fill="none" stroke="#b0bec5" strokeWidth="1.5" opacity="0.6" />
        <path d="M56 90 Q72 96 88 90" fill="none" stroke="#b0bec5" strokeWidth="1.5" opacity="0.4" />

        {/* left arm */}
        <ellipse cx="47" cy="86" rx="9" ry="20" fill="url(#suitGrad)" transform="rotate(-8 47 86)" />
        <circle cx="42" cy="101" r="7" fill="#cfd8dc" />
        {/* right arm */}
        <ellipse cx="97" cy="83" rx="9" ry="20" fill="url(#suitGrad)" transform="rotate(10 97 83)" />
        <circle cx="104" cy="98" r="7" fill="#cfd8dc" />

        {/* left leg */}
        <ellipse cx="60" cy="118" rx="10" ry="16" fill="url(#suitGrad)" transform="rotate(5 60 118)" />
        <ellipse cx="58" cy="132" rx="9" ry="6" fill="#90a4ae" />
        {/* right leg */}
        <ellipse cx="84" cy="118" rx="10" ry="16" fill="url(#suitGrad)" transform="rotate(-5 84 118)" />
        <ellipse cx="86" cy="132" rx="9" ry="6" fill="#90a4ae" />

        {/* helmet */}
        <circle cx="72" cy="52" r="28" fill="url(#suitGrad)" stroke="#b0bec5" strokeWidth="1.5" />
        {/* visor */}
        <ellipse cx="72" cy="52" rx="18" ry="16" fill="url(#visorGrad)" opacity="0.88" />
        {/* visor reflection */}
        <ellipse cx="63" cy="44" rx="6" ry="4" fill="white" opacity="0.25" transform="rotate(-20 63 44)" />
        {/* helmet ring */}
        <circle cx="72" cy="52" r="28" fill="none" stroke="white" strokeWidth="2" opacity="0.15" />
        {/* antenna */}
        <line x1="88" y1="28" x2="96" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="97" cy="14" r="3" fill="#FFCB39" />
    </svg>
)

export default NotFound