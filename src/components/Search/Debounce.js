import { useEffect, useState } from "react";

export const useDebounce = (value, ms = 300) => {
  const [debounceValue, setDebouncevalue] = useState(value);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncevalue(value);
    }, ms);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);
  return debounceValue;
};
