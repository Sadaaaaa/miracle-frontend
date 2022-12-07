import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'users',

    initialState: {
        input: '',
        users: []
    },

    reducers: {
        addInput(state, action) {
            state.input = action.payload;
        },
    }

})

export const { addInput } = userSlice.actions;
export default userSlice.reducer;
