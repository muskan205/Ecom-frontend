import React, { useEffect, useState } from "react";

import CaseStudyCarousel from "../Carousel/carousel";
import { Box, Button, Typography } from "@mui/material";

import SeasionalCollection from "../mainSection/ouerCollections";
import OurProducts from "../mainSection/ourProducts";

import BeautyCollection from "../mainSection/beautyOnOffer";
import Bottom from "../../common/Footer/Footer2";
import MustHave from "../Cards/mustHave";
import { useNavigate } from "react-router";

export const  HomeLayout=()=> {
  const [cartItemCount, setCartItemCount] = useState(0);

  // Fetch cart items from localStorage
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const itemCount = cartItems.reduce(
      (acc, item) => acc + (item.quantity || 1),
      0
    );

    console.log("item count", itemCount);
    setCartItemCount(itemCount);
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <Box>
        <CaseStudyCarousel />
      </Box>
      <Box sx={{ padding: "36px" }}>
        <Typography
          sx={{ fontSize: "24px", fontWeight: "400", marginLeft: "108px" }}
        >
          Our Categories
        </Typography>
      </Box>

      <SeasionalCollection />
      <Box sx={{ padding: "36px" }}>
        <Typography
          sx={{ fontSize: "24px", fontWeight: "400", marginLeft: "108px" }}
        >
          Offers on beauty
        </Typography>
      </Box>
      <BeautyCollection />
      <Box sx={{ marginLeft: "98px", padding: "50px", position: "relative" }}>
        <img
          src="https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera_1258-119090.jpg?t=st=1735646925~exp=1735650525~hmac=b2b8055807b2b277a6d1e359f5687bbceeced64a0fdad7e11e99b93f0bd21155&w=1380"
          height="450px"
          width="1584px"
        />
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "745px",
            color: "white",
            // backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Welcome to the World of Shopping
          </Typography>
          <Typography variant="body1">
            Discover the latest trends and exclusive deals!
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "40%",
            color: "white",
            left: "745px",
          }}
        >
          <Typography variant="body2" sx={{ marginLeft: "23px" }}>
            E-commerce is a powerful means to connect the unconnected to global
            trade.
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "60%",
            color: "white",
            left: "745px",
          }}
        >
          <Typography
            variant="body2"
            sx={{ marginLeft: "23px", marginTop: "-60px" }}
          >
            Enjoy shopping with us today!
          </Typography>
          <Button
            onClick={() => navigate("/all-products")}
            variant="contained"
            sx={{ marginLeft: "23px", marginTop: "23px" }}
          >
            Shop Now
          </Button>
        </Box>
      </Box>
      <Box>
        <Box sx={{ padding: "36px" }}>
          <Typography
            sx={{ fontSize: "24px", fontWeight: "400", marginLeft: "108px" }}
          >
            Latest Products
          </Typography>
        </Box>
        <OurProducts />
        <MustHave />
      </Box>

      {/* Footer */}
      <Box
        sx={{
          marginTop: "124px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Box>
          <Bottom />
        </Box>
      </Box>
    </>
  );
}


