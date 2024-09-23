import { createSlice } from "@reduxjs/toolkit";
import { fetchSetting } from "./fetch";
// import { patchSetting } from "./patch";
import { deleteSetting } from "./delete";
import { sendSetting } from "./post";
import { patchSetting } from "./patch";

const initialState = {
  data: [],
  fetched: false,
  loading: false,
};

const createSettingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSetting.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.fetched = true;
    });
    builder.addCase(fetchSetting.pending, (state, action) => {
      state.loading = true;
      state.fetched = false;
    });
    builder.addCase(fetchSetting.rejected, (state, action) => {
      state.loading = false;
      state.fetched = true;
    });
    builder.addCase(patchSetting.fulfilled, (state, action) => {
      state.loading = false;
      if (!action.payload) return;
      const { key, value, id } = action.payload;

      const index = state.data.findIndex((item) => item.id === id.data[0].id);
      // if (action.payload) state.data.push(action.payload);
      const items = {};
      items.key = key;
      items.value = value;
      state.data[index] = items;
      // if (action.payload) state.data.unshift(action.payload);
    });
    builder.addCase(patchSetting.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(patchSetting.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteSetting.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteSetting.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteSetting.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(sendSetting.fulfilled, (state, action) => {
      state.loading = false;

      if (action.payload) state.data.unshift(action.payload);
    });
    builder.addCase(sendSetting.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendSetting.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default createSettingSlice.reducer;
