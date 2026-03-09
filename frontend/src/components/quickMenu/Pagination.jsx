import { useState, useMemo, useEffect } from "react"

// ── Helpers (internal) ───────────────────────────────────────────────────────

const getPaginationItems = (current, total, delta) => {
  if (total <= 1) return [1]
  const left  = Math.max(2,         current - delta)
  const right = Math.min(total - 1, current + delta)
  const items = [1]
  if (left > 2)          items.push('...')
  for (let i = left; i <= right; i++) items.push(i)
  if (right < total - 1) items.push('...')
  items.push(total)
  return items
}

const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  )
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handle, { passive: true })
    return () => window.removeEventListener('resize', handle)
  }, [])
  return width
}

// ── Component ────────────────────────────────────────────────────────────────

/**
 * Pagination
 * Props:
 *   currentPage  {number}   — current active page (1-based)
 *   totalPages   {number}   — total number of pages
 *   onPageChange {function} — called with new page number when user navigates
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const windowWidth = useWindowWidth()

  // How many page buttons to show around current page
  // ≥ 900px → 2  |  600–899px → 1  |  < 600px → 0
  const delta = windowWidth >= 900 ? 2 : windowWidth >= 600 ? 1 : 0

  const safePage = Math.min(currentPage, totalPages)

  const paginationItems = useMemo(
    () => getPaginationItems(safePage, totalPages, delta),
    [safePage, totalPages, delta]
  )

  const goTo = (page) => {
    if (page < 1 || page > totalPages) return
    onPageChange(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (totalPages <= 1) return null

  // Fluid cell styles
  const cellBase = {
    fontSize:   'clamp(0.8rem, 1.05vw, 1.05rem)',
    lineHeight: 1,
    fontFamily: 'inherit',
  }
  const cellPad = {
    padding: 'clamp(0.42rem, 0.8vw, 0.7rem) clamp(0.6rem, 1.05vw, 1rem)',
  }

  return (
    <div
      className="flex justify-center items-center font-poppins"
      style={{
        paddingTop:    'clamp(1.5rem, 3vw, 2.5rem)',
        paddingBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
        gap:           'clamp(0.12rem, 0.3vw, 0.28rem)',
      }}
    >
      {/* ‹ Prev */}
      <button
        onClick={() => goTo(safePage - 1)}
        disabled={safePage === 1}
        className="flex items-center justify-center select-none transition-colors duration-200 font-bold"
        style={{
          ...cellBase, ...cellPad,
          minWidth:   'clamp(2rem, 2.6vw, 2.7rem)',
          background: safePage === 1 ? 'rgba(147,197,253,0.2)' : 'rgba(147,197,253,0.4)',
          color:      safePage === 1 ? 'rgba(0,0,0,0.28)'      : 'rgba(0,0,0,0.72)',
          cursor:     safePage === 1 ? 'not-allowed'            : 'pointer',
        }}
      >&lt;</button>

      {/* Page numbers + ellipsis */}
      {paginationItems.map((item, idx) =>
        item === '...'
          ? (
            <span
              key={`el-${idx}`}
              className="flex items-center justify-center text-black/35 select-none"
              style={{ ...cellBase, padding: '0 clamp(0.2rem, 0.4vw, 0.4rem)' }}
            >…</span>
          )
          : (
            <button
              key={`pg-${item}`}
              onClick={() => goTo(item)}
              className="flex items-center justify-center border select-none transition-all duration-200"
              style={{
                ...cellBase, ...cellPad,
                minWidth:    'clamp(2rem, 2.6vw, 2.7rem)',
                background:  item === safePage ? 'var(--color-blue, #1d4ed8)' : 'transparent',
                color:       item === safePage ? '#fff'                        : 'rgba(0,0,0,0.72)',
                borderColor: item === safePage ? 'var(--color-blue, #1d4ed8)' : 'rgba(147,197,253,0.55)',
                fontWeight:  item === safePage ? 700                           : 500,
                cursor:      'pointer',
              }}
            >{item}</button>
          )
      )}

      {/* › Next */}
      <button
        onClick={() => goTo(safePage + 1)}
        disabled={safePage === totalPages}
        className="flex items-center justify-center select-none transition-colors duration-200 font-bold"
        style={{
          ...cellBase, ...cellPad,
          minWidth:   'clamp(2rem, 2.6vw, 2.7rem)',
          background: safePage === totalPages ? 'rgba(147,197,253,0.2)' : 'rgba(147,197,253,0.4)',
          color:      safePage === totalPages ? 'rgba(0,0,0,0.28)'      : 'rgba(0,0,0,0.72)',
          cursor:     safePage === totalPages ? 'not-allowed'            : 'pointer',
        }}
      >&gt;</button>
    </div>
  )
}

export default Pagination