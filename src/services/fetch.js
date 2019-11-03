import path from 'path'

const isDev = () =>
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

/**
 *
 * @param {string} url
 * @param {import("http").RequestOptions} options
 */
export default function newFetch(url, { headers, body, ...options }) {
    const fullUrl = path.join(
        isDev() ? 'https://agile-tor-73556.herokuapp.com/api/v1' : '/api/v1',
        url
    )

    return fetch(fullUrl, {
        headers: { 'Content-Type': 'application/json', ...headers },
        ...options,
        body: JSON.stringify(body),
    }).then(resp => {
        if (resp.ok) return resp.json()
        throw resp
    })
}
