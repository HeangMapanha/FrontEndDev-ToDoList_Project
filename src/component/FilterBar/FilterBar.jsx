import { useTag } from "../../hook/useTag";
import "./FilterBar.css";

export default function FilterBar({ filter, onChange }) {
  const { tags } = useTag();
  // take anything as parameters and input it to list
  const set = (changes) => onChange({ ...filter, ...changes });

  return (
    <div className="filter-bar">
      <input
        type="search"
        placeholder="Search tasks"
        value={filter.search}
        onChange={(e) => set({ search: e.target.value })}
      />

      <select value={filter.status} onChange={(e) => set({ status: e.target.value })}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="complete">Completed</option>
      </select>

      <select value={filter.tagId} onChange={(e) => set({ tagId: e.target.value })}>
        <option value="">All tags</option>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.id}>{tag.name}</option>
        ))}
      </select>
    </div>
  );
}