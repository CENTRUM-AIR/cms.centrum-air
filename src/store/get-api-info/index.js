import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import {
  CHARTERS,
  COUNTRIES,
  MAINPAGE,
  OFFERS,
  SERVICES,
  USERS,
} from "../../constants";

const initialState = {
  mainpage: [],
  services: [],
  offers: [],
  countries: [],
  charters: [],
  users: [],
  mainpageFetched: false,
  servicesFetched: false,
  offersFetched: false,
  countriesFetched: false,
  chartersFetched: false,
  usersFetched: false,
};

export const fetchMainPage = createAsyncThunk(MAINPAGE, async () => {
  const response = await api.get("/mainpage");
  return response.data;
});
export const fetchOffers = createAsyncThunk(OFFERS, async () => {
  const response = await api.get("/offers");
  return response.data;
});
export const fetchServices = createAsyncThunk(SERVICES, async () => {
  const response = await api.get("/services");
  return response.data;
});
export const fetchCountries = createAsyncThunk(COUNTRIES, async () => {
  const response = await api.get("/countries");
  return response.data;
});
export const fetchCharters = createAsyncThunk(CHARTERS, async () => {
  const response = await api.get("/charters");
  return response.data;
});
export const fetchUsers = createAsyncThunk(USERS, async () => {
  const response = await api.get("/users/all");
  return response.data;
});

const infoSlice = createSlice({
  name: "all-info",
  initialState,
  reducers: {
    addInfo: (state, action) => {
      const { type, data } = action.payload;
      state[type] = state[type].concat(data);
    },
    deleteInfo: (state, action) => {
      const { type, id } = action.payload;
      state[type] = state[type].filter((item) => item.id !== id);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMainPage.fulfilled, (state, action) => {
      if (!state.mainpageFetched) {
        state.mainpage = action.payload;
        state.mainpageFetched = true;
      }
    });
    builder.addCase(fetchOffers.fulfilled, (state, action) => {
      if (!state.offersFetched) {
        state.offers = action.payload;
        state.offersFetched = true;
      }
    });
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      if (!state.servicesFetched) {
        state.services = action.payload;
        state.servicesFetched = true;
      }
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      if (!state.countriesFetched) {
        state.countries = action.payload;
        state.countriesFetched = true;
      }
    });
    builder.addCase(fetchCharters.fulfilled, (state, action) => {
      if (!state.chartersFetched) {
        state.charters = action.payload;
        state.chartersFetched = true;
      }
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      if (!state.usersFetched) {
        state.users = action.payload;
        state.usersFetched = true;
      }
    });
  },
});

export const { deleteInfo, addInfo } = infoSlice.actions;

export default infoSlice.reducer;
