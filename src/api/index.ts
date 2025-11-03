import axios, { type AxiosError } from 'axios'
import router from '@/router'
import { useAuthStore } from '@/stores'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  timeout: 2 * 60 * 1000,
  withCredentials: true,
})

service.interceptors.request.use((config) => {
  if (!config.headers.noAuth) {
    const { token } = useAuthStore()
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

service.interceptors.response.use(
  (response) => {
    if (response.data instanceof Blob) return Promise.resolve(response.data)
    const { code, message } = response.data
    if ([0, 200].includes(code)) {
      return Promise.resolve(response.data)
    } else {
      handleErrorCode(code)
      return Promise.reject(new Error(message || 'Error'))
    }
  },
  (error: AxiosError) => {
    if (axios.isCancel(error)) {
      ElMessage.error(error.message)
    }
    handleErrorCode(error.status || 500)
    return Promise.reject(error)
  },
)

const handleErrorCode = (code: number) => {
  switch (code) {
    case 400: {
      ElMessage.error('Bad request!')
      break
    }
    case 401: {
      ElMessage.error('Unauthorized, please login again!')
      router.push({ name: 'login' })
      break
    }
    case 403: {
      ElMessage.error('No permission to access!')
      break
    }
    case 404: {
      ElMessage.error('Not found!')
      break
    }
    case 413: {
      ElMessage.error('File too large!')
      break
    }
    case 429: {
      ElMessage.error('Too many requests, please try again later!')
      break
    }
    case 500: {
      ElMessage.error('Server error!')
      break
    }
    case 502: {
      ElMessage.error('Bad gateway!')
      break
    }
    case 503: {
      ElMessage.error('Service unavailable!')
      break
    }
    default:
      break
  }
}

export default service
