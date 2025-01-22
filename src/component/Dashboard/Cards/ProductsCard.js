import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

export default function CustomCards({ height, data, isProduct }) {
  const handleAddToCart = (item) => {
    console.log("Added to Cart: ", item);
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
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 16px 32px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <CardActionArea>
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height={height}
                image={item.image}
                alt={item.name}
                sx={{
                  borderRadius: "8px 8px 0 0",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
              <CardContent sx={{ padding: "16px" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                  }}
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
    </Box>
  );
}
