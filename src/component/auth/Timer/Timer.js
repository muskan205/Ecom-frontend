import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(60);
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId); // Cleanup the interval
    }
  }, [timeLeft]);

  // Convert timeLeft (in seconds) to hours, minutes, and seconds
  const formatTime = (totalSeconds) => {
    const days = Math.floor(totalSeconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      days: days.toString().padStart(2, 0),
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds, days } = formatTime(timeLeft);

  return (
    <>
    {/* <Box>
        <Button>Resend otp</Button>
      </Box> */}
    <Box
      sx={{
        display: "flex",
        color: "#1976d2",
        marginLeft: "5px",
        color: "red",
      }}
    >
      
      <Typography>{days}:</Typography>
      <Typography>{hours}:</Typography>
      <Typography>{minutes}:</Typography>
      <Typography>{seconds}:</Typography>
    </Box>
    
    </>

    
  );
}

export default CountdownTimer;
