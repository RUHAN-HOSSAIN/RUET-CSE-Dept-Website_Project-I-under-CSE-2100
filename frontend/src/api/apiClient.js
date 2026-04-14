import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://ruet-cse-dept-website-project-i-under.onrender.com/api',
  // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

// প্রতিটা request-এ token auto attach হবে
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default apiClient