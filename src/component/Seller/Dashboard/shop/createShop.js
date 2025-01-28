import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import CommonForm from "../../common/form";

export const CreateShop = () => {
  const [user, setUser] = useState({
    shopName: "",
    ownerID: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", user);
    alert(`Shop Created: ${JSON.stringify(user, null, 2)}`);

    setUser({
      shopName: "",
      ownerID: "",
    });
  };

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
        formData={{ shopName: "", ownerID: "" }}
        onSubmit={(data) => console.log("Product Created", data)}
      />
    </Box>
  );
};
