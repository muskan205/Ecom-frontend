import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import CommonForm from "../../common/form";
import CommonSnackbar from "../../../common/Toaster/SuccessToaster";
import { createCategory } from "../../../../redux/seller.slice";

export const AddCategory = () => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const dispatch = useDispatch();

  const handleSnackbarClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  const handleCategorySubmit = async (formValues) => {
    try {
      const response = await dispatch(createCategory(formValues));
      if (response.payload?.code === 201) {
        setSnackbarState({
          open: true,
          message: "Category created successfully",
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Error creating category", error);
      setSnackbarState({
        open: true,
        message: "Error creating category",
        severity: "error",
      });
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

      <CommonSnackbar
        open={snackbarState.open}
        message={snackbarState.message}
        severity={snackbarState.severity}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
};
