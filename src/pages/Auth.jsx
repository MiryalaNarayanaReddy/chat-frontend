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

  const handleLogin = async () => {
    const res = await axios.post(`${API_URL}/auth/login`, {
      username,
      password
    });
    // console.log('Response:', res);
    if(res.data.error){
      alert(res.data.error)
    }
    else{
      localStorage.setItem('token',res.data.token)
      alert('successfully logged in')

      window.location.href = 'http://localhost:5173/chat'

    }
  };

  const handleSignup = async () => {
    const res = await axios.post(`${API_URL}/auth/signup`, {
      username,
      password
    });
    // console.log('Response:', res);
    if(res.data.error){
      alert(res.data.error)
    }
    else{
      if(res.data.user){
        alert('signup successfull')
        setUsername('')
        setPassword('')
        setIsLogin(true)
      }
    }
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
