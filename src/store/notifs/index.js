import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  isError: false,
  isSuccess: false,
};

const topStatusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.message = action.payload;
      state.isSuccess = true;
    },
    setError: (state, action) => {
      state.message = action.payload;
      state.isError = true;
    },
    removeStatus: (state) => {
      state.message = "";
      state.isError = false;
      state.isSuccess = false;
    },
  },
});

export const { setSuccess, setError, removeStatus } = topStatusSlice.actions;

export default topStatusSlice.reducer;
