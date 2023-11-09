import React from "react";
import { Link } from "react-router-dom";

import { BsFileText } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";
import { TbUserSquareRounded } from "react-icons/tb";
import { TbCategory } from "react-icons/tb";

import "./navAdmin.scss";

const NavAdmin = () => {
  return (
    <>
      <nav className="admin-nav">
        <ul className="admin-nav__menu">
          <Link to={"/admins/products"} className="admin-nav__item">
            <BsCart3 /> <span>Products</span>
          </Link>
          <Link to={"/admins/category"} className="admin-nav__item">
            <TbCategory /> <span>Category</span>
          </Link>
          <Link className="admin-nav__item">
            <BsFileText />
            <span>Orders</span>
          </Link>
          <Link className="admin-nav__item">
            <TbUserSquareRounded /> <span>Customer</span>
          </Link>
          <Link className="admin-nav__item">
            <BsFileText /> <span>Orders</span>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default NavAdmin;
