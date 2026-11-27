import { createContext } from "react";
import { useLocalStorage } from "../hook/useLocalStorage";
import { useAuth } from "../hook/useAuth";
import { STORAGE_KEYS, createTag } from "../model/model";

export const TagContext = createContext(null);

export function TagProvider({ children }) {
  const { currentAccount } = useAuth(); // use Current ID to match account
  const [allTags, setAllTags] = useLocalStorage(STORAGE_KEYS.tags, []);

  // only the logged-in account's tags are exposed
  const tags = allTags.filter((t) => t.accountId === currentAccount?.id);

  const addTag = (name, color) => {
    const clean = name.trim();
    if (!clean || !currentAccount) return;
    setAllTags((prev) => [
      ...prev,
      createTag({ accountId: currentAccount.id, name: clean, color }),
    ]);
  };
  // any tags edits find it with ID
  const editTag = (id, changes) =>
    setAllTags((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes } : t)));

  const deleteTag = (id) =>
    setAllTags((prev) => prev.filter((t) => t.id !== id));

  const clearAllTags = () =>
    setAllTags((prev) => prev.filter((t) => t.accountId !== currentAccount?.id));

  const value = { tags, addTag, editTag, deleteTag, clearAllTags };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
}