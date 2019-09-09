/**
 *
 * @param {string} url
 * @param {import("http").RequestOptions} options
 */
export default function fetch(url, options) {
  return fetch(`https://agile-tor-73556.herokuapp.com/api/v1${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
    body: JSON.stringify(options.body),
  }).then(resp => {
    if (resp.ok) return resp.json();
    throw new Error("Request Error");
  });
}