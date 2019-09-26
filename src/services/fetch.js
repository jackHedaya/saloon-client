import path from "path";

const isProd = () => process.env.NODE_ENV || process.env.NODE_ENV === 'development'

/**
 *
 * @param {string} url
 * @param {import("http").RequestOptions} options
 */
export default function newFetch(url, { headers, body, ...options }) {
  const fullUrl = isProd() ? path.join("https://agile-tor-73556.herokuapp.com/api/v1", url) : url;

  return fetch(fullUrl, {
    headers: { "Content-Type": "application/json", ...headers },
    ...options,
    body: JSON.stringify(body)
  }).then(resp => {
    if (resp.ok) return resp.json();
    throw resp;
  });
}
