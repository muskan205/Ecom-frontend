import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice'
import sellerReducer from './seller.slice'
import authReducer from './auth.slice'

const store = configureStore({
    reducer:{
        products: productReducer,
        sellers: sellerReducer,
        auth:authReducer
    },
});

export default store;


