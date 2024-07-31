import React from "react";
import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Login = () => {
  //   const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    axios
      .post("http://localhost:3001/login", {
        // username,
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        if (response.data === "Sucessfully Logged in") {
          /*
            when it says response.data === Sucessfully Logged in. It is referencing  the reponse from app.post from this post to the endpoint
          */
          alert("Right Password");
          navigate("/home");
        } else {
          alert("Wrong username or password");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        {/* <h2>Login</h2> */}
        {/* <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        /> */}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="************"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
      {/* <NavLink to="/home">
        <button>Login</button>
      </NavLink> */}
    </div>
  );
};

export default Login;
