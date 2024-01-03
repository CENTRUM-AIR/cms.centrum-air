import { createSlice } from "@reduxjs/toolkit";
import { fetchLogs } from "./fetch";
const initialState = {
  data: [],
  fetched: false,
  loading: false,
};

const loggerSlice = createSlice({
  name: "logger",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchLogs.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.fetched = true;
    });
    builder.addCase(fetchLogs.pending, (state, action) => {
      state.loading = true;
      state.fetched = false;
    });
    builder.addCase(fetchLogs.rejected, (state, action) => {
      state.loading = false;
      state.fetched = true;
    });
  },
});

export default loggerSlice.reducer;
