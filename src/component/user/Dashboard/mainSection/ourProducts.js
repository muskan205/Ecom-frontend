import { Category } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import CustomCards from "../Cards/ProductsCard";
// import Subcategories from "../../All_Json/Category.json";
import Products from "../../All_Json/Products.json";

function OurProducts({ image, text }) {
  return (
    <Box sx={{}}>
      <CustomCards
        image={image}
        height="240"
        data={Products}
        isProduct={true}
      />
    </Box>
  );
}

export default OurProducts;
