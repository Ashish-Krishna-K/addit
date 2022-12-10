import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from '../features/currentUser.js/currentUserSlice';

export default configureStore({
  reducer: {
    loggedInUser: currentUserReducer
  },
})