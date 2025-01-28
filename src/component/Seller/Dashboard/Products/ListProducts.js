import React, { useState } from "react";
import { Typography, Button} from "@mui/material";
import { CommonDataGrid } from "../../../common/table";



export const ListProducts = () => {
  const [rows, setRows] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});



  const handleEdit = (row) => {
    setEditableRow(row.id); // Set the ID of the row being edited
    setUpdatedFields({ name: row.name, email: row.email, role: row.role });
  };



  const handleFieldChange = (field, value) => {
    setUpdatedFields((prev) => ({ ...prev, [field]: value }));
  };


  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      editable: true,
    },
    {
        field: "name",
        headerName: "Name",
        width: 150,
        editable: true,
      },
      {
        field: "shopId",
        headerName: "ShopID",
        width: 150,
        editable: true,
      },
      {
        field: "CategoryID",
        headerName: "CategoryID",
        width: 150,
        editable: true,
      },
      {
        field: "Quantity",
        headerName: "Quantity",
        width: 150,
        editable: true,
      },
      {
        field: "price",
        headerName: "Price",
        width: 150,
        editable: true,
      },
      {
        field: "size",
        headerName: "Size",
        width: 150,
        editable: true,
      },
      {
        field: "image",
        headerName: "Image",
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
   Product List
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
