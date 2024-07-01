import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser =createAsyncThunk("loginUser",
    async (args,{rejectWithValue})=>{
        try {
            const {userId,password}=args;
            console.log(userId,password)
            const response = await fetch(`http://localhost:8080/users/login?email=${userId}&password=${password}`);
      
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

export const userDetail =createSlice({
    name :"userDetail",
    initialState :{
       user:null,
       loading:false,
       error:null
    },
    reducers:{

    },
    extraReducers : (builder)=>{
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user=action.payload;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
        }

});

export default userDetail.reducer;
