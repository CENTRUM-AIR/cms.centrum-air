import { createSlice } from "@reduxjs/toolkit";
import { fetchCharters } from "./fetch";
import { patchCharters } from "./patch";
import { deleteCharter } from "./delete";
import { sendCharters } from "./post";
const initialState = {
  data: [],
  fetched: false,
  loading: false,
};

const chartersSlice = createSlice({
  name: "charters",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCharters.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.fetched = true;
    });
    builder.addCase(fetchCharters.pending, (state, action) => {
      state.loading = true;
      state.fetched = false;
    });
    builder.addCase(fetchCharters.rejected, (state, action) => {
      state.loading = false;
      state.fetched = true;
    });
    builder.addCase(patchCharters.fulfilled, (state, action) => {
      state.loading = false;
      const { data, id } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      state.data[index] = data;
    });
    builder.addCase(patchCharters.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(patchCharters.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteCharter.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteCharter.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCharter.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(sendCharters.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) state.data.unshift(action.payload);
    });
    builder.addCase(sendCharters.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendCharters.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default chartersSlice.reducer;
