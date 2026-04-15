
import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import apiClient from '../../api/apiClient'
import AchivementCampusLifeCard from './AchivementCampusLifeCard'

const AUTO_SCROLL_MS = 3200

// Tailwind breakpoints: sm=640, lg=1024, xl=1280
const getVisibleCount = (width) => {
  if (width >= 1280) return 4  // xl+
  if (width >= 1024) return 3  // lg+
  if (width >= 580) return 2  // sm+
  return 1                     // <sm
}

const useVisibleCount = () => {
  const [visibleCount, setVisibleCount] = useState(() =>
    typeof window !== 'undefined' ? getVisibleCount(window.innerWidth) : 1
  )

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount(window.innerWidth))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return visibleCount
}

const HomeCampusLife = () => {
  const VISIBLE_COUNT = useVisibleCount()
  const navigate = useNavigate()

  const [items, setItems] = useState([])

  useEffect(() => {
    apiClient.get('/campus-life', { params: { page: 1, limit: 6 } })
      .then(({ data }) => setItems(data.campusLifes || []))
      .catch(console.error)
  }, [])

  const total = items.length
  const extended = [...items, ...items.slice(0, VISIBLE_COUNT)]

  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(true)
  const intervalRef = useRef(null)

  const resetInterval = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent(prev => prev + 1)
      setTransitioning(true)
    }, AUTO_SCROLL_MS)
  }, [])

  useEffect(() => {
    resetInterval()
    return () => clearInterval(intervalRef.current)
  }, [resetInterval])

  useEffect(() => {
    if (current >= total) {
      const t = setTimeout(() => {
        setTransitioning(false)
        setCurrent(0)
      }, 480)
      return () => clearTimeout(t)
    }
    if (current < 0) {
      const t = setTimeout(() => {
        setTransitioning(false)
        setCurrent(total - 1)
      }, 480)
      return () => clearTimeout(t)
    }
  }, [current, total])

  useEffect(() => {
    if (!transitioning) {
      const t = setTimeout(() => setTransitioning(true), 40)
      return () => clearTimeout(t)
    }
  }, [transitioning])

  // Clamp current index when VISIBLE_COUNT changes (e.g. on resize)
  useEffect(() => {
    setCurrent(prev => Math.min(prev, total - 1))
  }, [VISIBLE_COUNT, total])

  const handlePrev = () => {
    setCurrent(prev => prev - 1)
    setTransitioning(true)
    resetInterval()
  }

  const handleNext = () => {
    setCurrent(prev => prev + 1)
    setTransitioning(true)
    resetInterval()
  }

  const cardWidthPct = 100 / VISIBLE_COUNT
  const translateX = -(current * cardWidthPct)

  return (
    <>
      <div className='font-poppins p-8 sm:p-14 md:px-17 md:py-16 lg:px-20 w-full overflow-hidden'>

        {/* Header Row */}
        <div className='mb-9 flex gap-2 justify-between'>

          {/* Navigation Buttons — left side */}
          <div className='flex items-center gap-3'>
            <button
              onClick={handlePrev}
              aria-label="Previous campus life"
              className='w-8 h-8 sm:w-10 sm:h-10 xl:w-12 xl:h-12 rounded-full border border-blue text-blue flex items-center justify-center
                         hover:bg-blue/85 hover:text-white active:scale-95 transition-all duration-200'
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="20" y1="12" x2="6" y2="12" />
                <polyline points="11 7 6 12 11 17" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              aria-label="Next campus life"
              className='w-8 h-8 sm:w-10 sm:h-10 xl:w-12 xl:h-12 rounded-full border border-blue text-blue flex items-center justify-center
                         hover:bg-blue/85 hover:text-white active:scale-95 transition-all duration-200'
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="18" y2="12" />
                <polyline points="13 7 18 12 13 17" />
              </svg>
            </button>
          </div>

          {/* Heading — right side */}
          <div className='text-right'>
            <h2 className='font-inter font-bold text-blue text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl'>Campus Life</h2>
            <p className='text-gray-700 text-sm sm:text-base'>A thriving community of creative and accomplished people</p>
          </div>

        </div>

        {/* Carousel Track */}
        <div className='min-[580px]:overflow-x-clip'>
          <div
            className='flex items-stretch'
            style={{
              transform: `translateX(${translateX}%)`,
              transition: transitioning
                ? 'transform 0.48s cubic-bezier(0.4, 0, 0.2, 1)'
                : 'none',
            }}
          >
            {extended.map((item, index) => (
              <div
                key={index}
                style={{ minWidth: `${cardWidthPct}%` }}
                className='px-3 flex flex-col'
                onClick={() => {
                  const realIndex = index % total
                  navigate(`/campus-life/${items[realIndex]?._id}`)
                }}
              >
                <AchivementCampusLifeCard
                  imgURL={item.imgURL}
                  date={item.createdAt}   // ← createdAt
                  title={item.title}
                  description={item.description}
                />
              </div>
            ))}
          </div>
        </div>

        {/* More Button */}
        <div className='flex items-center justify-center mt-14 sm:mt-20'>
          <Link to="/campus-life" className='flex gap-3 items-center justify-center py-3 px-6 sm:px-10 bg-blue hover:opacity-90 text-white text-md sm:text-lg lg:text-xl xl:text-2xl font-semibold'>
            More Campus Life
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className='w-5 h-5 sm:w-6 sm:h-6' fill="#fff">
              <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* <hr className="text-blue" /> */}
    </>
  )
}

export default HomeCampusLife
