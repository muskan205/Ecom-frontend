import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Box } from "@mui/material";
import Category from "../../All_Json/BeautyOffers.json"; // Ensure the correct path

export default function BeautyOffersCard({ height = "200px" }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      {Category.categories.map((category, index) => (
        <Card
          key={index}
          sx={{
            width: "300px",
            borderRadius: "8px",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            position: "relative",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <CardActionArea>
            {/* Image Container */}
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Image from first product in the category */}
              <CardMedia
                component="img"
                height={height}
                image={category.subcategories[0].products[0].image} // Get the image from the first product
                alt={category.categoryName}
                sx={{
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />

              {/* Overlay Description */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "0 16px",
                    fontSize: "16px",
                  }}
                >
                  {category.description}
                </Typography>
              </Box>
            </Box>

            {/* Card Content */}
            <CardContent sx={{ padding: "16px", textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginBottom: "8px",
                }}
              >
                {category.categoryName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "14px",
                  color: "rgba(0, 0, 0, 0.6)",
                }}
              >
                {category.subcategories.length} Subcategories
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
