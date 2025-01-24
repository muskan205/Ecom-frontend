import React from "react";
import Signup from "./component/user/auth/SignUp/Signup";
import { Route, Routes } from "react-router";
import Login from "./component/user/auth/LoginPage/LoginPage";
import Forgot_Passsord from "./component/user/auth/Forgot_Passsord/Forgot-Email";
import VerifyOtp from "./component/user/auth/VerifyOtp/verifyOtp";
import Reset from "./component/user/auth/ResetPassword/Reset";

import WhislistLayyout from "./component//user/AllProducts/Whislist.js/Layout";

import AdminLayout from "./component/Admin/Layout/layout";
import SellerCreateForm from "./component/Admin/dashBoard/seller/SellerForm";
import DataTable from "./component/Admin/dashBoard/seller/ListSeller";
import ProductDetails from "./component/user/AllProducts/ProductDEtailspage/PDetails";
import HomeLayout from "./component/user/Dashboard/Layout";
import CheckOut from "./component/user/AllProducts/cheeckout/form";
import AddToCartPage from "./component/user/AllProducts/CartPage/Cart";
import ProductsLayout from "./component/user/AllProducts/Layyout";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<Forgot_Passsord />}></Route>
        <Route path="/reset-password" element={<Reset />}></Route>
        <Route path="/productdetails" element={<ProductDetails/>}></Route>
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/*" element={<HomeLayout />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/all-products" element={<ProductsLayout />} />
        <Route path="whislist" element={<WhislistLayyout />} />
        <Route path="/cart" element={<AddToCartPage />} />

        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/admin-dashboard" element={<AdminLayout />} />
        <Route path="/create-seller" element={<SellerCreateForm />} />
        <Route path="/list-seller" element={<DataTable />} />
      </Routes>
    </>
  );
}
