export interface UserInfo {
  // 用户名
  username: string
  // 密码
  password?: string
  name?: string
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
