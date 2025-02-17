import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import CommonForm from "../../common/form"; // Import the CommonForm

export const AddSubCategory = () => {
  const [user, setUser] = useState({
    categoryId: "",
    subCategoryName: "",
  });

  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3004/shop/get-category");
        if (response.status === 200) {
          setCategories(response.data.result.shops); 
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (formData) => {
    console.log("Submitting Data:", formData); // Debugging log
    try {
      const response = await axios.post(
        "http://localhost:3004/shop/create-subCategory",
        {
          categoryId: formData.categoryId,
          subCategoryName: formData.subCategoryName,
        }
      );

      console.log("Response Data:", response.data); // Debugging log

      if (response.status === 200) {
        setUser({
          categoryId: "",
          subCategoryName: "",
        });
      }
    } catch (error) {
      console.error("Error creating subCategory:", error.response?.data || error);
      alert(`Error: ${error.response?.data?.message || "Something went wrong"}`);
    }
  };

  return (
    <Box
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
        Create SubCategory
      </Typography>

      <CommonForm
        entityType="subcategory"
        formData={user}
        categories={categories}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};
