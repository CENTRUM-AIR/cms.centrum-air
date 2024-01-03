import { createAsyncThunk } from "@reduxjs/toolkit";
import { formDataApi } from "../../utils/api";
import { setError } from "../notifs";
const LANGUAGES = ["ru", "en", "uz"];

export const sendMainPage = createAsyncThunk(
  "send mainpage",
  async (data, thunk) => {
    try {
      const { photo, title } = data;
      const formDataMainPage = new FormData();
      const patchData = {};
      LANGUAGES.forEach((lang) => {
        formDataMainPage.append(`title_${lang}`, title[lang]);
        patchData[`title_${lang}`] = title[lang];
      });
      patchData.photo_url = photo?.preview;
      formDataMainPage.append("file", photo);

      const id = await formDataApi
        .post("/mainpage", formDataMainPage)
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
