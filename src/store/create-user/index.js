import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./fetch";
import { patchUser } from "./patch";
import { deleteUser } from "./delete";
import { sendUsers } from "./post";
const initialState = {
  data: [],
  fetched: false,
  loading: false,
};

const createUserSlide = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.fetched = true;
    });
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
      state.fetched = false;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.fetched = true;
    });
    builder.addCase(patchUser.fulfilled, (state, action) => {
      state.loading = false;
      if (!action.payload) return;
      const { data, id } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      state.data[index] = data;
    });
    builder.addCase(patchUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(patchUser.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(sendUsers.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) state.data.unshift(action.payload);
    });
    builder.addCase(sendUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendUsers.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default createUserSlide.reducer;
