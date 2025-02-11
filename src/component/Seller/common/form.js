import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { FORM_FEILDS } from "./../../Seller/constants/form.field"; // Import form fields

const CommonForm = ({ entityType, formData, onSubmit, categories }) => {
  const [formValues, setFormValues] = useState(formData || {});

  useEffect(() => {
    if (formData) setFormValues(formData);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Form:", formValues);
    onSubmit(formValues);
  };

  const handleChange = (e) => {
    const { name, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0]; // Get the selected file
      console.log("file", file);
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: file, // Store file object, not just the name
      }));
    } else {
      const { value } = e.target;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
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
        marginTop: "20px",
      }}
    >
      {FORM_FEILDS[entityType]?.map(({ label, name, type, required }) => {
        if (type === "select") {
          return (
            <FormControl key={name} fullWidth required={required}>
              <InputLabel>{label}</InputLabel>
              <Select
                name={name}
                value={formValues[name] || ""}
                onChange={handleChange}
              >
                {categories?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        } else if (type === "file") {
          return (
            <TextField
              key={name}
              label={label}
              name={name}
              type="file"
              onChange={handleChange}
              fullWidth
              required={required}
              inputProps={{ accept: "image/*" }} // Restrict to image files
            />
          );
        } else {
          return (
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
          );
        }
      })}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default CommonForm;
