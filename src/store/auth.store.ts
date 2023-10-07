import { defineStore } from 'pinia'
import { getToken, removeToken, setToken } from '@/utils/cookie.utils.ts'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { loginApi, logoutApi } from '@/api/auth.api.ts'
import { UserInfo } from '@/types/user.types.ts'

export const useAuthStore = defineStore('auth', () => {
  const username = ref<string>('')
  const token = ref<string>('')

  function logout() {
    logoutApi(username.value).then(() => {
      username.value = ''
      token.value = ''
      removeToken()
      ElMessage.success('Logout successfully!')
      router.push({
        name: 'login'
      })
    })
  }

  function login(params: UserInfo) {
    loginApi(params)
      .then(res => {
        const data = res.data.token
        token.value = data!
        username.value = params.username
        setToken(data!)
        ElMessage.success('Login successfully!')
        router.push({
          name: 'home'
        })
      })
      .catch(err => {
        ElMessage.error(err.msg)
      })
  }

  const hasToken = computed<boolean>(() => {
    if (token.value) {
      return true
    } else if (!getToken()) {
      return false
    } else {
      token.value = getToken()
      username.value = JSON.parse(atob(token.value.split('.')[1])).username
      return true
    }
  })

  return {
    username,
    token,
    logout,
    login,
    hasToken
  }
})
