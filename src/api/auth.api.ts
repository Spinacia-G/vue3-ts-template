import type { UserInfo } from '@/types/auth.d.ts'
import { sm2Decrypt } from '@/utils/sm.ts'
import { Md5 } from 'ts-md5'
import { LoginFormType } from '@/types/auth'

/**
 * 模拟http响应的数据类型
 */
interface SimulateResponse<T> {
  data: T
  code: number
  msg: string
}

/**
 * 模拟用户数据
 * @type {{password: string, username: string}[]}
 */
const users: UserInfo[] = [
  {
    username: 'Viscum_Album',
    password: 'S9wYfzmvqkdeVBV--',
    name: '槲寄生'
  }
]

/**
 * 模拟登录接口
 * @param {UserInfo} params
 * @return {Promise<SimulateResponse<{token?: string}>>}
 */
export function loginApi(params: LoginFormType) {
  return new Promise<SimulateResponse<{ token?: string }>>(
    (resolve, reject) => {
      setTimeout(() => {
        const user = users.find(
          (item: UserInfo) => item.username === sm2Decrypt(params.username)
        )
        if (user === undefined) {
          reject({
            code: 404,
            msg: '用户名不存在！',
            data: {}
          })
        } else if (
          Md5.hashStr(user.password!) !== sm2Decrypt(params.password)
        ) {
          reject({
            code: 404,
            msg: '密码错误！',
            data: {}
          })
        } else {
          const header: Record<string, string> = {
            typ: 'JWT',
            alg: 'HS256'
          }
          const payload = {
            username: user.username,
            name: user.name,
            exp: new Date(Date.now() + 6 * 60 * 60 * 1000).getTime()
          }
          const code = `${btoa(JSON.stringify(header))}.${btoa(
            encodeURI(JSON.stringify(payload))
          )}`.replaceAll('=', '')
          resolve({
            code: 200,
            msg: 'success',
            data: {
              token: code
            }
          })
        }
      }, 1000)
    }
  )
}

/**
 * 模拟获取用户信息的接口
 * @param {string} token
 * @returns {Promise<SimulateResponse<Record<string, string>>>}
 */
export function getInfoApi(token: string) {
  return new Promise<SimulateResponse<Record<string, string>>>(
    (resolve, reject) => {
      try {
        const res = JSON.parse(decodeURI(atob(token.split('.')[1])))
        if (new Date().getTime() > res.exp) {
          reject({
            code: 401,
            msg: 'token过期，请重新登录'
          })
        } else {
          resolve({
            code: 200,
            msg: 'success',
            data: { ...res }
          })
        }
      } catch {
        reject({
          code: 401,
          msg: 'token过期，请重新登录'
        })
      }
    }
  )
}

/**
 * 模拟退出登录接口
 * @return {Promise<SimulateResponse<Record<string, never>>>}
 */
export function logoutApi() {
  return new Promise<SimulateResponse<Record<string, never>>>(resolve => {
    resolve({
      code: 200,
      msg: 'success',
      data: {}
    })
  })
}
