import { createSlice } from "@reduxjs/toolkit";
import { fetchMainPage } from "./fetch";
import { patchMainPage } from "./patch";
import { sendMainPage } from "./post";
import { deleteMainPage } from "./delete";
const initialState = {
  data: [],
  fetched: false,
  loading: false,
};

const mainPage = createSlice({
  name: "mainpage",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMainPage.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.fetched = true;
    });
    builder.addCase(fetchMainPage.pending, (state, action) => {
      state.loading = true;
      state.fetched = false;
    });
    builder.addCase(fetchMainPage.rejected, (state, action) => {
      state.loading = false;
      state.fetched = true;
    });
    builder.addCase(patchMainPage.fulfilled, (state, action) => {
      state.loading = false;
      const { data, id } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      state.data[index] = data;
    });
    builder.addCase(patchMainPage.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(patchMainPage.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteMainPage.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteMainPage.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteMainPage.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(sendMainPage.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) state.data.unshift(action.payload);
    });
    builder.addCase(sendMainPage.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendMainPage.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export default mainPage.reducer;
