import { createSlice } from "@reduxjs/toolkit";
import { fetchServices } from "./fetch";
import { patchServices } from "./patch";
import { deleteService } from "./delete";
import { sendServices } from "./post";
const initialState = {
  data: [],
  fetched: false,
  loading: false,
};

const createAdditionalServiceSlice = createSlice({
  name: "createService",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.fetched = true;
    });
    builder.addCase(fetchServices.pending, (state, action) => {
      state.loading = true;
      state.fetched = false;
    });
    builder.addCase(fetchServices.rejected, (state, action) => {
      state.loading = false;
      state.fetched = true;
    });
    builder.addCase(patchServices.fulfilled, (state, action) => {
      state.loading = false;
      if (!action.payload) return;
      const { data, id } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      state.data[index] = data;
    });
    builder.addCase(patchServices.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(patchServices.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteService.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteService.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteService.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(sendServices.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) state.data.unshift(action.payload);
    });
    builder.addCase(sendServices.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendServices.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const {
  setServiceIcon,
  setServiceEnglish,
  setServiceRussian,
  setServiceUzbek,
  setIsDone,
} = createAdditionalServiceSlice.actions;

export default createAdditionalServiceSlice.reducer;
