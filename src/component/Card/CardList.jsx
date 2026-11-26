import { useTask } from "../../hook/useTask";
import { CardTask } from "./CardTask";
import "./CardList.css";

export default function CardList( { tasks, onEdit } ) {
  const {toggleTask, deleteTask, clearComplete } = useTask();
  

  return (
    <div>
      <table className="task-table">
        <thead>
          {/* Table to display the data labels */}
          <tr>
            <th className="col-check" />
            <th>Task</th>
            <th>Descriptions</th>
            <th className="col-due">Due</th>
            <th className="col-tags">Tags</th>
            <th className="col-actions" />
          </tr>
        </thead>
        {/* display all data, also depends on filters */}
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