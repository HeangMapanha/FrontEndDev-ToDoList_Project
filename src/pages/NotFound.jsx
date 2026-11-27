import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page empty-state">
      <h1>404</h1>
      <p>Sorry, this page doesn't exist.</p>
      <Link to="/tasks" className="btn">
        Back to Tasks
      </Link>
    </div>
  );
}