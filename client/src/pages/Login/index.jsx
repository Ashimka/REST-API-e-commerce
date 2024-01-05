import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setCredentials } from "../../redux/features/authSlice";
import axios from "../../redux/api/axios";
import "./login.scss";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [showPass, setShowPass] = useState(false);

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
      setErrMessage(error.response.data.message);
    }
  };

  const clearError = () => {
    setErrMessage("");
    setPhoneNumber("");
    setPassword("");
  };

  const handlePhoneInput = (e) => setPhoneNumber(e.target.value);
  const handlePassInput = (e) => setPassword(e.target.value);
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        {errMessage ? (
          <>
            <div className="error-auth">
              <span className="error-close" onClick={clearError}>
                X
              </span>
              <span>{errMessage}</span>
            </div>
          </>
        ) : (
          <>
            <h2 className="login-form__title">авторизация</h2>

            <label htmlFor="email">Номер телефона:</label>
            <div className="custom-input">
              <input
                className="input-auth"
                tabIndex={1}
                name="email"
                type="text"
                id="email"
                minLength={10}
                value={phoneNumber}
                onChange={handlePhoneInput}
                required
              />
              <span className="first-input">+7</span>
            </div>

            <label htmlFor="password">Пароль:</label>
            <input
              className="input-auth"
              tabIndex={2}
              name="password"
              type={showPass ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePassInput}
              required
            />
            <div className="show-password">
              <label htmlFor="show-password">Показать пароль</label>
              <input
                className="input-checkbox"
                type="checkbox"
                id="show-password"
                onChange={() => setShowPass(!showPass)}
                tabIndex={3}
              />
            </div>

            <button
              tabIndex={4}
              className="btn-signin"
              disabled={!phoneNumber || !password}
            >
              Войти
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default Login;
