
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ADMIN_ROUTES } from "../../constants/adminData"
import formatDateToLocal from "../../utils/formatDateToLocal"
import apiClient from "../../api/apiClient"

import noticeLogo from "../../assets/icons/noticeLogo.svg"
import eventLogo from "../../assets/icons/eventLogo.svg"
import achievementLogo from "../../assets/icons/achievementLogo.svg"
import campusLifeLogo from "../../assets/icons/campusLifeLogo.svg"
import mouLogo from "../../assets/icons/mouLogo.svg"

const QUICK_ACTIONS = [
  { label: "Manage Notice",       path: ADMIN_ROUTES.notice,            bg: "#2563eb", icon: noticeLogo },
  { label: "Manage News/Event",   path: ADMIN_ROUTES.newsEvents,        bg: "#16a34a", icon: eventLogo },
  { label: "Manage Achievement",  path: ADMIN_ROUTES.achievements,      bg: "#ea580c", icon: achievementLogo },
  { label: "Manage Campus Life",  path: ADMIN_ROUTES.campusLife,        bg: "#9333ea", icon: campusLifeLogo },
  { label: "Manage MOU & Collab", path: ADMIN_ROUTES.mouCollaborations, bg: "#db2777", icon: mouLogo },
]

const StatsCard = ({ label, value, sub, dot }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1000
    const stepTime = 20
    const steps = duration / stepTime
    const increment = value / steps

    const timer = setInterval(() => {
      start += increment
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, stepTime)

    return () => clearInterval(timer)
  }, [value])

  return (
    <div className="bg-white rounded-2xl p-5 flex-1 min-w-40 shadow-xs border border-gray-100 font-poppins flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm sm:text-base text-gray-600">{label}</p>
        <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: dot }}/>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold font-inter text-gray-800">{count}</h1>
      <p className="text-xs sm:text-sm text-gray-400 mt-1">{sub}</p>
    </div>
  )
}

const DashboardBody = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    notices: 0, newsEvents: 0, achievements: 0, campusLifes: 0, mous: 0
  })

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const [notices, newsEvents, achievements, campusLifes, mous] = await Promise.all([
          apiClient.get('/notices?limit=1'),
          apiClient.get('/news-events?limit=1'),
          apiClient.get('/achievements?limit=1'),
          apiClient.get('/campus-life?limit=1'),
          apiClient.get('/mous?limit=1'),
        ])
        setStats({
          notices:      notices.data.total,
          newsEvents:   newsEvents.data.total,
          achievements: achievements.data.total,
          campusLifes:  campusLifes.data.campusLifes ? campusLifes.data.total : 0,
          mous:         mous.data.total,
        })
      } catch (err) {
        console.error(err)
      }
    }
    fetchAllStats()
  }, [])

  const STATS = [
    { label: "Total Notices",        value: stats.notices,      dot: "#3b82f6" },
    { label: "News & Events",        value: stats.newsEvents,   dot: "#22c55e" },
    { label: "Achievements",         value: stats.achievements, dot: "#f59e0b" },
    { label: "Campus Life",          value: stats.campusLifes,  dot: "#a855f7" },
    { label: "MOU & Collaborations", value: stats.mous,         dot: "#ec4899" },
  ]

  return (
    <div className="bg-slate-100 w-full px-5 min-[450px]:px-8 sm:px-12 md:px-15 lg:px-20 py-10 font-poppins flex flex-col gap-10">

      {/* Header */}
      <div className="flex items-center justify-between p-5 bg-white shadow-xs border border-gray-100">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#4a5565">
              <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/>
            </svg>
            <span className="text-sm text-gray-600 font-medium">Dashboard</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">RUET CSE Admin Panel</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Manage all department content from here.</p>
        </div>
        <div className="text-right">
          <p className="text-xs sm:text-sm text-gray-400">Today</p>
          <p className="text-sm sm:text-base font-semibold text-gray-700">{formatDateToLocal(new Date())}</p>
        </div>
      </div>

      {/* Stats */}
      <div>
        <p className="text-xs font-semibold text-gray-600 tracking-widest mb-3">STATS</p>
        <div className="flex flex-wrap gap-4">
          {STATS.map(s => <StatsCard key={s.label} {...s}/>)}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <p className="text-xs font-semibold text-gray-600 tracking-widest mb-3">QUICK ACTIONS</p>
        <div className="flex gap-4 flex-wrap">
          {QUICK_ACTIONS.map(a => (
            <button key={a.label} onClick={() => navigate(a.path)}
              className="flex-1 py-5 text-white font-semibold text-sm flex flex-col items-start px-5 gap-3 transition-opacity hover:opacity-90 cursor-pointer"
              style={{ background: a.bg }}>
              <img src={a.icon} alt={a.label} className="w-6 h-6"/>
              <span>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
         <p className="text-xs font-semibold text-gray-600 tracking-widest mb-3">RECENT ADDED</p>
         <table className="w-full cell-spacing-5">
           <thead>
             <tr className="flex gap-4">
               <th className="flex-2 text-center text-xs font-semibold bg-white text-gray-700 rounded-lg uppercase tracking-wider py-2 shadow-sm">Title</th>
               <th className="flex-1 text-center text-xs font-semibold bg-white text-gray-700 rounded-lg uppercase tracking-wider py-2 shadow-sm">Type</th>
               <th className="flex-1 text-center text-xs font-semibold bg-white text-gray-700 rounded-lg uppercase tracking-wider py-2 shadow-sm">Date</th>
             </tr>
           </thead>
           <tbody className="">
             <tr>
               <td className="col-span-3 text-gray-600 text-center pt-5">Comming Soon ........</td>
             </tr>
           </tbody>
         </table>
       </div>

    </div>
  )
}

export default DashboardBody
