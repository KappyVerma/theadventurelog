import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.scss";

export default function SignIn() {
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

  const handleSignin = async (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      password: password,
    };
    if (!newUser.username || !newUser.password) {
      alert("Please enter a valid user name and password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user", newUser);
      console.log("Signin Response:", response.data);
      alert("Signed up successfully");
      Navigate("/bucketlist"); //change it to homepage later
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section className="sign-up">
        <h1 className="sign-up__title">Sign up</h1>

        <form onSubmit={handleSignin} className="sign-up__form" id="signupForm">
          <label className="sign-up__label">
            Username
            <input
              autoComplete="off"
              type="text"
              className="sign-up__input"
              name="name"
              value={username}
              onChange={handleUserChange}
            />
          </label>
          <label className="sign-up__label">
            Password
            <input
              autoComplete="off"
              type="password"
              className="sign-up__input"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </form>
        <button className="sign-up__button" form="signupForm">
          Sign up
        </button>
      </section>
    </>
  );
}
