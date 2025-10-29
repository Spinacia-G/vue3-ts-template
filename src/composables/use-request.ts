import {
  createFetch,
  type AfterFetchContext,
  type OnFetchErrorContext,
} from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

/**
 * 基于 `@vueuse/core` 的 createFetch 封装的请求工具，自动携带 token，统一处理后端响应和错误码。
 *
 * - 自动从 Pinia 获取 token 并注入请求头
 * - 统一处理后端 code 字段，自动抛出异常
 * - 统一错误弹窗提示及路由跳转
 *
 * - `type DataType = 'text' | 'json' | 'blob' | 'arrayBuffer' | 'formData'`
 *
 * @example
 * const { data, error } = await useRequest('/api/user').get()
 *
 * @see https://vueuse.org/core/useFetch/
 *
 * @returns {UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>}
 */
export const useRequest = createFetch({
  baseUrl: import.meta.env.VITE_BACKEND_API,
  combination: 'overwrite',
  options: {
    timeout: 1000 * 60 * 2,
    beforeFetch({ options }) {
      const { token } = storeToRefs(useAuthStore())
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token.value}`,
      }
      return { options }
    },
    async afterFetch(ctx: AfterFetchContext) {
      const contentType = ctx.response.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        const { code, data } = JSON.parse(ctx.data || '{}')
        // 与后端约定的code
        if (![0, 200].includes(code)) {
          throw new Error()
        }
        return { data }
      }
      return ctx
    },
    onFetchError(ctx: OnFetchErrorContext) {
      const { message } = JSON.parse(ctx.data || '{}')
      handlerErrorCode(ctx.response?.status, message)
      return ctx
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})

const handlerErrorCode = (code?: number, message?: string) => {
  switch (code) {
    case 200: {
      ElMessage.error(message)
      break
    }
    case 401: {
      // TODO: 需要重定向或者刷新token
      ElMessage.error('未登录或登录过期，请重新登录')
      router.push({ name: 'login' })
      break
    }
    case 403: {
      ElMessage.error(message || '没有权限')
      break
    }
    case 404: {
      ElMessage.error(message || '请求资源不存在')
      break
    }
    case 413: {
      ElMessage.error(message || '请求体过大')
      break
    }
    case 500:
    case 502:
    case 503: {
      ElMessage.error(message || '服务器错误')
      break
    }
    default:
      ElMessage.error(message || '未知错误！')
      break
  }
}
