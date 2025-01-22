import React, { useState } from "react";
import { Button, Badge, IconButton, Card, CardContent, Typography } from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";

const Product = ({ product, onAddToCart }) => {
  return (
    <Card style={{ margin: 20, width: 150, textAlign: "center" }}>
      <img src={product.image} alt={product.name} width="100%" />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography>${product.price}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onAddToCart(product)}
          style={{ marginTop: 10 }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

const FlyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [flyingItem, setFlyingItem] = useState(null);

  const products = [
    { id: 1, name: "Product 1", price: 29.99, image: "/path/to/product1.jpg" },
    { id: 2, name: "Product 2", price: 49.99, image: "/path/to/product2.jpg" },
  ];

  const handleAddToCart = (product) => {
    setFlyingItem(product);
    setTimeout(() => {
      setCartItems((prev) => [...prev, product]);
      setFlyingItem(null);
    }, 1000); // Wait for the animation to complete
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Cart Icon */}
      <IconButton
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          fontSize: 40,
        }}
      >
        <Badge badgeContent={cartItems.length} color="primary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      {/* Product List */}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 80 }}>
        {products.map((product) => (
          <Product key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>

      {/* Fly to Cart Animation */}
      {flyingItem && (
        <div
          className="fly-item"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            animation: "fly-to-cart 1s ease-out forwards",
          }}
        >
          <img
            src={flyingItem.image}
            alt={flyingItem.name}
            style={{
              width: 50,
              height: "auto",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </div>
      )}

      {/* CSS Animation */}
      <style>
        {`
          @keyframes fly-to-cart {
            0% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
            50% {
              transform: translate(100px, -300px) scale(0.8);
              opacity: 0.7;
            }
            100% {
              transform: translate(100px, -300px) scale(0.5);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default FlyCart;
