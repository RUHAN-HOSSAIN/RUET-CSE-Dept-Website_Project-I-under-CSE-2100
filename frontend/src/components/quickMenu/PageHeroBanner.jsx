import { Link } from "react-router-dom"
import { useRef, useEffect } from "react"

const PageHeroBanner = ({ title, navLinks = [], activeTo }) => {
  const navRef        = useRef(null)
  const activeRef     = useRef(null)

  // Scroll active tab into center when component mounts or activeTo changes
  useEffect(() => {
    const nav    = navRef.current
    const active = activeRef.current
    if (!nav || !active) return

    const navWidth    = nav.offsetWidth
    const itemLeft    = active.offsetLeft
    const itemWidth   = active.offsetWidth
    const scrollTo    = itemLeft - navWidth / 2 + itemWidth / 2

    nav.scrollTo({ left: scrollTo, behavior: 'smooth' })
  }, [activeTo])

  return (
    <div
      className="relative w-screen bg-linear-to-b from-blue to-light-blue flex flex-col border-b border-blue"
      style={{ minHeight: 'clamp(9rem, 22vw, 30dvh)' }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)
          `,
          backgroundSize: "8px 8px, 32px 32px, 32px 32px",
        }}
      />

      {/* Page title */}
      <div
        className="z-5 border-b border-white font-inter text-white mt-auto"
        style={{
          marginLeft:    'clamp(1.25rem, 6vw, 7.5rem)',
          marginRight:   'clamp(1.25rem, 6vw, 7.5rem)',
          paddingTop:    'clamp(0.4rem, 1vw, 0.75rem)',
          paddingBottom: 'clamp(0.4rem, 1vw, 0.75rem)',
          fontSize:      'clamp(1.75rem, 5.5vw, 3.75rem)',
        }}
      >
        {title}
      </div>

      {/* Sub-nav tabs */}
      <div
        ref={navRef}
        className="z-5 flex items-center justify-start font-medium font-poppins transition-colors duration-300 whitespace-nowrap"
        style={{
          marginLeft:      'clamp(1.25rem, 6vw, 7.5rem)',
          marginRight:     'clamp(1.25rem, 6vw, 7.5rem)',
          marginTop:       'clamp(0.5rem, 1.2vw, 1rem)',
          marginBottom:    'clamp(0.25rem, 0.5vw, 0.25rem)',
          gap:             'clamp(0.75rem, 2vw, 1.5rem)',
          fontSize:        'clamp(0.9rem, 1.5vw, 1.25rem)',
          paddingBottom:   '4px',
          overflowX:       'auto',
          msOverflowStyle: 'none',
          scrollbarWidth:  'none',
        }}
      >
        {navLinks.map(({ label, to }) => {
          const isActive = activeTo === to
          return (
            <Link
              key={to}
              to={to}
              ref={isActive ? activeRef : null}
              className={`shrink-0 transition-colors duration-300 ${
                isActive
                  ? 'text-white bg-blue'
                  : 'text-gray-blue hover:text-black/80'
              }`}
              style={{
                paddingTop:    'clamp(0.25rem, 0.6vw, 0.5rem)',
                paddingBottom: 'clamp(0.25rem, 0.6vw, 0.5rem)',
                paddingLeft:   'clamp(0.5rem, 1vw, 1rem)',
                paddingRight:  'clamp(0.5rem, 1vw, 1rem)',
              }}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default PageHeroBanner


// import { Link } from "react-router-dom"

// const PageHeroBanner = ({ title, navLinks = [], activeTo }) => {
//   return (
//     <div
//       className="relative w-screen bg-linear-to-b from-blue to-light-blue flex flex-col border-b border-blue"
//       style={{ minHeight: 'clamp(9rem, 22vw, 30dvh)' }}
//     >
//       {/* Background pattern */}
//       <div
//         className="absolute inset-0 z-0"
//         style={{
//           backgroundImage: `
//             radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
//             repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
//             repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)
//           `,
//           backgroundSize: "8px 8px, 32px 32px, 32px 32px",
//         }}
//       />

//       {/* Page title */}
//       <div
//         className="z-5 border-b border-white font-inter text-white mt-auto"
//         style={{
//           marginLeft:    'clamp(1.25rem, 6vw, 7.5rem)',
//           marginRight:   'clamp(1.25rem, 6vw, 7.5rem)',
//           paddingTop:    'clamp(0.4rem, 1vw, 0.75rem)',
//           paddingBottom: 'clamp(0.4rem, 1vw, 0.75rem)',
//           fontSize:      'clamp(1.75rem, 5.5vw, 3.75rem)',
//         }}
//       >
//         {title}
//       </div>

//       {/* Sub-nav tabs */}
//       <div
//         className="z-5 flex items-center justify-start font-medium font-poppins transition-colors duration-300 whitespace-nowrap"
//         style={{
//           marginLeft:    'clamp(1.25rem, 6vw, 7.5rem)',
//           marginRight:   'clamp(1.25rem, 6vw, 7.5rem)',
//           marginTop:     'clamp(0.5rem, 1.2vw, 1rem)',
//           marginBottom:  'clamp(0.25rem, 0.5vw, 0.25rem)',
//           gap:           'clamp(0.75rem, 2vw, 1.5rem)',
//           fontSize:      'clamp(0.9rem, 1.5vw, 1.25rem)',
//           paddingBottom: '4px',
//           overflowX:     'auto',
//           msOverflowStyle: 'none',   /* IE/Edge */
//           scrollbarWidth:  'none',   /* Firefox */
//         }}
//       >
//         {navLinks.map(({ label, to }) => (
//           <Link
//             key={to}
//             to={to}
//             className={`shrink-0 transition-colors duration-300 ${
//               activeTo === to
//                 ? 'text-white bg-blue'
//                 : 'text-gray-blue hover:text-black/80'
//             }`}
//             style={{
//               paddingTop:    'clamp(0.25rem, 0.6vw, 0.5rem)',
//               paddingBottom: 'clamp(0.25rem, 0.6vw, 0.5rem)',
//               paddingLeft:   'clamp(0.5rem, 1vw, 1rem)',
//               paddingRight:  'clamp(0.5rem, 1vw, 1rem)',
//             }}
//           >
//             {label}
//           </Link>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default PageHeroBanner