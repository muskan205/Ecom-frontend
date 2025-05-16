
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


export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async (_, thunkAPI) => {
    try {
      debugger
      const response = await axios.get('http://localhost:3004/shop/get-category');
      const categories = response.data.result.shops.map((shop) => ({
        id: shop.id,
        CategoryName: shop.categoryName,
      }));
      console.log("categories", categories)
      return categories;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch categories');
    }
  }
);

export const createSubCategory = createAsyncThunk(
  'subcategory/createSubCategory',
  async (formValues, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:3004/shop/create-subCategory',
        {
          categoryId: formValues.categoryId,
          subCategoryName: formValues.subCategoryName,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete('http://localhost:3004/shop/delete-category-id', {
        data: { id },
      });
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to delete category');
    }
  }
);
const initialState = {
  isLoading: false,
  categories: [],
  category: null,
  error: null,
};


const retailerSlice = createSlice({
  name: 'retailer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Category
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
        state.error = action.payload;
      })

      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter((cat) => cat.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create SubCategory
      .addCase(createSubCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally update state if needed
      })
      .addCase(createSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      ;
  }

});

export default retailerSlice.reducer;
