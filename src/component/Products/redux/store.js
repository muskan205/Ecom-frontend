import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice'

const store = configureStore({
    reducer:{
        products: productReducer,
        // carts: cartReducer
    },
});

export default store;


