import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import { getOneUser } from "../../redux/features/userSlice";

import "./profile.scss";
import avatar from "../../static/img/avatar.jpg";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const { isActivated } = useSelector((state) => state.persistedReducer.auth);

  useEffect(() => {
    if (!edit) {
      dispatch(getOneUser());
    }
  }, [dispatch, edit]);

  const handleEditProfile = () => {
    setEdit(true);
  };

  return (
    <>
      <div className="profile">
        <div className="profile__info">
          <img src={avatar} alt="avatar" className="profile__info-avatar" />
          <h2 className="profile__info-name">
            {profile?.email?.split("@")[0]}
          </h2>
          <ul className="profile__nav">
            {profile?.role?.admin_role && (
              <li className="profile__nav-item">Admin</li>
            )}
            <li className="profile__nav-item" onClick={handleEditProfile}>
              Profile edit
            </li>
            <li className="profile__nav-item">Orders</li>
          </ul>
        </div>
        <div className="profile__form">
          {isActivated && <div>Not activated</div>}
          {edit ? (
            <ProfileEdit setEdit={setEdit} />
          ) : (
            <>
              <table className="table-profile">
                <tbody>
                  <tr className="table-profile__tr">
                    <th className="table-profile__th">Name</th>
                    <td className="table-profile__td">
                      {profile?.profile?.name}
                    </td>
                  </tr>
                  <tr className="table-profile__tr">
                    <th className="table-profile__th">Phone</th>
                    <td className="table-profile__td">
                      {profile?.profile?.phone}
                    </td>
                  </tr>
                  <tr className="table-profile__tr">
                    <th className="table-profile__th">Address</th>
                    <td className="table-profile__td">
                      {profile?.profile?.addres}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
