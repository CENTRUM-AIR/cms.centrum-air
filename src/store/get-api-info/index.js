import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const initialState = {
  mainpage: [],
  services: [],
  offers: [],
  countries: [],
  charters: [],
};

export const fetchMainPage = createAsyncThunk("main-page", async () => {
  const response = await api.get("/mainpage");
  return response.data;
});
export const fetchOffers = createAsyncThunk("offers", async () => {
  const response = await api.get("/offers");
  return response.data;
});
export const fetchServices = createAsyncThunk("services", async () => {
  const response = await api.get("/services");
  return response.data;
});
export const fetchCountries = createAsyncThunk("countries", async () => {
  const response = await api.get("/countries");
  return response.data;
});
export const fetchCharters = createAsyncThunk("charters", async () => {
  const response = await api.get("/charters");
  return response.data;
});

const infoSlice = createSlice({
  name: "all-info",
  initialState,
  reducers: {
    deleteInfo: (state, action) => {
      const { type, id } = action.payload;
      state[type] = state[type].filter((item) => item.id !== id);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMainPage.fulfilled, (state, action) => {
      state.mainpage = action.payload;
    });
    builder.addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
    });
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.services = action.payload;
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
    });
    builder.addCase(fetchCharters.fulfilled, (state, action) => {
      state.charters = action.payload;
    });
  },
});

export const { deleteInfo } = infoSlice.actions;

export default infoSlice.reducer;
