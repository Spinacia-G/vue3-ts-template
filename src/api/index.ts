import axios from 'axios'
import { getToken } from '@/utils/cookie.ts'
import { ElMessage } from 'element-plus'
import router from '@/router'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 2 * 60 * 1000,
  withCredentials: true
})

service.interceptors.request.use(config => {
  if (!['/login'].includes(config.url || '')) {
    config.headers['Authorization'] = `Bearer ${getToken()}`
  }
  return config
})

service.interceptors.response.use(
  response => {
    if ([401].includes(response.data.code)) {
      ElMessage.error('登录状态已过期，请重新登录！')
      router.push({
        name: 'login'
      })
    }
    return Promise.resolve(response.data)
  },
  error => {
    if ([413].includes(error.response.status)) {
      ElMessage.error('文件大小超过限制，请联系管理员修改nginx配置！')
    }
    return Promise.reject(error)
  }
)

export default service
