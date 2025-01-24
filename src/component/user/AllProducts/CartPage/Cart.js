import React, { useState, useEffect } from "react";
import Navbar from "../../../common/Navbar/Navbar";
import { Box, Typography, Button, IconButton, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CiFaceSmile } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function AddToCartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  useEffect(() => {
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
    setTotal(totalAmount);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update cart item count immediately
    const itemCount = updatedCart.reduce(
      (acc, item) => acc + (item.quantity || 1),
      0
    );
    setCartItemCount(itemCount);
  };

  const handleQuantityChange = (id, increment) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const updatedQuantity = item.quantity
          ? item.quantity + increment
          : 1 + increment;
        return { ...item, quantity: Math.max(updatedQuantity, 1) };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const itemCount = updatedCart.reduce(
      (acc, item) => acc + (item.quantity || 1),
      0
    );
    setCartItemCount(itemCount);
  };

  const handleCheckout = () => {
    alert("Proceeding to Checkout!");
    navigate("/checkout");
  };

  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const itemCount = cartItems.reduce(
      (acc, item) => acc + (item.quantity || 1),
      0
    );
    setCartItemCount(itemCount);
  }, []);

  return (
    <>
      <Navbar cartItemCount={cartItemCount} />

      <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 3,
            marginTop: "80px",
            textAlign: "center",
            fontSize: "20px",
          }}
        >
          Your Cart
        </Typography>
        {cartItems.length === 0 ? (
          <Typography sx={{ textAlign: "center" }}>
            Your cart is empty <CiFaceSmile size={30} />.
          </Typography>
        ) : (
          <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {cartItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${item.price.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => handleQuantityChange(item.id, -1)}
                      sx={{ minWidth: "30px" }}
                    >
                      -
                    </Button>
                    <Typography>{item.quantity || 1}</Typography>
                    <Button
                      variant="outlined"
                      onClick={() => handleQuantityChange(item.id, 1)}
                      sx={{ minWidth: "30px" }}
                    >
                      +
                    </Button>
                  </Box>
                  <IconButton
                    onClick={() => handleRemove(item.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">
                Total: <strong>${total.toFixed(2)}</strong>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

export default AddToCartPage;
