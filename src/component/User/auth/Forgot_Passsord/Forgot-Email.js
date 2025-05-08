import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router";

import { MdOutlineFingerprint } from "react-icons/md";
import "./Forgot-Email.css";
import { useDispatch } from "react-redux";
import { forgetPassword } from '../../../../redux/auth.slice';

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const ResetPasswordEmail = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await dispatch(forgetPassword({ email })).unwrap();

      // localStorage.setItem("data", JSON.stringify(response.user.email));
      // localStorage.setItem("id", JSON.stringify(response.user.id));
      // localStorage.setItem("user", JSON.stringify(response.user));
      if (response) {
        setSuccessMessage("Email Verified");
        setError("");
        navigate("/verifyOtp", { state: { email: email } });
      }

    } catch (err) {
      console.error("Forget password error:", err);
      setError(err.message || "Something went wrong. Please try again.");
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
