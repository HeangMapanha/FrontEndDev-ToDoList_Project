import { useState } from "react";
import { useTag } from "../../hook/useTag";
import { useTask } from "../../hook/useTask";
import "./TagManager.css";

export default function TagManager() {
  const { tags, addTag, deleteTag } = useTag();
  const { tasks, removeTagFromTasks } = useTask();
  const [name, setName] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    const clean = name.trim();
    if (!clean) return;
    // skip duplicates (case-insensitive)
    if (tags.some((t) => t.name.toLowerCase() === clean.toLowerCase())) return;
    addTag(clean);
    setName("");
  };

  const handleDelete = (tag) => {
    const usedBy = tasks.filter((t) => (t.tagIds ?? []).includes(tag.id)).length;
    if (usedBy === 0 || confirm(`"${tag.name}" is on ${usedBy} task(s). Delete it?`)) {
      deleteTag(tag.id);
      removeTagFromTasks(tag.id);
    }
  };

  return (
    <div className="tag-manager">
      <form onSubmit={handleAdd} className="tag-manager-add">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New tag name"
          autoFocus
        />
        <button type="submit">Add</button>
      </form>

      <div className="tag-manager-list">
        {tags.length === 0 && <small>No tags yet</small>}
        {tags.map((tag) => (
          <span key={tag.id} className="tag-chip">
            {tag.name}
            <button
              type="button"
              aria-label={`Delete ${tag.name}`}
              onClick={() => handleDelete(tag)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}