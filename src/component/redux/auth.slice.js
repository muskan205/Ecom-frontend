// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Register user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3004/api/register', userData);
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message: 'Something went wrong' });
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3004/api/login', userData);
      localStorage.setItem('token', response.data.token); // Store token if needed
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message: 'Something went wrong' });
    }
  }
);

// Forget password
export const forgetPassword = createAsyncThunk(
  'auth/forgetPassword',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3004/api/forgetPassword', userData);
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message: 'Something went wrong' });
    }
  }
);

export const verifyOtp= createAsyncThunk(
    'auth/verifyOtp',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:3004/api/verifyOtp', userData);
        return response.data;
      } catch (err) {
        if (err.response && err.response.data) {
          return rejectWithValue(err.response.data);
        }
        return rejectWithValue({ message: 'Something went wrong' });
      }
    }
  );
  
// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    user: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Forget Password
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify Otp  
      .addCase(verifyOtp.pending, (state) => { // Corrected to verifyOtp
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => { // Corrected to verifyOtp
        state.loading = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {  // Corrected to verifyOtp
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
