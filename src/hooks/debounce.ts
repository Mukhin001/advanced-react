import { useEffect, useState } from "react";

export function useDebounce(value: string, delay: number = 300): string {
  const [debounds, setDebounds] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounds(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounds;
}
