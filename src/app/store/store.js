import { configureStore } from "@reduxjs/toolkit";
import contextReducer from "./contextSlice";

export const store = configureStore({
  reducer: {
    context: contextReducer,
  },
});
