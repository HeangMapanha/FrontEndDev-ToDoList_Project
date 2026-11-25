import { useTask } from "../../hook/useTask";
import { CardTask } from "./CardTask";
import "./CardList.css";

export default function CardList( {onEdit} ) {
  const { tasks, toggleTask, deleteTask, clearComplete } = useTask();

  if (tasks.length === 0) {
    return <p>No tasks yet.</p>;
  }

  return (
    <div>
      <table className="task-table">
        <thead>
          <tr>
            <th className="col-check" />
            <th>Task</th>
            <th>Descriptions</th>
            <th className="col-due">Due</th>
            <th className="col-tags">Tags</th>
            <th className="col-actions" />
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <CardTask
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
      <button type="button" onClick={clearComplete}>Clear completed</button>
    </div>
    );
}