import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Admin from "./pages/Admin/Admin";
import AdminCategory from "./pages/AdminCategory/AdminCategory";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/ProfilePage";

const ROLES = {
  "admin": 777,
  "user": 333,
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/auth/login" element={<Login />} />

          <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
            <Route path="/users/profile" element={<Profile />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
            <Route path="/admins" element={<Admin />} />
            <Route path="/admins/category" element={<AdminCategory />} />
            {/* <Route path="/admins/category/id:id" element={<AdminCatEdit />} />
            <Route path="/admins/category/id:id" element={<AdminCatDelete />} /> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
