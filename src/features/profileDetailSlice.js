import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getEmployerProfile = createAsyncThunk(
  "profileDetail/getEmployerProfile",
  async (id, { rejectWithValue }) => {
    try {
  
      console.log(id);
      const response = await fetch(`http://localhost:8080/Profiles/employerProfile/${id}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      return result; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postEmployerProfile = createAsyncThunk(
  "profileDetail/postEmployerProfile",
  async (args, { rejectWithValue }) => {
    const {id,formData}=args;
    console.log(formData);
    try {
      const response = await fetch(`http://localhost:8080/Profiles/employer/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const profileDetail = createSlice({
  name: "profileDetail",
  initialState: {
    profile: null,
    loading: false,
    error: null
  },
  reducers: {
    // You can add reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployerProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getEmployerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postEmployerProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(postEmployerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(postEmployerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileDetail.reducer;
