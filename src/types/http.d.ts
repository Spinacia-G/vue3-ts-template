export interface HttpResponse<T> {
  code: number
  data?: T
  message: string
}
