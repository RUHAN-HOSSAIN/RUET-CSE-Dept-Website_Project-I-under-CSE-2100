import { useState, useRef, useEffect } from 'react'
import { NOTICE_FILTER_TYPES } from '../../constants/noticeData'
import { Link, useNavigate } from 'react-router-dom'
import NewsEventsCard from './NewsEventsCard'
import apiClient from '../../api/apiClient'

import loadingSpin from '../../assets/gif/LoadingSpin.gif'
import loadingDots from '../../assets/gif/LoadingDots.gif'

const HomeNoticeNews = () => {
  const [selectedType, setSelectedType] = useState('All')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  const [latestNews, setLatestNews] = useState([])
  const [latestNotices, setLatestNotices] = useState([])
  const [loadingNews, setLoadingNews] = useState(true)
  const [loadingNotice, setLoadingNotice] = useState(true)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fetch latest 5 news events — once
  useEffect(() => {
    const fetchNews = async () => {
      setLoadingNews(true)
      try {
        const { data } = await apiClient.get('/news-events', {
          params: { page: 1, limit: 5 }
        })
        setLatestNews(data.newsEvents || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingNews(false)
      }
    }
    fetchNews()
  }, [])

  // Fetch notices — re-run when selectedType changes
  useEffect(() => {
    const fetchNotices = async () => {
      setLoadingNotice(true)
      try {
        const params = { page: 1, limit: 9 }
        if (selectedType !== 'All') params.category = selectedType

        const { data } = await apiClient.get('/notices', { params })
        setLatestNotices(data.notices || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingNotice(false)
      }
    }
    fetchNotices()
  }, [selectedType])

  return (
    <>
      <div className='flex flex-col-reverse md:flex-row justify-between gap-15 p-8 sm:p-15 md:p-20 lg:px-25 xl:px-30 2xl:px-40 font-poppins'>

        {/* News & Events Section */}
        <div className='flex-2 h-full'>
          <div className='mb-9'>
            <h2 className='font-inter font-bold text-blue text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl'>News & Events</h2>
            <p className='text-gray-700 text-sm sm:text-base'>What's happening on CSE Dept, RUET.</p>
          </div>

          <div>
            {loadingNews ? (
              <div className="flex justify-center py-4">
                <img src={loadingDots} alt="loading" className="w-40" />
              </div>
            ) : latestNews.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/news-events/${item._id}`)}
                className="cursor-pointer"
              >
                <NewsEventsCard
                  imgURL={item.imgURL}
                  isoDate={item.createdAt}
                  title={item.title}
                  description={item.description}
                />
              </div>
            ))}
          </div>

          <div className='text-right pt-2'>
            <Link to="/news-events" className="inline-block text-[15px] text-blue hover:text-orange-400">
              View All News &gt;
            </Link>
          </div>
        </div>

        {/* Notices Section */}
        <div className='flex-1 h-full md:min-w-70'>
          <div className='text-right mb-9'>
            <h2 className='font-inter font-bold text-blue text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl'>Notices</h2>
            <p className='text-gray-700 text-sm sm:text-base'>Stay Update with Latest notice</p>
          </div>

          <div className='bg-linear-to-tl from-dark-blue-2 to-blue p-5'>
            <div className='flex gap-4 items-center text-white font-semibold sm:font-bold mb-4'>
              <div className='bg-orange-600 p-2 sm:p-3 text-sm sm:text-base'>{selectedType}</div>

              <div className='relative' ref={dropdownRef}>
                <div
                  className='flex cursor-pointer select-none text-sm sm:text-base items-center'
                  onClick={() => setDropdownOpen(prev => !prev)}
                >
                  Category
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960" fill="#fff"
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                  </svg>
                </div>

                {dropdownOpen && (
                  <div className='absolute top-full left-0 mt-1 bg-white shadow-lg z-50 min-w-36'>
                    {NOTICE_FILTER_TYPES.map(type => (
                      <button
                        key={type}
                        onClick={() => { setSelectedType(type); setDropdownOpen(false) }}
                        className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-100
                          ${selectedType === type
                            ? 'bg-orange-600 text-white'
                            : 'text-gray-800 hover:bg-blue hover:text-white'
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <ul>
              {loadingNotice ? (
                <li className="flex justify-center py-4">
                  <img src={loadingDots} alt="loading" className="w-40" />
                </li>
              ) : latestNotices.length === 0 ? (
                <li className="text-white text-sm py-4 text-center opacity-70">No notices found</li>
              ) : latestNotices.map((notice) => {
                const d = new Date(notice.createdAt)
                const noticeDay = String(d.getDate()).padStart(2, '0')
                const noticeMonth = d.toLocaleString('en', { month: 'short' })
                const noticeYear = d.getFullYear()

                return (
                  <li key={notice._id} className='cursor-pointer text-white border-b border-white hover:border-orange-500 hover:text-orange-500'>
                    <a
                      href={notice.pdfURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='flex gap-3 sm:gap-5 py-1 hover:text-orange-500 transition-colors'
                    >
                      <div className='shrink-0'>
                        <h1 className='font-medium sm:font-semibold text-[22px] sm:text-2xl font-spaceG flex items-center justify-center'>{noticeDay}</h1>
                        <p className='text-xs'>{noticeMonth} {noticeYear}</p>
                      </div>
                      <div className="flex items-start">
                        <h3 className='font-medium text-[13px] sm:text-sm line-clamp-3'>
                          {notice.title}
                        </h3>
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className='text-right'>
              <Link to="/notice" className="inline-block mt-6 text-[15px] text-orange-500 hover:text-orange-400">
                View All Notices &gt;
              </Link>
            </div>
          </div>
        </div>
      </div>

      <hr className="text-blue" />
    </>
  )
}

export default HomeNoticeNews