import { createAsyncThunk } from "@reduxjs/toolkit";
import { formDataApi } from "../../utils/api";
import { setError } from "../notifs";

export const LANGUAGES = ["ru", "en", "uz"];

export const patchMainPage = createAsyncThunk(
  "patch mainpage",
  async (data, thunk) => {
    try {
      const { title, photo, id } = data;
      const formDataMainPage = new FormData();
      const patchData = {};
      LANGUAGES.forEach((lang) => {
        formDataMainPage.append(`title_${lang}`, title[lang]);
        patchData[`title_${lang}`] = title[lang];
      });
      patchData.photo = photo;
      formDataMainPage.append("file", photo);
      await formDataApi
        .patch(`/mainpage/${id}`, formDataMainPage)
        .catch((e) => {
          thunk.dispatch(setError(e?.response?.data?.error));
          throw new Error(e);
        });

      return { data: patchData, id };
    } catch (e) {
      return null;
    }
  }
);
