import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router";

import { MdOutlineFingerprint } from "react-icons/md";
import "./Forgot-Email.css";

export const ForgotPassword=()=> {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const ResetPasswordEmail = async () => {
    debugger;
    if (loading) return; // prevent sending a new request if one is already in progress

    setLoading(true);
    try {
      // debugger;
      const response = await axios.post(
        "http://localhost:3004/api/forgetPAssword",
        { email }
      );
      localStorage.setItem("data", JSON.stringify(response.data.user.email));
      localStorage.setItem("id", JSON.stringify(response.data.user.id));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      if (response.status === 200) {
        setSuccessMessage("Email Verified");

        navigate("/verifyOtp");
        setError("");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  return (
    <div className="reset-password-container">
      <Button onClick={() => handleBackNavigation()}>go back</Button>
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
        <Box sx={{ height: "40px", border: "3px solid offwhite" }}>
          <MdOutlineFingerprint size={30} />
        </Box>
        <Typography variant="h5" component="h1" gutterBottom>
          Forgot Password ?
        </Typography>
        <Typography variant="body1" gutterBottom>
          No worries, we'll send you reset instructions.
        </Typography>
        <Typography
          variant="body1"
          sx={{ display: "flex", flexDirection: "end", marginLeft: "-350px" }}
        >
          Email
        </Typography>
        <TextField
          label="Email Address"
          variant="outlined"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
        {error && <Typography color="error">{error}</Typography>}
        {successMessage && (
          <Typography color="success">{successMessage}</Typography>
        )}
        <Button
          onClick={ResetPasswordEmail}
          variant="contained"
          sx={{
            backgroundColor: "#4F62FE",
            color: "white",
            padding: "10px 15px",
            textTransform: "none",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.5 : 1,
          }}
          fullWidth
          disabled={loading}
        >
          Reset Password
        </Button>
        <Box
          sx={{
            display: "flex",
            padding: "12px",
            gap: "8px",
            alignItems: "center",
          }}
          onClick={(e) => navigate("/login")}
        >
          <BsArrowLeft />
          <Typography sx={{ marginTop: "2px" }}>Back to login</Typography>
        </Box>
      </Box>
    </div>
  );
}
