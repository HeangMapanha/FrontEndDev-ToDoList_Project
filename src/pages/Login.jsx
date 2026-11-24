import { useState } from "react";
import { useAuth } from "../hook/useAuth";

export default function Login() {
  const { login, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) return;

    login(email.trim(), password);
  };

  return (
    <div className="main">
      <form className="userInput" onSubmit={handleSubmit}>
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

        {error && <p className="error">{error}</p>}

        <button type="submit">Submit</button>
      </form>
      
      <a href="/register">Register</a>

    </div>
  );
}