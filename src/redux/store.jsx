import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import busquedaReducer from "./searchSlice"
import localSlice from "./localSlice";
import  localizacionSlice  from "./localizacionSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    busqueda: busquedaReducer,
    local: localSlice,
    localizacion: localizacionSlice,
  },
});