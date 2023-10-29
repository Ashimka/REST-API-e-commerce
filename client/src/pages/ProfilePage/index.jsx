import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createProfile, updateProfile } from "../../redux/features/userSlice";

import "./profile.scss";
import avatar from "../../static/img/avatar.jpg";

const Profile = () => {
  const [name, setName] = useState("");
  const [addres, setAddres] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const handlerSubmit = (event) => {
    event.preventDefault();

    try {
      const data = new FormData();

      data.append("name", name);
      data.append("addres", addres);
      data.append("phone", phone);

      // dispatch(createProfile(data));
      dispatch(updateProfile(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameInput = (event) => setName(event.target.value);
  const handleAddresInput = (event) => setAddres(event.target.value);
  const handlePhoneInput = (event) => setPhone(event.target.value);
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
          <form action="" className="profile" onSubmit={handlerSubmit}>
            <label htmlFor="name">Full name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleNameInput}
            />
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={phone}
              onChange={handlePhoneInput}
            />
            <label htmlFor="addres">Addres:</label>
            <input
              type="text"
              name="addres"
              id="addres"
              value={addres}
              onChange={handleAddresInput}
            />
            <button className="profile__btn">Edit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
