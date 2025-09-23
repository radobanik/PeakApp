import axios from 'axios'

const SERVER_URI = import.meta.env.VITE_SERVER_URI || 'http://localhost:8080'

export const api = axios.create({
  baseURL: SERVER_URI,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
