import React, { useEffect, useState } from "react";
import { Typography, Button} from "@mui/material";
import { CommonDataGrid } from "../../../common/table";
import axios from "axios";



export const ListShop = () => {
  const [rows, setRows] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});



  const handleEdit = (row) => {
    setEditableRow(row.id); // Set the ID of the row being edited
    setUpdatedFields({ name: row.name, email: row.email, role: row.role });
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

const [categories,setCategories]=useState([])

  useEffect(() => {
   
    const fetchShops = async () => {
      try {
        const response = await axios.get("http://localhost:3004/shop/get-all-shops");
        if (response.status === 200) {
          setCategories(response.data.result.shops);
          const shops = response.data.result.shops.map((shop) => ({
            id: shop.id,
           shopName: shop.shopName,
           shopDescription:shop.shopDescription,
           location:shop.location,
           categoryName:shop.categoryName,
           logo_url:shop.logo_url
          
          }));
          setRows(shops)
          console.log("shops",shops)
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchShops();
  }, []);

  const handleFieldChange = (field, value) => {
    setUpdatedFields((prev) => ({ ...prev, [field]: value }));
  };


  const columns = [
    {
      field: "shopName",
      headerName: "shopName",
      width: 150,
      editable: true,
    },
    {
      field: "shopDescription",
      headerName: "shopDescription",
      width: 150,
      editable: true,
    },
    {
      field: "location",
      headerName: "location",
      width: 150,
      editable: true,
    },
    {
      field: "categoryName",
      headerName: "CategoryName",
      width: 150,
      editable: true,
    },
    //show logo url 
    {
      field: "logo_url",
      headerName: "Logo",
      width: 150,
      renderCell: (params) => (
        params.value ? (
          <img
            src={params.value} 
            alt="Shop Logo"
            style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "5px" }}
          />
        ) : (
          "No Image"
        )
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
        // onDelete={handleDelete}
      />
    </>
  );
};
