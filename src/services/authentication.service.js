/**
 *
 * @param {string} url
 * @param {import("http").RequestOptions} options
 */
function req(url, options) {
  return fetch(`/api/v1${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
    body: JSON.stringify(options.body),
  }).then(resp => {
    if (resp.ok) return resp.json();
    throw new Error("Request Error");
  });
}

export function login(username, password) {
  return req("/user/login", { method: "POST", body: { user_name: username, password } });
}

export function register({ username, password, first_name, last_name }) {
  return req("/user/signup", { method: "POST", body: { user_name: username, first_name, last_name, password } });
}
