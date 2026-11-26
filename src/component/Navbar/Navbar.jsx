import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/tasks">Tasks</NavLink>
      <NavLink to="/calendar">Calendar</NavLink>
      <NavLink to="/settings">Settings</NavLink>
    </nav>
  );
}