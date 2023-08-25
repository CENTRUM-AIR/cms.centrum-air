import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  login: "",
  role: "",
};

const isAuthSlide = createSlice({
  name: "isAuth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { login, role } = action.payload;
      state.login = login;
      state.role = role;
    },
  },
});

export const { setUser } = isAuthSlide.actions;

export default isAuthSlide.reducer;
