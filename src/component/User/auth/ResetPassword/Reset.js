import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MdOutlineLockReset } from "react-icons/md";
import {  BsArrowLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../../redux/auth.slice";

export const  Reset=() =>{
  const [data, setData] = useState({ password: "", confirmPassword: "" });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch=useDispatch()
 
const datafromUrl=useLocation()
const email=datafromUrl.state?.email
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleReset = () => {
    if (password !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }
  
    dispatch(updatePassword({ email, password, confirmPassword }))
      .unwrap()
      .then(() => {
        alert("Password changed successfully");
        setData({ password: "", confirmPassword: "" });
        navigate("/login");
      })
      .catch((error) => {
        alert(error.message || "Something went wrong");
      });
  };
  

  return (
    <div className="forgot-password-container">
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
          <MdOutlineLockReset size="2rem" />
        </Box>

        <Typography variant="h5" component="h1" gutterBottom>
          Set new Password
        </Typography>

        <Typography variant="body1" gutterBottom>
          Enter your new password below.
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ marginLeft: "-319px" }}>
          Password
        </Typography>
        <TextField
          name="password"
          label="New Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "20px" }}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="body1" gutterBottom sx={{ marginLeft: "-275px" }}>
          Confirm Password
        </Typography>

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "20px" }}
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          onClick={handleReset}
          variant="contained"
          sx={{
            backgroundColor: "#4F62FE",
            color: "white",
            padding: "10px 20px",
            textTransform: "none",
          }}
          fullWidth
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
          onClick={() => navigate("/login")}
        >
          <BsArrowLeft />
          <Typography>Back to login</Typography>
        </Box>
      </Box>
    </div>
  );
}
