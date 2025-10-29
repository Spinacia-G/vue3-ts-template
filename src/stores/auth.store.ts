import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { UserInfo } from '@/types/user.ts'
import { loginApi, logoutApi } from '@/api/auth.api.ts'
import router from '@/router'
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const user = useStorage<UserInfo>('USER_INFO', {})
  const setUserInfo = (obj: UserInfo) => {
    user.value = obj
  }

  const token = useStorage<string>('AUTH_TOKEN', '')
  const setAuthToken = (tk: string) => {
    token.value = tk
  }

  const isLoggedIn = computed(() => !!token.value)

  const login = async (username: string, password: string) => {
    const { data } = await loginApi(username, password)
    if (data.value) {
      const { token, ...user } = data.value
      setAuthToken(token)
      setUserInfo(user)
      router.push({ name: 'home' })
    }
  }
  const logout = async () => {
    logoutApi(token.value)
    reset()
    router.push({ name: 'login' })
  }

  const reset = () => {
    user.value = {}
    token.value = ''
  }

  return {
    user,
    setUserInfo,

    token,
    setAuthToken,
    isLoggedIn,

    login,
    logout,

    reset,
  }
})
