import { useState } from "react";

export default function useReload() {
  const [reload, setReload] = useState(-1);

  return [reload, () => setReload(-reload)];
}