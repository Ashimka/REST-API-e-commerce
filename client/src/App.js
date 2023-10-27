import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/ProfilePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/users/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
