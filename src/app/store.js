import { configureStore } from "@reduxjs/toolkit";
import todos from "../features/todoSlice";

export const store = configureStore({
  reducer: todos,
});
