import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk to handle user login
export const loginUser = createAsyncThunk(
  "loginUser",
  async (args, { rejectWithValue }) => {
    try {
      const { userId, password } = args;
      console.log(userId, password);
      
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: userId, password })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(response);
      
      // Store the JWT token in local storage
      if (result.token) {
        localStorage.setItem('jwtToken', result.token);
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice to manage user details state
export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    user: null,
    loading: false,
    error: null
  },
  reducers: {
    // Reducer to clear the user data (logout)
    logoutUser: (state) => {
      localStorage.removeItem('jwtToken'); // Remove the token from local storage
      state.user = null; // Reset the user state to null
      state.error = null; // Optionally, clear any errors
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});
export const { logoutUser } = userDetail.actions;
export default userDetail.reducer;
