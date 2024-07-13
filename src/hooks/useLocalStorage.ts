import { useState, useEffect } from 'react';

export const useLocalStorage = (
  key: string,
  initial: string = ''
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? storedValue : initial;
  });

  useEffect(() => {
    return () => {
      if (value) {
        localStorage.setItem(key, value);
      }
    };
  }, []);

  return [value, setValue];
};
