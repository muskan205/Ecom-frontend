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
import {
  SellerCreateForm,
  SellerList,
} from "./component/Admin/Dashboard/seller";
import {
  ForgotPassword,
  Reset,
  SignIn,
  Signup,
  VerifyOtp,
} from "./component/User/auth";
import { HomeLayout } from "./component/User/HomePage";
import { AdminCommonLayout } from "./component/Admin/commonLayout";
import { SellerCommonLayout } from "./component/Seller/commonLayout";
import {
  AddCategory,
  AddProduct,
  AddSubCategory,
  CreateShop,
  ListCategory,
  ListProducts,
  ListShop,
  ListSubCategory,
} from "./component/Seller/Dashboard";

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
          path="/"
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

        <Route path="/admin-dashboard" element={<AdminCommonLayout />} />

        <Route
          path="/create-seller"
          element={
            <AdminCommonLayout>
              <SellerCreateForm />
            </AdminCommonLayout>
          }
        />
        <Route
          path="/list-seller"
          element={
            <AdminCommonLayout>
              <SellerList />
            </AdminCommonLayout>
          }
        />

        {/* Seller Routes */}

        <Route path="/seller-dashboard" element={<SellerCommonLayout />} />
        <Route
          path="/create-shop"
          element={
            <SellerCommonLayout>
              <CreateShop />
            </SellerCommonLayout>
          }
        />
        <Route
          path="/shop-list"
          element={
            <SellerCommonLayout>
              <ListShop />
            </SellerCommonLayout>
          }
        />
        <Route
          path="/create-subcategory"
          element={
            <SellerCommonLayout>
              <AddSubCategory />
            </SellerCommonLayout>
          }
        />
        <Route
          path="/list-subcategory"
          element={
            <SellerCommonLayout>
              <ListSubCategory />
            </SellerCommonLayout>
          }
        />
        <Route
          path="/create-category"
          element={
            <SellerCommonLayout>
              <AddCategory />
            </SellerCommonLayout>
          }
        />
        <Route
          path="/list-category"
          element={
            <SellerCommonLayout>
              <ListCategory />
            </SellerCommonLayout>
          }
        />
         <Route
          path="/create-product"
          element={
            <SellerCommonLayout>
              <AddProduct />
            </SellerCommonLayout>
          }
        />
         <Route
          path="/list-product"
          element={
            <SellerCommonLayout>
              <ListProducts />
            </SellerCommonLayout>
          }
        />
      </Routes>
     
   


    </>
  );
}
