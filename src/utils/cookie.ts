import Cookies from 'js-cookie'

export const TOKEN_KEY = 'Admin-Token'

export function setToken(token: string) {
  Cookies.set(TOKEN_KEY, token)
}

export function getToken() {
  return Cookies.get(TOKEN_KEY) || ''
}

export function removeToken() {
  Cookies.remove(TOKEN_KEY)
}
