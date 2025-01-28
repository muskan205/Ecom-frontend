import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaShippingFast, FaCheckCircle, FaUserAlt } from "react-icons/fa";
import { PiArrowsCounterClockwiseBold } from "react-icons/pi";

const StyledFooter = styled(Box)(({ theme, darkMode }) => ({
  backgroundColor: "#d8dfeb",
  padding: theme.spacing(6, 0),
  color: darkMode ? "#fff" : "#333",
  transition: "all 0.3s ease-in-out",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  position: "relative",
  zIndex: 1,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    // background: "linear-gradient(90deg, #ff4081 0%, #7c4dff 100%)"
  },
}));

const Bottom = () => {
  const theme = useTheme();

  return (
    <StyledFooter>
      <Container maxWidth="" sx={{ marginLeft: "100px" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <FaCheckCircle size={30} color="black" />
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "black" }}
            >
              100% Authenticate
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              All our Products are directly sourced from brands
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FaShippingFast size={30} color="black" />
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "black" }}
            >
              Free Shipping
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "", fontSize: "16px" }}
              >
                On all orders above ₹299
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FaUserAlt size={30} color="black" />
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "black" }}
            >
              Certified beauty Advisor
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "", fontSize: "16px" }}
            >
              Get Experts Consultant
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <PiArrowsCounterClockwiseBold size={30} color="black" />
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "black" }}
            >
              Easy Returns
            </Typography>
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "", fontSize: "16px" }}
              >
                Hessel-free pick-ups and refunds
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </StyledFooter>
  );
};

export default Bottom;
