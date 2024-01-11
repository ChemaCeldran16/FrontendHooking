import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    latitud: "",
    longitud: "",
};

export const localizacionSlice = createSlice({
    name: "localizacion",
    initialState,
    reducers: {
        cambioLatitudLocalizacion: (state, action) => {
            state.latitud = action.payload;
        },
        cambioLongitudLocalizacion: (state, action) => {
            state.longitud = action.payload;
        },
    },
});

export const { cambioLatitudLocalizacion, cambioLongitudLocalizacion} = localizacionSlice.actions;
export default localizacionSlice.reducer;
