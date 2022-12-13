import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const fetchedCommentsSlice = createSlice({
    name: 'fetchedComments',
    initialState,
    reducers: {
        fetchedCommentsFromDB: (state, action) => {
            action.payload.forEach(reply => {
                if (state.every(item => item.replyId !== reply.replyId)) {
                    state.push(reply);
                    console.log(state);
                }
            })
        }
    }
});

export default fetchedCommentsSlice.reducer;
export const { fetchedCommentsFromDB } = fetchedCommentsSlice.actions;