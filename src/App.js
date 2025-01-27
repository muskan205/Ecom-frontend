import React from "react";
import { Route, Routes } from "react-router";
import {
  CheckOutForm,
  ProductDetailsLayout,
  WhislistLayyout,
} from "./component/User/AllProducts";
import { AddToCartPage } from "./component/User/AllProducts";
import { ProductsLayout } from "./component/User/AllProducts";
import CommonLayout from "./component/User/CommonLayout";
import { SellerCreateForm ,SellerList} from "./component/Admin/Dashboard/seller";
import { AdminLayout } from "./component/Admin/Layout";
import { ForgotPassword, Reset, SignIn, Signup, VerifyOtp } from "./component/User/auth";
import { HomeLayout } from "./component/User/HomePage";


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password" element={<Reset />}></Route>
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/register" element={<Signup />} />
        <Route
          path="/productdetails"
          element={
            <CommonLayout>
              <ProductDetailsLayout />
            </CommonLayout>
          }
        ></Route>

        <Route
          path="/*"
          element={
            <CommonLayout>
              <HomeLayout />
            </CommonLayout>
          }
        />

        <Route
          path="/all-products"
          element={
            <CommonLayout>
              <ProductsLayout />
            </CommonLayout>
          }
        />
        <Route
          path="whislist"
          element={
            <CommonLayout>
              <WhislistLayyout />
            </CommonLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <CommonLayout>
              <AddToCartPage />
            </CommonLayout>
          }
        />

        <Route
          path="/checkout"
          element={
            <CommonLayout>
              <CheckOutForm />
            </CommonLayout>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminLayout />} />

        <Route path="/create-seller" element={<SellerCreateForm />} />
        <Route path="/list-seller" element={<SellerList />} />
      </Routes>
    </>
  );
}
