import { useState, useEffect } from 'react';

function getStorageValue<T>(key: string, initialValue: T) {
  const storage: string | null = localStorage.getItem(key);
  if (storage) {
    const storageValue: unknown = JSON.parse(storage);
    console.log('storage value', storageValue);
    return storageValue || initialValue;
  }
}

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, initial);
  });

  useEffect(() => {
    return () => {
      if (value) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    };
  }, [key, value]);

  return [value, setValue];
}
