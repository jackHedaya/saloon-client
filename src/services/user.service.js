import fetch from './fetch'

export function getUser(token) {
  return fetch('/user', { headers: { Authorization: token } })
}
