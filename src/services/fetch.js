/**
 *
 * @param {string} url
 * @param {import("http").RequestOptions} options
 */
export default function newFetch(url, { headers, body, ...options }) {
  return fetch(`https://agile-tor-73556.herokuapp.com/api/v1${url}`, {
    headers: { "Content-Type": "application/json", ...headers },
    ...options,
    body: JSON.stringify(body)
  }).then(resp => {
    if (resp.ok) return resp.json();
    throw resp;
  });
}
