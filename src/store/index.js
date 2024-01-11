import { configureStore } from "@reduxjs/toolkit";
import AdditionalServiceReducer from "./create-additional-service";
import MainPageReducer from "./create-main-page";
import DestinationsReducer from "./create-destinations";
import CountriesReducer from "./create-countries";
import ChartersReducer from "./create-charter";
import NewsReducer from "./create-news";
import usersReducer from "./create-user";
import FaqReducer from "./create-faq";
import StatusReducer from "./notifs";
import LoggerReducer from "./get-actions";
import VacanciesReducer from "./vacancies";

export const store = configureStore({
  reducer: {
    createService: AdditionalServiceReducer,
    mainpage: MainPageReducer,
    createDestinations: DestinationsReducer,
    createCountries: CountriesReducer,
    charters: ChartersReducer,
    createNews: NewsReducer,
    users: usersReducer,
    createFaq: FaqReducer,
    status: StatusReducer,
    actions: LoggerReducer,
    vacancies: VacanciesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const getServices = (state) => state.createService;
export const getMainPage = (state) => state.mainpage;
export const getDestinations = (state) => state.createDestinations;
export const getCountries = (state) => state.createCountries;
export const getCharters = (state) => state.charters;
export const getNews = (state) => state.createNews;
export const sendAllInfo = (state) => state.sendInfo;
export const patchAllInfo = (state) => state.patchInfo;
export const getUsers = (state) => state.users;
export const getFaq = (state) => state.createFaq;
export const getStatus = (state) => state.status;
export const getActions = (state) => state.actions;
export const getVacancies = (state) => state.vacancies;
