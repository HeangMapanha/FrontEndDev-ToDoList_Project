import { useState } from "react";
import { useTask } from "../../hook/useTask";
import PickTag from "../PickTag/PickTag"; // adjust to your folder

export default function CardForm({ task = null, onDone }) {
  const { addTask, editTask } = useTask();
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [dueDate, setDueDate] = useState(task?.dueDate ?? "");
  const [tagIds, setTagIds] = useState(task?.tagIds ?? []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const data = { title: title.trim(), description, dueDate, tagIds };
    if (task) editTask(task.id, data);
    else addTask(data);

    onDone?.(); // closes the modal
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title of the Task */}
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* description */}
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Date */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <PickTag selectedIds={tagIds} onChange={setTagIds} />

      <button type="submit">{task ? "Save" : "Add Task"}</button>
      <button type="button" onClick={onDone}>Cancel</button>
    </form>
  );
}