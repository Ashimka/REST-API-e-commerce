import React from "react";

import NavAdmin from "../../components/NavAdmin/NavAdmin";

import logo from "../../static/admins/setting.png";

import "./admin.scss";

const Admin = () => {
  return (
    <>
      <div className="dashboard">
        <img src={logo} alt="" className="dashboard__img" />
        <div className="dashboard__title">Панель управления</div>
      </div>
      <div className="admin">
        <NavAdmin />
        <div className="admin__content">admin panel</div>
      </div>
    </>
  );
};

export default Admin;
