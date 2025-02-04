import React, { useEffect, useState } from "react";
import CommonForm from "../../common/form";
import { Box, Typography } from "@mui/material";
export const AddProduct = () => {
    const [productFormData, setProductFormData] = useState({});
    const [categories, setCategories] = useState([]); 
    const [shops, setShops] = useState([]);

    useEffect(() => {
        setCategories([
          { id: 1, name: 'Electronics' },
          { id: 2, name: 'Fashion' },
        ]);
        setShops([
          { id: 1, name: 'Shop 1' },
          { id: 2, name: 'Shop 2' },
        ]);
      }, []);
    
      const handleProductSubmit = (formData) => {
        console.log("Product Form Submitted:", formData);
       
      };

  return (
    <Box
      component="form"
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
      Add Products
      </Typography>

      <CommonForm
        entityType="product"          
        formData={productFormData}   
        onSubmit={handleProductSubmit} 
        categories={categories}    
        shops={shops}                 
      />
    </Box>
  );
};
