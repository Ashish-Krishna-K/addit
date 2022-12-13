import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const showReplyFormSlice = createSlice({
    name: 'replyForm',
    initialState,
    reducers: {
        replyButtonClicked: (state) => !state
    }
})

export default showReplyFormSlice.reducer;
export const { replyButtonClicked } = showReplyFormSlice.actions;