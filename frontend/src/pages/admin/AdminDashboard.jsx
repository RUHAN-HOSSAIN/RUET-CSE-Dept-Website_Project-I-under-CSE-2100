
import { useState } from "react"
import { Outlet } from "react-router-dom"
import DashboardSidebar from "../../components/admin/DashboardSidebar"

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className='flex w-screen h-screen overflow-hidden font-poppins'>

      <DashboardSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className='flex-1 flex flex-col overflow-hidden'>

        {/* Top bar */}
        <div className='bg-blue flex items-center justify-between min-h-16 pl-10 pr-14 shrink-0'>
          {!isSidebarOpen && (
            <svg onClick={() => setIsSidebarOpen(true)} className='cursor-pointer'
              xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          )}
          {isSidebarOpen && <div />}

          <div className='flex items-end gap-3 cursor-pointer' onClick={() => setIsSidebarOpen(true)}>
            <div className='text-white font-semibold leading-4'>
              <h4 className="text-[11px] font-normal">Admin</h4>
              <h5 className="text-[14px]">CSE, RUET</h5>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF">
              <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm100-95.5q47-15.5 86-44.5-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160q53 0 100-15.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-43-43Zm0 360Z" />
            </svg>
          </div>
        </div>

        {/* Child route এখানে render হবে */}
        <div className='flex-1 overflow-auto'>
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard



// import { useState } from "react"
// import { useNavigate, useLocation } from "react-router-dom"
// import { useAuth } from "../../context/AuthContext"
// import { ADMIN_ROUTES } from "../../constants/adminData"

// const NAV_ITEMS = [
//   { label: "Dashboard",          path: ADMIN_ROUTES.dashboard },
//   { label: "Notice",             path: ADMIN_ROUTES.notice },
//   { label: "News & Events",      path: ADMIN_ROUTES.newsEvents },
//   { label: "Achievements",       path: ADMIN_ROUTES.achievements },
//   { label: "Campus Life",        path: ADMIN_ROUTES.campusLife },
//   { label: "MOU & Collaborations", path: ADMIN_ROUTES.mouCollaborations },
// ]

// const AdminDashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true)
//   const { logout } = useAuth()
//   const navigate = useNavigate()
//   const { pathname } = useLocation()

//   const activeSection = NAV_ITEMS.find(item => item.path === pathname)?.label || "Dashboard"

//   const handleLogout = () => {
//     logout()
//     navigate(ADMIN_ROUTES.login)
//   }

//   return (
//     <div className='flex w-screen h-screen overflow-hidden'>

//       {/* ── Sidebar ── */}
//       <div
//         className='flex flex-col justify-between bg-linear-to-tr from-dark-blue-2 to-dark-blue-1 text-white overflow-hidden shrink-0'
//         style={{ width: isSidebarOpen ? '20%' : '0', transition: 'width 0.3s' }}
//       >
//         <div className='p-8 w-[20vw]'>
//           <div className='flex justify-between items-center'>
//             <h1 className='font-bold text-[22px] font-spaceG'>Admin Dashboard</h1>
//             <svg
//               onClick={() => setIsSidebarOpen(false)}
//               className='cursor-pointer shrink-0'
//               xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"
//             >
//               <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
//             </svg>
//           </div>

//           <nav className='mt-8'>
//             <ul className='space-y-2'>
//               {NAV_ITEMS.map((item) => (
//                 <li
//                   key={item.path}
//                   onClick={() => navigate(item.path)}
//                   className={`rounded px-4 py-2 cursor-pointer transition-colors whitespace-nowrap
//                     ${pathname === item.path
//                       ? 'bg-dark-blue-2 text-orange-400 font-semibold'
//                       : 'hover:bg-dark-blue-1'
//                     }`}
//                 >
//                   {item.label}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>

//         {/* Logout */}
//         <div
//           onClick={handleLogout}
//           className="flex justify-end items-center gap-2 p-8 cursor-pointer hover:opacity-80 transition-opacity"
//         >
//           <p>Sign Out</p>
//           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
//             <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
//           </svg>
//         </div>
//       </div>

//       {/* ── Main content ── */}
//       <div className='flex-1 flex flex-col overflow-hidden'>

//         {/* Top bar to-[#EB8A1B] from-[#ffc800]*/}
//         <div className='bg-blue flex items-center justify-between min-h-16 pl-10 pr-14 shrink-0'>
//           {!isSidebarOpen && (
//             <svg
//               onClick={() => setIsSidebarOpen(true)}
//               className='cursor-pointer'
//               xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"
//             >
//               <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
//             </svg>
//           )}
//           {isSidebarOpen && <div />}

//           <div className='flex items-end gap-3 cursor-pointer' onClick={() => setIsSidebarOpen(true)}>
//             <div className='text-white font-semibold leading-4'>
//               <h4 className="text-[12px]">Admin</h4>
//               <h5 className="text-[13px]">CSE, RUET</h5>
//             </div>
//             <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF">
//               <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm100-95.5q47-15.5 86-44.5-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160q53 0 100-15.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-43-43Zm0 360Z" />
//             </svg>
//           </div>
//         </div>

//         {/* Page content */}
//         <div className='flex-1 overflow-auto p-8'>
//           <h2 className='text-xl font-semibold'>{activeSection}</h2>
//           <p className='text-gray-500 mt-1'>Manage {activeSection} content.</p>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default AdminDashboard