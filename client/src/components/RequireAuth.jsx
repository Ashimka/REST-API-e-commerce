import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
  const token = useSelector((state) => state.persistedReducer.auth.token);
  const location = useLocation();

  const decoded = token ? jwtDecode(token) : undefined;
  const roles = decoded?.UserInfo.roles || [];

  return roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : token ? (
    <Navigate to={"/unauthorized"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/auth/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
