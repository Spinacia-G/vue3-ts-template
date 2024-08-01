import type { UserInfo } from '@/types/auth.d.ts'
import { LoginFormType } from '@/types/auth'
import { createRandomToken, createRandomUser } from '@/mock/auth.mock.ts'
import { HttpResponse } from '@/types/http'

/**
 * 账号密码登录
 * @param {LoginFormType} params
 * @returns {Promise<HttpResponse<{token?: string}>>}
 */
export function loginApi(params: LoginFormType) {
  return new Promise<HttpResponse<{ token?: string }>>(resolve => {
    console.log(params)
    setTimeout(() => {
      resolve({
        code: 200,
        msg: 'success',
        data: {
          token: createRandomToken()
        }
      })
    }, 300)
  })
}

/**
 * 获取用户信息
 * @returns {Promise<HttpResponse<UserInfo>>}
 */
export function getInfoApi() {
  return new Promise<HttpResponse<UserInfo>>(resolve => {
    resolve({
      code: 200,
      msg: 'success',
      data: createRandomUser()
    })
  })
}

/**
 * 退出登录
 * @returns {Promise<HttpResponse<Record<string, never>>>}
 */
export function logoutApi() {
  return new Promise<HttpResponse<Record<string, never>>>(resolve => {
    resolve({
      code: 200,
      msg: 'success',
      data: {}
    })
  })
}
