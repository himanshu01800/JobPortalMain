import { configureStore } from '@reduxjs/toolkit';
import userDetailReducer from '../features/userDetailSlice';
import profileDetailReducer from '../features/profileDetailSlice';
import jobDetailReducer from '../features/jobDetailSlice'


const store = configureStore({
  reducer: {
   userDetail:userDetailReducer, 
   profileDetail:profileDetailReducer,
   jobDetail:jobDetailReducer,
  },
});

export default store;