import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const basicAuth = "Basic " + btoa(`${username}:${password}`);

    try {
      const response = await fetch(
        "http://34.229.16.201:8080/api/1.0.0/airports",
        {
          method: "GET",
          headers: {
            Authorization: basicAuth,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        localStorage.setItem("auth", basicAuth);
        localStorage.setItem("username", username);
        navigate("/index");
      } else if (response.status === 401) {
        setMessage("Invalid username or password");
      } else {
        setMessage(`Login failed: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
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
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
