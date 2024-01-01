import { createAsyncThunk } from "@reduxjs/toolkit";
import { LANGUAGES } from "../create-main-page/patch";
import api from "../../utils/api";
import { setError } from "../notifs";

export const sendServices = createAsyncThunk(
  "send services",
  async (data, thunk) => {
    try {
      const { title, description, smallDescription, icon } = data;
      const requestBody = {};
      const patchData = {};
      LANGUAGES.forEach((lang) => {
        requestBody[`title_${lang}`] = title[lang];
        patchData[`title_${lang}`] = title[lang];
        requestBody[`description_${lang}`] = description[lang];
        patchData[`description_${lang}`] = description[lang];
        patchData[`small_description_${lang}`] = smallDescription[lang];
        requestBody[`small_description_${lang}`] = smallDescription[lang];
      });
      requestBody.icon = icon;
      patchData.icon = icon;
      const id = await api
        .post("/services", requestBody)
        .then((res) => res.data)
        .catch((e) => {
          thunk.dispatch(setError(e?.response?.data?.error));
          throw new Error(e);
        });
      patchData.id = id;
      return patchData;
    } catch (e) {
      return null;
    }
  }
);
