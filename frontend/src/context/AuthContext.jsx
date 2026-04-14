import { createContext, useContext, useState } from 'react'
import apiClient from '../api/apiClient'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('adminToken')
  )

  const login = async (userId, password) => {
    try {
      const { data } = await apiClient.post('/auth/login', { userId, password })
      localStorage.setItem('adminToken', data.token)
      setIsAuthenticated(true)
      return { ok: true }
    } catch (err) {
      return { ok: false, message: err.response?.data?.message || 'Login failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)