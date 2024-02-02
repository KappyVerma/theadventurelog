import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LogIn.scss";

export default function LogIn({ updateUserId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();

  // function for username input fields
  const handleUserChange = (event) => {
    event.target.style.border = "";
    setUsername(event.target.value);
  };
  // function for password input fields
  const handlePasswordChange = (event) => {
    event.target.style.border = "";
    setPassword(event.target.value);
  };

  // function for user login
  const handleLogIn = async (event) => {
    event.preventDefault();
    //form validation
    if (!username || !password) {
      event.target.name.style.border = "1px solid #d22d2d";
      event.target.password.style.border = "1px solid #d22d2d";
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const userId = response.data.user;

        //storing user data into local storage
        localStorage.setItem("userId", userId.id);
        localStorage.setItem("username", userId.username);

        //callback function from app.js
        updateUserId(response.data.user.id);

        console.log(response.data);
        Navigate("/bucketlist");
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="main-container">
      <div className="sign-In">
        <Link to={"/"} className="sign-In__icon"></Link>
        <h1 className="sign-In__title">Member Login</h1>

        <form onSubmit={handleLogIn} className="sign-in__form" id="login">
          <label className="sign-In__label">
            Username
            <input
              autoComplete="off"
              type="text"
              className="sign-In__input"
              placeholder="Enter your username"
              name="name"
              value={username}
              onChange={handleUserChange}
            />
          </label>
          <label className="sign-In__label">
            Password
            <input
              autoComplete="off"
              type="password"
              className="sign-In__input"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </form>
        <button className="sign-In__button" form="login" type="submit">
          Sign in
        </button>
      </div>
    </section>
  );
}
