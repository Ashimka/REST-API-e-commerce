import React from "react";
import { BsTelegram } from "react-icons/bs";

import logo from "../../static/img/logo.png";
import vk from "../../static/img/vk.png";

import "./footer.scss";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__left">
          <div className="footer__logo">
            <img src={logo} alt="logo" className="footer-img" />
          </div>
          <div className="footer__copyright">КИОТО - &copy; 2023</div>
        </div>
        <div className="footer__center">
          <span className="footer__title">Номер для заказа</span>
          <a href="tel:+79279278084" className="phone-top__number">
            +7 (927) 927 80 84
          </a>
        </div>
        <div className="footer__right">
          <div className="footer__title">Мы в соцсетях</div>
          <div className="footer__social">
            <a
              href="https://vk.com/kiotosushi"
              target="_blank"
              rel="noreferrer"
            >
              <img src={vk} alt="" className="social-icon" />
            </a>
            <BsTelegram className="social-icon" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
