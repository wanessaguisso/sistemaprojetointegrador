'use client';
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // State para armazenar o valor
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Verifica se está no ambiente do navegador
      if (typeof window === 'undefined') {
        return initialValue;
      }

      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Atualiza o localStorage quando o valor mudar
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
