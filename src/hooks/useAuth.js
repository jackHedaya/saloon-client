import { useContext } from "react";
import { AuthContext } from "../App";

export default function useAuth() {
  const { token, setToken } = useContext(AuthContext);

  return [token, setToken];
}
