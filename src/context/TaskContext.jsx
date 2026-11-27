import { createContext } from "react";
import { useLocalStorage } from "../hook/useLocalStorage";
import { useAuth } from "../hook/useAuth";
import { STORAGE_KEYS, createTask } from "../model/model";

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const { currentAccount } = useAuth();
  const [allTasks, setAllTasks] = useLocalStorage(STORAGE_KEYS.tasks, []);

  const tasks = allTasks.filter((t) => t.accountId === currentAccount?.id);

  const addTask = ({ title, description, dueDate, tagIds }) => {
    if (!currentAccount) return;
    setAllTasks((prev) => [
      ...prev,
      createTask({ accountId: currentAccount.id, title, description, dueDate, tagIds }),
    ]);
  };

  const deleteTask = (id) =>
    setAllTasks((prev) => prev.filter((t) => t.id !== id));

  const editTask = (id, changes) =>
    setAllTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...changes } : t))
    );

  const toggleTask = (id) =>
    // Check for time: if completed true, also set the time of completion else null
  setAllTasks((prev) =>
    prev.map((t) => {
      if (t.id !== id) return t;
      const nowComplete = !t.complete;
      return {
        ...t,
        complete: nowComplete,
        completedAt: nowComplete ? new Date().toISOString() : null,
      };
    })
  );

  const removeTagFromTasks = (tagId) =>
    setAllTasks((prev) =>
      prev.map((t) => ({ ...t, tagIds: (t.tagIds ?? []).filter((id) => id !== tagId) }))
    );

  const clearComplete = () =>
    setAllTasks((prev) =>
      prev.filter((t) => !(t.accountId === currentAccount?.id && t.complete))
    );

  const clearAllTasks = () =>
    setAllTasks((prev) => prev.filter((t) => t.accountId !== currentAccount?.id));

  const value = {
    tasks,
    addTask,
    deleteTask,
    editTask,
    toggleTask,
    removeTagFromTasks,
    clearComplete,
    clearAllTasks
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}