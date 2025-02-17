import React, { useEffect, useState } from "react";
import { Typography, Button} from "@mui/material";
import { CommonDataGrid } from "../../../common/table";
import axios from "axios";



export const ListSubCategory = () => {
  const [rows, setRows] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3004/shop/get-subcategory"
        );
        if (response.status === 200) {
          const categories = response.data.result.shops
          .filter((shop) => !shop.isDeleted) // Only include non-deleted categories
          .map((shop) => ({
            id: shop.id,
            subCategoryName: shop.subCategoryName,
            isDeleted: shop.isDeleted,
          }));
          setRows(categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleEdit = (row) => {
    setEditableRow(row.id); // Set the ID of the row being edited
    setUpdatedFields({ name: row.name, email: row.email, role: row.role });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3004/shop/delete-subCategory`,
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

  const handleFieldChange = (field, value) => {
    setUpdatedFields((prev) => ({ ...prev, [field]: value }));
  };


  const columns = [
    {
      field: "subCategoryName",
      headerName: "subCategoryName",
      width: 150,
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
          <Button
            variant="outlined"
            color="secondary"
            size="small"
           onClick={()=>handleDelete(params.row.id)}
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
    Subcategory List
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
