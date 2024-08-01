import { defineStore } from 'pinia'
import { getToken } from '@/utils/cookie.ts'
import type { UserInfo } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>('')
  const user = ref<UserInfo>({
    username: '',
    nickname: '',
    email: '',
    job: ''
  })

  /**
   * 设置用户信息
   * @param {UserInfo} info 用户信息
   */
  const setUserInfo = (info: UserInfo) => {
    Object.assign(user.value, info)
  }

  /**
   * 判断token是否存在
   * @type {ComputedRef<boolean>}
   */
  const hasToken = computed<boolean>(() => {
    return !!(token.value || getToken())
  })

  return {
    user,
    token,
    hasToken,
    setUserInfo
  }
})
