import { useState, useRef, useEffect } from "react";
import { useTag } from "../../hook/useTag";
import "./PickTag.css";

export default function PickTag({ selectedIds, onChange }) {
  const { tags } = useTag();
  const [open, setOpen] = useState(false); // UI-only state
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

  return (
    <div className="pick-tag" ref={ref}>
      <button type="button" onClick={() => setOpen((o) => !o)}>
        Tags ({selectedIds.length}) ▾
      </button>

      {open && (
        <div className="pick-tag-panel">
          <div className="tag-chips">
            {tags.length === 0 && <small>No tags yet. Use Manage Tags to create some.</small>}
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                className={`chip ${selectedIds.includes(tag.id) ? "selected" : ""}`}
                onClick={() => toggle(tag.id)}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}