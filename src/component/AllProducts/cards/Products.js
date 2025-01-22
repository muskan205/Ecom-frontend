import React, { Suspense, useEffect, useState } from "react";
import CustomCards from "../../Dashboard/Cards/ProductsCard";
// import Product from "../../All_Json/allProducts.json";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Product from "../../All_Json/allProducts.json";
import { Box } from "@mui/material";
import ProductCards from "./productsCard";
import { useNavigate } from "react-router";
// const Product = React.lazy(() => import("../../All_Json/allProducts.json"));

function AllProductsCards({setCartItemCount}) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const pageCount = Math.ceil(Product.length / itemsPerPage); // 4

  
  const currentItems = Product.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleProductClick = (item) => {
    console.log(item)
    localStorage.setItem("cart",item)
    navigate("/productDetails", { state: { product: item } });
  };
  return (
    <>
      
   
        <ProductCards isProduct={true} data={currentItems} onPRoductClick={handleProductClick} setCartItemCount={setCartItemCount}/>
     

      {/* Pagining  */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "23px",
          position: "fixed",
          marginLeft: "600px",
        }}
      >
        <Pagination
          data={currentItems}
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </>
  );
}

export default AllProductsCards;
