import { createAsyncThunk } from "@reduxjs/toolkit";
import { LANGUAGES } from "../create-main-page/patch";
import api from "../../utils/api";
import { setError } from "../notifs";

export const patchCountries = createAsyncThunk(
  "patch country",
  async (data, thunk) => {
    try {
      const { cityCode, city, country, id } = data;
      const requestBody = {};
      const patchData = {};

      LANGUAGES.forEach((lang) => {
        requestBody[`city_${lang}`] = city[lang];
        patchData[`city_${lang}`] = city[lang];
        requestBody[`country_${lang}`] = country[lang];
        patchData[`country_${lang}`] = country[lang];
      });
      requestBody.city_code = cityCode;
      patchData.city_code = cityCode;
      patchData.id = id;
      await api.patch(`/countries/${id}`, requestBody).catch((e) => {
        thunk.dispatch(setError(e?.response?.data?.error));
        throw new Error(e);
      });
      return { data: patchData, id };
    } catch (e) {
      return null;
    }
  }
);
