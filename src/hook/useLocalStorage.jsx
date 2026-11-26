import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  // Runs once on first render: load saved data, or use the default
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue; // use [] on most keys, else use existing one
    } catch {
      return initialValue;
    }
  });

  // Runs every time `value` changes: save it
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value)); // value is stored an objet inside parent object key
    } catch {
      // storage full or unavailable; ignore
    }
  }, [key, value]); // anytime key or value changed, but mostly value

  return [value, setValue];
};