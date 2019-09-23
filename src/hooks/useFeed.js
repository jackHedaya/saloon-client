import { useState, useContext, useEffect } from "react";

import * as conversationService from "../services/conversation.service";
import { AuthContext } from "../App";

export default function useFeed() {
  const { token, setToken, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    if (!token || !isLoggedIn) return;

    const logout = () => {
      setToken(null);
      setIsLoggedIn(false);
      setFeed(null);
    };

    conversationService
      .getFeed(token)
      .then(u => setFeed(u.convos))
      .catch(_ => logout());
  }, [token, setToken, isLoggedIn, setIsLoggedIn]);

  return feed;
}
