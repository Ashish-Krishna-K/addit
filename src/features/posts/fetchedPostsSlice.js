import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const fetchedPostsSlice = createSlice({
    name: 'fetchedPosts',
    initialState,
    reducers: {
        fetchedPostsFromDB: (state, action) => {
            const tempArray = action.payload.filter(post => state.every(item => item.postId !== post.postId))
            return state.concat(tempArray);
        },
        resetStateOnMount: (state) => {
            console.log('cleared state');
            return []
        }
    }
});

export default fetchedPostsSlice.reducer;
export const { fetchedPostsFromDB, resetStateOnMount } = fetchedPostsSlice.actions;