import { React, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./styles.css";
import { handleData } from "../../modelData/api";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const data = { login_name: username, login_pass: password };
    handleData("https://rk43xg-8081.csb.app/api/admin/login", "POST", data)
      .then((e) => {
        if (onLogin) {
          onLogin(e);
          alert("Login successful");
          navigate("/");
        } else {
          alert("Login failed");
          navigate("/login");
        }
      })
      .catch((err) => alert("Login failed:" + err.message));
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
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://rk43xg-8081.csb.app/api/admin/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        onLogout(null);
        navigate("/");
      })
      .catch((err) => alert("Logout failed:" + err.message));
  });

  return null;
}

export { Login, Logout };
