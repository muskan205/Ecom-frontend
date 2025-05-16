import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import {  CategoryRounded, ProductionQuantityLimitsOutlined } from "@mui/icons-material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  position: "absolute",
  top: "64px",
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const SellerHeader = () => {
  const [open, setOpen] = useState(false);
  const [menus, setMenus] = useState([
    {
      title: "Shop",
      icon: <StorefrontIcon />,
      items: [
        { text: "Create Shop", onClick: () => navigate("/create-shop") },
        { text: "List Shop", onClick: () => navigate("/shop-list") },
      ],
    },
    {
      title: "Sub Category",
      icon: <CategoryRounded/>,
      items: [
        { text: "Create SubCategory", onClick: () => navigate("/create-subcategory") },
        { text: "List SubCategory", onClick: () => navigate("/list-subcategory") },
      ],
    },
    {
      title: "Category", 
      icon:  <CategoryIcon />,
      items: [
        { text: "Create Category", onClick: () => navigate("/create-category") },
        { text: "List Category", onClick: () => navigate("/list-category") },
      ],
    },
    {
      title: "Products", 
      icon: <ProductionQuantityLimitsOutlined />,
      items: [
        { text: "Create Products", onClick: () => navigate("/create-product") },
        { text: "List Products", onClick: () => navigate("/list-product") },
      ],
    },
  ]);
  const [openMenu, setOpenMenu] = useState({});
  const navigate = useNavigate();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const toggleMenu = (index) => {
    setOpenMenu((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleLogin = () => {
    navigate("/login");
  };


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({});
    navigate("/login");
  };

  const [user, setUser] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    const data = localStorage.getItem("user");
    setUser(data ? JSON.parse(data) : {});
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Left Section*/}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ marginRight: 2, ...(open && { display: "none" }) }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ marginLeft: 1 }}>
                Seller Dashboard
              </Typography>
            </Box>

           
          </Toolbar>

         
            {/* Right Section: Close Drawer Icon */}
            <IconButton
              color="inherit"
              aria-label="close drawer"
              onClick={handleDrawerClose}
              edge="end"
              sx={{
                ...(open || { display: "none" }),
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          

          <Typography sx={{ marginLeft: "auto", alignSelf: "center" }}>
            <Box sx={{ display: "flex", marginLeft: "-150px" }}>
              {user ? (
                <>
                  {/* User is logged in */}
                  <IconButton onClick={handleMenuOpen}>
                    <Avatar>
                      {user.username && typeof user.username === "string"
                        ? user.username.charAt(0).toUpperCase()
                        : ""}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                  <Typography sx={{ marginLeft: "2px", alignSelf: "center" }}>
                    {user.username && typeof user.username === "string"
                      ? user.username.charAt(0).toUpperCase() +
                        user.username.slice(1).toLocaleLowerCase()
                      : ""}
                  </Typography>
                </>
              ) : (
                <>
                  {/* No user is logged in */}
                  <IconButton onClick={handleMenuOpen}>
                    <Avatar src="/broken-image.jpg" />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleLogin}>Login</MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Typography>
         
        </Box>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        {/* Dynamically render menus */}
        {menus.map((menu, index) => (
          <List key={index}>
            <ListItemButton onClick={() => toggleMenu(index)}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.title} />
              <ExpandMoreIcon />
            </ListItemButton>
            <Collapse in={openMenu[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {menu.items.map((item, itemIndex) => (
                  <ListItemButton key={itemIndex} sx={{ pl: 4 }} onClick={item.onClick}>
                    <ListItemIcon>
                      <AddCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
        ))}
      </Drawer>
    </Box>
  );
};
