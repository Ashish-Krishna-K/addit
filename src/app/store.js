import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from '../features/currentUser/currentUserSlice';
import fetchedPostsReducer from '../features/posts/fetchedPostsSlice';
import showReplyFormReducer from '../features/comments/showReplyFormSlice';

export default configureStore({
  reducer: {
    loggedInUser: currentUserReducer,
    fetchedPosts: fetchedPostsReducer,
    showReplyForm: showReplyFormReducer,
  },
})