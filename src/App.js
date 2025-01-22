import React from "react";
import Signup from "./component/auth/SignUp/Signup";
import { Route, Routes } from "react-router";
import Login from "./component/auth/LoginPage/LoginPage";
import Forgot_Passsord from "./component/auth/Forgot_Passsord/Forgot-Email";
// import Products from "./component/Products/Product";
// import ProductDetails from "./component/Products/ProductDetails";
import VerifyOtp from "./component/auth/VerifyOtp/verifyOtp";
import Reset from "./component/auth/ResetPassword/Reset";
import HomeLayout from "./component/Dashboard/Layout";
import Layyout from "./component/AllProducts/Layyout";
import WhislistLayyout from "./component/AllProducts/Whislist.js/Layout";
import ProductDetails from "./component/AllProducts/ProductDEtailspage/PDetails";
import CartPage from "./component/AllProducts/Cart/Cart";
import FlyCart from "./demo";
import Checkout from './component/AllProducts/cheeckout/form'
import AdminLayout from "./component/Admin/Layout/layout";
import SellerCreateForm from './component/Admin/dashBoard/seller/SellerForm'
import DataTable from "./component/Admin/dashBoard/seller/ListSeller";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<Forgot_Passsord />}></Route>
        <Route path="/reset-password" element={<Reset />}></Route>
        <Route path="/productdetails" element={<ProductDetails />}></Route>
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/*" element={<HomeLayout />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/all-products" element={<Layyout />} />
        <Route path="whislist" element={<WhislistLayyout />} />
        <Route path='/cart' element={<CartPage />}/>
        <Route path="/demo" element={<FlyCart />}/>
        <Route path='/checkout' element={<Checkout />}/>
        <Route path="/admin-dashboard" element={<AdminLayout />}/>
        <Route path="/create-seller" element={<SellerCreateForm />}/>
        <Route path="/list-seller" element={<DataTable/>}/>
      </Routes>
    </>
  );
}
