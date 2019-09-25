import { useState, useEffect } from "react";

import * as conversationService from "../services/conversation.service";

export default function useConversation(id, reload) {
  const [conversation, setConvo] = useState({});

  useEffect(() => {
    conversationService
      .getConversation(id)
      .then(u => setConvo(u))
      .catch(_ => {});
  }, [id, reload]);

  return conversation;
}
