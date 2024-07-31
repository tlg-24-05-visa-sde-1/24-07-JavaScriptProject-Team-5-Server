import React from "react";
import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    console.log("gfhgfhgfjfjk");
    if (userId) {
      console.log("User ID has been set:", userId); // Log the user ID when it changes
    } else {
      console.log("not working");
    }
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    axios
      .post("http://localhost:3000/users/register", {
        /*
          The post request is sedning the username,password and email to the server and the naviagtes to the login upon suceesful sign up
        */
        username,
        email,
        password,
      })
      .then((response) => {
        // console.log(response);
        console.log(response.data._id);
        setUserId(response.data._id);
        // navigate("/login");
        axios
          .post("http://localhost:3000/teams/createTeam", {
            teamName: "My New Team",
            owner: response.data._id,
          })
          .then((teamResponse) => {
            console.log("Team has been created", teamResponse.data);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button type="submit">Sign up</button>
        <NavLink to="/login">
          <button className="login">Login</button>
        </NavLink>
      </form>
    </div>
  );
};

export default Signup;
