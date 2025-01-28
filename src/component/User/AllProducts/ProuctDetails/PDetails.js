import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CardMedia, Button, Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import "./ProductDetails.css";

export const ProductDetails=() =>{
  const location = useLocation();
  const { product } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();
  const thumbnails = product?.image || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnails.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [thumbnails.length]);

  return (
    <>
      <Box
        className="main-div-details"
        display="flex"
        flexDirection="row"
        p={3}
        marginLeft="400px"
      >
        {/* Left Column */}
        <Box
          className="product-media"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {/* Main Image */}
          <CardMedia
            component="img"
            sx={{ width: "400px", height: "500px", marginBottom: "10px" }}
            image={thumbnails[currentIndex]}
            alt={product?.name}
          />

          {/* Thumbnails */}
          <Box
            className="thumbnail-gallery"
            display="flex"
            flexDirection="row"
            gap={1}
          >
            {thumbnails.map((thumbnail, index) => (
              <img
                key={index}
                src={thumbnail}
                alt={`thumbnail-${index}`}
                className={`thumbnail ${
                  index === currentIndex ? "active" : ""
                }`}
                style={{
                  width: "70px",
                  height: "80px",
                  cursor: "pointer",
                  border: index === currentIndex ? "2px solid #4f62fe" : "none",
                }}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </Box>
        </Box>

        {/* Right Column */}
        <Box
          className="product-details-container"
          sx={{ marginTop: "10px", marginLeft: "20px" }}
        >
          <Box className="first" mb={2}>
            <Typography variant="h5">{product?.name}</Typography>
          </Box>

          <Typography variant="h6" mb={2}>
            Product Details
          </Typography>
          <Box className="product-description" mb={2}>
            <Typography variant="body1">
              {product?.description || "No description available."}
              <br />
            </Typography>
            Size: {product?.size} <br />
            Country of Origin: India
          </Box>

          <Box display="flex" alignItems="center" mt={1}>
            <Typography variant="body2" className="rating-score">
              3.8
            </Typography>
            <StarIcon color="primary" sx={{ fontSize: 18 }} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              125 Ratings, 54 Reviews
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">
            Free Delivery
          </Typography>
          <Typography variant="h6" mt={1}>
            ₹{product?.price.toFixed(2)}
          </Typography>
          <Box className="product-actions" display="flex" gap={2}>
            <Button
              onClick={() => navigate("/cart")}
              sx={{
                backgroundColor: "#4f62fe",
                "&:hover": { backgroundColor: "#4f62fe" },
              }}
              variant="contained"
              className="add-to-cart-btn"
            >
              Add to Cart
            </Button>
            <Button
              sx={{
                backgroundColor: "green",
                "&:hover": { backgroundColor: "darkgreen" },
              }}
              variant="contained"
              color="success"
              className="buy-now-btn"
            >
              Buy Now
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
