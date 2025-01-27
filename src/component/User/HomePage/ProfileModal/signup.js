import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Stack,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";

const SignupModal = ({ open, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user,setUser]=useState([])
  const navigate = useNavigate();
  useEffect(() => {
 
    // console.log("menu sbumneu", uniqueCategories);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    console.log("usernaem*********",user)
  }, []);

  

  const handleLogin = () => {
    navigate("/login");
    onClose();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ top: "9px", marginLeft: "1508px", height: "46%" }}
    >
      <DialogTitle sx={{ textAlign: "center", position: "", fontSize: "16px" }}>
        Profile
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "gray",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {user ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                alt={user.username}
                src={user.avatar}
                sx={{ width: 80, height: 80 }}
              />
            </Stack>
            <Typography variant="h6">{user.username}</Typography>
            <Typography variant="body2" color="textSecondary">
              {user.email}
            </Typography>
            <Box sx={{ marginTop: "20px", width: "100%" }}>
              <Button
                variant="outlined"
                sx={{ width: "100%", marginBottom: "10px" }}
              >
                View Profile
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor: "#4F62FE",
                  color: "black",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              top: "2px",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                alt="Dummy User"
                src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
                sx={{ width: 80, height: 80 }}
              />
            </Stack>

            <Box sx={{ marginTop: "20px", width: "100%" }}>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor: "#4F62FE",
                  color: "black",
                  marginBottom: "10px",
                }}
                onClick={handleLogin}
              >
                Log In /signup
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
