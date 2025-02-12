import React, { useEffect, useState } from "react";
import CommonForm from "../../common/form";
import { Box, Typography } from "@mui/material";
import axios from "axios";
export const AddSubCategory = () => {
  const [subcategoryFormData, setSubcategoryFormData] = useState({});
  const [categories, setCategories] = useState([]);
  const [rows, setRows] = useState([]);
  // const [editableRow, setEditableRow] = useState(null);
  // const [updatedFields, setUpdatedFields] = useState({});
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3004/shop/get-category"
        );
        if (response.status === 200) {
          const categories = response.data.result.shops.map((shop) => ({
            id: shop.id,
            CategoryName: shop.categoryName,
            // CategoryId: shop.id,
          }));
          setRows(categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

 
  const handleSubcategorySubmit = async(formData) => {
  
      try {
        const response = await axios.get(
          "http://localhost:3004/shop/create-subCategory"
        );
        if (response.status === 200) {
          const categories = response.data.result.shops.map((shop) => ({
            id: shop.id,
            CategoryName: shop.categoryName,
            // CategoryId: shop.id,
          }));
          setRows(categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      
    };
   
  };

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
      Add Subcategory
      </Typography>

      <CommonForm
        entityType="subcategory"
        formData={subcategoryFormData}
        onSubmit={handleSubcategorySubmit}
        categories={categories}
      />
    </Box>
  );
};
