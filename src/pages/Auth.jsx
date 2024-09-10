import React, { useState } from "react";
import "./Auth.css";
import axios from 'axios'

import { API_URL } from "../../helper";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
//   const [registeredUsers, setRegisteredUsers] = useState([
//     { username: "alpha", password: "alpha" },
//   ]);

  const handleLogin = () => {
    axios.post(`${API_URL}/auth/login`,{
        username,
        password
    }).then(res=>{
        console.log(res)
    })
  };

  const handleSignup = () => {
    axios.post(`${API_URL}/auth/signup`,{
        username,
        password
    }).then(res=>{
        console.log(res)
    })
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setUsername("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="toggle-text">
          {isLogin
            ? "Don't have an account? "
            : "Already have an account? "}
          <span className="toggle-link" onClick={toggleForm}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
