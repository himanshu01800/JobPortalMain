import { configureStore } from '@reduxjs/toolkit';
import userDetailReducer from '../features/userDetailSlice';
import profileDetailReducer from '../features/profileDetailSlice';


const store = configureStore({
  reducer: {
   userDetail:userDetailReducer, 
   profileDetail:profileDetailReducer,
  },
});

export default store;