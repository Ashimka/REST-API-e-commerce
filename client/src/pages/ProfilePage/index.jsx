import React from "react";

import "./profile.scss";
import avatar from "../../static/img/avatar.jpg";

const Profile = () => {
  return (
    <>
      <div className="profile">
        <div className="profile__info">
          <img src={avatar} alt="avatar" className="profile__info-avatar" />
          <h2 className="profile__info-name">name</h2>
          <ul className="profile__nav">
            <li className="profile__nav-item">Profile</li>
            <li className="profile__nav-item">Orders</li>
          </ul>
        </div>
        <div className="profile__form">
          <form action="" className="profile">
            <label htmlFor="name">Full name:</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="phone">Phone:</label>
            <input type="text" name="phone" id="phone" />
            <label htmlFor="addres">Addres:</label>
            <input type="text" name="addres" id="addres" />
            <button className="profile__btn">Edit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
