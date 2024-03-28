import { defineStore } from 'pinia'
import { getToken } from '@/utils/cookie.utils.ts'
import type { UserInfo } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>('')
  const user = ref<UserInfo>({
    username: '',
    password: '',
    name: ''
  })

  /**
   * 设置用户信息
   * @param {UserInfo | undefined} info 用户信息
   */
  const setUserInfo = (info: UserInfo | undefined) => {
    if (info) {
      Object.assign(user.value, info)
    } else {
      user.value = {
        username: '',
        password: '',
        name: ''
      }
    }
  }

  const hasToken = computed<boolean>(() => {
    if (token.value) {
      return true
    } else return !!getToken()
  })

  return {
    user,
    token,
    hasToken,
    setUserInfo
  }
})
