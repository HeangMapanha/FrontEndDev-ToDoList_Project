import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import "./Auth.css";

export default function Login() {
  const { login, error, currentAccount } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // already logged in: go straight to the tasks page
  if (currentAccount) return <Navigate to="/tasks" replace />;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) return;

    login(email.trim(), password);
  };

  // Input for emails/passwords
  return (
    <div className="auth-page">
      <div className="auth-card">
        <span className="auth-brand">To-Do List</span>
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Log in to see your tasks.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
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
              placeholder="Your password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn">Log in</button>
        </form>

        <p className="auth-switch">
          No account yet? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
