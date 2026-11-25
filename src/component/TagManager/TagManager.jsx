import { useState } from "react";
import { useTag } from "../../hook/useTag";
import { useTask } from "../../hook/useTask";
import TagChip from "../TagChip/TagChip";
import "./TagManager.css";

export default function TagManager() {
  const { tags, addTag, editTag, deleteTag } = useTag();
  const { tasks, removeTagFromTasks } = useTask();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#4f46e5"); 

  const handleAdd = (e) => {
    e.preventDefault();
    const clean = name.trim();
    if (!clean) return;
    if (tags.some((t) => t.name.toLowerCase() === clean.toLowerCase())) return;
    addTag(clean, color);
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
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          aria-label="Tag color"
        />
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
          <span key={tag.id} className="tag-row">
            <input
              type="color"
              value={tag.color}
              onChange={(e) => editTag(tag.id, { color: e.target.value })}
              aria-label={`Color for ${tag.name}`}
            />
            <TagChip tag={tag} onRemove={() => handleDelete(tag)} />
          </span>
        ))}
      </div>
    </div>
  );
}