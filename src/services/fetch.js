import path from 'path'
import { encode } from 'querystring'

const isDev = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

/**
 *
 * @param {string} url
 * @param {import("http").RequestOptions} options
 */
export default function newFetch(
  url,
  { method = 'GET', headers, body, ...options }
) {
  const fullUrl =
    path.join(
      isDev() ? 'https://agile-tor-73556.herokuapp.com/api/v1' : '/api/v1',
      url
    ) + (method === 'GET' && body ? `?${encode(body)}` : '')

  return fetch(fullUrl, {
    headers: { 'Content-Type': 'application/json', ...headers },
    ...options,
    method,
    body: method !== 'GET' ? JSON.stringify(body) : undefined,
  }).then(async resp => {
    if (resp.ok) {
      try {
        const json = await resp.json()

        return json
      } catch (_) {
        return Promise.resolve()
      }
    }

    throw resp
  })
}
