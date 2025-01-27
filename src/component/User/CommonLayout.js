import React, { useEffect, useState } from "react";
import { Navbar } from "../common/Navbar";
import Footer from "../common/Footer";
import { Box } from "@mui/material";

function CommonLayout({ children }) {
  const [cartItemCount, setCartItemCount] = useState(0);

  const updateCartItemCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const itemCount = cartItems.reduce(
      (acc, item) => acc + (item.quantity || 1),
      0
    );
    setCartItemCount(itemCount);
  };

  return (
    <>
      <Navbar cartItemCount={cartItemCount} />
      <main>{children}</main>
      <Box sx={{ marginTop: "350px" }}></Box>
      <Footer />
    </>
  );
}

export default CommonLayout;
