import React, { Suspense, useState, useEffect } from "react";
import Navbar from "../../common/Navbar/Navbar";
import FilterControls from "./filters";
import { Box } from "@mui/material";
import SmartFooter from "../../common/Footer";
import AllProductsCards from "../AllProducts/cards/Products";

const OurProducts = React.lazy(() =>
  import("../Dashboard/mainSection/ourProducts")
);

function ProductsLayout() {
  const [cartItemCount, setCartItemCount] = useState(0);

  // Fetch cart items from localStorage
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
 var  itemCount = cartItems.reduce(
      (acc, item) => acc + (item.quantity || 1),
      0
    );
    // itemCount = (localStorage.setItem("count",itemCount)) || [];
    console.log("item count", itemCount);
    setCartItemCount(itemCount);
  }, [cartItemCount]);

  console.log("cartItemCount------------Lay------------",cartItemCount)


  return (
    <>
      <Navbar cartItemCount={cartItemCount} />
      <Box
        sx={{
          display: "flex",
          position: "relative",
          maxHeight: "1000px",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            marginTop: "105px",
            width: "268px",
            position: "absolute",
            marginLeft: "23px",
            borderRadius: "8px",
          }}
        >
          <FilterControls />
        </Box>
        <Suspense fallback={<div>Hey, loading your content...</div>}>
          <Box sx={{ marginTop: "105px", marginLeft: "285px" }}>
            <AllProductsCards setCartItemCount={setCartItemCount}/>
          </Box>
        </Suspense>
      </Box>
      <Box sx={{ marginTop: "60px" }}>
        <SmartFooter />
      </Box>
    </>
  );
}

export default ProductsLayout;
