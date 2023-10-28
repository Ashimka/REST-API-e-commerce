import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/ProfilePage";

const ROLES = {
  "role_admin": 777,
  "role_user": 333,
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/auth/login" element={<Login />} />

          <Route element={<RequireAuth allowedRoles={[ROLES.role_user]} />}>
            <Route path="/users/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
