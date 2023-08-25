import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  title_en: "",
  title_uz: "",
  title_ru: "",
  description_en: "",
  description_uz: "",
  description_ru: "",
  small_description_en: "",
  small_description_uz: "",
  small_description_ru: "",
  photo: "",
};

const createAdditionalServiceSlice = createSlice({
  name: "createService",
  initialState,
  reducers: {
    setServiceEnglish: (state, action) => {
      const { title, description, small_description } = action.payload;

      state.title_en = title;
      state.description_en = description;
      state.small_description_en = small_description;
    },
    setServiceRussian: (state, action) => {
      const { title, description, small_description } = action.payload;

      state.title_ru = title;
      state.description_ru = description;
      state.small_description_ru = small_description;
    },
    setServiceUzbek: (state, action) => {
      const { title, description, small_description } = action.payload;

      state.title_uz = title;
      state.description_uz = description;
      state.small_description_uz = small_description;
    },

    setServiceIcon: (state, action) => {
      state.photo = action.payload;
    },
  },
});

export const {
  setServiceIcon,
  setServiceEnglish,
  setServiceRussian,
  setServiceUzbek,
} = createAdditionalServiceSlice.actions;

export default createAdditionalServiceSlice.reducer;
