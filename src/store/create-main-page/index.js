import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  title_en: "",
  title_uz: "",
  title_ru: "",
  photo: "",
  color: "#fff",
  isDone: false,
};

const createMainPageSlide = createSlice({
  name: "createMainPage",
  initialState,
  reducers: {
    setTitleEnglish: (state, action) => {
      const { title } = action.payload;
      state.title_en = title;
    },
    setTitleRussian: (state, action) => {
      const { title } = action.payload;
      state.title_ru = title;
    },
    setTitleUzbek: (state, action) => {
      const { title } = action.payload;
      state.title_uz = title;
    },

    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setIsDone: (state, action) => {
      state.isDone = action.payload;
    },
  },
});

export const {
  setIsDone,
  setPhoto,
  setTitleEnglish,
  setTitleRussian,
  setTitleUzbek,
  setColor,
} = createMainPageSlide.actions;

export default createMainPageSlide.reducer;
