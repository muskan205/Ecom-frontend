import React from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import CommonForm from "../../common/form";

export const AddCategory = () => {
  const handleCategorySubmit = async (formValues) => {
    try {
      const response = await axios.post(
        "http://localhost:3004/shop/create-category",
        formValues
      );
      if (response.status === 200) {
        alert("Category created successfully");
      }
    } catch (error) {
      console.error("Error creating category", error);
      alert("Error creating category");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        margin: "0 auto",
        marginTop: "70px",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Add Category
      </Typography>

      <CommonForm
        entityType="category"
        formData={{}}
        onSubmit={handleCategorySubmit}
      />
    </Box>
  );
};