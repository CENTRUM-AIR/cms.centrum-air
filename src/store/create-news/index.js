import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  title_en: "",
  title_uz: "",
  title_ru: "",
  description_en: "",
  description_uz: "",
  description_ru: "",
  small_description_uz: "",
  small_description_en: "",
  small_description_ru: "",
  photo: "",
  isDone: false,
};

const createNewsSlide = createSlice({
  name: "createNews",
  initialState,
  reducers: {
    setNewsEnglish: (state, action) => {
      const { title, description, small_description } = action.payload;
      state.title_en = title;
      state.description_en = description;
      state.small_description_en = small_description;
    },
    setNewsRussian: (state, action) => {
      const { title, description, small_description } = action.payload;
      state.title_ru = title;
      state.description_ru = description;
      state.small_description_ru = small_description;
    },
    setNewsUzbek: (state, action) => {
      const { title, description, small_description } = action.payload;
      state.title_uz = title;
      state.description_uz = description;
      state.small_description_uz = small_description;
    },

    setNewsPhoto: (state, action) => {
      state.photo = action.payload;
    },
    setIsDone: (state, action) => {
      state.isDone = action.payload;
    },
  },
});

export const {
  setNewsPhoto,
  setNewsEnglish,
  setNewsRussian,
  setNewsUzbek,
  setIsDone,
} = createNewsSlide.actions;

export default createNewsSlide.reducer;
