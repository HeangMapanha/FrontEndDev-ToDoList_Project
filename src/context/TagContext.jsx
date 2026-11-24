import { createContext } from "react";
import { useLocalStorage } from "../hook/useLocalStorage";

export const TagContext = createContext(null);

export function TagProvider({ children }) {
  const [tags, setTags] = useLocalStorage("tags", []);

  const addTag = (name, color = "gray") => {
    const clean = name.trim();
    if (!clean) return;
    setTags((prev) => [...prev, { id: crypto.randomUUID(), name: clean, color }]);
  };

  const editTag = (id, changes) =>
    setTags((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes } : t)));

  const deleteTag = (id) =>
    setTags((prev) => prev.filter((t) => t.id !== id));

  const value = { tags, addTag, editTag, deleteTag };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
}