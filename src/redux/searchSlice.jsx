import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tipoLugar: "",
  local: "",
  poblacion: "",
  kilometros: "",
};

export const searchSlice = createSlice({
  name: "busqueda",
  initialState,
  reducers: {
    cambioTipo: (state, action) => {
      state.tipoLugar = action.payload;
    },
    cambioLocal: (state, action) => {
      state.local = action.payload;
    },
    cambioPoblacion: (state, action) => {
      state.poblacion = action.payload;
    },
    cambioKilometros: (state, action) => {
      state.kilometros = action.payload;
    },
  },
});

export const {
  cambioLocal,
  cambioTipo,
  cambioPoblacion,
  cambioKilometros,
} = searchSlice.actions;

export default searchSlice.reducer;