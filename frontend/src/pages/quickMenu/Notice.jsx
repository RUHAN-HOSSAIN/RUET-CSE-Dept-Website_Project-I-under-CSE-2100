import { useState, useMemo, useEffect } from "react"

import { SUB_NAV } from "../../constants/navData"
import { notices, NOTICE_TYPES } from '../../constants/noticeData'
import searchIcon from '../../assets/icons/search-icon.svg'

import Breadcrumb           from '../../components/quickMenu/Breadcrumb'
import PageHeroBanner       from '../../components/quickMenu/PageHeroBanner'
import Pagination           from '../../components/quickMenu/Pagination'
import NoticeFilterSidebar  from '../../components/quickMenu/NoticeFilterSidebar'

const ITEMS_PER_PAGE = 15
const DESKTOP_BREAKPOINT = 768

const parseDate = (iso) => {
  const d = new Date(iso + 'T00:00:00')
  return {
    day:   String(d.getDate()).padStart(2, '0'),
    month: d.toLocaleString('en-US', { month: 'short' }),
    year:  String(d.getFullYear()),
  }
}

const Notice = () => {
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= DESKTOP_BREAKPOINT
  const [filterOpen,  setFilterOpen]  = useState(isDesktop)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const handle = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        setFilterOpen(prev => prev === false ? true : prev)
      }
    }
    window.addEventListener('resize', handle, { passive: true })
    return () => window.removeEventListener('resize', handle)
  }, [])

  const [searchInput,  setSearchInput]  = useState('')
  const [selectedCat,  setSelectedCat]  = useState('All')
  const [fromDate,     setFromDate]     = useState('')
  const [toDate,       setToDate]       = useState('')
  const [appliedSearch, setAppliedSearch] = useState('')
  const [appliedFrom,   setAppliedFrom]   = useState('')
  const [appliedTo,     setAppliedTo]     = useState('')

  const filteredNotices = useMemo(() => {
    return notices.filter((item) => {
      if (appliedSearch && !item.title.toLowerCase().includes(appliedSearch.toLowerCase())) return false
      if (selectedCat !== 'All' && item.type !== selectedCat) return false
      if (appliedFrom && item.date < appliedFrom) return false
      if (appliedTo && item.date > appliedTo) return false
      return true
    })
  }, [appliedSearch, selectedCat, appliedFrom, appliedTo])

  const totalPages = Math.max(1, Math.ceil(filteredNotices.length / ITEMS_PER_PAGE))
  const safePage   = Math.min(currentPage, totalPages)

  const currentNotices = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE
    return filteredNotices.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredNotices, safePage])

  const handleSearch = () => {
    setAppliedSearch(searchInput)
    setAppliedFrom(fromDate)
    setAppliedTo(toDate)
    setCurrentPage(1)
  }

  const handleReset = () => {
    setSearchInput('');   setAppliedSearch('')
    setSelectedCat('All')
    setFromDate('');      setAppliedFrom('')
    setToDate('');        setAppliedTo('')
    setCurrentPage(1)
  }

  const handleCatSelect = (type) => {
    setSelectedCat(type)
    setCurrentPage(1)
  }

  return (
    <>
      <Breadcrumb current="Notice" />
      <PageHeroBanner title="Notice" navLinks={SUB_NAV} activeTo="/notice" />

      <div
        className='w-screen bg-white mb-10'
        style={{
          paddingTop:   'clamp(3rem, 5vw, 6rem)',
          paddingLeft:  'clamp(1rem, 7vw, 10rem)',
          paddingRight: 'clamp(1rem, 7vw, 10rem)',
        }}
      >
        <div className='flex flex-col'>

          {/* Header bar */}
          <div className="flex justify-between font-semibold bg-blue font-inter">
            <p className="text-white px-5 py-2" style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.125rem)' }}>
              List of Notice
            </p>
            <p
              onClick={() => setFilterOpen(p => !p)}
              className="text-white px-5 py-2 flex gap-1 items-center cursor-pointer select-none"
              style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.125rem)' }}
            >
              <span className="sm:inline hidden">Search /</span> Filter
              <svg
                xmlns="http://www.w3.org/2000/svg" height="24px" width="24px"
                viewBox="0 -960 960 960" fill="#fff"
                className={`${filterOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            </p>
          </div>

          {/* Mobile Filter Drawer */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border border-light-blue border-t-0 bg-[#F5FAFF] ${filterOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0 border-0'}`}>
            <div className="p-4 flex flex-col gap-3">

              {/* Title search */}
              <div>
                <h2 className="font-semibold text-sm text-gray-blue mb-1.5">Title / Heading</h2>
                <div className="relative flex items-center bg-white border border-blue rounded-full">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    className="py-1.5 pl-3 pr-8 w-full text-sm font-medium outline-none text-black/65 rounded-full"
                  />
                  <img src={searchIcon} className="absolute right-3 w-4" alt="search" />
                </div>
              </div>

              {/* Category */}
              <div>
                <h2 className="font-semibold text-sm text-gray-blue mb-1.5">Category</h2>
                <div className="flex flex-wrap gap-1.5">
                  {NOTICE_TYPES.map(type => (
                    <div
                      key={type}
                      onClick={() => handleCatSelect(type)}
                      className={`text-white text-[0.8rem] font-poppins py-1 px-3 rounded-full cursor-pointer transition-colors duration-200 ${selectedCat === type ? 'bg-blue ring-2 ring-blue ring-offset-1' : 'bg-blue/50 hover:bg-blue'}`}
                    >{type}</div>
                  ))}
                </div>
              </div>

              {/* Date row */}
              <div className="grid grid-cols-1 min-[450px]:grid-cols-2 gap-2">
                <div>
                  <h2 className="font-semibold text-sm text-gray-blue mb-1.5">From Date</h2>
                  <input
                    type="date"
                    value={fromDate}
                    max={toDate || undefined}
                    onChange={e => setFromDate(e.target.value)}
                    className="w-full border border-blue bg-white text-black/70 text-xs font-medium px-2 py-1.5 outline-none"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-sm text-gray-blue mb-1.5">To Date</h2>
                  <input
                    type="date"
                    value={toDate}
                    min={fromDate || undefined}
                    onChange={e => setToDate(e.target.value)}
                    className="w-full border border-blue bg-white text-black/70 text-xs font-medium px-2 py-1.5 outline-none"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button onClick={handleReset}  className="py-1.5 px-4 text-blue border-2 border-blue text-sm font-poppins hover:bg-blue/10 transition-colors">Reset</button>
                <button onClick={handleSearch} className="py-1.5 px-4 bg-blue text-white text-sm font-poppins hover:bg-blue/80 transition-colors">Search</button>
              </div>

            </div>
          </div>

          {/* Notice List + Desktop Sidebar */}
          <div className="flex gap-0">
            <div className="flex-1 min-w-0 relative border border-light-blue border-t-0">
              {currentNotices.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-blue py-20 gap-3 font-poppins">
                  <p className="font-medium text-lg">No notices found</p>
                  <p className="text-sm">Try adjusting your filters</p>
                  <button onClick={handleReset} className="mt-1 text-blue border border-blue px-4 py-1.5 text-sm hover:bg-blue/10 transition-colors">
                    Clear Filters
                  </button>
                </div>
              ) : (
                <ul
                  className="flex flex-col"
                  style={{
                    paddingTop:    'clamp(1rem, 2vw, 2rem)',
                    paddingLeft:   'clamp(0.75rem, 4vw, 5rem)',
                    paddingRight:  'clamp(0.75rem, 4vw, 5rem)',
                    paddingBottom: 'clamp(1rem, 2vw, 2rem)',
                  }}
                >
                  {currentNotices.map((item) => {
                    const { day, month, year } = parseDate(item.date)
                    return (
                      <li
                        key={item.id}
                        className="flex hover:text-dark-blue-0 transition-colors duration-200 border-b border-light-blue last:border-none"
                        style={{ paddingTop: 'clamp(0.5rem, 1vw, 0.875rem)', paddingBottom: 'clamp(0.5rem, 1vw, 0.875rem)' }}
                      >
                        <div
                          className="font-spaceG flex flex-col items-start shrink-0 leading-none"
                          style={{
                            marginRight: 'clamp(0.75rem, 2.5vw, 2.5rem)',
                            padding:     '0.25rem 0.5rem',
                            minWidth:    'clamp(3rem, 5vw, 5.5rem)',
                          }}
                        >
                          <p style={{ fontSize: 'clamp(0.65rem, 0.85vw, 0.8rem)', marginBottom: '0.1rem' }}>
                            {month} {year}
                          </p>
                          <p className="text-blue" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.7rem)', fontWeight: 500, lineHeight: 1 }}>
                            {day}
                          </p>
                        </div>
                        <div className="min-w-0 flex flex-col justify-center">
                          <p className="font-medium font-poppins leading-snug" style={{ fontSize: 'clamp(0.875rem, 1.30vw, 1.2rem)' }}>
                            {item.title}
                          </p>
                          <p className="text-gray-blue" style={{ fontSize: 'clamp(0.75rem, 0.95vw, 0.9rem)', marginTop: '0.2rem' }}>
                            Notice &bull; {item.type}
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            <NoticeFilterSidebar
              filterOpen={filterOpen}
              searchInput={searchInput}
              selectedCat={selectedCat}
              fromDate={fromDate}
              toDate={toDate}
              noticeTypes={NOTICE_TYPES}
              onSearchInput={setSearchInput}
              onCatSelect={handleCatSelect}
              onFromDate={setFromDate}
              onToDate={setToDate}
              onSearch={handleSearch}
              onReset={handleReset}
            />
          </div>
        </div>

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  )
}

export default Notice




// import { useState, useMemo, useEffect } from "react"

// import { SUB_NAV } from "../../constants/navData"
// import { notices, NOTICE_TYPES } from '../../constants/noticeData'
// import searchIcon from '../../assets/icons/search-icon.svg'

// import Breadcrumb           from '../../components/quickMenu/Breadcrumb'
// import PageHeroBanner       from '../../components/quickMenu/PageHeroBanner'
// import Pagination           from '../../components/quickMenu/Pagination'
// import NoticeFilterSidebar  from '../../components/quickMenu/NoticeFilterSidebar'
// import CustomDatePicker     from '../../components/quickMenu/CustomDatePicker'

// // ── Constants ─────────────────────────────────────────────────────────────────

// const ITEMS_PER_PAGE = 15
// const DESKTOP_BREAKPOINT = 768   // md

// // ── Helper ────────────────────────────────────────────────────────────────────

// const parseDate = (iso) => {
//   const d = new Date(iso + 'T00:00:00')
//   return {
//     day:   String(d.getDate()).padStart(2, '0'),
//     month: d.toLocaleString('en-US', { month: 'short' }),
//     year:  String(d.getFullYear()),
//   }
// }

// // ── Component ─────────────────────────────────────────────────────────────────

// const Notice = () => {
//   // Desktop → filter open by default; mobile → closed by default
//   const isDesktop = typeof window !== 'undefined' && window.innerWidth >= DESKTOP_BREAKPOINT
//   const [filterOpen,  setFilterOpen]  = useState(isDesktop)
//   const [currentPage, setCurrentPage] = useState(1)

//   // Keep filterOpen in sync if window resizes across breakpoint
//   useEffect(() => {
//     const handle = () => {
//       if (window.innerWidth >= DESKTOP_BREAKPOINT) {
//         // On desktop — always honour the user's toggle, but open it on first switch to desktop
//         setFilterOpen(prev => {
//           // Only force open if crossing from mobile (where it may have been auto-closed)
//           return prev === false && window.innerWidth >= DESKTOP_BREAKPOINT ? true : prev
//         })
//       }
//     }
//     window.addEventListener('resize', handle, { passive: true })
//     return () => window.removeEventListener('resize', handle)
//   }, [])

//   // ── Filter state ─────────────────────────────────────────────────────────────
//   const [searchInput,  setSearchInput]  = useState('')
//   const [selectedCat,  setSelectedCat]  = useState('All')
//   const [fromDate,     setFromDate]     = useState('')
//   const [toDate,       setToDate]       = useState('')

//   const [appliedSearch, setAppliedSearch] = useState('')
//   const [appliedFrom,   setAppliedFrom]   = useState('')
//   const [appliedTo,     setAppliedTo]     = useState('')

//   // ── Filter logic ─────────────────────────────────────────────────────────────
//   const filteredNotices = useMemo(() => {
//     return notices.filter((item) => {
//       if (appliedSearch && !item.title.toLowerCase().includes(appliedSearch.toLowerCase()))
//         return false
//       if (selectedCat !== 'All' && item.type !== selectedCat)
//         return false
//       if (appliedFrom && item.date < appliedFrom)
//         return false
//       if (appliedTo && item.date > appliedTo)
//         return false
//       return true
//     })
//   }, [appliedSearch, selectedCat, appliedFrom, appliedTo])

//   const totalPages = Math.max(1, Math.ceil(filteredNotices.length / ITEMS_PER_PAGE))
//   const safePage   = Math.min(currentPage, totalPages)

//   const currentNotices = useMemo(() => {
//     const start = (safePage - 1) * ITEMS_PER_PAGE
//     return filteredNotices.slice(start, start + ITEMS_PER_PAGE)
//   }, [filteredNotices, safePage])

//   // ── Handlers ──────────────────────────────────────────────────────────────────
//   const handleSearch = () => {
//     setAppliedSearch(searchInput)
//     setAppliedFrom(fromDate)
//     setAppliedTo(toDate)
//     setCurrentPage(1)
//   }

//   const handleReset = () => {
//     setSearchInput('');   setAppliedSearch('')
//     setSelectedCat('All')
//     setFromDate('');      setAppliedFrom('')
//     setToDate('');        setAppliedTo('')
//     setCurrentPage(1)
//   }

//   const handleCatSelect = (type) => {
//     setSelectedCat(type)
//     setCurrentPage(1)
//   }

//   // ── Render ────────────────────────────────────────────────────────────────────
//   return (
//     <>
//       <Breadcrumb current="Notice" />

//       <PageHeroBanner
//         title="Notice"
//         navLinks={SUB_NAV}
//         activeTo="/notice"
//       />

//       {/* ── Main Content ────────────────────────────────────────────────────── */}
//       <div
//         className='w-screen bg-white mb-10'
//         style={{
//           paddingTop:   'clamp(3rem, 5vw, 6rem)',
//           paddingLeft:  'clamp(1rem, 7vw, 10rem)',
//           paddingRight: 'clamp(1rem, 7vw, 10rem)',
//         }}
//       >
//         <div className='flex flex-col'>

//           {/* Header bar */}
//           <div className="flex justify-between font-semibold bg-blue font-inter">
//             <p className="text-white px-5 py-2" style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.125rem)' }}>
//               List of Notice
//             </p>
//             <p
//               onClick={() => setFilterOpen(p => !p)}
//               className="text-white px-5 py-2 flex gap-1 items-center cursor-pointer select-none"
//               style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.125rem)' }}
//             >
//               <span className="sm:inline hidden">Search /</span> Filter
//               <svg
//                 xmlns="http://www.w3.org/2000/svg" height="24px" width="24px"
//                 viewBox="0 -960 960 960" fill="#fff"
//                 className={`${filterOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}
//               >
//                 <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
//               </svg>
//             </p>
//           </div>

//           {/* Mobile Filter Drawer (< md) — always starts closed */}
//           <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border border-light-blue border-t-0 bg-[#F5FAFF] ${filterOpen ? 'max-h-150 opacity-100' : 'max-h-0 opacity-0 border-0'}`}>
//             <div className="p-4 flex flex-col gap-3">

//               {/* Title search */}
//               <div>
//                 <h2 className="font-semibold text-sm text-gray-blue mb-1.5">Title / Heading</h2>
//                 <div className="relative flex items-center bg-white border border-blue rounded-full">
//                   <input
//                     type="text"
//                     placeholder="Search"
//                     value={searchInput}
//                     onChange={e => setSearchInput(e.target.value)}
//                     onKeyDown={e => e.key === 'Enter' && handleSearch()}
//                     className="py-1.5 pl-3 pr-8 w-full text-sm font-medium outline-none text-black/65 rounded-full"
//                   />
//                   <img src={searchIcon} className="absolute right-3 w-4" alt="search" />
//                 </div>
//               </div>

//               {/* Category */}
//               <div>
//                 <h2 className="font-semibold text-sm text-gray-blue mb-1.5">Category</h2>
//                 <div className="flex flex-wrap gap-1.5">
//                   {NOTICE_TYPES.map(type => (
//                     <div
//                       key={type}
//                       onClick={() => handleCatSelect(type)}
//                       className={`text-white text-xs font-poppins py-1 px-3 rounded-full cursor-pointer transition-colors duration-200 ${selectedCat === type ? 'bg-blue ring-2 ring-blue ring-offset-1' : 'bg-blue/50 hover:bg-blue'}`}
//                     >{type}</div>
//                   ))}
//                 </div>
//               </div>

//               {/* Date row — stacked on very small, side-by-side on sm */}
//               <div className="grid grid-cols-2 gap-2">
//                 <div className="min-w-0">
//                   <h2 className="font-semibold text-sm text-gray-blue mb-1.5">From Date</h2>
//                   <CustomDatePicker
//                     value={fromDate}
//                     onChange={setFromDate}
//                     max={toDate || undefined}
//                     placeholder="Start"
//                     inputStyle={{ fontSize: '0.8rem', padding: '0.3rem 0.5rem' }}
//                   />
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="font-semibold text-sm text-gray-blue mb-1.5">To Date</h2>
//                   <CustomDatePicker
//                     value={toDate}
//                     onChange={setToDate}
//                     min={fromDate || undefined}
//                     placeholder="End"
//                     inputStyle={{ fontSize: '0.8rem', padding: '0.3rem 0.5rem' }}
//                   />
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="flex gap-3">
//                 <button onClick={handleReset}  className="py-1.5 px-4 text-blue border-2 border-blue text-sm font-poppins hover:bg-blue/10 transition-colors">Reset</button>
//                 <button onClick={handleSearch} className="py-1.5 px-4 bg-blue text-white text-sm font-poppins hover:bg-blue/80 transition-colors">Search</button>
//               </div>

//             </div>
//           </div>

//           {/* Notice List + Desktop Filter Sidebar */}
//           <div className="flex gap-0">

//             {/* Notice List */}
//             <div className="flex-1 min-w-0 relative border border-light-blue border-t-0">
//               {currentNotices.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center text-gray-blue py-20 gap-3 font-poppins">
//                   <p className="font-medium text-lg">No notices found</p>
//                   <p className="text-sm">Try adjusting your filters</p>
//                   <button onClick={handleReset} className="mt-1 text-blue border border-blue px-4 py-1.5 text-sm hover:bg-blue/10 transition-colors">
//                     Clear Filters
//                   </button>
//                 </div>
//               ) : (
//                 <ul
//                   className="flex flex-col"
//                   style={{
//                     paddingTop:    'clamp(1rem, 2vw, 2rem)',
//                     paddingLeft:   'clamp(0.75rem, 4vw, 5rem)',
//                     paddingRight:  'clamp(0.75rem, 4vw, 5rem)',
//                     paddingBottom: 'clamp(1rem, 2vw, 2rem)',
//                   }}
//                 >
//                   {currentNotices.map((item) => {
//                     const { day, month, year } = parseDate(item.date)
//                     return (
//                       <li
//                         key={item.id}
//                         className="flex hover:text-dark-blue-0 transition-colors duration-200 border-b border-light-blue last:border-none"
//                         style={{ paddingTop: 'clamp(0.5rem, 1vw, 0.875rem)', paddingBottom: 'clamp(0.5rem, 1vw, 0.875rem)' }}
//                       >
//                         <div
//                           className="font-poppins flex flex-col items-start text-blue shrink-0 leading-none"
//                           style={{
//                             marginRight: 'clamp(0.75rem, 2.5vw, 2.5rem)',
//                             padding:     '0.25rem 0.5rem',
//                             minWidth:    'clamp(3rem, 5vw, 5.5rem)',
//                           }}
//                         >
//                           <p style={{ fontSize: 'clamp(0.65rem, 0.85vw, 0.8rem)', marginBottom: '0.1rem' }}>
//                             {month} {year}
//                           </p>
//                           <p style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', fontWeight: 500, lineHeight: 1 }}>
//                             {day}
//                           </p>
//                         </div>
//                         <div className="min-w-0 flex flex-col justify-center">
//                           <p className="font-medium font-poppins leading-snug" style={{ fontSize: 'clamp(0.875rem, 1.30vw, 1.2rem)' }}>
//                             {item.title}
//                           </p>
//                           <p className="text-gray-blue" style={{ fontSize: 'clamp(0.75rem, 0.95vw, 0.9rem)', marginTop: '0.2rem' }}>
//                             Notice &bull; {item.type}
//                           </p>
//                         </div>
//                       </li>
//                     )
//                   })}
//                 </ul>
//               )}
//             </div>

//             {/* Desktop Filter Sidebar */}
//             <NoticeFilterSidebar
//               filterOpen={filterOpen}
//               searchInput={searchInput}
//               selectedCat={selectedCat}
//               fromDate={fromDate}
//               toDate={toDate}
//               noticeTypes={NOTICE_TYPES}
//               onSearchInput={setSearchInput}
//               onCatSelect={handleCatSelect}
//               onFromDate={setFromDate}
//               onToDate={setToDate}
//               onSearch={handleSearch}
//               onReset={handleReset}
//             />
//           </div>
//         </div>

//         {/* Pagination */}
//         <Pagination
//           currentPage={safePage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//         />

//       </div>
//     </>
//   )
// }

// export default Notice