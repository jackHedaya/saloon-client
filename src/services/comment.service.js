import fetch from "./fetch";

export function getComments(convo_id) {
  return fetch(`/comment/${convo_id}`, { method: "GET" })
}

export function postComment(token, { convo_id, comment }) {
  return fetch("/comment", { method: "POST", headers: { Authorization: token }, body: { convo_id, post: comment } });
}

export function putVote(id, { token, vote }) {
  return fetch(`/comment/${id}/vote/${vote}`, { method: "PUT", headers: token ? { Authorization: token } : undefined });
}