import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../redux/api/axios";

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/register", {
        phoneNumber,
        email,
        password,
      });

      setPhoneNumber("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setErrMessage(error.response.data.message);
    }
  };

  const clearError = () => {
    setErrMessage("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
  };

  const handlePhoneInput = (e) => setPhoneNumber(e.target.value);
  const handleEmailInput = (e) => setEmail(e.target.value);
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
            <h2 className="login-form__title">Регистрация</h2>

            <label htmlFor="phone">Номер телефона:</label>
            <div className="custom-input">
              <input
                className="input-auth"
                tabIndex={1}
                name="phone"
                type="text"
                id="phone"
                minLength={10}
                value={phoneNumber}
                onChange={handlePhoneInput}
                required
              />
              <span className="first-input">+7</span>
            </div>

            <label htmlFor="email">Email:</label>
            <input
              className="input-auth"
              tabIndex={2}
              name="email"
              type="email"
              id="email"
              value={email}
              onChange={handleEmailInput}
              required
            />

            <label htmlFor="password">Пароль:</label>
            <input
              className="input-auth"
              tabIndex={3}
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
                tabIndex={4}
              />
            </div>

            <button
              tabIndex={5}
              className="btn-signin"
              disabled={!phoneNumber || !password}
            >
              Зарегистрировать
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default Register;
