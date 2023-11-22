import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nombre: "",
  apellido: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { nombre, apellido, email } = action.payload;
      state.nombre = nombre;
      state.apellido = apellido;
      state.email = email;
    },
    logout: (state) => {
      state.nombre = "";
      state.apellido = "";
      state.email = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;