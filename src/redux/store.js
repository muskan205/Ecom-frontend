import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice'
import sellerReducer from './admin.slice'
import authReducer from './auth.slice'
import retailerReducer from './seller.slice'

const store = configureStore({
    reducer:{
        products: productReducer,
        sellers: sellerReducer,
        auth:authReducer,
        retailer:retailerReducer
    },
});

export default store;


