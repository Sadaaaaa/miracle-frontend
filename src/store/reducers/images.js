import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
    name: 'images',

    initialState: {
        images: []
    },

    reducers: {
        addImages(state, action) {
            state.images = action.payload;
        },
    }

})

export const { addImages } = imageSlice.actions;
export default imageSlice.reducer;
