import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { CgProfile } from "react-icons/cg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router";

import CommonSnackbar from "../../../common/Toaster/SuccessToaster";

export const SignIn=()=> {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  const login = async () => {
    let isValid = true;
    let errors = {};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (user.email ==="") {
      isValid = false;
      errors.email = "email is required";
    }

    if (user.email.trim() === "") {
      isValid = false;
      errors.email = "email is required";
    } else if (!emailRegex.test(user.email)) {
      isValid = false;
      errors.email = "Please enter a valid email address";
    }

    if (user.password === "") {
      isValid = false;
      errors.password = "Password is required";
    }

    setError(errors);

    if (!isValid) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3004/api/login",
        user
      );
      // console.log(response.data, "***********");
      // console.log("respose***********", response.data.account.role);

      if (response.status === 200) {
        setSnackbarState({
          open: true,
          message: "Logged in successfully!",
          severity: "success",
        });

        localStorage.setItem("user", JSON.stringify(response.data));

        if (response.data.account.role === "admin") {
          navigate("/admin-dashboard");
        }
        else if (response.data.account.role === "seller") {
          navigate("/seller-dashboard");
        }
        setUser({ email: "", password: "" });
        if (response.data.role === "user") {
          setTimeout(() => {
            navigate("/product");
          }, 1000);
        }
        // Delay navigation to allow snackbar to display
      }
    } catch (err) {
      setSnackbarState({
        open: true,
        message: "Invalid Credentails!",
        severity: "Fail",
      });
    }
  };

  const setInputData = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const tooglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <div className="Login-Main-div">
        <div className="img-container">
          <img src="/N_Logo.jpg" alt="/img not found" />
        </div>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CgProfile size="2em" />
        </Box>
        <h2 style={{ position: "relative", left: "80px" }}>
          Log In to Your Account
        </h2>
        <p style={{ marginLeft: "55px", marginTop: "-14px" }}>
          Welcome Back Log In to Continue Shopping
        </p>
        <div className="text-field">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "350px",
              gap: "10px",
              marginTop: "4px",
            }}
          >
            <TextField
              error={!!errors.email}
              helperText={errors.email}
              name="email"
              onChange={setInputData}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={user.email}
            />

            <TextField
              error={!!errors.password}
              helperText={errors.password}
              name="password"
              onChange={setInputData}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type={showPassword ? "password" : "type"}
              value={user.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={tooglePassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              sx={{ background: "#4F62FE", color: "black" }}
              variant="contained"
              onClick={login}
            >
              Log In
            </Button>
            <CommonSnackbar
              open={snackbarState.open}
              message={snackbarState.message}
              severity={snackbarState.severity}
              onClose={handleSnackbarClose}
            />
            <p style={{ marginLeft: "100px", marginTop: "8px" }}>
              <a style={{ textDecoration: "none" }} href="/forgot-password">
                Forget Password ?
              </a>
            </p>

            <p style={{ marginLeft: "55px", marginTop: "3px" }} className="">
              Don't have an account ?{" "}
              <a style={{ textDecoration: "none", color: "" }} href="/register">
                Sign Up
              </a>
            </p>
            <div className="divider">
              <hr className="line" />
              <span>OR</span>
              <hr className="line" />
            </div>
            <button className="social-button">
              <img src="google.png" alt="." width="30px" /> Log in with Google
            </button>
            <button className="social-button">
              <img src="facebook.png" width="30px" alt=""/> Log in with Facebook
            </button>
            <button className="social-button">
              <img src="twitter.png" alt="." width="30px" /> Log in with Twitter
            </button>
          </Box>
        </div>
      </div>
    </div>
  );
}
