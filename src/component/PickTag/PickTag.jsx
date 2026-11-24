// PickTag.jsx
import { useState, useRef, useEffect } from "react";
import { useTag } from "../../hook/useTag";
import { useTask } from "../../hook/useTask";
import { useDeleteTag } from "../../hook/useDeleteTag";
import "./PickTag.css";

export default function PickTag({ selectedIds, onChange }) {
  const { tags, addTag } = useTag();
  const { tasks } = useTask();
  const deleteTag = useDeleteTag(); // removes the tag and cleans up tasks
  const [open, setOpen] = useState(false); // UI-only state
  const [name, setName] = useState("");
  const ref = useRef(null);

  // close when clicking outside
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const toggle = (id) =>
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((x) => x !== id)
        : [...selectedIds, id]
    );

  const handleAdd = () => {
    const id = addTag(name);          // addTag must return the new id
    if (id) onChange([...selectedIds, id]); // create + select
    setName("");
  };

  const handleDelete = (tag) => {
    const usedBy = tasks.filter((t) => (t.tagIds ?? []).includes(tag.id)).length;
    if (usedBy === 0 || confirm(`"${tag.name}" is on ${usedBy} task(s). Delete it?`)) {
      deleteTag(tag.id);
      onChange(selectedIds.filter((x) => x !== tag.id)); // fix this form's draft too
    }
  };

  return (
    <div className="pick-tag" ref={ref}>
      <button type="button" onClick={() => setOpen((o) => !o)}>
        Tags ({selectedIds.length}) ▾
      </button>

      {open && (
        <div className="pick-tag-panel">
          <div className="tag-chips">
            {tags.length === 0 && <small>No tags yet</small>}
            {tags.map((tag) => (
              <span
                key={tag.id}
                className={`chip ${selectedIds.includes(tag.id) ? "selected" : ""}`}
              >
                <button type="button" onClick={() => toggle(tag.id)}>
                  {tag.name}
                </button>
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

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Enter inside a form would submit it
                handleAdd();
              }
            }}
            placeholder="New tag, press Enter"
          />
        </div>
      )}
    </div>
  );
}