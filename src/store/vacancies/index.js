import { createSlice } from "@reduxjs/toolkit";
import { fetchVacancies } from "./fetch";
import { sendVacancy } from "./post";
import { patchVacancy } from "./edit";
import { deleteVacancy } from "./delete";

const initialState = {
  data: [],
  fetched: false,
  loading: false,
};

const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchVacancies.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.fetched = true;
    });
    builder.addCase(fetchVacancies.pending, (state, action) => {
      state.loading = true;
      state.fetched = false;
    });
    builder.addCase(fetchVacancies.rejected, (state, action) => {
      state.loading = false;
      state.fetched = true;
    });
    builder.addCase(patchVacancy.fulfilled, (state, action) => {
      state.loading = false;
      if (!action.payload) return;
      const { data, id } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      state.data[index] = data;
    });
    builder.addCase(patchVacancy.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(patchVacancy.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteVacancy.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteVacancy.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteVacancy.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(sendVacancy.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) state.data.unshift(action.payload);
    });
    builder.addCase(sendVacancy.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendVacancy.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export default vacanciesSlice.reducer;
