import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CommonForm from "../../common/form"; // Import the CommonForm
import { useDispatch, useSelector } from "react-redux";
import { createSubCategory, fetchCategories } from "../../../../redux/seller.slice";

export const AddSubCategory = () => {
  const [user, setUser] = useState({
    categoryId: "",
    subCategoryName: "",
  });
  const dispatch = useDispatch()

  const categories = useSelector((state) => state.retailer.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = async (formData) => {
    try {
      await dispatch(createSubCategory(formData)).unwrap();
      setUser({ categoryId: "", subCategoryName: "" });
    } catch (error) {
      alert(`Error: ${error.message || "Something went wrong"}`);
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
