import { useState, useRef, useEffect } from 'react'
import { homeNotices, homeNewsEvents, NOTICE_TYPES } from '../../constants/homeData'
import { Link } from 'react-router-dom'
import NewsEventsCard from './NewsEventsCard'


const HomeNoticeNews = () => {
  const [selectedType, setSelectedType] = useState('All')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

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

  // Latest 5 news
  const latestNews = [...homeNewsEvents]
    .sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate))
    .slice(0, 5)

  // Latest 9 notices, filtered by selectedType
  const latestNotices = [...homeNotices]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 9)

  const filteredNotices = selectedType === 'All'
    ? latestNotices
    : latestNotices.filter(n => n.type === selectedType)

  return (
    <>
      <div className='flex flex-col-reverse md:flex-row justify-between gap-15 p-8 sm:p-15 md:p-20 lg:px-25 xl:px-30 2xl:px-40 font-poppins'>
        { /* News & Events Section */ }
        <div className='flex-2 h-full'>
          <div className='mb-9'>
            <h2 className='font-inter font-bold text-blue text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl'>News & Events</h2>
            <p className='text-gray-700 text-sm sm:text-base'>What's happening on CSE Dept, RUET.</p>
          </div>

          <div>
            {latestNews.map((item, idx) => (
              <NewsEventsCard 
                key={item.isoDate + idx}
                imgURL={item.imgURL} 
                date={item.date}
                isoDate={item.isoDate}
                title={item.title} 
                description={item.description} 
              />
            ))}
          </div>

          <div className='text-right pt-2'>
              <Link to="/news-events" className="inline-block text-sm text-blue hover:text-orange-400">
                View All News &gt;
              </Link>
            </div>
        </div>

        {/* <hr className="md:hidden text-blue my-5" /> */}

        { /* Notices Section */ }
        <div className='flex-1 h-full md:min-w-70'>
          <div className='text-right mb-9'>
            <h2 className='font-inter font-bold text-blue text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl'>Notices</h2>
            <p className='text-gray-700 text-sm sm:text-base'>Stay Update with Latest notice</p>
          </div>
          <div className='bg-linear-to-tl from-dark-blue-2 to-blue p-5'>
            <div className='flex gap-4 items-center text-white font-semibold sm:font-bold mb-4'>
              {/* Shows selected category name — always orange */}
              <div className='bg-orange-600 p-2 sm:p-3 text-sm sm:text-base'>{selectedType}</div>

              {/* Category dropdown trigger */}
              <div className='relative' ref={dropdownRef}>
                <div
                  className='flex cursor-pointer select-none text-sm sm:text-base items-center'
                  onClick={() => setDropdownOpen(prev => !prev)}
                >
                  Category 
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 -960 960 960"  fill="#fff"
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                  </svg>
                </div>

                {/* Dropdown — all 5 NOTICE_TYPES including All */}
                {dropdownOpen && (
                  <div className='absolute top-full left-0 mt-1 bg-white shadow-lg z-50 min-w-36'>
                    {NOTICE_TYPES.map(type => (
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
              {filteredNotices.map((notice, idx) => {
                const d = new Date(notice.date)
                const noticeDay = String(d.getDate()).padStart(2, '0')
                const noticeMonth = d.toLocaleString('en', { month: 'short' })
                const noticeYear = d.getFullYear()
                return (
                  <li key={notice.id + idx} className='cursor-pointer text-white border-b border-white hover:border-orange-500 hover:text-orange-500'>
                    <div className='flex gap-3 sm:gap-5 py-1'>
                      <div className='shrink-0'>
                        <h1 className='font-medium sm:font-semibold text-[22px] sm:text-2xl font-spaceG flex items-center justify-center'>{noticeDay}</h1>
                        <p className='text-xs'>{noticeMonth} {noticeYear}</p>
                      </div>
                      <div>
                        <h3 className='font-medium text-[13px] sm:text-sm line-clamp-3'>{notice.title}</h3>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className='text-right'>
              <Link to="/notice" className="inline-block mt-6 text-sm text-orange-500 hover:text-orange-400">
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



// import { useState } from 'react'
// import { homeNotices, homeNewsEvents } from '../../constants/homeData'
// import { Link } from 'react-router-dom'
// import HomeNewsEventsCard from './HomeNewsEventsCard'


// const HomeNoticeNews = () => {
//   return (
//     <>
//       <div className='flex justify-between gap-20 font-poppins my-20 mx-40'>
        
//         { /* News & Events Section */ }
//         <div className='h-full'>
//           <div className='mb-9'>
//             <h2 className='font-inter font-bold text-3xl text-blue'>News & Events</h2>
//             <p className='text-gray-700'>What's happening on CSE Dept, RUET.</p>
//           </div>

//           <div>
//             {homeNewsEvents.map((item) => (
//               <HomeNewsEventsCard 
//                 imgURL={item.imgURL} 
//                 date={item.date} 
//                 title={item.title} 
//                 description={item.description} 
//               />
//             ))}
//           </div>

//           <div className='text-right pt-2'>
//               <Link to="/news-events" className="inline-block text-sm hover:text-blue">
//                 View All News &gt;
//               </Link>
//             </div>
//         </div>

//         { /* Notices Section */ }
//         <div className='w-100 h-full shrink-0'>
//           <div className='text-right mb-9'>
//             <h2 className='font-inter font-bold text-3xl text-blue'>Notices</h2>
//             <p className='text-gray-700'>Stay Update with Latest notice</p>
//           </div>
//           <div className='bg-linear-to-tl from-dark-blue-2 to-blue p-5'>
//             <div className='flex gap-4 items-center text-white font-bold mb-4'>
//               <div className='bg-orange-600 p-3'>All</div>
//               <div className='flex'>
//                 Category 
//                 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
//               </div>
//             </div>
//             <ul>
//               {homeNotices.map((notice) => (
//                 <li className='text-white border-b border-white hover:border-orange-400 hover:text-orange-400'>
//                   <div className='flex gap-5 py-1'>
//                     <div className='shrink-0'>
//                       <h1 className='font-semibold text-2xl font-spaceG flex items-center justify-center'>07</h1>
//                       <p className='text-sm'>Jan 2026</p>
//                     </div>
//                     <div>
//                       <h3 className='font-medium text-sm line-clamp-3'>{notice.title}</h3>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>

//             <div className='text-right'>
//               <Link to="/notice" className="inline-block mt-6 text-sm text-white hover:text-orange-500">
//                 View All Notices &gt;
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default HomeNoticeNews