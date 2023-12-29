import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

import Admin from "./pages/Admin/Admin";
import AdminCategory from "./pages/AdminCategory/AdminCategory";
import AdminEditProduct from "./pages/AdminEditProduct/AdminEditProduct";
import AdminProducts from "./pages/AdminProducts/AdminProducts";
import CartPage from "./pages/CartPage/CartPage";
import OrderListPage from "./pages/OrderListPage/OrderListPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/ProfilePage";
import OrderDetailsPage from "./pages/OrderDetailsPage/OrderDetailsPage";
import DeliversOrders from "./pages/DeliversOrders/DeliversOrders";

const ROLES = {
  "admin": 777,
  "deliver": 555,
  "user": 333,
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />

          <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
            <Route path="/users/profile" element={<Profile />} />
            <Route path="/users/cart" element={<CartPage />} />
            <Route path="/users/orderlist" element={<OrderListPage />} />
            <Route
              path="/users/orderdetails/:id"
              element={<OrderDetailsPage />}
            />
          </Route>

          <Route
            element={
              <RequireAuth allowedRoles={[ROLES.admin, ROLES.deliver]} />
            }
          >
            <Route path="/delivers" element={<DeliversOrders />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
            <Route path="/admins" element={<Admin />} />
            <Route path="/admins/category" element={<AdminCategory />} />
            <Route path="/admins/products" element={<AdminProducts />} />
            <Route path="/admins/products/:id" element={<AdminEditProduct />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
