import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  login: "",
  password: "",
  role: "",
  isDone: false,
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
    setIsDone: (state, action) => {
      state.isDone = action.payload;
    },
  },
});

export const { setNewUser, setIsDone } = createUserSlide.actions;

export default createUserSlide.reducer;
