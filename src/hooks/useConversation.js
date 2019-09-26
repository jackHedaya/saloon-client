import { useState, useEffect } from "react";

import * as conversationService from "../services/conversation.service";

export default function useConversation(id, { reload, token }) {
  const [conversation, setConvo] = useState({});

  useEffect(() => {
    conversationService
      .getConversation(id, { token })
      .then(u => setConvo(u))
      .catch(_ => {});
  }, [id, reload, token]);

  return conversation;
}
