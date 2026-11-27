import "./TimeLabel.css";

export function TimeLabel({ date, complete, completedAt }) {

    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    let label;
    let status;

    if (!date) return <span>—</span>;

    const dateDisplay = new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const due = new Date(`${date}T00:00:00`);

    const difference = Math.round((due - today) / MS_PER_DAY);

    let pastDue = null;
    if (completedAt) {
        const completed = new Date(completedAt);
        const completedDay = new Date(
            completed.getFullYear(),
            completed.getMonth(),
            completed.getDate()
    );

    pastDue = Math.round((completedDay - due) / MS_PER_DAY);
    }


    if (complete) {
    if (pastDue === null) {
        label = "Completed";
        status = "completed";
    } else if (pastDue > 0) {
        label = `Completed ${pastDue} ${pastDue === 1 ? "day" : "days"} late`;
        status = "completed-late";
    } else {
        label = "Completed on time";
        status = "completed";
    }
    } else if (difference < 0) {
        const days = Math.abs(difference);
        label = `${days} ${days === 1 ? "day" : "days"} overdue`;
        status = "overdue";
    } else if (difference === 0) {
        label = "Due today";
        status = "due-today";
    } else if (difference === 1) {
        label = "Due tomorrow";
        status = "upcoming";
    } else {
        label = `Due in ${difference} days`;
        status = "upcoming";
    }

  return (
    <div>
      <p>{dateDisplay}</p>
      <span className={`due-label ${status}`}>
        {label}
      </span>
    </div>
  );
}