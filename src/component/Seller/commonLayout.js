import React from "react";
import Footer from "../common/Footer";
import { Box } from "@mui/material";
// import { SelllerHeader } from "./Dashboard";
import { SellerHeader } from "./Dashboard";
export const SellerCommonLayout = ({ children }) => {
  return (
    <>
      <SellerHeader />
      <main>{children}</main>
      <Box sx={{ marginTop: "600px" }}>
        <Footer />
      </Box>
    </>
  );
};
