import { useState, useEffect, useRef } from 'react'
import { disablePageScroll, enablePageScroll } from 'scroll-lock'
import { Link } from 'react-router-dom'

import { navMenu } from '../../constants/navData'

import searchIcon from '../../assets/icons/search-icon.svg'
import hamburgerIcon from '../../assets/icons/hamburger-icon.svg'
import crossIcon from '../../assets/icons/cross-icon.svg'

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const [openAccordion, setOpenAccordion] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef(null)
  const panelRef  = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(72)

  useEffect(() => {
    const measure = () => {
      if (headerRef.current) {
        const h = headerRef.current.offsetHeight
        setHeaderHeight(h)
        document.documentElement.style.setProperty('--header-height', `${h}px`)
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (headerRef.current) ro.observe(headerRef.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 700) return setScrolled(false)
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setOpenMenu((prev) => {
      const next = !prev
      if (next) disablePageScroll(panelRef.current)
      else { enablePageScroll(panelRef.current); setOpenAccordion(null) }
      return next
    })
  }

  const toggleAccordion = (title) => {
    setOpenAccordion((prev) => (prev === title ? null : title))
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1160) {
        setOpenMenu(false)
        enablePageScroll(panelRef.current)
        setOpenAccordion(null)
      }
      if (window.innerWidth < 700) setScrolled(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-1000 bg-white font-inter shadow-md">

        <div
          className="flex items-center justify-between shadow-sm relative transition-[padding] duration-300"
          style={{
            paddingLeft: 'clamp(1rem, 4vw, 4rem)',
            paddingRight: 'clamp(1rem, 4vw, 4rem)',
            paddingTop: scrolled ? 'clamp(0.4rem, 0.6vw, 0.5rem)' : 'clamp(0.45rem, 1.5vw, 1.25rem)',
            paddingBottom: scrolled ? 'clamp(0.4rem, 0.6vw, 0.5rem)' : 'clamp(0.45rem, 1.5vw, 1.25rem)',
          }}
        >
          {/* Background pattern */}
          <div
            className="absolute inset-0 -z-5 pointer-events-none opacity-40"
            style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 0, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 20px),
                repeating-linear-gradient(-45deg, rgba(0,0,0,0.1) 0, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 20px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* ── Logo + Title ── */}
          <div className="flex items-center" style={{ gap: 'clamp(0.4rem, 1vw, 0.75rem)' }}>
            <Link to="/" className="shrink-0">
              <img
                src="/RUET-logo.png"
                alt="ruet-logo"
                className="cursor-pointer transition-all duration-300"
                style={{
                  width: scrolled
                    ? 'clamp(2.6rem, 4vw, 4rem)'
                    : 'clamp(2.6rem, 5vw, 5rem)',
                }}
              />
            </Link>

            <Link to="/" className="cursor-pointer">
              <h2
                className="font-spaceG text-dark-blue-0 font-medium transition-all duration-300"
                style={{ fontSize: 'clamp(0.55rem, 0.8vw, 0.8rem)' }}
              >
                RUET Center for
              </h2>
              <h1
                className="font-spaceG text-dark-blue-1 font-extrabold leading-tight transition-all duration-300"
                style={{
                  fontSize: scrolled
                    ? 'clamp(0.95rem, 1.325vw, 1.35rem)'
                    : 'clamp(1rem, 1.7vw, 1.8rem)',
                }}
              >
                Computer<br />Science & Engineering
              </h1>
            </Link>
          </div>

          {/* ── Desktop Nav ── */}
          <div
            className="hidden lg:flex flex-col"
            style={{ gap: 'clamp(0.3rem, 0.8vw, 0.75rem)' }}
          >
            {/* Upper nav — collapses on scroll */}
            <div className={`ml-auto overflow-hidden transition-all duration-300
              ${scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'}`}>
              <nav
                className="flex items-center font-semibold ml-auto cursor-pointer"
                style={{
                  gap: 'clamp(0.3rem, 0.7vw, 0.75rem)',
                  fontSize: 'clamp(0.7rem, 0.9vw, 0.9rem)',
                }}
              >
                <a href="https://www.ruet.ac.bd/" target="_blank" className="hover:text-blue duration-300">RUET Main</a>|
                <Link to="*" className="relative group flex items-center gap-1 hover:text-blue duration-300">
                  Web Mail&nbsp;
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
                    className="fill-black group-hover:fill-blue"
                    style={{ width: 'clamp(13px, 1.1vw, 16px)', height: 'clamp(13px, 1.1vw, 16px)' }}>
                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                  </svg>
                </Link>|
                <Link to="*" className="hover:text-blue duration-300">Alumni</Link>|
                <Link to="https://www.cse.ruet.ac.bd/login" target='_blank' className="hover:text-blue duration-300">Login</Link>
                <div className="relative flex items-center border border-blue rounded-full">
                  <input
                    type="text"
                    placeholder="Search"
                    className="outline-none text-black/65 rounded-full"
                    style={{
                      fontSize: 'clamp(0.7rem, 0.85vw, 0.875rem)',
                      padding: 'clamp(0.18rem, 0.35vw, 0.25rem) clamp(1.4rem, 2.2vw, 2rem) clamp(0.18rem, 0.35vw, 0.25rem) clamp(0.5rem, 0.8vw, 0.75rem)',
                      maxWidth: 'clamp(6rem, 10vw, 9rem)',
                    }}
                  />
                  <img src={searchIcon} className="absolute right-2 w-4" alt="search" />
                </div>
              </nav>
            </div>

            {/* Main nav links */}
            <ul
              className="flex items-center font-bold cursor-pointer"
              style={{
                gap: 'clamp(0.4rem, 0.8vw, 1rem)',
                fontSize: 'clamp(0.8rem, 1.1vw, 1.1rem)',
              }}
            >
              {navMenu.map((item) => (
                <li
                  key={item.title}
                  className="relative group flex items-center gap-1 whitespace-nowrap text-black cursor-pointer
                    after:absolute after:left-1/2 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue
                    after:transition-all after:duration-300 after:-translate-x-1/2
                    hover:text-blue hover:after:w-full"
                >
                  <span className="flex items-center gap-1">
                    {item.children
                      ? (<>
                        {item.title}
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"
                          className="fill-[#1f1f1f] group-hover:fill-blue transition-transform duration-300 group-hover:-rotate-180">
                          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                        </svg>
                      </>)
                      : <Link to={item.link || '/'}>{item.title}</Link>
                    }
                  </span>

                  {item.children && (
                    <div className="absolute left-0 top-full mt-2 min-w-52 rounded-md bg-blue-50 overflow-hidden shadow-lg
                      opacity-0 invisible translate-y-2 transition-all duration-200
                      group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
                    >
                      {item.children.map((sub) => (
                        sub.link.startsWith('http') ? (
                          <a 
                            key={sub.title} 
                            href={sub.link} target="_blank" rel="noreferrer"
                            className="block px-4 py-2 text-sm hover:bg-linear-to-t from-[#003bb2] to-[#3176ff] hover:text-white"
                          >
                            {sub.title}
                          </a>
                        ) : (
                          <Link
                            key={sub.title}
                            to={sub.link}
                            className="block px-4 py-2 text-sm hover:bg-linear-to-t from-[#003bb2] to-[#3176ff] hover:text-white"
                          >
                            {sub.title}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Hamburger ── */}
          <button
            className="lg:hidden relative z-1003"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <img
              src={openMenu ? crossIcon : hamburgerIcon}
              className="transition-all duration-300"
              style={{ width: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
              alt="menu"
            />
          </button>
        </div>
      </header>

      {/* BACKDROP */}
      <div
        onClick={toggleMenu}
        className={`lg:hidden fixed inset-x-0 bottom-0 z-1001
          bg-black/30 backdrop-blur-[2px]
          transition-opacity duration-500
          ${openMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ top: `${headerHeight}px` }}
      />

      {/* MOBILE PANEL */}
      <div
        ref={panelRef}
        className={`lg:hidden fixed right-0 bottom-0 z-1002
          bg-white font-inter shadow-2xl
          overflow-y-auto overflow-x-hidden
          w-[min(85vw,380px)]
          transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)]
          ${openMenu ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          top: `${headerHeight}px`,
          maxHeight: `calc(100dvh - ${headerHeight}px)`,
        }}
      >
        <nav className="px-6 pt-3 pb-8">
          <ul className="flex flex-col">
            {navMenu.map((item) => (
              <li key={item.title} className="border-b border-gray-100 last:border-b-0">
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleAccordion(item.title)}
                      className={`w-full flex items-center justify-between py-4 text-left text-[17px] font-semibold transition-colors duration-300
                        ${openAccordion === item.title ? 'text-blue' : 'text-gray-900'}`}
                    >
                      <span className="whitespace-nowrap">{item.title}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                        className={`shrink-0 ml-10 transition-transform duration-300 ease-in-out
                          ${openAccordion === item.title ? 'rotate-180 fill-blue' : 'rotate-0 fill-[#1f1f1f]'}`}>
                        <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                      </svg>
                    </button>

                    <div className={`overflow-hidden transition-all duration-400 ease-in-out
                      ${openAccordion === item.title ? 'max-h-150 opacity-100 pb-3' : 'max-h-0 opacity-0'}`}>
                      <ul className="pl-2 flex flex-col gap-0.5">
                        {item.children.map((sub) => (
                          <li key={sub.title}>
                            <Link
                              to={sub.link}
                              onClick={toggleMenu}
                              className="flex items-center gap-2.5 py-2 text-[15px] text-gray-600 hover:text-blue font-medium transition-colors duration-200 whitespace-nowrap"
                            >
                              <svg width="7" height="7" viewBox="0 0 7 7" className="shrink-0 fill-blue">
                                <circle cx="3.5" cy="3.5" r="3.5" />
                              </svg>
                              {sub.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.link}
                    onClick={toggleMenu}
                    className="flex items-center py-4 text-[17px] font-semibold text-gray-900 hover:text-blue transition-colors duration-200 whitespace-nowrap"
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <hr className="my-5 border-blue" />

          <div className="relative flex items-center border border-light-blue rounded-full transition-colors duration-200 mb-5">
            <input
              type="text"
              placeholder="Search"
              className="py-2 pl-5 pr-11 text-[15px] w-full outline-none text-gray-700 rounded-full bg-transparent font-inter"
            />
            <img src={searchIcon} className="absolute right-4 w-5 opacity-50" alt="search-icon" />
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-[14px] font-semibold text-black/80">
            <a href="https://www.ruet.ac.bd/" target="_blank" className="hover:text-blue transition-colors duration-200 whitespace-nowrap">RUET Main</a>
            <a href="/" className="hover:text-blue transition-colors duration-200">Web Mail</a>
            <a href="/" className="hover:text-blue transition-colors duration-200">Alumni</a>
            <a href="/" className="hover:text-blue transition-colors duration-200">Login</a>
          </div>
        </nav>
      </div>

      <div className="-z-1000 bg-transparent" style={{ paddingTop: `${headerHeight}px` }} />
    </>
  )
}

export default Header




// import { useState, useEffect, useRef } from 'react'
// import { disablePageScroll, enablePageScroll } from 'scroll-lock'
// import { Link } from 'react-router-dom'

// import { navMenu } from '../../constants/navData'

// import searchIcon from '../../assets/icons/search-icon.svg'
// import hamburgerIcon from '../../assets/icons/hamburger-icon.svg'
// import crossIcon from '../../assets/icons/cross-icon.svg'

// const Header = () => {
//   const [openMenu, setOpenMenu] = useState(false)
//   const [openAccordion, setOpenAccordion] = useState(null)
//   const [scrolled, setScrolled] = useState(false)
//   const headerRef = useRef(null)
//   const [headerHeight, setHeaderHeight] = useState(72)

//   useEffect(() => {
//     const measure = () => {
//       if (headerRef.current) {
//         const h = headerRef.current.offsetHeight
//         setHeaderHeight(h)
//         document.documentElement.style.setProperty('--header-height', `${h}px`)
//       }
//     }
//     measure()
//     const ro = new ResizeObserver(measure)
//     if (headerRef.current) ro.observe(headerRef.current)
//     return () => ro.disconnect()
//   }, [])

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10)
//     window.addEventListener('scroll', handleScroll, { passive: true })
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const toggleMenu = () => {
//     setOpenMenu((prev) => {
//       const next = !prev
//       if (next) disablePageScroll()
//       else { enablePageScroll(); setOpenAccordion(null) }
//       return next
//     })
//   }

//   const toggleAccordion = (title) => {
//     setOpenAccordion((prev) => (prev === title ? null : title))
//   }

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1160) {
//         setOpenMenu(false)
//         enablePageScroll()
//         setOpenAccordion(null)
//       }
//     }
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   return (
//     <>
//       <header ref={headerRef} className="fixed inset-x-0 top-0 z-1000 bg-white font-inter shadow-md md:shadow-lg">

//         <div
//           className="flex items-center justify-between shadow-sm relative transition-[padding] duration-300"
//           style={{
//             paddingLeft: 'clamp(1rem, 4vw, 4rem)',
//             paddingRight: 'clamp(1rem, 4vw, 4rem)',
//             paddingTop: scrolled ? 'clamp(0.35rem, 0.6vw, 0.5rem)' : 'clamp(0.35rem, 1.5vw, 1.25rem)',
//             paddingBottom: scrolled ? 'clamp(0.35rem, 0.6vw, 0.5rem)' : 'clamp(0.35rem, 1.5vw, 1.25rem)',
//           }}
//         >
//           {/* Background pattern */}
//           <div
//             className="absolute inset-0 -z-5 pointer-events-none opacity-40"
//             style={{
//               backgroundImage: `
//                 repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 0, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 20px),
//                 repeating-linear-gradient(-45deg, rgba(0,0,0,0.1) 0, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 20px)
//               `,
//               backgroundSize: '40px 40px',
//             }}
//           />

//           {/* ── Logo + Title ── */}
//           <div className="flex items-center" style={{ gap: 'clamp(0.4rem, 1vw, 0.75rem)' }}>
//             <Link to="/" className="shrink-0">
//               <img
//                 src="/RUET-logo.png"
//                 alt="ruet-logo"
//                 className="cursor-pointer transition-all duration-300"
//                 style={{
//                   width: scrolled
//                     ? 'clamp(2.6rem, 4vw, 4rem)'
//                     : 'clamp(2.6rem, 5vw, 5rem)',
//                 }}
//               />
//             </Link>

//             <Link to="/" className="cursor-pointer">
//               <h2
//                 className="font-spaceG text-dark-blue-0 font-medium transition-all duration-300"
//                 style={{ fontSize: 'clamp(0.55rem, 0.8vw, 0.8rem)' }}
//               >
//                 RUET Center for
//               </h2>
//               <h1
//                 className="font-spaceG text-dark-blue-1 font-extrabold leading-tight transition-all duration-300"
//                 style={{
//                   fontSize: scrolled
//                     ? 'clamp(0.95rem, 1.3vw, 1.35rem)'
//                     : 'clamp(0.95rem, 1.7vw, 1.8rem)',
//                 }}
//               >
//                 Computer<br />Science & Engineering
//               </h1>
//             </Link>
//           </div>

//           {/* ── Desktop Nav ── */}
//           <div
//             className="hidden lg:flex flex-col"
//             style={{ gap: 'clamp(0.3rem, 0.8vw, 0.75rem)' }}
//           >
//             {/* Upper nav — collapses on scroll */}
//             <div className={`ml-auto overflow-hidden transition-all duration-300
//               ${scrolled ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'}`}>
//               <nav
//                 className="flex items-center font-semibold ml-auto cursor-pointer"
//                 style={{
//                   gap: 'clamp(0.3rem, 0.7vw, 0.75rem)',
//                   fontSize: 'clamp(0.7rem, 0.9vw, 0.9rem)',
//                 }}
//               >
//                 <a href="https://www.ruet.ac.bd/" target="_blank" className="hover:text-blue duration-300">RUET Main</a>|
//                 <Link to="*" className="relative group flex items-center gap-1 hover:text-blue duration-300">
//                   Web Mail&nbsp;
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
//                     className="fill-black group-hover:fill-blue"
//                     style={{ width: 'clamp(13px, 1.1vw, 16px)', height: 'clamp(13px, 1.1vw, 16px)' }}>
//                     <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
//                   </svg>
//                 </Link>|
//                 <Link to="*" className="hover:text-blue duration-300">Alumni</Link>|
//                 <Link to="https://www.cse.ruet.ac.bd/login" target='_blank' className="hover:text-blue duration-300">Login</Link>
//                 <div className="relative flex items-center border border-blue rounded-full">
//                   <input
//                     type="text"
//                     placeholder="Search"
//                     className="outline-none text-black/65 rounded-full"
//                     style={{
//                       fontSize: 'clamp(0.7rem, 0.85vw, 0.875rem)',
//                       padding: 'clamp(0.18rem, 0.35vw, 0.25rem) clamp(1.4rem, 2.2vw, 2rem) clamp(0.18rem, 0.35vw, 0.25rem) clamp(0.5rem, 0.8vw, 0.75rem)',
//                       maxWidth: 'clamp(6rem, 10vw, 9rem)',
//                     }}
//                   />
//                   <img src={searchIcon} className="absolute right-2 w-4" alt="search" />
//                 </div>
//               </nav>
//             </div>

//             {/* Main nav links */}
//             <ul
//               className="flex items-center font-bold cursor-pointer"
//               style={{
//                 gap: 'clamp(0.4rem, 0.8vw, 1rem)',
//                 fontSize: 'clamp(0.75rem, 1.1vw, 1.1rem)',
//               }}
//             >
//               {navMenu.map((item) => (
//                 <li
//                   key={item.title}
//                   className="relative group flex items-center gap-1 whitespace-nowrap text-black cursor-pointer
//                     after:absolute after:left-1/2 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue
//                     after:transition-all after:duration-300 after:-translate-x-1/2
//                     hover:text-blue hover:after:w-full"
//                 >
//                   <span className="flex items-center gap-1">
//                     {item.children
//                       ? (<>
//                         {item.title}
//                         <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"
//                           className="fill-[#1f1f1f] group-hover:fill-blue transition-transform duration-300 group-hover:-rotate-180">
//                           <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
//                         </svg>
//                       </>)
//                       : <Link to={item.link || '/'}>{item.title}</Link>
//                     }
//                   </span>

//                   {item.children && (
//                     <div className="absolute left-0 top-full mt-2 min-w-52 rounded-md bg-blue-50 overflow-hidden shadow-lg
//                       opacity-0 invisible translate-y-2 transition-all duration-200
//                       group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
//                     >
//                       {item.children.map((sub) => (
//                         sub.link.startsWith('http') ? (
//                           <a 
//                             key={sub.title} 
//                             href={sub.link} target="_blank" rel="noreferrer"
//                             className="block px-4 py-2 text-sm hover:bg-linear-to-t from-[#003bb2] to-[#3176ff] hover:text-white"
//                           >
//                             {sub.title}
//                           </a>
//                         ) : (
//                           <Link
//                             key={sub.title}
//                             to={sub.link}
//                             className="block px-4 py-2 text-sm hover:bg-linear-to-t from-[#003bb2] to-[#3176ff] hover:text-white"
//                           >
//                             {sub.title}
//                           </Link>
//                         )
//                       ))}
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* ── Hamburger ── */}
//           <button
//             className="lg:hidden relative z-1003"
//             onClick={toggleMenu}
//             aria-label="Toggle menu"
//           >
//             <img
//               src={openMenu ? crossIcon : hamburgerIcon}
//               className="transition-all duration-300"
//               style={{ width: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
//               alt="menu"
//             />
//           </button>
//         </div>
//       </header>

//       {/* BACKDROP */}
//       <div
//         onClick={toggleMenu}
//         className={`lg:hidden fixed inset-x-0 bottom-0 z-1001
//           bg-black/30 backdrop-blur-[2px]
//           transition-opacity duration-500
//           ${openMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
//         style={{ top: `${headerHeight}px` }}
//       />

//       {/* MOBILE PANEL */}
//       <div
//         className={`lg:hidden fixed right-0 bottom-0 z-1002
//           bg-white font-inter shadow-2xl
//           overflow-y-auto overflow-x-hidden
//           w-[min(85vw,380px)]
//           transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)]
//           ${openMenu ? 'translate-x-0' : 'translate-x-full'}`}
//         style={{
//           top: `${headerHeight}px`,
//           maxHeight: `calc(100dvh - ${headerHeight}px)`,
//         }}
//       >
//         <nav className="px-6 pt-3 pb-8">
//           <ul className="flex flex-col">
//             {navMenu.map((item) => (
//               <li key={item.title} className="border-b border-gray-100 last:border-b-0">
//                 {item.children ? (
//                   <>
//                     <button
//                       onClick={() => toggleAccordion(item.title)}
//                       className={`w-full flex items-center justify-between py-4 text-left text-[17px] font-semibold transition-colors duration-300
//                         ${openAccordion === item.title ? 'text-blue' : 'text-gray-900'}`}
//                     >
//                       <span className="whitespace-nowrap">{item.title}</span>
//                       <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
//                         className={`shrink-0 ml-10 transition-transform duration-300 ease-in-out
//                           ${openAccordion === item.title ? 'rotate-180 fill-blue' : 'rotate-0 fill-[#1f1f1f]'}`}>
//                         <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
//                       </svg>
//                     </button>

//                     <div className={`overflow-hidden transition-all duration-400 ease-in-out
//                       ${openAccordion === item.title ? 'max-h-150 opacity-100 pb-3' : 'max-h-0 opacity-0'}`}>
//                       <ul className="pl-2 flex flex-col gap-0.5">
//                         {item.children.map((sub) => (
//                           <li key={sub.title}>
//                             <Link
//                               to={sub.link}
//                               onClick={toggleMenu}
//                               className="flex items-center gap-2.5 py-2 text-[15px] text-gray-600 hover:text-blue font-medium transition-colors duration-200 whitespace-nowrap"
//                             >
//                               <svg width="7" height="7" viewBox="0 0 7 7" className="shrink-0 fill-blue">
//                                 <circle cx="3.5" cy="3.5" r="3.5" />
//                               </svg>
//                               {sub.title}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </>
//                 ) : (
//                   <Link
//                     to={item.link}
//                     onClick={toggleMenu}
//                     className="flex items-center py-4 text-[17px] font-semibold text-gray-900 hover:text-blue transition-colors duration-200 whitespace-nowrap"
//                   >
//                     {item.title}
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>

//           <hr className="my-5 border-blue" />

//           <div className="relative flex items-center border border-light-blue rounded-full transition-colors duration-200 mb-5">
//             <input
//               type="text"
//               placeholder="Search"
//               className="py-2 pl-5 pr-11 text-[15px] w-full outline-none text-gray-700 rounded-full bg-transparent font-inter"
//             />
//             <img src={searchIcon} className="absolute right-4 w-5 opacity-40" alt="search-icon" />
//           </div>

//           <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-[14px] font-semibold text-gray-blue">
//             <a href="https://www.ruet.ac.bd/" target="_blank" className="hover:text-blue transition-colors duration-200 whitespace-nowrap">RUET Main</a>
//             <a href="/" className="hover:text-blue transition-colors duration-200">Web Mail</a>
//             <a href="/" className="hover:text-blue transition-colors duration-200">Alumni</a>
//             <a href="/" className="hover:text-blue transition-colors duration-200">Login</a>
//           </div>
//         </nav>
//       </div>

//       <div className="-z-1000 bg-transparent" style={{ paddingTop: `${headerHeight}px` }} />
//     </>
//   )
// }

// export default Header








// // import { useState, useEffect, useRef } from 'react'
// // import { disablePageScroll, enablePageScroll } from 'scroll-lock'
// // import { Link } from 'react-router-dom'

// // import { navMenu } from '../../constants/navData'

// // import searchIcon from '../../assets/icons/search-icon.svg'
// // import hamburgerIcon from '../../assets/icons/hamburger-icon.svg'
// // import crossIcon from '../../assets/icons/cross-icon.svg'

// // const Header = () => {
// //   const [openMenu, setOpenMenu] = useState(false)
// //   const [openAccordion, setOpenAccordion] = useState(null)
// //   const headerRef = useRef(null)
// //   const [headerHeight, setHeaderHeight] = useState(72)

// //   useEffect(() => {
// //     const measure = () => {
// //       if(headerRef.current) setHeaderHeight(headerRef.current.offsetHeight)
// //     }
// //     measure()
// //     const ro = new ResizeObserver(measure)
// //     if(headerRef.current) ro.observe(headerRef.current)
// //     return () => ro.disconnect()
// //   }, [])

// //   const toggleMenu = () => {
// //     setOpenMenu((prev) => {
// //       const next = !prev
// //       if(next) disablePageScroll()
// //       else{
// //         enablePageScroll();
// //         setOpenAccordion(null)
// //       }
// //       return next
// //     })
// //   }

// //   const toggleAccordion = (title) => {
// //     setOpenAccordion((prev) => (prev === title ? null : title))
// //   }

// //   useEffect(() => {
// //     const handleResize = () => {
// //       if(window.innerWidth >= 1024) {
// //         setOpenMenu(false)
// //         enablePageScroll()
// //         setOpenAccordion(null)
// //       }
// //     }
// //     window.addEventListener('resize', handleResize)
// //     return () => window.removeEventListener('resize', handleResize)
// //   }, [])

// //   return (
// //     <>
// //       <header ref={headerRef} className="fixed inset-x-0 top-0 z-1000 bg-white font-inter">
// //         <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-16 py-4 shadow-xl relative">
// //           <div
// //             className="absolute inset-0 -z-5 pointer-events-none opacity-40"
// //             style={{
// //               backgroundImage: `
// //                 repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 0, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 20px),
// //                 repeating-linear-gradient(-45deg, rgba(0,0,0,0.1) 0, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 20px)
// //               `,
// //               backgroundSize: '40px 40px',
// //             }}
// //           />

// //           {/* Logo — CHANGE: href → Link to */}
// //           <div className="flex items-center gap-3">
// //             <Link to="/">
// //               <img src="/RUET-logo.png" alt="ruet-logo" className="w-16 md:w-18 lg:w-20 cursor-pointer" />
// //             </Link>
// //             <Link to="/" className="cursor-pointer">
// //               <h2 className="text-dark-blue-0 text-xs sm:text-sm font-medium">RUET Center for</h2>
// //               <h1 className="text-dark-blue-1 leading-6 font-extrabold text-lg min-[500px]:text-xl xl:text-[22px]">
// //                 Computer<br />Science & Engineering
// //               </h1>
// //             </Link>
// //           </div>

// //           {/* Desktop Nav */}
// //           <div className="hidden customBreak-1:flex flex-col gap-3">
// //             <nav className="flex items-center gap-3 text-sm font-semibold ml-auto cursor-pointer">
// //               {/* external link — <a> ই থাকবে */}
// //               <a href="https://www.ruet.ac.bd/" target="_blank" className="hover:text-blue duration-300">RUET Main</a>|
// //               <a href="/" className="relative group flex items-center gap-1 hover:text-blue duration-300">
// //                 Web Mail&nbsp;
// //                 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="w-4 fill-black group-hover:fill-blue">
// //                   <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
// //                 </svg>
// //               </a>|
// //               <a href="/" className="hover:text-blue duration-300">Alumni</a>|
// //               <a href="/" className="hover:text-blue duration-300">Login</a>
// //               <div className="relative flex items-center border border-blue rounded-full">
// //                 <input type="text" placeholder="Search" className="py-1 pl-3 pr-8 text-sm max-w-36 outline-none text-black/65" />
// //                 <img src={searchIcon} className="absolute right-2 w-4" alt="search" />
// //               </div>
// //             </nav>

// //             {/* CHANGE: desktop dropdown sub items → Link */}
// //             <ul className="flex items-center max-[1320px]:gap-3 gap-4 text-[14px] min-[1220px]:text-[16px] font-bold cursor-pointer">
// //               {navMenu.map((item) => (
// //                 <li key={item.title}
// //                   className="relative group flex items-center gap-1 whitespace-nowrap text-black cursor-pointer
// //                     after:absolute after:left-1/2 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue
// //                     after:transition-all after:duration-300 after:-translate-x-1/2
// //                     hover:text-blue hover:after:w-full">
// //                   <span className="flex items-center gap-1">
// //                     {item.children
// //                       ? (<>
// //                         {item.title}
// //                         <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"
// //                           className="fill-[#1f1f1f] group-hover:fill-blue transition-transform duration-300 group-hover:-rotate-180">
// //                           <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
// //                         </svg>
// //                         </>)
// //                       : <Link to={item.link || '/'}>{item.title}</Link>
// //                     }
// //                   </span>

// //                   {item.children ? (
// //                     // has children → dropdown
// //                     <div className="absolute left-0 top-full mt-2 min-w-52 rounded-md bg-white overflow-hidden shadow-lg
// //                       opacity-0 invisible translate-y-2 transition-all duration-200
// //                       group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
// //                       {item.children.map((sub) => (
// //                         <Link key={sub.title} to={sub.link}
// //                           className="block px-4 py-2 text-sm hover:bg-linear-to-t from-[#003bb2] to-[#3176ff] hover:text-white">
// //                           {sub.title}
// //                         </Link>
// //                       ))}
// //                     </div>
// //                   ) : (
// //                     null
// //                   )}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>

// //           {/* Hamburger */}
// //           <button className="customBreak-1:hidden relative z-1003" onClick={toggleMenu} aria-label="Toggle menu">
// //             <img src={openMenu ? crossIcon : hamburgerIcon} className="w-10 transition-all duration-300" alt="menu" />
// //           </button>
// //         </div>
// //       </header>

// //       {/* BACKDROP */}
// //       <div
// //         onClick={toggleMenu}
// //         className={`customBreak-1:hidden fixed inset-x-0 bottom-0 z-1001
// //           bg-black/30 backdrop-blur-[2px]
// //           transition-opacity duration-500
// //           ${openMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
// //         style={{ top: `${headerHeight}px` }}
// //       />

// //       {/* PANEL */}
// //       <div
// //         className={`customBreak-1:hidden fixed right-0 bottom-0 z-1002
// //           bg-white font-inter shadow-2xl
// //           overflow-y-auto overflow-x-hidden
// //           w-[min(85vw,380px)]
// //           transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)]
// //           ${openMenu ? 'translate-x-0' : 'translate-x-full'}`}
// //         style={{
// //           top: `${headerHeight}px`,
// //           maxHeight: `calc(100dvh - ${headerHeight}px)`,
// //         }}
// //       >
// //         <nav className="px-6 pt-3 pb-8">
// //           <ul className="flex flex-col">
// //             {navMenu.map((item) => (
// //               <li key={item.title} className="border-b border-gray-100 last:border-b-0">
// //                 {item.children ? (
// //                   <>
// //                     <button
// //                       onClick={() => toggleAccordion(item.title)}
// //                       className={`w-full flex items-center justify-between py-4 text-left text-[17px] font-semibold transition-colors duration-300
// //                         ${openAccordion === item.title ? 'text-blue' : 'text-gray-900'}`}
// //                     >
// //                       <span className="whitespace-nowrap">{item.title}</span>
// //                       <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
// //                         className={`shrink-0 ml-10 transition-transform duration-300 ease-in-out
// //                           ${openAccordion === item.title ? 'rotate-180 fill-blue' : 'rotate-0 fill-[#1f1f1f]'}`}>
// //                         <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
// //                       </svg>
// //                     </button>

// //                     <div className={`overflow-hidden transition-all duration-400 ease-in-out
// //                       ${openAccordion === item.title ? 'max-h-150 opacity-100 pb-3' : 'max-h-0 opacity-0'}`}>
// //                       <ul className="pl-2 flex flex-col gap-0.5">
// //                         {item.children.map((sub) => (
// //                           <li key={sub.title}>
// //                             <Link
// //                               to={sub.link}
// //                               onClick={toggleMenu}
// //                               className="flex items-center gap-2.5 py-2 text-[15px] text-gray-600 hover:text-blue font-medium transition-colors duration-200 whitespace-nowrap"
// //                             >
// //                               <svg width="7" height="7" viewBox="0 0 7 7" className="shrink-0 fill-blue">
// //                                 <circle cx="3.5" cy="3.5" r="3.5" />
// //                               </svg>
// //                               {sub.title}
// //                             </Link>
// //                           </li>
// //                         ))}
// //                       </ul>
// //                     </div>
// //                   </>
// //                 ) : (
// //                   <Link
// //                     to={item.link}
// //                     onClick={toggleMenu}
// //                     className="flex items-center py-4 text-[17px] font-semibold text-gray-900 hover:text-blue transition-colors duration-200 whitespace-nowrap"
// //                   >
// //                     {item.title}
// //                   </Link>
// //                 )}
// //               </li>
// //             ))}
// //           </ul>

// //           <hr className="my-5 border-blue" />

// //           <div className="relative flex items-center border border-light-blue rounded-full transition-colors duration-200 mb-5">
// //             <input type="text" placeholder="Search"
// //               className="py-2 pl-5 pr-11 text-[15px] w-full outline-none text-gray-700 rounded-full bg-transparent font-inter"
// //             />
// //             <img src={searchIcon} className="absolute right-4 w-5 opacity-40" alt="search-icon" />
// //           </div>

// //           <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-[14px] font-semibold text-gray-blue">
// //             <a href="https://www.ruet.ac.bd/" target="_blank" className="hover:text-blue transition-colors duration-200 whitespace-nowrap">RUET Main</a>
// //             <a href="/" className="hover:text-blue transition-colors duration-200">Web Mail</a>
// //             <a href="/" className="hover:text-blue transition-colors duration-200">Alumni</a>
// //             <a href="/" className="hover:text-blue transition-colors duration-200">Login</a>
// //           </div>
// //         </nav>
// //       </div>
// //     </>
// //   )
// // }

// // export default Header