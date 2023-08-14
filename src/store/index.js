import { configureStore } from "@reduxjs/toolkit";
import AdditionalServiceReducer from "./create-additional-service";

export const store = configureStore({
  reducer: {
    createService: AdditionalServiceReducer,
  },
});

export const getServices = (state) => state.createService;