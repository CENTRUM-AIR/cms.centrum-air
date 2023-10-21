import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  from_city_en: "",
  from_city_uz: "",
  from_city_ru: "",
  to_city_en: "",
  to_city_uz: "",
  to_city_ru: "",
  phone_number: "",
  isDone: false,
};

const createChartersSlice = createSlice({
  name: "createCharters",
  initialState,
  reducers: {
    setChartersEnglish: (state, action) => {
      const { from_city, to_city } = action.payload;
      state.from_city_en = from_city;
      state.to_city_en = to_city;
    },

    setChartersRussian: (state, action) => {
      const { from_city, to_city } = action.payload;
      state.from_city_ru = from_city;
      state.to_city_ru = to_city;
    },

    setChartersUzbek: (state, action) => {
      const { from_city, to_city } = action.payload;
      state.from_city_uz = from_city;
      state.to_city_uz = to_city;
    },

    setPhoneNumber: (state, action) => {
      const { phone_number } = action.payload;
      state.phone_number = phone_number;
    },
    setIsDone: (state, action) => {
      state.isDone = action.payload;
    },
  },
});

export const {
  setPhoneNumber,
  setChartersEnglish,
  setChartersRussian,
  setChartersUzbek,
  setIsDone,
} = createChartersSlice.actions;

export default createChartersSlice.reducer;
