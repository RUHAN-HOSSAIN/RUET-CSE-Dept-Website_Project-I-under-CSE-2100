import { useState, useEffect, useCallback, useRef } from 'react'

import { heroSlides } from '../../constants/homeData' 

const Hero = () => {
  const [current, setCurrent]       = useState(0)
  const [animating, setAnimating]   = useState(false)
  const [heroHeight, setHeroHeight] = useState(null)
  const lockedRef = useRef(false)

  const goTo = useCallback((index) => {
    if (animating) return
    setAnimating(true)
    setCurrent(index)
    setTimeout(() => setAnimating(false), 800)
  }, [animating])

  // ── Height: calculate ONCE on mount, lock it, never recalculate ──
  useEffect(() => {
    const calculate = () => {
      if (lockedRef.current) return
      const isDesktop = window.innerWidth >= 1024
      if (isDesktop) {
        // wait for --header-height to be set by Header
        const headerHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--header-height')
        ) || 100
        if (headerHeight > 0) {
          setHeroHeight(`${window.innerHeight - headerHeight}px`)
          lockedRef.current = true
        }
      } else {
        setHeroHeight('60dvh')
        lockedRef.current = true
      }
    }

    // try immediately, then retry in case --header-height not set yet
    calculate()
    const t = setTimeout(calculate, 100)
    return () => clearTimeout(t)
  }, [])

  // ── Re-lock on window resize (screen size changes → recalculate once) ──
  useEffect(() => {
    const handleResize = () => {
      lockedRef.current = false
      const isDesktop = window.innerWidth >= 1024
      if (isDesktop) {
        const headerHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--header-height')
        ) || 100
        setHeroHeight(`${window.innerHeight - headerHeight}px`)
      } else {
        setHeroHeight('60dvh')
      }
      lockedRef.current = true
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const prev = () => goTo((current - 1 + heroSlides.length) % heroSlides.length)
  const next = () => goTo((current + 1) % heroSlides.length)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: heroHeight || '60dvh' }}
    >

        {/* ── heroSlides ── */}
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Bottom-heavy dark overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-40% to-transparent" />

            {/* Text block — bottom left */}
            <div className="absolute bottom-0 left-0 right-0 pb-14 px-8 lg:px-16 xl:px-24" style={{ zIndex: 2 }}>
              <h1
                className="text-white font-dmSans font-extrabold leading-tight mb-2 max-w-4xl"
                style={{
                  fontSize: 'clamp(1.7rem, 4vw, 4.5rem)',
                  textShadow: '0 2px 16px rgba(0,0,0,5)',
                }}
              >
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p
                  className="font-poppins text-white/80 max-w-3xl leading-relaxed"
                  style={{
                    fontSize: 'clamp(0.875rem, 1.4vw, 1.05rem)',
                    textShadow: '0 2px 16px rgba(0,0,0,1)',
                  }}
                >
                  {slide.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* ── Prev button ── */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 flex items-center justify-center
            bg-black/30 hover:bg-black/55 transition-colors duration-200"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-6 h-6 fill-white">
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
          </svg>
        </button>

        {/* ── Next button ── */}
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 flex items-center justify-center
            bg-black/30 hover:bg-black/55 transition-colors duration-200"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-6 h-6 fill-white">
            <path d="M400-240l-56-56 184-184-184-184 56-56 240 240-240 240Z"/>
          </svg>
        </button>

        {/* ── Dots ── */}
        <div className="absolute bottom-5 right-8 lg:right-16 z-10 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="rounded-full border border-white/50 transition-all duration-300"
              style={{
                width:      i === current ? '1.4rem' : '0.55rem',
                height:     '0.55rem',
                background: i === current ? 'white' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>

      </div>
  )
}

export default Hero


// import { useState, useEffect, useCallback } from 'react'

// import { heroSlides } from '../../constants/homeData' 

// const Hero = () => {
//   const [current, setCurrent]     = useState(0)
//   const [animating, setAnimating] = useState(false)

//   const goTo = useCallback((index) => {
//     if (animating) return
//     setAnimating(true)
//     setCurrent(index)
//     setTimeout(() => setAnimating(false), 800)
//   }, [animating])

//   const prev = () => goTo((current - 1 + heroSlides.length) % heroSlides.length)
//   const next = () => goTo((current + 1) % heroSlides.length)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent(c => (c + 1) % heroSlides.length)
//     }, 5000)
//     return () => clearInterval(timer)
//   }, [])

//   return (
//     <>
//       <style>{`
//         .hero-wrapper {
//           height: 60dvh;
//         }
//         @media (min-width: 1024px) {
//           .hero-wrapper {
//             height: calc(100dvh - var(--header-height, 100px));
//           }
//         }
//       `}</style>

//       <div className="hero-wrapper relative w-full overflow-hidden">

//         {/* ── heroSlides ── */}
//         {heroSlides.map((slide, i) => (
//           <div
//             key={i}
//             className="absolute inset-0 transition-opacity duration-700"
//             style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
//           >
//             <img
//               src={slide.img}
//               alt={slide.title}
//               className="w-full h-full object-cover"
//             />

//             {/* Bottom-heavy dark overlay */}
//             <div className="absolute inset-0 bg-linear-to-t from-black/40 to-40% to-transparent" />

//             {/* Text block — bottom left */}
//             <div className="absolute bottom-0 left-0 right-0 pb-14 px-8 lg:px-16 xl:px-24" style={{ zIndex: 2 }}>
//               <h1
//                 className="text-white font-dmSans font-extrabold leading-tight mb-2 max-w-4xl"
//                 style={{
//                   fontSize: 'clamp(1.7rem, 4vw, 4.5rem)',
//                   textShadow: '0 2px 16px rgba(0,0,0,5)',
//                 }}
//               >
//                 {slide.title}
//               </h1>
//               {slide.subtitle && (
//                 <p
//                   className="font-poppins text-white/80 max-w-3xl leading-relaxed"
//                   style={{
//                     fontSize: 'clamp(0.875rem, 1.4vw, 1.05rem)',
//                     textShadow: '0 2px 16px rgba(0,0,0,1)',
//                   }}
//                 >
//                   {slide.subtitle}
//                 </p>
//               )}
//             </div>
//           </div>
//         ))}

//         {/* ── Prev button ── */}
//         <button
//           onClick={prev}
//           className="absolute left-4 top-1/2 -translate-y-1/2 z-10
//             w-10 h-10 flex items-center justify-center
//             bg-black/30 hover:bg-black/55 transition-colors duration-200"
//           aria-label="Previous slide"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-6 h-6 fill-white">
//             <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
//           </svg>
//         </button>

//         {/* ── Next button ── */}
//         <button
//           onClick={next}
//           className="absolute right-4 top-1/2 -translate-y-1/2 z-10
//             w-10 h-10 flex items-center justify-center
//             bg-black/30 hover:bg-black/55 transition-colors duration-200"
//           aria-label="Next slide"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-6 h-6 fill-white">
//             <path d="M400-240l-56-56 184-184-184-184 56-56 240 240-240 240Z"/>
//           </svg>
//         </button>

//         {/* ── Dots ── */}
//         <div className="absolute bottom-5 right-8 lg:right-16 z-10 flex items-center gap-2">
//           {heroSlides.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => goTo(i)}
//               aria-label={`Slide ${i + 1}`}
//               className="rounded-full border border-white/50 transition-all duration-300"
//               style={{
//                 width:      i === current ? '1.4rem' : '0.55rem',
//                 height:     '0.55rem',
//                 background: i === current ? 'white' : 'rgba(255,255,255,0.3)',
//               }}
//             />
//           ))}
//         </div>

//       </div>
//     </>
//   )
// }

// export default Hero