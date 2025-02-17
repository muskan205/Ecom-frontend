import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { CommonDataGrid } from "../../../common/table";
import axios from "axios";
import CommonSnackbar from "../../../common/Toaster/SuccessToaster";

export const ListCategory = () => {
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
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3004/shop/get-category"
        );
        if (response.status === 200) {
          console.log("Response************",response)
          const categories = response.data.result.shops
          
          .map((shop) => ({
            id: shop.id,
            CategoryName: shop.categoryName,
          
          }));
          console.log("categr",categories)
          setRows(categories);
          
          console.log("categories******************",categories)
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleEdit = (row) => {
    setEditableRow(row.id);
    setUpdatedFields({ ...row });
  };

  const handleFieldChange = (field, value) => {
    setUpdatedFields((prev) => ({ ...prev, [field]: value }));
  };



  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3004/shop/delete-category-id`,
        { data: { id } } // Send the id in the request body
      );

      if (response.status === 200) {
        console.log("Seller deleted successfully:", response.data);
        setSnackbarState({
          open: true,
          message: "Deleted successfuly",
          severity: "success",
        });

        // Remove the deleted seller from the UI
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
          {editableRow === params.row.id ? (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              style={{ marginRight: 8 }}
            >
              Update
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              style={{ marginRight: 8 }}
              onClick={() => handleEdit(params.row)}
            >
              Edit
            </Button>
          )}
          <Button variant="outlined" color="secondary" size="small" onClick={()=>handleDelete(params.row.id)}>
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
      />
    </>
  );
};