import { useState } from "react";
import { useTask } from "../hook/useTask";
import { useTag } from "../hook/useTag";
import FilterBar from "../component/FilterBar/FilterBar";
import CardForm from "../component/Card/CardForm";
import CardList from "../component/Card/CardList";
import Modal from "../component/Modal/Modal";
import TagManager from "../component/TagManager/TagManager";
import "./Task.css";

export default function Tasks() {
  const { tasks } = useTask();
  const { tags } = useTag();
  const doneCount = tasks.filter((t) => t.complete).length; // for "3 of 8 done"
  const [open, setOpen] = useState(false); // use popup
  const [editingId, setEditingId] = useState(null);
  const [tagsOpen, setTagsOpen] = useState(false); // use tag popup
  const [filter, setFilter] = useState({ status: "all", tagId: "", search: "" });

  const editingTask = tasks.find((t) => t.id === editingId) ?? null; // will search for existing task or null

  const openNew = () => { setEditingId(null); setOpen(true); }; // Give new task/tag null id
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
    <div className="page tasks-page">
      <header className="tasks-header">
        <div>
          <h1>Tasks</h1>
          <p className="muted">{doneCount} of {tasks.length} done</p>
          {tasks.length > 0 && (
            <div className="tasks-progress" aria-hidden="true">
              <span style={{ width: `${(doneCount / tasks.length) * 100}%` }} />
            </div>
          )}
        </div>
        <div className="toolbar">
          <button type="button" className="btn" onClick={openNew}>+ New Task</button>
          <button type="button" className="btn btn-secondary" onClick={() => setTagsOpen(true)}>Manage Tags</button>
        </div>
      </header>

      {/* Input filter info and the action */}
      <FilterBar filter={filter} onChange={setFilter} />

      {/* List the task with filter, all by default */}
      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet.</p>
          <button type="button" className="btn" onClick={openNew}>+ Add your first task</button>
        </div>
      ) : visibleTasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks match your filters.</p>
        </div>
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