import TagChip from "../TagChip/TagChip";
import { useTag } from "../../hook/useTag";
import { TimeLabel } from "../TimeLabel/TimeLabel";
import "./CardTask.css";

export function CardTask({ task, toggleTask, deleteTask, onEdit }) {
  const { tags } = useTag();
  

  // Load all tags into this
  const taskTags = (task.tagIds ?? [])
    .map((id) => tags.find((t) => t.id === id))
    .filter(Boolean);

  return (
    // Put className done or empty
    <tr className={task.complete ? "done" : ""}> 
      <td>
        <input
          type="checkbox"
          checked={task.complete}
          onChange={() => toggleTask(task.id)}
        />
      </td>

      <td>
        <p className="text">{task.title}</p>
        
      </td>

      <td>{task.description && <small className="text">{task.description}</small>}</td>

      {/* <td>{task.dueDate || "—"}</td> */}
      <td>
        <TimeLabel date={task.dueDate} complete={task.complete} completedAt={task.completedAt}/>
      </td>

      <td>
        {/* Match the tags  */}
        <div className="cell-tags">
          {taskTags.map((tag) => (
            <TagChip key={tag.id} tag={tag} />
          ))}
        </div>
      </td>

      <td>
        <div className="cell-actions">
          <button type="button" onClick={() => onEdit(task.id)}>Edit</button>
          <button type="button" onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      </td>
    </tr>
  );
}