import React, { useEffect, useState } from "react";
import { Typography, Button, TextField } from "@mui/material";
import axios from "axios";
import { CommonDataGrid } from "../../../common/table";
import { useDispatch, useSelector } from 'react-redux';
import { deleteSeller, fetchSellers, updateSeller } from '../../../../redux/seller.slice'

export const SellerList = () => {
  const [rows, setRows] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const dispatch = useDispatch();
  const { sellers, loading, error } = useSelector((state) => state.sellers); 
  console.log("sellers from redux", sellers);

  useEffect(() => {
    dispatch(fetchSellers());
  }, [dispatch]);

  useEffect(() => {
    if (sellers && sellers.length > 0) { 
      const formattedSellers = sellers.map((seller) => ({
        id: seller.id,
        name: seller.username,
        email: seller.email,
        shopName: seller.shopName,
        accountId: seller.accountId,
        role: seller.role,  
      }));
      setRows(formattedSellers  );
    }
  }, [sellers]);

  const handleEdit = (row) => {     
    setEditableRow(row.id);
    setUpdatedFields({
      id: row.accountId,
      name: row.name, 
      email: row.email,
      shopName: row.shopName,
    });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await dispatch(updateSeller({ id, updatedFields })).unwrap();
      if (response.status === 200) {
        console.log("Seller updated successfully:", response.data);
        setEditableRow(false)

        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, ...updatedFields } : row
          )
        );
        setEditableRow(null);
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
      const response=await dispatch(deleteSeller(id))

      if (response.status === 200) {
        console.log("Seller deleted successfully:", response.data);


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
  if (loading) {
    return (
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "80px",
        }}
      >
        Loading sellers...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography
        color="error"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "80px",
        }}
      >
        {error}
      </Typography>
    );
  }

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

