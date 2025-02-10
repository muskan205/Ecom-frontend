import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import CommonForm from "../../common/form";
import axios from "axios";
import { useGetCategories } from "../../../hooks/getPRoductCategory";

export const CreateShop = () => {
  const [user, setUser] = useState({
    sellerId: "",
    categoryId: "",
    shopName: "",
    shopDescription: "",
    location: "",
    logo_url: "",
  });
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3004/shop/create-shop",
        user
      );
      if (response.status === 200) {
        alert("Shop created successfully");
      }
    } catch (error) {
      console.error("Error creating shop", error);
      alert("Error creating shop");
    }

    setUser({
      sellerId: "",
      categoryId: "",
      shopName: "",
      shopDescription: "",
      location: "",
      logo_url: "",
    });
  };
// const {categories,data,error} =useGetCategories()
  useEffect(() => {
    console.log(localStorage.getItem("user"));
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3004/shop/get-category");
        if (response.status === 200) {
          setCategories(response.data.result.shops);
          console.log("response.data",response.data.result.shops)
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();

  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
        onChange={(data) => setUser(data)}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};