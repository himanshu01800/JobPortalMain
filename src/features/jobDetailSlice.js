import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getJobs =createAsyncThunk("getJobs",
    async (args,{rejectWithValue})=>{
        try {
            const response = await fetch(`http://localhost:8080/Job/all`);
           console.log("Called")
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            const result = await response.json();
            console.log(result);
           
            return result; 
           
           
          } catch (error) {
            return rejectWithValue(error.message);
          }
    }


)

export const removeJob =createAsyncThunk("removeJob",
    async (id,{rejectWithValue})=>{
        try {
            const response = await fetch(`http://localhost:8080/Job/remove/${id}`,{
              method:"DELETE"
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


)

export const JobsDetail  =createSlice({
    name :"JobsDetail",
    initialState :{
       Jobs:[],
       loading:false,
       error:null
    },
    reducers:{

    },
    extraReducers : (builder)=>{
        builder
        .addCase(getJobs.pending, (state) => {
            state.loading = true;
          })
          .addCase(getJobs.fulfilled, (state, action) => {
            state.loading = false;
            state.Jobs=action.payload;
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
            
          })
          .addCase(removeJob.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
        }

});

export default JobsDetail.reducer;
