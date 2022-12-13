import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
    id: ''
};

const showReplyFormSlice = createSlice({
    name: 'replyForm',
    initialState,
    reducers: {
        replyButtonClicked: (state, action) => {
            return {
                show: !state.show,
                id: action.payload,
            }
        }
    }
})

export default showReplyFormSlice.reducer;
export const { replyButtonClicked } = showReplyFormSlice.actions;