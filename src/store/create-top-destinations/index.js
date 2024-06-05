import { createSlice } from "@reduxjs/toolkit";
import { fetchTopDestinations } from "./fetch";
import { patchTopDestinations } from "./patch";
import { deleteTopDestination } from "./delete";
import { sendTopDestination } from "./post";

const initialState = {
  data: [],
  fetched: false,
  loading: false,
};

const createTopDestinationsSlice = createSlice({
  name: "topdestinations",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTopDestinations.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.fetched = true;
    });
    builder.addCase(fetchTopDestinations.pending, (state, action) => {
      state.loading = true;
      state.fetched = false;
    });
    builder.addCase(fetchTopDestinations.rejected, (state, action) => {
      state.loading = false;
      state.fetched = true;
    });
    builder.addCase(patchTopDestinations.fulfilled, (state, action) => {
      state.loading = false;
      if (!action.payload) return;
      const { data, id } = action.payload;

      const index = state.data.findIndex((item) => item.id === id);
      state.data[index] = data;
    });
    builder.addCase(patchTopDestinations.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(patchTopDestinations.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTopDestination.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteTopDestination.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTopDestination.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(sendTopDestination.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) state.data.unshift(action.payload);
    });
    builder.addCase(sendTopDestination.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendTopDestination.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default createTopDestinationsSlice.reducer;
