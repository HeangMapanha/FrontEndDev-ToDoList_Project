import { useState, useMemo } from "react";
import "./Calendar.css";
import { useTask } from "../hook/useTask";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MAX_VISIBLE = 3; // tasks shown per day before "+N more"

// "2026-11-10" -> local Date. Also used to build keys for each cell.
const toKey = (d) => {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

function taskStatus(task, todayKey) {
  if (task.complete) return "completed";
  if (task.dueDate < todayKey) return "overdue"; // ISO date strings sort correctly
  if (task.dueDate === todayKey) return "due-today";
  return "upcoming";
}

export default function Calendar({ onSelectTask }) {
  const {tasks} = useTask()
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [expandedDay, setExpandedDay] = useState(null);

  const todayKey = toKey(new Date());

  // Group tasks by due date once, instead of filtering for every cell
  const tasksByDate = useMemo(() => {
    const map = {};
    for (const t of tasks) {
      if (!t.dueDate) continue;
      (map[t.dueDate] ||= []).push(t);
    }
    return map;
  }, [tasks]);

  // Build the grid: start on the Sunday before the 1st, always 6 rows
  const cells = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const startOffset = (new Date(year, month, 1).getDay() + 6 % 7); //
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7; // 28, 35 or 42

    return Array.from({ length: totalCells }, (_, i) => {
      const d = new Date(year, month, 1 - startOffset + i);
      return { date: d, key: toKey(d), inMonth: d.getMonth() === month };
    });
  }, [viewDate]);

  const goMonth = (delta) => {
    setExpandedDay(null);
    setViewDate((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1));
  };

  const goToday = () => {
    const now = new Date();
    setExpandedDay(null);
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  const title = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className="cal">
      <header className="cal-header">
        <h2 className="cal-title">{title}</h2>
        <div className="cal-nav">
          <button onClick={() => goMonth(-1)} aria-label="Previous month">
            ‹
          </button>
          <button onClick={goToday}>Today</button>
          <button onClick={() => goMonth(1)} aria-label="Next month">
            ›
          </button>
        </div>
      </header>

      <div className="cal-grid cal-weekdays">
        {WEEKDAYS.map((d) => (
          <div key={d} className="cal-weekday">
            {d}
          </div>
        ))}
      </div>

      <div className="cal-grid cal-days">
        {cells.map(({ date, key, inMonth }) => {
          const dayTasks = tasksByDate[key] || [];
          const expanded = expandedDay === key;
          const visible = expanded ? dayTasks : dayTasks.slice(0, MAX_VISIBLE);
          const hidden = dayTasks.length - visible.length;

          return (
            <div
              key={key}
              className={
                "cal-day" +
                (inMonth ? "" : " outside") +
                (key === todayKey ? " today" : "")
              }
            >
              <span className="cal-date">{date.getDate()}</span>

              <ul className="cal-tasks">
                {visible.map((t) => (
                  <li key={t.id}>
                    <button
                      className={`cal-task ${taskStatus(t, todayKey)}`}
                      title={t.title}
                      onClick={() => onSelectTask?.(t)}
                    >
                      {t.title}
                    </button>
                  </li>
                ))}
              </ul>

              {hidden > 0 && (
                <button
                  className="cal-more"
                  onClick={() => setExpandedDay(key)}
                >
                  +{hidden} more
                </button>
              )}
              {expanded && dayTasks.length > MAX_VISIBLE && (
                <button
                  className="cal-more"
                  onClick={() => setExpandedDay(null)}
                >
                  Show less
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}