import { createContext, useContext } from "react";
import { useLocalStorage } from "../hook/useLocalStorage";


export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const addTask = ({ title, description = "", dueDate = "", tagIds = [] }) =>
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, description, dueDate, complete: false, tagIds },
    ]);

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const editTask = (id, changes) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...changes } : t))
    );

  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, complete: !t.complete } : t))
    );

  const removeTagFromTasks = (tagId) =>
    setTasks((prev) =>
      prev.map((t) => ({ ...t, tagIds: t.tagIds.filter((id) => id !== tagId) }))
    );

  const clearComplete = () =>
    setTasks((prev) => prev.filter((t) => !t.complete));

  const value = {
    tasks,
    addTask,
    deleteTask,
    editTask,
    toggleTask,
    removeTagFromTasks,
    clearComplete,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}