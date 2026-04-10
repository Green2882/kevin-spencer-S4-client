import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const basicAuth = "Basic " + btoa(username + ":" + password);

    try {
      const response = await fetch("http://localhost:8080/airports", {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      });

      if (response.ok) {
        localStorage.setItem("auth", basicAuth);
        navigate("/index");
      } else {
        setMessage("Invalid username or password");
      }
    } catch (error) {
      setMessage("Could not connect to server");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
