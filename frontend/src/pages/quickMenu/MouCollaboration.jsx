import { useState, useMemo, useEffect } from "react"

import NewsEventsCard        from "../../components/quickMenu/NewsEventsCard"
import Breadcrumb            from "../../components/quickMenu/Breadcrumb"
import PageHeroBanner        from "../../components/quickMenu/PageHeroBanner"
import Pagination            from "../../components/quickMenu/Pagination"
import ContentFilterSidebar  from "../../components/quickMenu/ContentFilterSidebar"

import { mouCollaborations } from "../../constants/mouCollaborationData"
import { SUB_NAV }           from "../../constants/navData"
import searchIcon            from '../../assets/icons/search-icon.svg'

const ITEMS_PER_PAGE     = 6
const DESKTOP_BREAKPOINT = 768

const MouCollaboration = () => {
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= DESKTOP_BREAKPOINT
  const [filterOpen,  setFilterOpen]  = useState(isDesktop)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const handle = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT)
        setFilterOpen(prev => prev === false ? true : prev)
    }
    window.addEventListener('resize', handle, { passive: true })
    return () => window.removeEventListener('resize', handle)
  }, [])

  const [searchInput,   setSearchInput]   = useState('')
  const [fromDate,      setFromDate]      = useState('')
  const [toDate,        setToDate]        = useState('')
  const [appliedSearch, setAppliedSearch] = useState('')
  const [appliedFrom,   setAppliedFrom]   = useState('')
  const [appliedTo,     setAppliedTo]     = useState('')

  const filteredItems = useMemo(() => {
    return mouCollaborations.filter(item => {
      if (appliedSearch) {
        const q = appliedSearch.toLowerCase()
        if (!item.title.toLowerCase().includes(q) && !item.description?.toLowerCase().includes(q))
          return false
      }
      if (appliedFrom && item.isoDate < appliedFrom) return false
      if (appliedTo   && item.isoDate > appliedTo)   return false
      return true
    })
  }, [appliedSearch, appliedFrom, appliedTo])

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE))
  const safePage   = Math.min(currentPage, totalPages)

  const currentItems = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE
    return filteredItems.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredItems, safePage])

  const handleSearch = () => {
    setAppliedSearch(searchInput)
    setAppliedFrom(fromDate)
    setAppliedTo(toDate)
    setCurrentPage(1)
  }

  const handleReset = () => {
    setSearchInput('');  setAppliedSearch('')
    setFromDate('');     setAppliedFrom('')
    setToDate('');       setAppliedTo('')
    setCurrentPage(1)
  }

  return (
    <>
      <Breadcrumb current="MOU & Collaboration" />
      <PageHeroBanner title="MOU & Collaboration" navLinks={SUB_NAV} activeTo="/quickMenu/mou-collaboration" />

      <div className="w-screen bg-white mb-10"
        style={{ paddingTop: 'clamp(2.5rem, 5vw, 6rem)', paddingLeft: 'clamp(1rem, 7vw, 10rem)', paddingRight: 'clamp(1rem, 7vw, 10rem)' }}
      >
        <div className="flex flex-col">

          <div className="flex justify-between font-semibold bg-blue font-inter">
            <p className="text-white px-5 py-2" style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.125rem)' }}>MOU &amp; Collaboration</p>
            <p onClick={() => setFilterOpen(p => !p)}
              className="text-white px-5 py-2 flex gap-1 items-center cursor-pointer select-none"
              style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.125rem)' }}
            >
              <span className="sm:inline hidden">Search /</span> Filter
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 -960 960 960" fill="#fff"
                className={`${filterOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}>
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            </p>
          </div>

          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border border-light-blue border-t-0 bg-[#F5FAFF] ${filterOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 border-0'}`}>
            <div className="p-4 flex flex-col gap-3">
              <div>
                <h2 className="font-semibold text-sm text-gray-blue mb-1.5">Title / Keyword</h2>
                <div className="relative flex items-center bg-white border border-blue rounded-full">
                  <input type="text" placeholder="Search" value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    className="py-1.5 pl-3 pr-8 w-full text-sm font-medium outline-none text-black/65 rounded-full" />
                  <img src={searchIcon} className="absolute right-3 w-4" alt="search" />
                </div>
              </div>
              <div className="grid grid-cols-1 min-[450px]:grid-cols-2 gap-2">
                <div>
                  <h2 className="font-semibold text-sm text-gray-blue mb-1.5">From Date</h2>
                  <input type="date" value={fromDate} max={toDate || undefined} onChange={e => setFromDate(e.target.value)}
                    className="w-full border border-blue bg-white text-black/70 text-xs font-medium px-2 py-1.5 outline-none" />
                </div>
                <div>
                  <h2 className="font-semibold text-sm text-gray-blue mb-1.5">To Date</h2>
                  <input type="date" value={toDate} min={fromDate || undefined} onChange={e => setToDate(e.target.value)}
                    className="w-full border border-blue bg-white text-black/70 text-xs font-medium px-2 py-1.5 outline-none" />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={handleReset}  className="py-1.5 px-4 text-blue border-2 border-blue text-sm font-poppins hover:bg-blue/10 transition-colors">Reset</button>
                <button onClick={handleSearch} className="py-1.5 px-4 bg-blue text-white text-sm font-poppins hover:bg-blue/80 transition-colors">Search</button>
              </div>
            </div>
          </div>

          <div className="flex gap-0">
            <div className="flex-1 min-w-0 border border-light-blue border-t-0"
              style={{ padding: currentItems.length === 0 ? undefined : 'clamp(1.25rem, 3vw, 3rem) clamp(1rem, 3vw, 3rem)' }}>
              {currentItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-blue py-20 gap-3 font-poppins">
                  <p className="font-medium text-lg">No results found</p>
                  <p className="text-sm">Try adjusting your search or date filters</p>
                  <button onClick={handleReset} className="mt-1 text-blue border border-blue px-4 py-1.5 text-sm hover:bg-blue/10 transition-colors">Clear Filters</button>
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1" style={{ gap: 'clamp(1.4rem, 2vw, 2rem)' }}>
                  {currentItems.map((item, idx) => (
                    <NewsEventsCard key={idx} imgURL={item.imgURL} title={item.title} date={item.date} description={item.description} />
                  ))}
                </div>
              )}
            </div>
            <ContentFilterSidebar
              filterOpen={filterOpen} searchInput={searchInput} fromDate={fromDate} toDate={toDate}
              onSearchInput={setSearchInput} onFromDate={setFromDate} onToDate={setToDate}
              onSearch={handleSearch} onReset={handleReset}
            />
          </div>
        </div>

        <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </>
  )
}

export default MouCollaboration