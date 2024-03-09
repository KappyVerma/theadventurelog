import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import "./LogIn.scss";

export default function LogIn({
  updateUserId,
  closeSignupSuccess,
  signupSuccess,
  url,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      const response = await axios.post(`${url}/login`, {
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

        // console.log(response.data);
        Navigate("/home");
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
      setError(error.response.data.error);
    }
  };

  return (
    <section className="main-container">
      <div className="sign-In">
        <Modal open={signupSuccess} onClose={closeSignupSuccess}>
          <p className="sign-In__success">
            Signed up successfully, Log in to your account
          </p>
        </Modal>
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
        {<p className="sign-In__error">{error}</p>}
        <button className="sign-In__button" form="login" type="submit">
          Sign in
        </button>
        <p className="sign-up__text">
          Not a member yet? <Link to="/signup">Create an Account</Link>
        </p>
      </div>
    </section>
  );
}
