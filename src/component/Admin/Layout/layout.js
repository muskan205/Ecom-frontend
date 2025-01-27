import React from "react";
import Footer from "../../common/Footer";
import { Box } from "@mui/material";
import { AdminHeader } from "../Dashboard";




export const AdminLayout=() =>{
  return (
    <>
    <AdminHeader/>
      <Box sx={{ marginTop: "23px" }}>
        <Footer />
      </Box>
    </>
  );
}


