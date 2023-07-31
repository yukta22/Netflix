import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "LoginCredential",
    initialState: { user: {} },
    reducers: {
        addLoginCredentials: (state, action) => void(state.user = action.payload)
    }
});

export const { addLoginCredentials } = loginSlice.actions;

export default loginSlice.reducer