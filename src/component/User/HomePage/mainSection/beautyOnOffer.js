import React from "react";
import CustomCards from "../Cards/ProductsCard";
import { Box, Button } from "@mui/material";
import PRoducts from "../../All_Json/Products.json";
import Categories from "../../All_Json/Category.json";
import CategoryCard from "../Cards/CategoryCard";
import BeautyOffersCard from "../Cards/BeautyOnOffers";
function BeautyCollection({ image }) {
  return (
    <>
      <Box sx={{}}>
        <BeautyOffersCard height={240} />
      </Box>
    </>
  );
}

export default BeautyCollection;
