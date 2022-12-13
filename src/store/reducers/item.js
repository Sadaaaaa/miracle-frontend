import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name: 'items',

    initialState: {
        input: ''
    },

    reducers: {
        addItemSearch(state, action) {
            state.input = action.payload;
        },
    }

})

export const { addItemSearch } = itemSlice.actions;
export default itemSlice.reducer;
