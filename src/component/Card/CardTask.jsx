


export function CardTask(props) {
    // Single element that hold the data 
    const { task, toggleTask, deleteTask } = props
    return (

        <div className="Main">
            {/* Check box for task */}
            <input
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

            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
    )
}