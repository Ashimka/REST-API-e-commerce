import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setCredentials } from "../../redux/features/authSlice";
import axios from "../../redux/api/axios";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await axios.post("/auth/login", { email, password });

      dispatch(
        setCredentials({
          email,
          accessToken: user.data.tokens.accessToken,
        })
      );
      setEmail("");
      setPassword("");
      navigate("/users/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePassInput = (e) => setPassword(e.target.value);
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-form__title">login pages</h2>

        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          id="email"
          value={email}
          onChange={handleEmailInput}
        />

        <label htmlFor="password">Пароль:</label>
        <input
          name="password"
          type="password"
          id="password"
          value={password}
          onChange={handlePassInput}
        />

        <button className="btn-signin">Войти</button>
      </form>
    </>
  );
};

export default Login;