import { useState } from "react";
import { useTask } from "../hook/useTask";
import CardForm from "../component/Card/CardForm";
import CardList from "../component/Card/CardList";
import Modal from "../component/Modal/Modal";
import TagManager from "../component/TagManager/TagManager";

export default function Tasks() {
  const { tasks } = useTask();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [tagsOpen, setTagsOpen] = useState(false);

  const editingTask = tasks.find((t) => t.id === editingId) ?? null;

  const openNew = () => { setEditingId(null); setOpen(true); };
  const openEdit = (id) => { setEditingId(id); setOpen(true); };
  const close = () => { setOpen(false); setEditingId(null); };

  return (
    <div>
      <h1>Tasks</h1>
      <button type="button" onClick={openNew}>+ New Task</button>
      <button type="button" onClick={() => setTagsOpen(true)}>Manage Tags</button>

      <CardList onEdit={openEdit} />

      {open && (
        <Modal title={editingTask ? "Edit Task" : "New Task"} onClose={close}>
          <CardForm task={editingTask} onDone={close} />
        </Modal>
      )}

      {tagsOpen && (
        <Modal title="Tags" onClose={() => setTagsOpen(false)}>
          <TagManager />
        </Modal>
      )}
    </div>
  );
}