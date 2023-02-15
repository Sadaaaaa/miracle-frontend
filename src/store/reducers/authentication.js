import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authenticationReducer',

    initialState: {
        token: '',
        user: {}, 
        isAuth: false
    },

    reducers: {
        addCredentials(state, action) {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuth = action.payload.isAuth;

            console.log(state.token);
            console.log(state.user);
            console.log(state.isAuth);
        },
    }

})

export const { addCredentials } = authSlice.actions;
export default authSlice.reducer;
