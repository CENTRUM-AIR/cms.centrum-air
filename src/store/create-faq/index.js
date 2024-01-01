import { createSlice } from "@reduxjs/toolkit";
import { patchFaq } from "./patch";
import { deleteFaq } from "./delete";
import { sendFaq } from "./post";
import { fetchFaq } from "./fetch";
const initialState = {
  data: [],
  loading: false,
  fetched: false,
};

const createFaqSlide = createSlice({
  name: "createFaq",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchFaq.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.fetched = true;
    });
    builder.addCase(fetchFaq.pending, (state, action) => {
      state.loading = true;
      state.fetched = false;
    });
    builder.addCase(fetchFaq.rejected, (state, action) => {
      state.loading = false;
      state.fetched = true;
    });
    builder.addCase(patchFaq.fulfilled, (state, action) => {
      state.loading = false;
      const { data, id } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      state.data[index] = data;
    });
    builder.addCase(patchFaq.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(patchFaq.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteFaq.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteFaq.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteFaq.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(sendFaq.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) state.data.unshift(action.payload);
    });
    builder.addCase(sendFaq.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendFaq.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default createFaqSlide.reducer;
