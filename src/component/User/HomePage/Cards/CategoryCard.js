import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Box } from "@mui/material";
import Category from "../../All_Json/Category.json";

export default function CategoryCard({ height }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      {Category.map((item, index) => (
        <Card
          key={index}
          sx={{
            width: "300px",
            borderRadius: "8px",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            position: "relative",
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
              {/* Image */}
              <CardMedia
                component="img"
                height={height}
                image={item.image}
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
                    // transform: "scale(1.5)"
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    // fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {item.description}
                </Typography>
                
              </Box>
            </Box>

            {/* Card Content */}
            <CardContent sx={{ padding: "16px" }}>
              {/* Extra content if needed */} <Typography
                  variant="h6"
                  sx={{
                    // fontWeight: "bold",
                    fontSize:"14px",
                    textAlign: "center",
                  }}
                >
                  {item.categoryName}
                </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
