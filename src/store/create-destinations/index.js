import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  title_en: "",
  title_uz: "",
  title_ru: "",
  description_en: "",
  description_uz: "",
  description_ru: "",
  destination_en: "",
  destination_uz: "",
  destination_ru: "",
  price: "",
  photo: "",
  isDone: false,
};

const createDestinationsSlice = createSlice({
  name: "createDestinations",
  initialState,
  reducers: {
    setDestinationEnglish: (state, action) => {
      const { title, description, destination } = action.payload;

      state.title_en = title;
      state.description_en = description;
      state.destination_en = destination;
    },
    setDestinationRussian: (state, action) => {
      const { title, description, destination } = action.payload;

      state.title_ru = title;
      state.description_ru = description;
      state.destination_ru = destination;
    },
    setDestinationUzbek: (state, action) => {
      const { title, description, destination } = action.payload;

      state.title_uz = title;
      state.description_uz = description;
      state.destination_uz = destination;
    },

    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
    setIsDone: (state, action) => {
      state.isDone = action.payload;
    }
  },
});

export const {
  setDestinationEnglish,
  setDestinationRussian,
  setDestinationUzbek,
  setPrice,
  setPhoto,
  setIsDone,
} = createDestinationsSlice.actions;

export default createDestinationsSlice.reducer;
