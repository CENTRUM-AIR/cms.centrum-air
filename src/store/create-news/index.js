import { createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "./fetch";
import { patchNews } from "./edit";
import { deleteNews } from "./delete";
import { sendNews } from "./post";
const initialState = {
  data: [],
  fetched: false,
  loading: false,
};

const createNewsSlide = createSlice({
  name: "createNews",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.fetched = true;
    });
    builder.addCase(fetchNews.pending, (state, action) => {
      state.loading = true;
      state.fetched = false;
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.loading = false;
      state.fetched = true;
    });
    builder.addCase(patchNews.fulfilled, (state, action) => {
      state.loading = false;
      if (!action.payload) return;
      const { data, id } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      state.data[index] = data;
    });
    builder.addCase(patchNews.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(patchNews.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteNews.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteNews.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteNews.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(sendNews.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) state.data.unshift(action.payload);
    });
    builder.addCase(sendNews.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendNews.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default createNewsSlide.reducer;
