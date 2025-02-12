import React, { useEffect, useState } from "react";
import { Typography, Button, TextField, MenuItem, Select } from "@mui/material";
import { CommonDataGrid } from "../../../common/table";
import axios from "axios";

export const ListShop = () => {
  const [rows, setRows] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [categories, setCategories] = useState([]);
  const [productCategory, setProductCategory] = useState([]);

  const handleEdit = (row) => {
    setEditableRow(row.id); // Set the ID of the row being edited
    setUpdatedFields({
      // categoryId:row.categoryId,
      shopName: row.shopName,
      shopDescription: row.shopDescription,
      location: row.location,
      logo:row.logo_url
      // categoryName:row.category.categoryName//
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3004/shop/delete-shop`,
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
  const handleUpdate = async (id) => {
    try {
      
      const formData = new FormData();
      formData.append("id", id);
      formData.append("shopName", updatedFields.shopName);
      formData.append("shopDescription", updatedFields.shopDescription);
      formData.append("location", updatedFields.location);
      formData.append("categoryId", updatedFields.categoryId);
  
      // Append only if a new file is selected
      if (updatedFields.logo instanceof File) {
        formData.append("logo", updatedFields.logo);
      }
  
      const response = await axios.put(
        `http://localhost:3004/shop/update-shop`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      if (response.status === 200) {
        console.log("Shop updated successfully:", response.data);
  
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id
              ? { ...row, ...updatedFields, logo_url: response.data.logo_url }
              : row
          )
        );
        setEditableRow(null);
      }
    } catch (error) {
      console.error("Error updating shop:", error);
    }
  };
  
  

  

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3004/shop/get-category"
      );
      if (response.status === 200) {
        setProductCategory(response.data.result.shops);
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchShops = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3004/shop/get-all-shops"
      );
      if (response.status === 200) {
        setCategories(response.data.result.shops);
        const shops = response.data.result.shops.map((shop) => ({
          id: shop.id,
          shopName: shop.shopName,
          shopDescription: shop.shopDescription,
          location: shop.location,
          categoryName: shop.categoryName,
          logo_url: shop.logo_url,
        }));
        setRows(shops);
        console.log("shops", shops);
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchShops();
    fetchCategories();
  }, []);

  // useEffect(() => {

  //   fetchShops();
  // }, []);

  const handleFieldChange = (field, value) => {
    setUpdatedFields((prev) => {
      if (field === "categoryId") {
        // Find category name from productCategory based on selected ID
        const selectedCategory = productCategory.find(
          (category) => category.id === value
        );
        return {
          ...prev,
          categoryId: value,
          categoryName: selectedCategory ? selectedCategory.categoryName : "",
        };
      }
      return { ...prev, [field]: value };
    });
  };
  
  

  const columns = [
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
      field: "shopDescription",
      headerName: "shopDescription",
      width: 150,
      renderCell: (params) =>
        editableRow === params.row.id ? (
          <TextField
            size="small"
            value={updatedFields.shopDescription || ""}
            onChange={(e) =>
              handleFieldChange("shopDescription", e.target.value)
            }
          />
        ) : (
          params.value
        ),
    },
    {
      field: "location",
      headerName: "location",
      width: 150,
      renderCell: (params) =>
        editableRow === params.row.id ? (
          <TextField
            size="small"
            value={updatedFields.location || ""}
            onChange={(e) => handleFieldChange("location", e.target.value)}
          />
        ) : (
          params.value
        ),
    },
    {
      field: "categoryName",
      headerName: "Category Name",
      width: 150,
      renderCell: (params) =>
        editableRow === params.row.id ? (
          <Select
            size="small"
            value={updatedFields.categoryName|| ""}
            onChange={(e) => handleFieldChange("categoryId", e.target.value)}
            fullWidth
          >
            {productCategory?.length > 0 ? (
              productCategory.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.categoryName}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No categories available</MenuItem>
            )}
          </Select>
        ) : (
          params.row.categoryName
        ),
    }
,    
    //show logo url
    {
      field: "logo_url",
      headerName: "Logo",
      width: 150,
      renderCell: (params) =>
        editableRow === params.row.id ? (
          <>
            {updatedFields.logo ? (
              <img
                src={
                  updatedFields.logo instanceof File
                    ? URL.createObjectURL(updatedFields.logo)
                    : updatedFields.logo
                }
                alt="Preview"
                style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "5px", marginBottom: "5px" }}
              />
            ) : (
              params.value && (
                <img
                  src={params.value}
                  alt="Shop Logo"
                  style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "5px" }}
                />
              )
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFieldChange("logo", e.target.files[0])}
            />
          </>
        ) : params.value ? (
          <img
            src={params.value}
            alt="Shop Logo"
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        ) : (
          "No Image"
        ),
    }
,    
    
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
        Shop List
      </Typography>

      <CommonDataGrid
        rows={rows}
        columns={columns}
        editableRow={editableRow}
        updatedFields={updatedFields}
        onEdit={handleEdit}
        onUpdate={""}
        onFieldChange={handleFieldChange}
        onDelete={handleDelete}
      />
    </>
  );
};
