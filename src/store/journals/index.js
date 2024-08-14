import { createSlice } from "@reduxjs/toolkit";
import { fetchJournal } from "./fetch";
import { patchJournal } from "./patch";
import { sendJournal } from "./post";
import { deleteJournal } from "./delete";
const initialState = {
  data: [],
  fetched: false,
  loading: false,
};

const journalsSlice = createSlice({
  name: "journals",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchJournal.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.fetched = true;
    });
    builder.addCase(fetchJournal.pending, (state, action) => {
      state.loading = true;
      state.fetched = false;
    });
    builder.addCase(fetchJournal.rejected, (state, action) => {
      state.loading = false;
      state.fetched = true;
    });
    builder.addCase(patchJournal.fulfilled, (state, action) => {
      state.loading = false;
      if (!action.payload) return;
      const { data, id } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      state.data[index] = data;
    });
    builder.addCase(patchJournal.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(patchJournal.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteJournal.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteJournal.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteJournal.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(sendJournal.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) state.data.unshift(action.payload);
    });
    builder.addCase(sendJournal.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendJournal.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export default journalsSlice.reducer;
