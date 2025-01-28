import React from "react";
import { AdminHeader } from "./Dashboard";
import Footer from "../common/Footer";
import { Box } from "@mui/material";

export const AdminCommonLayout = ({ children }) => {
  return (
    <>
      <AdminHeader />
      <main>{children}</main>
      <Box sx={{ marginTop: "600px" }}>
        <Footer />
      </Box>
    </>
  );
};
