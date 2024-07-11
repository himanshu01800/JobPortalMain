import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Function to get the JWT token from local storage
const getToken = () => localStorage.getItem('jwtToken');

export const getEmployerProfile = createAsyncThunk(
  "profileDetail/getEmployerProfile",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:8080/company/profile/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
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

export const getJobSeekerProfile = createAsyncThunk(
  "profileDetail/getJobSeekerProfile",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      console.log(token);
      const response = await fetch(`http://localhost:8080/jobseeker/profile/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
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

export const postEmployerProfile = createAsyncThunk(
  "profileDetail/postEmployerProfile",
  async (args, { rejectWithValue }) => {
    const { id, formData } = args;
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:8080/company/profile/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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

export const postJobSeekerProfile = createAsyncThunk(
  "profileDetail/postJobSeekerProfile",
  async (args, { rejectWithValue }) => {
    const { id, formData } = args;
    try {
      const token = localStorage.getItem("jwtToken")
      console.log(token)
      const response = await fetch(`http://localhost:8080/jobseeker/profile/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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
      })
      .addCase(postJobSeekerProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(postJobSeekerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(postJobSeekerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getJobSeekerProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobSeekerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getJobSeekerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default profileDetail.reducer;
