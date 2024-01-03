import { createSlice } from "@reduxjs/toolkit";
import { fetchDestinations } from "./fetch";
import { patchDestinations } from "./patch";
import { deleteDestination } from "./delete";
import { sendDestination } from "./post";

const initialState = {
  data: [],
  fetched: false,
  loading: false,
};

const createDestinationsSlice = createSlice({
  name: "destinations",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchDestinations.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.fetched = true;
    });
    builder.addCase(fetchDestinations.pending, (state, action) => {
      state.loading = true;
      state.fetched = false;
    });
    builder.addCase(fetchDestinations.rejected, (state, action) => {
      state.loading = false;
      state.fetched = true;
    });
    builder.addCase(patchDestinations.fulfilled, (state, action) => {
      state.loading = false;
      if (!action.payload) return;
      const { data, id } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      state.data[index] = data;
    });
    builder.addCase(patchDestinations.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(patchDestinations.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteDestination.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteDestination.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteDestination.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(sendDestination.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) state.data.unshift(action.payload);
    });
    builder.addCase(sendDestination.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendDestination.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default createDestinationsSlice.reducer;
