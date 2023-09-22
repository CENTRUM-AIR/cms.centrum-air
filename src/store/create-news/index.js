import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  title_en: "",
  title_uz: "",
  title_ru: "",
  description_en: "",
  description_uz: "",
  description_ru: "",
  photo: "",
};

const createNewsSlide = createSlice({
  name: "createNews",
  initialState,
  reducers: {
    setNewsEnglish: (state, action) => {
      const { title, description } = action.payload;
      state.title_en = title;
      state.description_en = description;
    },
    setNewsRussian: (state, action) => {
      const { title, description } = action.payload;
      state.title_ru = title;
      state.description_ru = description;
    },
    setNewsUzbek: (state, action) => {
      const { title, description } = action.payload;
      state.title_uz = title;
      state.description_uz = description;
    },

    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
  },
});

export const { setPhoto, setNewsEnglish, setNewsRussian, setNewsUzbek } =
  createNewsSlide.actions;

export default createNewsSlide.reducer;
