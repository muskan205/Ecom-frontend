import React from "react";
import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import ProtectedRoute from '././ProtectedRoutes/protected.route'; // Assuming you have this

import {
  SignIn,
  ForgotPassword,
  Reset,
  VerifyOtp,
  Signup,
} from "./component/User/auth";

import {
  ProductDetailsLayout,
  WhislistLayyout,
  ProductsLayout,
  AddToCartPage,
  CheckOutForm,
} from "./component/User/AllProducts";

import CommonLayout from "./component/User/CommonLayout";
import { AdminCommonLayout } from "./component/Admin/commonLayout";
import { SellerCommonLayout } from "./component/Seller/commonLayout";
import {
  SellerCreateForm,
  SellerList,
} from "./component/Admin/Dashboard/seller";

import {
  CreateShop,
  ListShop,
  AddSubCategory,
  ListSubCategory,
  AddCategory,
  ListCategory,
  AddProduct,
  ListProducts,
} from "./component/Seller/Dashboard";

import { HomeLayout } from "./component/User/HomePage";
import ProductCards from "./component/User/common/Card/productsCard";

const router = createBrowserRouter([
  // User Routes
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <Reset />,
  },
  {
    path: "/verifyotp",
    element: <VerifyOtp />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/productdetails/:id",
    element: (
      <CommonLayout>
        <ProductDetailsLayout />
      </CommonLayout>
    ),
  },
  {
    path: "/",
    element: (
      <CommonLayout>
        <HomeLayout />
      </CommonLayout>
    ),
  },
  {
    path: "/all-products",
    element: (
      <CommonLayout>
        <ProductsLayout />
      </CommonLayout>
    ),
  },
  {
    path: "/whislist",
    element: (
      <CommonLayout>
        <WhislistLayyout />
      </CommonLayout>
    ),
  },
  {
    path: "/cart",
    element: (
      <CommonLayout>
        <AddToCartPage />
      </CommonLayout>
    ),
  },
  {
    path: "/checkout",
    element: (
      <CommonLayout>
        <CheckOutForm />
      </CommonLayout>
    ),
  },
  
  

  // Admin Routes (Protected)
  {
    path: "/admin-dashboard",
    element: <ProtectedRoute element={<AdminCommonLayout />} />, // Protected Route
  },
  {
    path: "/create-seller",
    element: (
      <ProtectedRoute element={<AdminCommonLayout><SellerCreateForm /></AdminCommonLayout>} />
    ),
  },
  {
    path: "/list-seller",
    element: (
      <ProtectedRoute element={<AdminCommonLayout><SellerList /></AdminCommonLayout>} />
    ),
  },

  // Seller Routes (Protected)
  {
    path: "/seller-dashboard",
    element: <ProtectedRoute element={<SellerCommonLayout />} />, // Protected Route
  },
  {
    path: "/create-shop",
    element: (
      <ProtectedRoute element={<SellerCommonLayout><CreateShop /></SellerCommonLayout>} />
    ),
  },
  {
    path: "/shop-list",
    element: (
      <ProtectedRoute element={<SellerCommonLayout><ListShop /></SellerCommonLayout>} />
    ),
  },
  {
    path: "/create-subcategory",
    element: (
      <ProtectedRoute element={<SellerCommonLayout><AddSubCategory /></SellerCommonLayout>} />
    ),
  },
  {
    path: "/list-subcategory",
    element: (
      <ProtectedRoute element={<SellerCommonLayout><ListSubCategory /></SellerCommonLayout>} />
    ),
  },
  {
    path: "/create-category",
    element: (
      <ProtectedRoute element={<SellerCommonLayout><AddCategory /></SellerCommonLayout>} />
    ),
  },
  {
    path: "/list-category",
    element: (
      <ProtectedRoute element={<SellerCommonLayout><ListCategory /></SellerCommonLayout>} />
    ),
  },
  {
    path: "/create-product",
    element: (
      <ProtectedRoute element={<SellerCommonLayout><AddProduct /></SellerCommonLayout>} />
    ),
  },
  {
    path: "/list-product",
    element: (
      <ProtectedRoute element={<SellerCommonLayout><ListProducts /></SellerCommonLayout>} />
    ),
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
