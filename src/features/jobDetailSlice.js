import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getJobs = createAsyncThunk("getJobs", async (args, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt'); // Retrieve the JWT token from local storage

    try {
        const response = await fetch(`http://localhost:8080/all`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const removeJob = createAsyncThunk("removeJob", async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from local storage

    try {
        const response = await fetch(`http://localhost:8080/company/remove/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const JobsDetail = createSlice({
    name: "JobsDetail",
    initialState: {
        jobs: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getJobs.pending, (state) => {
                state.loading = true;
            })
            .addCase(getJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(getJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeJob.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeJob.fulfilled, (state, action) => {
                state.loading = false;
                // Update state to remove the deleted job, if needed
                state.jobs = state.jobs.filter(job => job.id !== action.meta.arg);
            })
            .addCase(removeJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default JobsDetail.reducer;
