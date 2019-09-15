import { useState, useContext, useEffect } from "react";

import * as userService from "../services/user.service";
import { AuthContext } from "../App";

export default function useUser() {
  const { token, setToken, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token || !isLoggedIn) return;

    const logout = () => {
      setToken(null);
      setIsLoggedIn(false);
      setUser(null);
    };

    userService
      .getUser(token)
      .then(u => setUser(u))
      .catch(_ => logout());
  }, [token, setToken, isLoggedIn, setIsLoggedIn]);

  return user;
}
