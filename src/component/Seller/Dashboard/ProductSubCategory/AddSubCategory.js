import React, { useEffect, useState } from "react";
import CommonForm from "../../common/form";
import { Box, Typography } from "@mui/material";
export const AddSubCategory = () => {
  const [subcategoryFormData, setSubcategoryFormData] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories([
      { id: 1, name: "Electronics" },
      { id: 2, name: "Fashion" },
    ]);
  }, []);

 
  const handleSubcategorySubmit = (formData) => {
    console.log("Subcategory Form Submitted:", formData);
   
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
