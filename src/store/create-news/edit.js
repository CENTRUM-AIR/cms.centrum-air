import { createAsyncThunk } from "@reduxjs/toolkit";
import { formDataApi } from "../../utils/api";
import { setError } from "../notifs";

export const LANGUAGES = ["ru", "en", "uz"];

export const patchNews = createAsyncThunk("patch news", async (data, thunk) => {
  try {
    const { title, photo, description, id } = data;
    const formDataNews = new FormData();
    const patchData = {};
    LANGUAGES.forEach((lang) => {
      formDataNews.append(`title_${lang}`, title[lang]);
      patchData[`title_${lang}`] = title[lang];
      formDataNews.append(`description_${lang}`, description[lang]);
      patchData[`description_${lang}`] = description[lang];
    });
    patchData.photo_url = photo?.preview || photo;

    photo?.preview && formDataNews.append("file", photo);
    await formDataApi.patch(`/news/${id}`, formDataNews).catch((e) => {
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
});
