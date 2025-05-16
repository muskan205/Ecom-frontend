import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { CommonDataGrid } from "../../../common/table";
import axios from "axios";
import CommonSnackbar from "../../../common/Toaster/SuccessToaster";
import { useDispatch, useSelector } from "react-redux";
import {deleteCategory, fetchCategories } from "../../../../redux/seller.slice";

export const ListCategory = () => {
  const dispatch = useDispatch();

  const { categories, isLoading } = useSelector((state) => state.retailer);

  const [rows, setRows] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  useEffect(() => {
    debugger
    const res= dispatch(fetchCategories())
    console.log("res",res)
  }, [dispatch]);
  

  // Sync Redux categories to local rows
  useEffect(() => {
    setRows(categories);
  }, [categories]);

  const handleEdit = (row) => {
    setEditableRow(row.id);
    setUpdatedFields({ ...row });
  };

  const handleFieldChange = (field, value) => {
    setUpdatedFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleDelete = async (id) => {
    try {
      debugger
      const response =await dispatch(deleteCategory(id))
      if (response.payload.status ===200){
        setSnackbarState({
          open: true,
          message: "Deleted successfully",
          severity: "success",
        });
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      }
    } catch (error) {
      console.error("Error deleting seller:", error);
    }
  };

  const columns = [
    {
      field: "CategoryName",
      headerName: "Category Name",
      width: 200,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
          <CommonSnackbar
            open={snackbarState.open}
            message={snackbarState.message}
            severity={snackbarState.severity}
            onClose={handleSnackbarClose}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 2,
          fontWeight: "500",
          fontSize: "23px",
          marginTop: "80px",
        }}
      >
        Category List
      </Typography>

      <CommonDataGrid
        rows={rows}
        columns={columns}
        editableRow={editableRow}
        updatedFields={updatedFields}
        onEdit={handleEdit}
        onUpdate={""}
        onFieldChange={handleFieldChange}
        onDelete={""}
        loading={isLoading}
      />
    </>
  );
};
