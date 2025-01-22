import { ArrowBackIosNew, ArrowDownward } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

function MustHave() {
  // State to control the carousel slide
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "https://cdn.pixabay.com/photo/2010/12/13/10/34/cinnamon-sticks-2926_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/11/02/16/55/cinnamon-stick-514243_640.jpg",
    "https://cdn.pixabay.com/photo/2019/12/25/17/55/cinnamon-roll-4719023_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/01/11/11/03/cinnamon-1971496_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/10/31/14/51/anise-2905495_960_720.jpg",
    "https://cdn.pixabay.com/photo/2019/12/06/12/05/weihnachtstee-4677221_1280.jpg",
  ];

  const cardsPerSlide = 5; // Change to 5 cards per slide

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide + 1) % Math.ceil(images.length / cardsPerSlide)
    );
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) =>
        (prevSlide - 1 + Math.ceil(images.length / cardsPerSlide)) %
        Math.ceil(images.length / cardsPerSlide)
    );
  };

  return (
   <>
   
   <Box
      sx={{
        height: "700px",
        width: "100%",
        color: "black",
        backgroundColor: "pink",
        borderRadius: "3px",
        marginTop: "51px",
        position: "relative",
        padding: "20px",
      }}
    >
      <Typography
        sx={{
          fontSize: "52px",
          display: "flex",
          marginLeft: "112px",
          fontFamily: "cursive",
        }}
      >
        R
        <span
          style={{
            display: "inline-block",
            transform: "rotate(10deg)",
            fontSize: "inherit",
            fontWeight: "bold",
          }}
        >
          E
        </span>
        D
      </Typography>
      <Typography sx={{ marginLeft: "112px" }}>
        Luxury brands for you
      </Typography>
      <Typography sx={{ marginLeft: "112px", marginTop: "22px" }}>
        Discover Click Shop <MdKeyboardArrowRight />
      </Typography>
      <Box
        sx={{
          position: "absolute",
          float: "right",
          marginLeft: "1450px",
          marginTop: "-186px",
          borderRadius: "13px",
          overflow: "hidden",
        }}
      >
        <img
          src="https://cdn.pixabay.com/photo/2015/04/24/20/58/girl-738303_960_720.jpg"
          height="300px"
          width="240px"
          style={{
            borderRadius: "15px",
            marginTop: "5px",
          }}
        />
      </Box>
      <Typography
        sx={{
          marginLeft: "112px",
          marginTop: "30px",
          fontSize: "23px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        More on trends
      </Typography>

      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          width: "1255px",
          marginLeft: "81px",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {images
            .slice(
              currentSlide * cardsPerSlide,
              currentSlide * cardsPerSlide + cardsPerSlide
            )
            .map((image, index) => (
              <Grid item xs={12} sm={6} md={2.4} key={index}>
                {" "}
                {/* 2.4 = 5 cards per row */}
                <Card sx={{ borderRadius: "15px", overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={image}
                    alt={`Trend Image ${index + 1}`}
                    sx={{ borderRadius: "15px" }}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Trend {currentSlide * cardsPerSlide + index + 1}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "10px",
            zIndex: 1,
            marginTop:"90px",
            marginLeft:"44px",
            height: "40px",
            width: "40px",
            backgroundColor: "#f50057", // Pink shade
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
            cursor: "pointer",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)", // Slight zoom on hover
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // Enhance shadow on hover
            },
          }}
        >
          <Button
            onClick={prevSlide}
            sx={{
              color: "#fff",
              fontSize: "20px",
              minWidth: "auto", // Removes default button padding
              padding: 0,
            }}
          >
            <FaAngleLeft />
          </Button>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "50%",
          marginLeft:"1318px",
            zIndex: 1,
            height: "40px",
            width: "40px",
            backgroundColor: "#f50057", // Pink shade
            marginTop:"90px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
            cursor: "pointer",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)", // Slight zoom on hover
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // Enhance shadow on hover
            },
          }}
        >
          <Button
            onClick={nextSlide}
            sx={{
              color: "#fff",
              fontSize: "20px",
              minWidth: "auto", // Removes default button padding
              padding: 0,
            }}
          >
            <FaAngleRight/>
          </Button>
        </Box>

        {/* Carousel Navigation */}
      </Box>
    </Box>

   
   
   </>
  );
}

export default MustHave;
