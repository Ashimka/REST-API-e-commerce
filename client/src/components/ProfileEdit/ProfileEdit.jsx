import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateProfile } from "../../redux/features/userSlice";
import "./profileEdit.scss";

const ProfileEdit = ({ setEdit }) => {
  const dispatch = useDispatch();

  const { profile, isSuccess } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [addres, setAddres] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setName(profile.profile?.name || "");
      setAddres(profile.profile?.addres || "");
      setPhone(profile.profile?.phone || "");
    }
  }, [
    isSuccess,
    profile.profile?.name,
    profile.profile?.addres,
    profile.profile?.phone,
  ]);

  const handlerSubmit = (event) => {
    event.preventDefault();

    try {
      const data = new FormData();

      data.append("name", name);
      data.append("addres", addres);
      data.append("phone", phone);

      dispatch(updateProfile(data));
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelEdit = (event) => {
    event.preventDefault();

    setEdit(false);
  };

  const handleNameInput = (event) => setName(event.target.value);
  const handleAddresInput = (event) => setAddres(event.target.value);
  const handlePhoneInput = (event) => setPhone(event.target.value);

  return (
    <>
      <form className="profile-edit">
        <label htmlFor="name">Full name:</label>
        <input
          className="profile-edit__input"
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleNameInput}
        />
        <label htmlFor="phone">Phone:</label>
        <input
          className="profile-edit__input"
          type="text"
          name="phone"
          id="phone"
          value={phone}
          onChange={handlePhoneInput}
        />
        <label htmlFor="addres">Addres:</label>
        <input
          className="profile-edit__input"
          type="text"
          name="addres"
          id="addres"
          value={addres}
          onChange={handleAddresInput}
        />
        <div className="profile-edit-buttons">
          <button
            className="profile-edit-buttons__btn"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
          <button
            className="profile-edit-buttons__btn"
            type="submit"
            onClick={handlerSubmit}
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileEdit;
