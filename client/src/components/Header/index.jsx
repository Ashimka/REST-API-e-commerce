import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { BsCart3 } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { IoLogInOutline } from "react-icons/io5";

import logo from "../../static/img/logo.png";

import "./header.scss";

const Header = () => {
  const navigate = useNavigate();

  const isAuth = useSelector((state) => state.persistedReducer.auth.isAuth);
  const { items } = useSelector((state) => state.cart);
  const cart = Boolean(items.length);

  const count = items.reduce((sum, obj) => {
    return obj.count + sum;
  }, 0);

  return (
    <>
      <header className="header">
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
            <BsCart3
              className="header__basket-icons"
              onClick={() => navigate("/users/cart")}
            />
            {cart && <span className="header__basket-cart">{count}</span>}

            {isAuth ? (
              <>
                <Link to={"/users/profile"}>
                  <AiOutlineUser className="header__profile" />
                </Link>
              </>
            ) : (
              <Link to={"/auth/login"}>
                <IoLogInOutline />
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
