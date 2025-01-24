import React, { useEffect, useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
} from "@mui/material";
import categories from "../../user/All_Json/NewJson.json";
import { BsPersonFillCheck } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from "react-router";
import SignupModal from "../../user/Dashboard/ProfileModal/signup";
import { ShoppingBag } from "@mui/icons-material";

const Navbar = ({ cartItemCount }) => {
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [showHoverDiv, setShowHoverDiv] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();
  const [signupOpen, setSignupOpen] = useState(false);
  const [user, setUser] = useState([]);

  const categoriesDeivRef = useRef(null);

  const handleCategoryClick = (categoryName) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryName);
    }
  };

  const handleHover = (categoryName) => {
    setShowHoverDiv(true);
    setActiveCategory(categoryName);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoriesDeivRef.current &&
        !categoriesDeivRef.current.contains(event.target)
      ) {
        setShowHoverDiv(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const uniqueSections = [...new Set(categories.map((cat) => cat.section))];
    setUniqueCategories(uniqueSections);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set the user data from localStorage
    }
    console.log("Logged in user", user.username);
  }, []);

  console.log("cartItemCount---------------", cartItemCount);

  return (
    <Box onClick={() => setShowHoverDiv(false)}>
      <AppBar position="fixed" sx={{ backgroundColor: "#fff", color: "#333" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            <img
              src="N_Logo.jpg"
              alt="user.username"
              style={{ width: "100px" }}
            />
          </Typography>

          {/* Categories Box */}
          <Box
            ref={categoriesDeivRef} // Attach the ref here
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            {uniqueCategories.map((category) => (
              <Typography
                key={category}
                onMouseEnter={() => handleHover(category)}
                onClick={() => handleCategoryClick(category)}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  borderBottom:
                    activeCategory === category ? "1px solid #8e71c7" : "",
                  padding: "5px 10px",
                }}
              >
                {category ? category.toUpperCase() : category}
              </Typography>
            ))}
          </Box>

          {/* Right-side icons */}
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              marginLeft: "auto",
              alignItems: "center",
            }}
          >
            {/* <BsPersonFillCheck
              size={24}
              onClick={() => setSignupOpen(true)}
              style={{ cursor: "pointer", color: "#4F62FE" }}
            /> */}

            {user ? (
              <>
                <Typography
                  variant="body1"
                  sx={{ color: "#4F62FE", cursor: "pointer" }}
                  onClick={() => setSignupOpen(true)}
                >
                  {user.username}
                </Typography>
              </>
            ) : (
              <BsPersonFillCheck
                size={24}
                onClick={() => setSignupOpen(true)}
                style={{ cursor: "pointer", color: "#4F62FE" }}
              />
            )}
            <IconButton
              aria-label="cart"
              style={{ cursor: "pointer", color: "#4F62FE" }}
              onClick={() => navigate("/cart")}
            >
              <Badge badgeContent={cartItemCount} color="primary">
                <ShoppingBag />
              </Badge>
            </IconButton>
            <CiHeart
              size={24}
              // style={{ cursor: "pointer", color: "#4F62FE" }}
              onClick={() => navigate("/whislist")}
              style={{ cursor: "pointer", color: "#4F62FE" }}
            />
          </Box>
        </Toolbar>

        {showHoverDiv && activeCategory && (
          <Box
            sx={{
              position: "absolute",
              width: "785px",
              height: "280px",
              maxHeight: "300px",
              gap: "100px",
              top: 70,
              left: "500px",
              display: "flex",
              backgroundColor: "#fff",
              overflow: "auto",
              p: 2,
            }}
          >
            {categories
              .find((cat) => cat.section === activeCategory)
              ?.subcategories.map((sub) => (
                <Box key={sub.subId}>
                  <Typography
                    sx={{
                      fontWeight: "100",
                      mb: 1,
                      color: "#8e71c7",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    {sub.name}
                  </Typography>
                  <hr />
                  {sub.products.map((product) => (
                    <Typography
                      key={product.productId}
                      sx={{
                        fontSize: "13px",
                        cursor: "pointer",
                        padding: "10px",
                      }}
                    >
                      {product.name}
                    </Typography>
                  ))}
                </Box>
              ))}
          </Box>
        )}
      </AppBar>
      <SignupModal open={signupOpen} onClose={() => setSignupOpen(false)} />
    </Box>
  );
};

export default Navbar;
