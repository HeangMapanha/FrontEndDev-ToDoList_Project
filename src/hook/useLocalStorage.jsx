import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  // Runs once on first render: load saved data, or use the default
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Runs every time `value` changes: save it
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or unavailable; ignore
    }
  }, [key, value]);

  return [value, setValue];
};