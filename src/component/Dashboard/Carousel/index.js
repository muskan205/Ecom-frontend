import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import caseStudies from "../../All_Json/crousel.json";

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "70vh",
  overflow: "hidden",
}));

const SlideContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  marginTop: "23px",
  height: "100%",
  transition: "transform 0.5s ease-in-out",
}));

const SlideContent = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  marginTop: "23px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(4),
  color: "#fff",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6))",
    zIndex: 1,
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  maxWidth: "600px",
  margin: "0 auto",
  textAlign: "center",
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 3,
  color: "#fff",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-50%) scale(1.1)",
  },
}));

const CaseStudyCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % caseStudies.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + caseStudies.length) % caseStudies.length
    );
  }, []);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(autoSlide);
  }, [nextSlide]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nextSlide, prevSlide]);

  return (
    <>
      <CarouselContainer role="region" aria-label="Case Studies Carousel">
        {caseStudies.map((study, index) => (
          <SlideContainer
            key={index}
            sx={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              display: Math.abs(currentSlide - index) <= 1 ? "block" : "none",
            }}
          >
            <SlideContent
              sx={{
                backgroundImage: `url(${study.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <TextContent>
                <Typography
                  variant={isMobile ? "h4" : "h3"}
                  component="h2"
                  fontSize="2rem"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  {study.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: isMobile ? "1rem" : "1.2rem",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                  }}
                >
                  {study.description}
                </Typography>
              </TextContent>
            </SlideContent>
          </SlideContainer>
        ))}

        <NavigationButton
          onClick={prevSlide}
          sx={{ left: theme.spacing(2) }}
          aria-label="Previous case study"
        >
          <BsArrowLeftCircleFill size={isMobile ? 32 : 48} />
        </NavigationButton>

        <NavigationButton
          onClick={nextSlide}
          sx={{ right: theme.spacing(2) }}
          aria-label="Next case study"
        >
          <BsArrowRightCircleFill size={isMobile ? 32 : 48} />
        </NavigationButton>
      </CarouselContainer>

      <Box sx={{ display: "flex", justifyContent: "center", gap: "8px", mt: 2 }}>
        {caseStudies.map((_, index) => (
          <Box
            key={index}
            sx={{
              height: "10px",
              width: "10px",
              border: "2px solid black",
              borderRadius: "50%",
              backgroundColor: currentSlide === index ? "black" : "transparent",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => setCurrentSlide(index)} 
            aria-label={`Slide ${index + 1}`} 
          />
        ))}
      </Box>
    </>
  );
};

export default CaseStudyCarousel;
