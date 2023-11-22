import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import busquedaReducer from "./searchSlice"
import localSlice from "./localSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    busqueda: busquedaReducer,
    local: localSlice,
  },
});