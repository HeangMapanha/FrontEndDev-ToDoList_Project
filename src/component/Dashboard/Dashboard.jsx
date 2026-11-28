import { useAuth } from "../../hook/useAuth";
import { useTask } from "../../hook/useTask";
import "./Dashboard.css";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const toDateKey = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

const dateFromKey = (key) => {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const daysUntil = (key, today) =>
  Math.round((dateFromKey(key) - today) / MS_PER_DAY);

const dueLabel = (days) => {
  if (days < 0) {
    const count = Math.abs(days);
    return `${count} ${count === 1 ? "day" : "days"} overdue`;
  }
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  return `Due in ${days} days`;
};

const formatDueDate = (date, currentYear) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(date.getFullYear() === currentYear ? {} : { year: "numeric" }),
  });

export default function Dashboard() {
  const { currentAccount } = useAuth();
  const { tasks } = useTask();

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayKey = toDateKey(today);

  const overdue = tasks.filter((t) => !t.complete && t.dueDate && t.dueDate < todayKey);
  const upcoming = tasks.filter((t) => !t.complete && (!t.dueDate || t.dueDate >= todayKey));
  const noDateCount = upcoming.filter((t) => !t.dueDate).length;
  const completed = tasks.filter((t) => t.complete).length;
  const total = tasks.length;

  const scheduled = tasks
    .filter((t) => !t.complete && t.dueDate)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const stats = [
    { label: "Overdue", count: overdue.length, note: "Past the due date", tone: "overdue" },
    { label: "Due", count: upcoming.length, note: noDateCount ? `${noDateCount} without a date` : "Still to do", tone: "due" },
    { label: "Completed tasks", count: completed, note: "Done and cleared", tone: "completed" },
  ];

  const todayLabel = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const owner = currentAccount?.name ? `${currentAccount.name}'s list` : "Your list";

  return (
    <section className="dashboard" aria-label="Dashboard">
      <div className="dashboard-top">
        <div>
          <h2>Today</h2>
          <p className="dashboard-meta">{owner} · {todayLabel}</p>
        </div>
        <p className="dashboard-summary">{completed} of {total} completed</p>
      </div>

      <div className="dashboard-stats">
        {stats.map(({ label, count, note, tone }) => (
          <article key={label} className={`dashboard-stat ${tone}`}>
            <strong className="dashboard-stat-count">{count}</strong>
            <p className="dashboard-stat-label">{label}</p>
            <p className="dashboard-stat-note">{note}</p>
          </article>
        ))}
      </div>

      <div className="dashboard-schedule">
        <h3>Due dates</h3>
        {scheduled.length === 0 ? (
          <p className="dashboard-empty">No tasks with a due date.</p>
        ) : (
          <ul className="dashboard-due-list">
            {scheduled.map((task) => {
              const days = daysUntil(task.dueDate, today);
              const status = days < 0 ? "overdue" : days === 0 ? "today" : "";

              return (
                <li key={task.id} className={`dashboard-due-item ${status}`}>
                  <span className="dashboard-due-task">{task.title}</span>
                  <span className="dashboard-due-info">
                    <span className="dashboard-due-when">{dueLabel(days)}</span>
                    <time dateTime={task.dueDate}>
                      {formatDueDate(dateFromKey(task.dueDate), now.getFullYear())}
                    </time>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
