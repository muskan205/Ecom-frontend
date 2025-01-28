import React, { Suspense, useState, useEffect } from "react";

import { Box } from "@mui/material";

// import AllProductsCards from "../Products";
import { FilterSection } from "../../Filters";
import { AllProductsCards } from "../ProductCard";


const OurProducts = React.lazy(() =>
  import("../../../HomePage/mainSection/ourProducts")
);

export const ProductsLayout=({ setCartItemCount })=> {
  // const [cartItemCount, setCartItemCount] = useState(0);

  return (
    <>
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
          <FilterSection />
        </Box>
        <Suspense fallback={<div>Hey, loading your content...</div>}>
          <Box sx={{ marginTop: "105px", marginLeft: "285px" }}>
            <AllProductsCards setCartItemCount={setCartItemCount} />
          </Box>
        </Suspense>
      </Box>
    </>
  );
}

