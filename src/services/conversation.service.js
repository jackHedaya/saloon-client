import fetch from "./fetch";

export function getFeed(token) {
  return fetch("/feed", { method: "GET", headers: token ? { Authorization: token } : undefined });
}

export function getConversation(id, { token } = {}) {
  return fetch(`/convo/${id}`, { method: "GET", headers: token ? { Authorization: token } : undefined });
}

export function postConversation(token, { title, body }) {
  return fetch("/convo", { method: "POST", headers: { Authorization: token }, body: { title, post: body } });
}

export function postConversationPost(token, { convo_id, post }) {
  return fetch("/post", { method: "POST", headers: { Authorization: token }, body: { convo_id, post } });
}
