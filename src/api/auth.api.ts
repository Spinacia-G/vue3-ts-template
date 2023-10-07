import { UserInfo } from '@/types/user.types.ts'

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
    username: 'Admin001',
    password: 'Admin123456'
  }
]

/**
 * 模拟登录接口
 * @param {UserInfo} params
 * @return {Promise<SimulateResponse<{token?: string}>>}
 */
export function loginApi(params: UserInfo) {
  return new Promise<SimulateResponse<{ token?: string }>>(
    (resolve, reject) => {
      setTimeout(() => {
        const user = users.find(
          (item: UserInfo) => item.username === params.username
        )
        if (user === undefined) {
          reject({
            code: 404,
            msg: 'user is not found',
            data: {}
          })
        } else if (user.password !== params.password) {
          reject({
            code: 404,
            msg: 'wrong password',
            data: {}
          })
        } else {
          const header: Record<string, string> = {
            typ: 'JWT',
            alg: 'HS256'
          }
          const payload = {
            username: user.username,
            exp: new Date(Date.now() + 12 * 60 * 60 * 1000).getTime()
          }
          const code = `${btoa(JSON.stringify(header))}.${btoa(
            JSON.stringify(payload)
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
 * 模拟退出登录接口
 * @param {string} username
 * @return {Promise<SimulateResponse<Record<string, never>>>}
 */
export function logoutApi(username: string) {
  console.log(`do something with ${username}`)
  return new Promise<SimulateResponse<Record<string, never>>>(resolve => {
    resolve({
      code: 200,
      msg: 'success',
      data: {}
    })
  })
}
