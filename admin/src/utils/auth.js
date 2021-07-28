import Cookies from 'js-cookie'

const TokenKey = 'supabase_auth_token'
// token
export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}

// user
const UserKey = 'auth_user'
export function getUser() {
  const userss = Cookies.get(UserKey)
  return userss ? JSON.parse(userss) : ''
}

export function setUser(user) {
  return Cookies.set(UserKey, JSON.stringify(user))
}

export function removeUser() {
  return Cookies.remove(UserKey)
}
