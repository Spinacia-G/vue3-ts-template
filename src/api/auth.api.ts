import { useRequest } from '@/composables/use-request.ts'
import type { UserInfo } from '@/types/user.ts'

interface ReturnLoginResult extends UserInfo {
  token: string
}

export const loginApi = (username: string, password: string) => {
  return useRequest<ReturnLoginResult>('/auth/login').post({
    username,
    password,
  })
}

export const logoutApi = (token?: string) => {
  return useRequest('/auth/logout').post({ token }, 'json')
}

export const getAvatarApi = () => {
  return useRequest<Blob>('/auth/avatar').get().blob()
}
