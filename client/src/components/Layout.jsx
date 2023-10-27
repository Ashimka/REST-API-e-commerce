import React from "react";
import { Outlet } from "react-router-dom";
import Categories from "./Categories";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <div className="container">
        <Header />
        <Categories />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
