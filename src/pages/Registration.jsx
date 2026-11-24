import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

export default function Registration() {
  const { register, currentAccount, error } = useAuth();
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

  return (
    <div className="main">
      <form className="userInput" onSubmit={handleSubmit}>

        <label htmlFor="name">Username:</label>
        <input
          id="name"
          type="name"
          value={name}
          placeholder="Alice"
          onChange={(event) => setName(event.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          placeholder="Alice@gmail.com"
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          placeholder="12345"
          onChange={(event) => setPassword(event.target.value)}
        />

        <label htmlFor="confirm">Confirm Password:</label>
        <input
          id="confirm"
          type="password"
          value={confirm}
          placeholder="Confirm Password"
          onChange={(event) => setConfirm(event.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Submit</button>
      </form>

      <a href="/login">Register</a>
    </div>
  );
}