import { configureStore } from '@reduxjs/toolkit';
import userDetailReducer from '../features/userDetailSlice';
import profileDetailReducer from '../features/profileDetailSlice';
import JobsDetailReducer from '../features/jobDetailSlice'
import userListDetailReducer from '../features/userListDetailSlice'


const store = configureStore({
  reducer: {
   userDetail:userDetailReducer, 
   profileDetail:profileDetailReducer,
   JobsDetail:JobsDetailReducer,
   userListDetail:userListDetailReducer
  },
});

export default store;