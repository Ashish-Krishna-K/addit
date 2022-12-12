import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const fetchedPostsSlice = createSlice({
    name: 'fetchedPosts',
    initialState,
    reducers: {
        fetchedPostsFromDB: (state, action) => {
            action.payload.forEach(post => {
                if (state.every(item => item.postId !== post.postId)) {
                    state.push(post);
                }
            })
        }
    }
});

export default fetchedPostsSlice.reducer;
export const { fetchedPostsFromDB } = fetchedPostsSlice.actions;