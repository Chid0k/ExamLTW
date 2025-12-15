import { React, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./styles.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const data = { username: username, password: password };
    console.log(data);
    onLogin(data);
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />

      <label>
        Password:
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />

      <button type="submit">Login</button>
    </form>
  );
}

function Logout({ onLogout }) {
  useEffect(() => {
    onLogout(null);
  });

  return <Navigate to="/" replace />;
}

export { Login, Logout };
