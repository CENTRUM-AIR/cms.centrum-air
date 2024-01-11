import { createAsyncThunk } from "@reduxjs/toolkit";
import { formDataApi } from "../../utils/api";
import { setError } from "../notifs";
import { LANGUAGES } from "../create-main-page/patch";

export const patchVacancy = createAsyncThunk(
  "patch vacancy",
  async (data, thunk) => {
    try {
      const { title, photo, description, smallDescription, id } = data;
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
      patchData.photo_url = photo?.preview || photo;
      photo?.preview && formDataVacancy.append("file", photo);
      await formDataApi
        .patch(`/vacancies/${id}`, formDataVacancy)
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
