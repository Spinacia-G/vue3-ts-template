/**
 * 用户信息
 */
export interface UserInfo {
  // 用户名
  username: string
  // 用户昵称
  nickname: string
  // 邮箱
  email: string
  job: string
}

/**
 * 登录接口传参
 */
export interface LoginFormType {
  username: string
  password: string
  code: string
  uuid: string
}
