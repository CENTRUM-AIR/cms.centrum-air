import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  country_en: "",
  country_uz: "",
  country_ru: "",
  city_en: "",
  city_uz: "",
  city_ru: "",
  city_code: "",
};

const createCountriesSlice = createSlice({
  name: "createCountries",
  initialState,
  reducers: {
    setCountriesEnglish: (state, action) => {
      const { country, city } = action.payload;
      state.country_en = country;
      state.city_en = city;
    },

    setCountriesRussian: (state, action) => {
      const { country, city } = action.payload;
      state.country_ru = country;
      state.city_ru = city;
    },

    setCountriesUzbek: (state, action) => {
      const { country, city } = action.payload;
      state.country_uz = country;
      state.city_uz = city;
    },

    setCountriesCode: (state, action) => {
      const { city_code } = action.payload;
      state.city_code = city_code;
    },
  },
});

export const {
  setCountriesCode,
  setCountriesEnglish,
  setCountriesRussian,
  setCountriesUzbek,
} = createCountriesSlice.actions;

export default createCountriesSlice.reducer;
