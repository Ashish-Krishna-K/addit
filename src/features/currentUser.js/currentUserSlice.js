import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    displayName: null,
    email: null,
    photoURL: null,
    uid: null
}

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            (action.payload === null) ? 
            state = Object.assign(state, initialState) :
            state = Object.assign(state, action.payload);
        }
    }
})

export default currentUserSlice.reducer;
export const { userLoggedIn } = currentUserSlice.actions;