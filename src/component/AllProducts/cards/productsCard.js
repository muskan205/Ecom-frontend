import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { styled } from "@mui/system";

const FlyToCartEffect = styled(Box)({
  position: "absolute",
  top: "0px",
  right: "10px",
  width: "60px",
  height: "60px",
  backgroundColor: "#1976d2",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  animation: "flyToCart 0.8s forwards",
  "@keyframes flyToCart": {
    "0%": {
      transform: "scale(1) translateX(0) translateY(0)",
      opacity: 1,
    },
    "100%": {
      transform:
        "scale(0.2) translateX(calc(50vw - 20px)) translateY(calc(100vh - 20px))",
      opacity: 0,
    },
  },
});

export default function ProductCards({
  height,
  data,
  isProduct,
  onPRoductClick,
  setCartItemCount,
}) {

  const [flyingItem, setFlyingItem] = useState(null);
  const [cartCount, setCartCount] = useState(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.length;
  });

  const itemRef = useRef(null);
  const [itemPosition, setItemPosition] = useState({ top: 0, left: 0 });

  const handleAddToCart = (item) => {
    const rect = itemRef.current?.getBoundingClientRect();
    if (rect) {
      setItemPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!Array.isArray(cart)) cart = [];

    const itemExists = cart.find((cartItem) => cartItem.id === item.id);

    if (!itemExists) {
      // Add the new item to the cart
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));

      console.log("cart---------------", cart);
      setCartItemCount(cart.length)

      setFlyingItem(item);
    } else {
      alert("Item is already in the cart");
    }
  };

  const handleAddToWishlist = (item) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.find((wishlistItem) => wishlistItem.id === item.id)) {
      wishlist.push(item);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Item added to wishlist");
    } else {
      alert("Item is already in Wishlist");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      {data.map((item, index) => (
        <Card
          key={index}
          sx={{
            width: "300px",
            borderRadius: "8px",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardActionArea>
            <Box sx={{ position: "relative" }}>
              <CardMedia
                ref={itemRef} // Assign ref here
                onClick={() => onPRoductClick(item)}
                component="img"
                height={height}
                image={item.image[0]}
                alt={item.name}
                sx={{
                  borderRadius: "8px 8px 0 0",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              />
              <CardContent sx={{ padding: "16px" }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  {item.name}
                </Typography>
                {isProduct && (
                  <Typography
                    variant="body2"
                    sx={{ color: "#666", marginBottom: "8px" }}
                  >
                    ${item.price}
                  </Typography>
                )}
                {!isProduct && (
                  <Typography
                    variant="body2"
                    sx={{ color: "#666", marginBottom: "8px" }}
                  >
                    {item.categoryName}
                  </Typography>
                )}
                {isProduct && (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddToCart(item)}
                      sx={{
                        borderRadius: "8px",
                        fontSize: "12px",
                        padding: "8px 16px",
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => handleAddToWishlist(item)}
                      variant="outlined"
                      color="primary"
                      sx={{
                        borderRadius: "8px",
                        fontSize: "12px",
                        padding: "8px 16px",
                      }}
                    >
                      Wishlist
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Box>
          </CardActionArea>
        </Card>
      ))}

      {/* Flying item animation */}
      {flyingItem && (
        <FlyToCartEffect
          sx={{
            top: itemPosition.top,
            left: itemPosition.left,
            position: "absolute",
            width: "60px",
            height: "60px",
            backgroundColor: "#1976d2",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            animation: "flyToCart 0.8s forwards",
            "@keyframes flyToCart": {
              "0%": {
                transform: "scale(1) translateX(0) translateY(0)",
                opacity: 1,
              },
              "100%": {
                transform: "scale(0.2) translateX(50vw) translateY(-100vh)",
                opacity: 0,
              },
            },
          }}
        >
          <img
            src={flyingItem.image[0]}
            alt={flyingItem.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </FlyToCartEffect>
      )}
    </Box>
  );
}
