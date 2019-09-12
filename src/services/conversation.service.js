import fetch from "./fetch";

export function postConversation(token, { title, body }) {
  return fetch("/convo", { method: "POST", headers: { Authorization: token }, body: { title, post: body } });
}
