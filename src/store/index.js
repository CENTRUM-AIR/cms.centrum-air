import { configureStore } from "@reduxjs/toolkit";
import AdditionalServiceReducer from "./create-additional-service";
import MainPageReducer from "./create-main-page";
import DestinationsReducer from "./create-destinations";
import CountriesReducer from "./create-countries";
import ChartersReducer from "./create-charter";
import AllInfoReducer from "./get-api-info";
import isAuthReducer from "./auth";

export const store = configureStore({
  reducer: {
    createService: AdditionalServiceReducer,
    createMainPage: MainPageReducer,
    createDestinations: DestinationsReducer,
    isAuth: isAuthReducer,
    countries: CountriesReducer,
    allInfo: AllInfoReducer,
    charters: ChartersReducer,
  },
});

export const getServices = (state) => state.createService;
export const getMainPage = (state) => state.createMainPage;
export const getDestinations = (state) => state.createDestinations;
export const getUser = (state) => state.isAuth;
export const getCountries = (state) => state.countries;
export const getCharters = (state) => state.charters;
export const getAllInfo = (state) => state.allInfo;
