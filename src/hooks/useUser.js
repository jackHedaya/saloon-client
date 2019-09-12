import { useState, useContext, useEffect } from "react";

import * as userService from "../services/user.service";
import { AuthContext } from "../App";

export default function useUser() {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return

    userService
      .getUser(token)
      .then(u => setUser(u))
      .catch(_ => setUser(null));
  }, [token]);

  return user;
}
