import React, { useEffect, useRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { IoMailOpenOutline } from "react-icons/io5";
import {  useNavigate } from "react-router";
import { BsArrowLeft } from "react-icons/bs";
import CountdownTimer from "../Timer/Timer";
import axios from "axios";

export const focusInput = (inputs, index) => {
  if (inputs[index]?.current) {
    inputs[index].current.focus();
  }
};

export const handleKeyDown = (inputs, index, e) => {
  if (e.key === "ArrowLeft" && index > 0) {
    focusInput(inputs, index - 1);
  } else if (e.key === "ArrowRight" && index < inputs.length - 1) {
    focusInput(inputs, index + 1);
  }

  if (e.key === "Backspace" && index > 0) {
    e.preventDefault();
    inputs[index].current.value = "";
    focusInput(inputs, index - 1);
  }
};

export default function VerifyOtp() {
  const [otp1, setOtp1] = useState();
  const [otp2, setOtp2] = useState();
  const [otp3, setOtp3] = useState();
  const [otp4, setOtp4] = useState();
  const [otp, setOtp] = useState([""]);

  const navigate = useNavigate();
  const otpRef1 = useRef();
  const otpRef2 = useRef();
  const otpRef3 = useRef();
  const otpRef4 = useRef();
  const TextFieldRef = [otpRef1, otpRef2, otpRef3, otpRef4];
  let otpArray = [otp1, otp2, otp3, otp4];
  otpArray = otp;
  useEffect(() => {
    // Focus on the first input when the page loads
    focusInput(TextFieldRef, 0);
  }, []);

  const inputChange = (e, index) => {
    const value = e.target.value;
    if (value && index < TextFieldRef.length - 1) {
      focusInput(TextFieldRef, index + 1);
    }
    // otpArray[index].(e.target.value)
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmit = async (e) => {
    // Combine the OTP values into a single string
    const otpValue = otp.join("");

    if (otpValue.length !== 4) {
      alert("Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3004/api/verifyOtp",

        // sending otp in body
        { otp: otpValue }
      );

      console.log(response.data.message);
      if (response.status === 200) {
        alert("OTP verified successfully");
        console.log(response.data);
        navigate("/reset-password");
      }
    } catch (err) {
      console.log("Error", err.response?.data || err.message);
      alert("Invalid OTP or request failed");
    }
  };

  const handleResendOtp = async () => {
    debugger;
    try {
      // Retrieve user data from localStorage
      const storedData = JSON.parse(localStorage.getItem("data"));
      const email = storedData?.email; // Extract email

      console.log("Email:", email);
      console.log("Stored Data:", storedData);

      if (!storedData) {
        alert("User data not found. Please try again.");
        return;
      }

      // Make API call to resend OTP directly using the email from local storage
      const response = await axios.post(
        "http://localhost:3004/api/forgetPAssword",
        { email: storedData } // directly use the email from local storage in the request body
      );

      if (response.status === 200) {
        alert("OTP sent successfully");
        // navigate("/reset-password");
      }
    } catch (err) {
      console.error("Error:", err.response?.data?.message || err.message);
      alert("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="reset-password-container">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "400px",
          margin: "50px auto",
          padding: "30px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
        }}
      >
        <Box>
          <IoMailOpenOutline size="2rem" />
        </Box>
        <Typography variant="h5" sx={{ fontSize: "1.2rem" }} gutterBottom>
          Password reset
        </Typography>
        <Typography variant="body1" gutterBottom>
          We sent a code to
        </Typography>

        <Box>
          <CountdownTimer />
        </Box>
        <Box sx={{ display: "flex", gap: "4px", marginTop: "2px" }}>
          {TextFieldRef.map((ref, index) => (
            <TextField
              required
              key={index}
              inputRef={ref}
              variant="outlined"
              type="number"
              //   onClick={() => focusInput(TextFieldRef, index)}
              onChange={(e) => inputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(TextFieldRef, index, e)}
              onInput={(e) => {
                // Allow only one digit
                if (e.target.value.length > 1) {
                  e.target.value = e.target.value.slice(0, 1);
                }
              }}
              sx={{
                width: "50px",
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
            />
          ))}
        </Box>
        <Box sx={{ display: "flex", gap: "8px" }}>
          <Button
            onClick={(e) => handleSubmit()}
            variant="contained"
            sx={{
              backgroundColor: "#4F62FE",
              color: "white",
              padding: "10px 15px",
              textTransform: "none",
              width: "105px",
              marginTop: "20px",
            }}
          >
            Verify Otp
          </Button>

          <Button
            onClick={(e) => handleResendOtp()}
            variant="contained"
            sx={{
              backgroundColor: "#4F62FE",
              color: "white",
              padding: "10px 15px",
              textTransform: "none",
              width: "105px",
              marginTop: "20px",
            }}
          >
            Resend
          </Button>
        </Box>

        {/* <Box sx={{ display: "flex", padding: "23px", gap: "2px" }}>
          <Typography>Didn't receive OTP?</Typography>
          <Box sx={{ marginLeft: "-110px", padding: "12px" }}>
            {/* <Typography>Resend otp in:</Typography> */}

        {/* </Box> */}
        {/* </Box> */}

        <Box
          sx={{
            display: "flex",
            padding: "12px",
            gap: "8px",
            alignItems: "center",
          }}
          onClick={() => navigate("/")}
        >
          <BsArrowLeft />
          <Typography>Back to login</Typography>
        </Box>
      </Box>
    </div>
  );
}
