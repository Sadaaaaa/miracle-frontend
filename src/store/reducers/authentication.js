import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authenticationReducer',

    initialState: {
        token: '',
        user: {}
    },

    reducers: {
        addCredentials(state, action) {
            state.token = action.payload.token;
            state.user = JSON.parse(action.payload.user);

            console.log(state.token);
        },
    }

})

export const { addCredentials } = authSlice.actions;
export default authSlice.reducer;
