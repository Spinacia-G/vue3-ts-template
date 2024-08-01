/**
 * 接口响应的数据类型
 */
export interface HttpResponse<T> {
  code: number
  data: T
  msg: string
}
