import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { FORM_FEILDS } from './../../Seller/constants/form.field'; // Import the constants

const CommonForm = ({ entityType, formData, onSubmit }) => {
  const [formValues, setFormValues] = useState(formData || {});

  useEffect(() => {
    setFormValues(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => { e.preventDefault(); onSubmit(formValues); }}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "500px", margin: "0 auto", marginTop: "20px" }}
    >
      {FORM_FEILDS[entityType]?.map(({ label, name, type, required }) => (
        <TextField
          key={name}
          label={label}
          name={name}
          type={type}
          value={formValues[name] || ""}
          onChange={handleChange}
          fullWidth
          required={required}
        />
      ))}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default CommonForm;
