import fetch from './fetch'

export function login(email, password) {
  return fetch('/user/login', { method: 'POST', body: { email, password } })
}

export function register({ username, password, first_name, last_name, email }) {
  return fetch('/user/signup', {
    method: 'POST',
    body: { username, first_name, last_name, password, email },
  })
}
