import { configureStore } from "@reduxjs/toolkit";
import AdditionalServiceReducer from "./create-additional-service";
import MainPageReducer from "./create-main-page";
import DestinationsReducer from "./create-destinations";
import isAuthReducer from "./auth";

export const store = configureStore({
  reducer: {
    createService: AdditionalServiceReducer,
    createMainPage: MainPageReducer,
    createDestinations: DestinationsReducer,
    isAuth: isAuthReducer,
  },
});

export const getServices = (state) => state.createService;
export const getMainPage = (state) => state.createMainPage;
export const getDestinations = (state) => state.createDestinations;
export const getUser = (state) => state.isAuth;
