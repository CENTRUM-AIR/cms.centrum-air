import { createSlice } from "@reduxjs/toolkit";
import { fetchCountries } from "./fetch";
import { patchCountries } from "./patch";
import { deleteCountry } from "./delete";
import { sendCountries } from "./post";
const initialState = {
  data: [],
  fetched: false,
  loading: false,
};

const createCountriesSlice = createSlice({
  name: "createCountries",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.fetched = true;
    });
    builder.addCase(fetchCountries.pending, (state, action) => {
      state.loading = true;
      state.fetched = false;
    });
    builder.addCase(fetchCountries.rejected, (state, action) => {
      state.loading = false;
      state.fetched = true;
    });
    builder.addCase(patchCountries.fulfilled, (state, action) => {
      state.loading = false;
      if (!action.payload) return;
      const { data, id } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      state.data[index] = data;
    });
    builder.addCase(patchCountries.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(patchCountries.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteCountry.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteCountry.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCountry.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(sendCountries.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) state.data.unshift(action.payload);
    });
    builder.addCase(sendCountries.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendCountries.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default createCountriesSlice.reducer;
