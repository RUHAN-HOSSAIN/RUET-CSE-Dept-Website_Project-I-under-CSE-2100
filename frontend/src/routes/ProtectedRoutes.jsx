import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ADMIN_ROUTES } from '../constants/adminData'

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated
    ? <Outlet />
    : <Navigate to={ADMIN_ROUTES.login} replace />
}

export default ProtectedRoutes