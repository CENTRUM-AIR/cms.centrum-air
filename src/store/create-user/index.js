import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  login: "",
  password: "",
  role: "",
};

const createUserSlide = createSlice({
  name: "createUser",
  initialState,
  reducers: {
    setNewUser: (state, action) => {
      const { login, password, role } = action.payload;
      state.login = login;
      state.password = password;
      state.role = role;
    },
  },
});

export const { setNewUser } = createUserSlide.actions;

export default createUserSlide.reducer;
