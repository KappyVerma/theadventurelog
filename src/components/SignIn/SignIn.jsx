import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignIn.scss";

const SignIn = ({ updateUserId }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();

  const handleUserChange = (event) => {
    event.target.style.border = "";
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    event.target.style.border = "";
    setPassword(event.target.value);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      event.target.name.style.border = "1px solid #d22d2d";
      event.target.password.style.border = "1px solid #d22d2d";
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/signin", {
        username,
        password,
      });

      if (response.status === 200) {
        const userId = response.data.user;

        localStorage.setItem("userId", userId.id);
        localStorage.setItem("username", userId.username);

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
    <>
      <section className="sign-In">
        <h1 className="sign-In__title">Sign in</h1>

        <form onSubmit={handleSignIn} className="sign-in__form" id="signInForm">
          <label className="sign-In__label">
            Username
            <input
              autoComplete="off"
              type="text"
              className="sign-In__input"
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
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </form>
        <button className="sign-In__button" form="signInForm" type="submit">
          Sign in
        </button>
      </section>
    </>
  );
};

export default SignIn;
