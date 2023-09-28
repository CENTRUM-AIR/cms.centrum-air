import { configureStore } from "@reduxjs/toolkit";
import AdditionalServiceReducer from "./create-additional-service";
import MainPageReducer from "./create-main-page";
import DestinationsReducer from "./create-destinations";
import CountriesReducer from "./create-countries";
import ChartersReducer from "./create-charter";
import NewsReducer from "./create-charter";
import AllInfoReducer from "./get-api-info";
import SendInfoReducer from "./send-api-info";
import PatchInfoReducer from "./patch-api-info";
import isAuthReducer from "./auth";
import NewUserReducer from "./create-user";
import FaqReducer from "./create-faq";

export const store = configureStore({
  reducer: {
    createService: AdditionalServiceReducer,
    createMainPage: MainPageReducer,
    createDestinations: DestinationsReducer,
    isAuth: isAuthReducer,
    createCountries: CountriesReducer,
    createCharters: ChartersReducer,
    createNews: NewsReducer,
    allInfo: AllInfoReducer,
    sendInfo: SendInfoReducer,
    patchInfo: PatchInfoReducer,
    newUser: NewUserReducer,
    createFaq: FaqReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const getServices = (state) => state.createService;
export const getMainPage = (state) => state.createMainPage;
export const getDestinations = (state) => state.createDestinations;
export const getUser = (state) => state.isAuth;
export const getCountries = (state) => state.createCountries;
export const getCharters = (state) => state.createCharters;
export const getNews = (state) => state.createNews;
export const getAllInfo = (state) => state.allInfo;
export const sendAllInfo = (state) => state.sendInfo;
export const patchAllInfo = (state) => state.patchInfo;
export const getNewUser = (state) => state.newUser;
export const getFaq = (state) => state.createFaq;
