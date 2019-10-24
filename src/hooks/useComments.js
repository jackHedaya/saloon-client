import { useState, useEffect } from "react";

import useAuth from "./useAuth";

import * as commentService from "../services/comment.service";

export default function useConversation(id, { reload, token }) {
  const [comments, setComments] = useState([]);
  const { didPersistLoad } = useAuth();

  useEffect(() => {
    if (!didPersistLoad) return;

    commentService
      .getComments(id)
      .then(u => setComments(u))
      .catch(_ => {});
  }, [id, reload, token, didPersistLoad]);

  return comments;
}
