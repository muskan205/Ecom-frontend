
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (formValues, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:3004/shop/create-category',
        formValues
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message); 
    }
  }
);

const initialState = {
  isLoading: false,
  category: null,
  error: null,
};

const retailerSlice = createSlice({
  name: 'retailer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload; 
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default retailerSlice.reducer;
