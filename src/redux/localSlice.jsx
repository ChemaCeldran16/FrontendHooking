import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nombreLocal: "",
};

export const localSlice = createSlice({
    name:"local",
    initialState,
    reducers: {
        cambioNombre: (state, action) => {
            state.nombreLocal=action.payload
        },
    }
});

export const{cambioNombre} = localSlice.actions;
export default localSlice.reducer;