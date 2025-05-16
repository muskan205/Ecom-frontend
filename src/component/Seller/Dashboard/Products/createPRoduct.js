import React, { useEffect, useState } from "react";
import CommonForm from "../../common/form";
import { Box, Typography } from "@mui/material";
import axios from "axios";
// import { useFetchCategories } from "../../serivces/api.service";
export const AddProduct = () => {
  const [productFormData, setProductFormData] = useState({});
  // const [categories, setCategories] = useState([]);
  const [shops, setShops] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [rows, setRows] = useState([]);
// const {categories,error,loading}=useFetchCategories()
  // const fetchCategories = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:3004/shop/get-category"
  //     );
  //     if (response.status === 200) {
  //       setCategories(response.data.result.shops);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching categories", error);
  //   }
  // };
  // const fetchShops = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:3004/shop/get-all-shops"
  //     );
  //     if (response.status === 200) {
  //       setCategories(response.data.result.shops);
  //       const shops = response.data.result.shops.map((shop) => ({
  //         id: shop.id,
  //         shopName: shop.shopName,
  //         shopDescription: shop.shopDescription,
  //         location: shop.location,
  //         categoryName: shop.categoryName,
  //         logo_url: shop.logo_url,
  //       }));
  //       setRows(shops);
  //       console.log("shops", shops);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching categories", error);
  //   }
  // };



  // const fetchSubCategories = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:3004/shop/get-subcategory"
  //     );
  //     if (response.status === 200) {
  //       const categories = response.data.result.shops
  //         .filter((shop) => !shop.isDeleted) // Only include non-deleted categories
  //         .map((shop) => ({
  //           id: shop.id,
  //           subCategoryName: shop.subCategoryName,
  //           isDeleted: shop.isDeleted,
  //         }));
  //       setSubCategory(categories);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  // useEffect(() => {
   
  //   fetchCategories();
  //   fetchSubCategories();
  //   fetchShops()
  // }, []);
  // useEffect(() => {
   
   
  // }, []);

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "500px",
        margin: "0 auto",
        marginTop: "70px",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Add Products
      </Typography>

      <CommonForm
        entityType="product"
        // formData={productFormData}
        // onSubmit={handleProductSubmit}
        categories={"categories"}
        subcategory={subcategory}
        shops={shops}
      />
    </Box>
  );
};
