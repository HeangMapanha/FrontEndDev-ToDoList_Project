import { useTask } from "../../hook/useTask";
import { CardTask } from "./CardTask";

export default function CardList() {
  const { tasks, toggleTask, deleteTask, clearComplete } = useTask();

  if (tasks.length === 0) {
    return <p>No tasks yet.</p>;
  }

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <CardTask 
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              />
            {/* <input
              type="checkbox"
              checked={task.complete}
              onChange={() => toggleTask(task.id)}
            />

            <span
              style={{ textDecoration: task.complete ? "line-through" : "none" }} // Check if Task is completed then it will cross
            >
              {task.title}
            </span>

            {task.dueDate && <small> (due {task.dueDate})</small>} 
            {task.description && <p>{task.description}</p>}

            <button onClick={() => deleteTask(task.id)}>Delete</button> */}
            
          </li>
          // This will display list of task

        ))}
      </ul>
      
      {/* Clear all of of tasks */}
      <button onClick={clearComplete}>Clear completed</button>
    </div>
  );
}