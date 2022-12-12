import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from '../features/currentUser/currentUserSlice';
import fetchedPostsReducer from '../features/posts/fetchedPostsSlice';

export default configureStore({
  reducer: {
    loggedInUser: currentUserReducer,
    fetchedPosts: fetchedPostsReducer,
  },
})