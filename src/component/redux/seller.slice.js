// sellerSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch sellers
export const fetchSellers = createAsyncThunk(
  "seller/fetchSellers",
  async () => {
    const response = await axios.get("http://localhost:3004/seller/get-all-seller");

   
    return response.data.seller.map((item) => ({
      id: item.seller.id, 
      username: item.seller.username,
      shopName: item.seller.shopName, 
      accountId: item.seller.accountId, 
      email: item.email, 
      role:item.role,
      createdAt: item.seller.createdAt,
    }));        
  }
);

export const deleteSeller = createAsyncThunk(
  "sellers/deleteSeller",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:3004/seller/delete-sellers/${id}`);
      return id; // Return the deleted ID to update UI
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete seller");
    }
  }
);

export const updateSeller = createAsyncThunk(
  "sellers/updateSeller",
  async ({ id, updatedFields }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3004/seller/update-seller`,
        updatedFields
      );
      return { id, updatedFields: response.data }; // You can also just use `updatedFields`
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update seller");
    }
  }
);


// Slice definition
const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    sellers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.sellers = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default sellerSlice.reducer;
