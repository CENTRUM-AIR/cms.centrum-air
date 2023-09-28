import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  question_uz: "",
  answer_uz: "",
  question_ru: "",
  answer_ru: "",
  question_en: "",
  answer_en: "",
  id: null,
};

const createFaqSlide = createSlice({
  name: "createFaq",
  initialState,
  reducers: {
    setNewFaqUzbek: (state, action) => {
      const { question, answer } = action.payload;
      state.question_uz = question;
      state.answer_uz = answer;
    },
    setNewFaqEnglish: (state, action) => {
      const { question, answer } = action.payload;
      state.question_en = question;
      state.answer_en = answer;
    },
    setNewFaqRussian: (state, action) => {
      const { question, answer } = action.payload;
      state.question_ru = question;
      state.answer_ru = answer;
    },
    setFaqId: (state, action) => {
      const { id } = action.payload;
      state.id = id;
    },
  },
});

export const { setNewFaqEnglish, setNewFaqRussian, setNewFaqUzbek, setFaqId } =
  createFaqSlide.actions;

export default createFaqSlide.reducer;
