import { createAsyncThunk } from "@reduxjs/toolkit";
import { LANGUAGES } from "../create-main-page/patch";
import { formDataApi } from "../../utils/api";
import { setError } from "../notifs";

export const patchDestinations = createAsyncThunk(
  "patch destinations",
  async (data, thunk) => {
    try {
      const { title, description, destination, price, photo, id } = data;
      const formDataDest = new FormData();
      const patchData = {};
      LANGUAGES.forEach((lang) => {
        formDataDest.append(`title_${lang}`, title[lang]);
        patchData[`title_${lang}`] = title[lang];
        formDataDest.append(`description_${lang}`, description[lang]);
        patchData[`description_${lang}`] = description[lang];
        formDataDest.append(`destination_${lang}`, destination[lang]);
        patchData[`destination_${lang}`] = destination[lang];
      });
      formDataDest.append("price", price);
      patchData.price = price;
      patchData.photo = photo;
      formDataDest.append("file", photo);
      await formDataApi.patch(`/offers/${id}`, formDataDest).catch((e) => {
        thunk.dispatch(
          setError(e?.response?.data?.error || e?.response?.data?.message)
        );
        throw new Error(e);
      });
      return { data: patchData, id };
    } catch (e) {
      return null;
    }
  }
);
