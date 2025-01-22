import React, { useState, useEffect } from "react";
import ProductCards from "../cards/productsCard";
import { Box, Typography } from "@mui/material";

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Get the wishlist from localStorage
    const items = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(Array.isArray(items) ? items : [items]);
    console.log("&**************", wishlist);
  }, []);

  return (
    <div>
      <Typography
        sx={{
          textAlign: "center",
          marginTop: "84px",
          textDecoration: "underline",
          fontSize: "20px",
          padding: "4px",
        }}
      >
        Your whislist
      </Typography>
      {wishlist.length === 0 ? (
        <Typography sx={{ textAlign: "center" }}>
          Your whislist is empty
        </Typography>
      ) : (
        <>
          <Box sx={{ padding: "2px" }}>
            <ProductCards
              data={wishlist}
              isProduct={true}
              oPRoductClick={() => {}}
            />
          </Box>
        </>
      )}
    </div>
  );
}

export default WishlistPage;
