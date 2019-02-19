import Cookies from 'js-cookie'

const TokenKey = 'customer-Token'
const userInfo = "AXP-customerInfo"

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeUserInfo() {
  return sessionStorage.removeItem(userInfo)
}

export function setUserInfo(data) {
  return sessionStorage.setItem(userInfo, JSON.stringify(data))
}

export function getUserInfo() {
  return JSON.parse(sessionStorage.getItem(userInfo))
}