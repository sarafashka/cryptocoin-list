import { useState } from 'react';

export const useLocalStorage = (key: string, initial: string) => {
  const [value, setValue] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? storedValue : initial;
    }
    return initial;
  });

  const setStoredValue = (value: string) => {
    setValue(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  };

  return [value, setStoredValue] as const;
};
