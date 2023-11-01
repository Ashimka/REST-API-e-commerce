import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { BsCart3 } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

import logo from "../../static/img/logo.png";

import axios from "../../redux/api/axios";
import { logOut } from "../../redux/features/authSlice";

import "./header.scss";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.persistedReducer.auth.isAuth);

  const cart = false;

  const handleLogout = async () => {
    await axios.get("/auth/logout");
    dispatch(logOut());
  };
  return (
    <>
      <header className="header">
        <div className="header__top">
          <div className="header__top-bg"></div>
        </div>
        <div className="header-wrapper">
          <div className="header__left">
            <div className="header__logo">
              <Link to={"/"}>
                <img src={logo} alt="" className="header__logo-img" />
              </Link>
              <div className="header__logo-name">
                <span className="logo-title">КИОТО</span>
                <span className="logo-subtitle">
                  доставка суши и роллов в Кумертау
                </span>
              </div>
            </div>
          </div>
          <div className="header__center">
            <div className="phone-top">
              <span className="phone-top__title">Телефон доставки</span>
              <Link to="tel:+79279278084" className="phone-top__number">
                +7 (927) 927 80 84
              </Link>
            </div>
          </div>
          <div className="header__right">
            <div className="header__basket">
              <BsCart3 className="header__basket-icons" />
              {cart && <span className="header__basket-cart">4</span>}
            </div>
            <div className="header__auth">
              {isAuth ? (
                <>
                  <div className="header__logout">
                    <Link to={"/users/profile"}>
                      <AiOutlineUser />
                    </Link>
                    <button
                      className="header__logout-btn"
                      onClick={handleLogout}
                    >
                      LOGOUT
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => navigate("/auth/login")}
                  className="header__login-btn"
                >
                  LOGIN
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
