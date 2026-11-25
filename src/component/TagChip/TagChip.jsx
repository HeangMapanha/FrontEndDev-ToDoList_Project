import "./TagChip.css";

export default function TagChip({ tag, selected = false, onClick, onRemove }) {
  const className = `tag-chip ${selected ? "selected" : ""}`;
  const style = { "--tag-color": tag.color };

  // clickable chip (used in the picker)
  if (onClick) {
    return (
      <button type="button" className={className} style={style} onClick={onClick}>
        {tag.name}
      </button>
    );
  }

  // display chip, with an optional × (used in the manager)
  return (
    <span className={className} style={style}>
      {tag.name}
      {onRemove && (
        <button type="button" aria-label={`Delete ${tag.name}`} onClick={onRemove}>
          ×
        </button>
      )}
    </span>
  );
}