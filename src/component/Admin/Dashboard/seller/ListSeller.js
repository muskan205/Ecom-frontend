import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Button, TextField } from "@mui/material";
import axios from "axios";
import { CommonDataGrid } from "../../../common/table";

export const SellerList = () => {
  const [rows, setRows] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3004/seller/get-all-seller"
        );
        if (response.status === 200) {
          console.log("response*************", response.data.seller);
          const sellers = response.data.seller.map((seller) => ({
            id: seller.seller.id, // Access the nested seller object
            name: seller.seller.username,
            email: seller.email,
            shopName: seller.seller.shopName,
            accountId: seller.seller.accountId,
            // email: seller.email,
            // role: seller.seller.role,
          }));
          setRows(sellers);
          console.log("sellers", response.data.seller);
        }
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchSellers();
  }, []);

  const handleEdit = (row) => {
    setEditableRow(row.id); // Set the ID of the row being edited
    setUpdatedFields({
      id: row.accountId,
      name: row.name,
      email: row.email,
      shopName: row.shopName,
    });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3004/seller/update-seller`, // Remove id from query params
        { ...updatedFields } // Send id and updated fields in request body
      );
      if (response.status === 200) {
        console.log("Seller updated successfully:", response.data);

        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, ...updatedFields } : row
          )
        );
        setEditableRow(null); // Reset editable row
      }
    } catch (error) {
      console.error("Error updating seller:", error);
    }
  };

  const handleFieldChange = (field, value) => {
    setUpdatedFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3004/seller/delete-sellers`,
        { data: { id } } // Send the id in the request body
      );

      if (response.status === 200) {
        console.log("Seller deleted successfully:", response.data);

        // Remove the deleted seller from the UI
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      }
    } catch (error) {
      console.error("Error deleting seller:", error);
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) =>
        editableRow === params.row.id ? (
          <TextField
            size="small"
            value={updatedFields.name || ""}
            onChange={(e) => handleFieldChange("name", e.target.value)}
          />
        ) : (
          params.value
        ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) =>
        editableRow === params.row.id ? (
          <TextField
            size="small"
            value={updatedFields.email || ""}
            onChange={(e) => handleFieldChange("email", e.target.value)}
          />
        ) : (
          params.value
        ),
    },

    {
      field: "shopName",
      headerName: "shopName",
      width: 150,
      renderCell: (params) =>
        editableRow === params.row.id ? (
          <TextField
            size="small"
            value={updatedFields.shopName || ""}
            onChange={(e) => handleFieldChange("shopName", e.target.value)}
          />
        ) : (
          params.value
        ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      renderCell: (params) =>
        editableRow === params.row.id ? (
          <TextField
            size="small"
            value={updatedFields.role || ""}
            onChange={(e) => handleFieldChange("role", e.target.value)}
          />
        ) : (
          params.value
        ),
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
              onClick={() => handleUpdate(params.row.id)}
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
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
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
        Seller List
      </Typography>

      <CommonDataGrid
        rows={rows}
        columns={columns}
        editableRow={editableRow}
        updatedFields={updatedFields}
        onEdit={handleEdit}
        onUpdate={handleUpdate}
        onFieldChange={handleFieldChange}
        onDelete={handleDelete}
      />
    </>
  );
};
