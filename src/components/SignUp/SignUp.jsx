import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./SignUp.scss";

export default function SignUp({ handleSignupSuccess, url }) {
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

  const handleSignup = async (e) => {
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
      const response = await axios.post(`${url}/user`, newUser);
      console.log("Signup Response:", response.data);
      handleSignupSuccess();
      Navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="main-container">
      <div className="sign-up">
        <h1 className="sign-up__title">Create An Account</h1>
        <h4 className="sign-up__sub-title">Sign up to enjoy your memories</h4>

        <form onSubmit={handleSignup} className="sign-up__form" id="signupForm">
          <input
            autoComplete="off"
            type="text"
            className="sign-up__input"
            placeholder="Username"
            name="name"
            value={username}
            onChange={handleUserChange}
          />

          <input
            autoComplete="off"
            type="password"
            className="sign-up__input"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </form>
        <button className="sign-up__button" form="signupForm">
          Create Account
        </button>
        <p className="sign-up__text">
          Already have an account <Link to="/login">Log in</Link>
        </p>
      </div>
    </section>
  );
}
