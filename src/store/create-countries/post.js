import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { LANGUAGES } from "../create-main-page/patch";
import { setError } from "../notifs";

export const sendCountries = createAsyncThunk(
  "send country",
  async (data, thunk) => {
    try {
      const { cityCode, city, country } = data;
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
      requestBody.is_search = data.isSearch;
      patchData.is_search = data.isSearch;
      const id = await api
        .post("/countries", requestBody)
        .then((res) => res.data)
        .catch((e) => {
          thunk.dispatch(
            setError(e?.response?.data?.error || e?.response?.data?.message)
          );
          throw new Error(e);
        });
      patchData.id = id;
      return patchData;
    } catch (e) {
      return null;
    }
  }
);
