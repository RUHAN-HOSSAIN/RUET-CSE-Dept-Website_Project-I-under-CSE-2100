import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { ADMIN_ROUTES } from "../../constants/adminData"

const NAV_ITEMS = [
  { label: "Dashboard", path: ADMIN_ROUTES.dashboard },
  { label: "Notice", path: ADMIN_ROUTES.notice },
  { label: "News & Events", path: ADMIN_ROUTES.newsEvents },
  { label: "Achievements", path: ADMIN_ROUTES.achievements },
  { label: "Campus Life", path: ADMIN_ROUTES.campusLife },
  { label: "MOU & Collaborations", path: ADMIN_ROUTES.mouCollaborations },
]

const DashboardSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleLogout = () => {
    logout()
    navigate(ADMIN_ROUTES.login)
  }

  return (
    <div
      className='flex flex-col justify-between bg-white  overflow-hidden shrink-0 z-5'
      style={{ 
        width: isSidebarOpen ? '20%' : '0', transition: 'width 0.3s', 
        boxShadow: isSidebarOpen ? '2px 0 5px rgba(0,0,0,0.3)' : 'none'
      }}
    >
      <div className='p-8 w-[20vw]'>
        <div className='flex justify-between items-center border-b-2 border-blue pb-4'>
          <h1 className='font-bold text-[22px] font-spaceG'>Admin Dashboard</h1>
          <svg
            onClick={() => setIsSidebarOpen(false)}
            className='cursor-pointer shrink-0'
            xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </div>

      

        <nav className='mt-8'>
          <ul className='space-y-2'>
            {NAV_ITEMS.map((item) => (
              <li
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`rounded px-4 py-2 cursor-pointer transition-colors whitespace-nowrap
                  ${pathname === item.path
                    ? 'bg-blue text-white font-semibold'
                    : 'hover:bg-light-blue hover:text-dark-blue-2 text-gray-700'
                  }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="m-8 border-t-2 border-blue pt-4 flex justify-between">
        <div />
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 cursor-pointer hover:text-dark-blue-1 transition-colors group"
        >
          <p>Sign Out</p>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-black group-hover:fill-dark-blue-1">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar