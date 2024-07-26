import { useState } from 'react';

export const useLocalStorage = (key: string, initial: string) => {
  const [value, setValue] = useState<string>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? storedValue : initial;
  });
  const setStoredValue = (value: string) => {
    setValue(value);
    localStorage.setItem(key, value);
  };

  return [value, setStoredValue] as const;
};
