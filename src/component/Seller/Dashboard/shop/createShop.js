import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CommonForm from "../../common/form";
import axios from "axios";

export const CreateShop = () => {
  const getSellerId = () => {
    const userData = JSON.parse(localStorage.getItem("user"));  
    return userData?.account?.seller?.id || "";
  };

  const [user, setUser] = useState({
    sellerId: getSellerId(),
    categoryId: "",
    shopName: "",
    shopDescription: "",
    location: "",
    logo_url: "",
  });

  const [categories, setCategories] = useState([]);
  const handleSubmit = async (formData) => {
    try {
      //HANDLING FORM DATA FOR UPLOADING IMAGES
      const formdata = new FormData();
      Object.keys(formData).forEach((key) => {
        formdata.append(key, formData[key]);
      });
  
      const response = await axios.post(
        "http://localhost:3004/shop/create-shop",
        formdata
      );
      
      if (response.status === 200) {
        alert("Shop created successfully");
        setUser({
          sellerId: getSellerId(),
          categoryId: "",
          shopName: "",
          shopDescription: "",
          location: "",
          logo_url: "",
        });
      }
    } catch (error) {
      console.error("Error creating shop", error);
      alert("Error creating shop");
    }
  };

  useEffect(() => {
   
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3004/shop/get-category");
        if (response.status === 200) {
          setCategories(response.data.result.shops);
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Box
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
        Create Shop
      </Typography>

      <CommonForm
        entityType="shop"
        formData={user}
        categories={categories}
        onChange={setUser}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};
