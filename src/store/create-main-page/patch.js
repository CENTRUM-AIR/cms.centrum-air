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
      patchData.photo_url = photo?.preview || photo;
      photo?.preview && formDataMainPage.append("file", photo);
      await formDataApi
        .patch(`/mainpage/${id}`, formDataMainPage)
        .catch((e) => {
          thunk.dispatch(
            setError(
              e?.response?.data?.error ||
                e?.response?.data?.message ||
                e?.response?.data?.message
            )
          );
          throw new Error(e);
        });
      patchData.id = id;
      return { data: patchData, id };
    } catch (e) {
      return null;
    }
  }
);
