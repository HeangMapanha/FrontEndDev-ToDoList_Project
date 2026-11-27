import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { useSettings } from "../context/SettingsContext";
import "./Auth.css";

export default function Registration() {
  const { register, currentAccount, error } = useAuth();
  const { settings, toggleTheme } = useSettings();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [localError, setLocalError] = useState("");

  if (currentAccount) return <Navigate to="/" replace />;

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocalError("");

    if (!name.trim() || !email.trim() || !password) {
      setLocalError("Please fill in all fields");
      return;
    }
    if (password !== confirm) {
      setLocalError("Passwords do not match");
      return;
    }

    const ok = register({ name: name.trim(), email: email.trim(), password });
    if (ok) navigate("/", { replace: true });
  };

  // our own check first (empty fields, passwords), then the one from AuthContext (email taken)
  const shownError = localError || error;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button
          type="button"
          className="auth-theme"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          {settings.theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
        <span className="auth-brand">To-Do List</span>
        <h1>Create an account</h1>
        <p className="auth-subtitle">Your tasks are saved in this browser.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="name">Username</label>
            <input
              id="name"
              type="text"
              value={name}
              placeholder="Alice"
              autoComplete="name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="alice@gmail.com"
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Choose a password"
              autoComplete="new-password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="confirm">Confirm password</label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              placeholder="Type it again"
              autoComplete="new-password"
              onChange={(event) => setConfirm(event.target.value)}
            />
          </div>

          {shownError && <p className="auth-error">{shownError}</p>}

          <button type="submit" className="btn">Create account</button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
