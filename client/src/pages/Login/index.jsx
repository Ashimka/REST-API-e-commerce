import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setCredentials } from "../../redux/features/authSlice";
import axios from "../../redux/api/axios";
import "./login.scss";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("460050");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/auth/login", {
        phoneNumber,
        password,
      });

      dispatch(
        setCredentials({
          phoneNumber,
          accessToken: data.tokens.accessToken,
          isActivated: data.userAuth.isActivated,
        })
      );
      setPhoneNumber("");
      setPassword("");
      navigate("/users/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhoneInput = (e) => setPhoneNumber(e.target.value);
  const handlePassInput = (e) => setPassword(e.target.value);
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-form__title">login pages</h2>

        <label htmlFor="email">Номер телефона:</label>
        <input
          name="email"
          type="text"
          id="email"
          value={phoneNumber}
          onChange={handlePhoneInput}
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
