import axios from 'axios'
import { getToken } from '@/utils/cookie.utils.ts'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 2 * 60 * 1000,
  withCredentials: true
})

service.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${getToken()}`
  return config
})

service.interceptors.response.use(
  response => {
    return Promise.resolve(response.data)
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
