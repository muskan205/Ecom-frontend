import React from "react";
import { Box,TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const CommonDataGrid = ({ rows, columns, editableRow, updatedFields, onEdit, onUpdate, onFieldChange, onDelete }) => {
  return (
    <Box
      sx={{
        height: 400,
        width: "70%",
        display: "flex",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={(selection) => {
          console.log("Selected rows:", selection);
        }}
        components={{
          Toolbar: () => null, 
        }}
       
        renderCell={(params) => {
          if (editableRow === params.row.id) {
            return (
              <TextField
                size="small"
                value={updatedFields[params.field] || ""}
                onChange={(e) => onFieldChange(params.field, e.target.value)}
              />
            );
          }
          return params.value;
        }}
      />
    </Box>
  );
};
