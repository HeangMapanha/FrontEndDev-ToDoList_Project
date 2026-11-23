import { useTask } from "../../hook/useTask";

export default function TaskList() {
  const { tasks, toggleTask, deleteTask, clearComplete } = useTask();

  if (tasks.length === 0) {
    return <p>No tasks yet.</p>;
  }

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.complete}
              onChange={() => toggleTask(task.id)}
            />
            <span
              style={{ textDecoration: task.complete ? "line-through" : "none" }}
            >
              {task.title}
            </span>
            {task.dueDate && <small> (due {task.dueDate})</small>}
            {task.description && <p>{task.description}</p>}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={clearComplete}>Clear completed</button>
    </div>
  );
}