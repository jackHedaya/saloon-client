import fetch from './fetch'

export function getUser(token) {
  return fetch('/user', { headers: { Authorization: token } })
}

export function acceptInvite(token, convo_id) {
  return fetch('/contributor', {
    method: 'PUT',
    headers: { Authorization: token },
    body: { convo_id },
  })
}

export function getLiked(token) {
  return fetch('/user/liked', { headers: { Authorization: token } })
}
