import { useState } from "react";
import { useTask } from "../hook/useTask";
import { useTag } from "../hook/useTag";
import FilterBar from "../component/FilterBar/FilterBar";
import CardForm from "../component/Card/CardForm";
import CardList from "../component/Card/CardList";
import Modal from "../component/Modal/Modal";
import TagManager from "../component/TagManager/TagManager";

export default function Tasks() {
  const { tasks } = useTask();
  const { tags } = useTag();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [filter, setFilter] = useState({ status: "all", tagId: "", search: "" });

  const editingTask = tasks.find((t) => t.id === editingId) ?? null;

  const openNew = () => { setEditingId(null); setOpen(true); };
  const openEdit = (id) => { setEditingId(id); setOpen(true); };
  const close = () => { setOpen(false); setEditingId(null); };

    // if the selected tag was deleted, fall back to "all tags"
  const activeTagId = tags.some((t) => t.id === filter.tagId) ? filter.tagId : "";
  const search = filter.search.trim().toLowerCase();

  const visibleTasks = tasks.filter((t) => {
    if (filter.status === "active" && t.complete) return false;
    if (filter.status === "complete" && !t.complete) return false;
    if (activeTagId && !(t.tagIds ?? []).includes(activeTagId)) return false;
    if (search && !`${t.title} ${t.description}`.toLowerCase().includes(search)) return false;
    return true;
  });

  return (
    <div>
      <h1>Tasks</h1>
      <button type="button" onClick={openNew}>+ New Task</button>
      <button type="button" onClick={() => setTagsOpen(true)}>Manage Tags</button>

      <FilterBar filter={filter} onChange={setFilter} />

      {/* List the task with filter, all by default */}
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : visibleTasks.length === 0 ? (
        <p>No tasks match your filters.</p>
      ) : (
        <CardList tasks={visibleTasks} onEdit={openEdit} />
      )} 

      
      {/* Open a popup to edit the task */}
      {open && (
        <Modal title={editingTask ? "Edit Task" : "New Task"} onClose={close}>
          <CardForm task={editingTask} onDone={close} />
        </Modal>
      )}

      {/* Open a popup for tags */}
      {tagsOpen && (
        <Modal title="Tags" onClose={() => setTagsOpen(false)}>
          <TagManager />
        </Modal>
      )}
    </div>
  );
}