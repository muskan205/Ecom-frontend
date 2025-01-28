import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
} from "@mui/material";
import { BsPersonFillCheck } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { ShoppingBag } from "@mui/icons-material";
import { useNavigate } from "react-router";
import categories from "../User/All_Json/NewJson.json";
import SignupModal from "../User/HomePage/ProfileModal/signup";
import { AdminHeader } from "../Admin/Dashboard";
import { SellerHeader } from "../Seller";
// import { SelllerHeader } from "../Seller/Dashboard";

const Navbar = ({ cartItemCount }) => {
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [showHoverDiv, setShowHoverDiv] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [signupOpen, setSignupOpen] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const uniqueSections = [...new Set(categories.map((cat) => cat.section))];
    setUniqueCategories(uniqueSections);
    // console.log("menu sbumneu", uniqueCategories);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({});
    navigate("/login");
  };

  return (
    <Box>
      <AppBar position="fixed" sx={{ backgroundColor: "#fff", color: "#333" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ flexGrow: 0 }}>
            <img src="N_Logo.jpg" alt="Logo" style={{ width: "100px" }} />
          </Typography>

          {user.role === "admin" ? (
            // Admin Layout
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Admin Dashboard
              </Typography>
              <IconButton onClick={handleLogout}>Logout</IconButton>
            </Box>
          ) : (
            // User Layout
            <>
              {/* Categories Div */}
              <Box
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

              {/* Right-side icons */}
              <Box sx={{ display: "flex", gap: "12px", marginLeft: "" }}>
                {user && (
                  <>
                    <Typography
                      variant="body1"
                      sx={{ color: "#4F62FE", cursor: "pointer" ,marginTop:"10px"}}
                      onClick={() => setSignupOpen(true)}
                    >
                      {user.username}
                    </Typography>

                    <Box>
                      <BsPersonFillCheck
                        size={24}
                        onClick={() => setSignupOpen(true)}
                        style={{ cursor: "pointer", color: "#4F62FE",marginTop:"10px" }}
                      />
                    </Box>
                  </>
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
                  onClick={() => navigate("/whislist")}
                  style={{ cursor: "pointer", color: "#4F62FE" ,marginTop:"10px"}}
                />
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      {user.role === "admin" && <AdminHeader />}
      {user.role === "seller" && <SellerHeader />}
      <SignupModal open={signupOpen} onClose={() => setSignupOpen(false)} />
    </Box>
  );
};

export { Navbar };
