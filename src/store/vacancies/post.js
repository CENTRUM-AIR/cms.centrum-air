import { createAsyncThunk } from "@reduxjs/toolkit";
import { LANGUAGES } from "../create-main-page/patch";
import { formDataApi } from "../../utils/api";
import { setError } from "../notifs";

export const sendVacancy = createAsyncThunk(
  "send vacancy",
  async (data, thunk) => {
    try {
      const { title, description, smallDescription, photo } = data;
      const formDataVacancy = new FormData();

      const patchData = {};
      LANGUAGES.forEach((lang) => {
        formDataVacancy.append(`title_${lang}`, title[lang]);
        patchData[`title_${lang}`] = title[lang];
        formDataVacancy.append(`description_${lang}`, description[lang]);
        patchData[`description_${lang}`] = description[lang];
        formDataVacancy.append(
          `small_description_${lang}`,
          smallDescription[lang]
        );
        patchData[`small_description_${lang}`] = smallDescription[lang];
      });
      formDataVacancy.append("file", photo);
      patchData.photo_url = photo?.preview;
      const id = await formDataApi
        .post("/vacancies", formDataVacancy)
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
