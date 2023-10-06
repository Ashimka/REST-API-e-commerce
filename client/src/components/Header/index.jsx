import React from "react";

import { BsCart3 } from "react-icons/bs";
import logo from "../../static/img/logo.jpg";

import "./header.css";

const Header = () => {
  const cart = false;
  return (
    <>
      <header className="header">
        <div className="header__top">
          <div className="header__top-bg"></div>
        </div>
        <div className="header-wrapper">
          <div className="header__left">
            <div className="header__logo">
              <img src={logo} alt="" className="header__logo-img" />
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
              <a href="tel:+79279278084" className="phone-top__number">
                +7 (927) 927 80 84
              </a>
            </div>
          </div>
          <div className="header__right">
            <div className="header__basket">
              <BsCart3 className="header__basket-icons" />
              {cart && <span className="header__basket-cart">4</span>}
            </div>
            <div className="header__auth">
              <button className="header__login-btn">LOGIN</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
