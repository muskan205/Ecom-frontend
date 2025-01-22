import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import Admin_Dashboard from "../../Layout/layout";
import axios from "axios";

const SellerCreateForm = () => {
  const [user, setUser] = useState({ username: "", email: "", shopName: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    try {
      const response = await axios.post("http://localhost:3004/api/register", user);
      if (response.status === 200) {
        alert("User created successfully");
        setUser({ username: "", email: "", shopName: "", password: "" }); // Clear form fields
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      <Admin_Dashboard />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "500px", margin: "0 auto" }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Create Seller
        </Typography>
        <TextField
          label="Seller Name"
          variant="outlined"
          required
          fullWidth
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          required
          fullWidth
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <TextField
          label="Shop Name"
          variant="outlined"
          required
          fullWidth
          name="shopName"
          value={user.shopName}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"  // Changed to 'password' type for better security
          variant="outlined"
          required
          fullWidth
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </>
  );
};

export default SellerCreateForm;
