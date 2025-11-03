import service from '@/api/index.ts'
import type { UserInfo } from '@/types/user.ts'
import type { HttpResponse } from '@/types/http'

export const loginApi = (
  username: string,
  password: string,
): Promise<HttpResponse<{ token: string } & UserInfo>> => {
  return service({
    url: '/auth/login',
    method: 'post',
    headers: {
      noAuth: true,
    },
    data: {
      username,
      password,
    },
  })
}

export const logoutApi = (token?: string): Promise<HttpResponse<string>> => {
  return service({
    url: '/auth/logout',
    method: 'post',
    data: {
      token,
    },
  })
}
