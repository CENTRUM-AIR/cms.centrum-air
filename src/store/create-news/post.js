import { createAsyncThunk } from "@reduxjs/toolkit";
import { formDataApi } from "../../utils/api";
import { setError } from "../notifs";
const LANGUAGES = ["ru", "en", "uz"];

export const sendNews = createAsyncThunk("send news", async (data, thunk) => {
  try {
    const { photo, title, description } = data;
    const formDataNews = new FormData();
    const patchData = {};
    LANGUAGES.forEach((lang) => {
      formDataNews.append(`title_${lang}`, title[lang]);
      patchData[`title_${lang}`] = title[lang];
      formDataNews.append(`description_${lang}`, description[lang]);
      patchData[`description_${lang}`] = description[lang];
    });
    patchData.photo_url = photo?.preview;
    formDataNews.append("file", photo);

    const id = await formDataApi
      .post("/news", formDataNews)
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
});
