import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tipoLugar: "",
  local: "",
  poblacion: "",
  kilometros: "",
  latitud: null,
  longitud: null,
  radio: null,
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
    cambioLatitud: (state, action) => {
      state.latitud = action.payload;
    },
    cambioLongitud: (state, action) => {
      state.longitud = action.payload;
    },
    cambioRadio: (state, action) => {
      state.radio = action.payload;
    },
  },
});

export const {
  cambioLocal,
  cambioTipo,
  cambioPoblacion,
  cambioKilometros,
  cambioLatitud,
  cambioLongitud,
  cambioRadio,
} = searchSlice.actions;

export default searchSlice.reducer;
