import { createAsyncThunk } from "@reduxjs/toolkit";
import { LANGUAGES } from "../create-main-page/patch";
import { formDataApi } from "../../utils/api";
import { setError } from "../notifs";

export const patchTopDestinations = createAsyncThunk(
  "patch top destinations",
  async (data, thunk) => {
    try {
      const { title, description, topdestination, price, photo, id } = data;
      const formDataDest = new FormData();
      const patchData = {};
      LANGUAGES.forEach((lang) => {
        formDataDest.append(`title_${lang}`, title[lang]);
        patchData[`title_${lang}`] = title[lang];
        formDataDest.append(`description_${lang}`, description[lang]);
        patchData[`description_${lang}`] = description[lang];
        formDataDest.append(`destination_${lang}`, topdestination[lang]);
        patchData[`destination_${lang}`] = topdestination[lang];
      });
      formDataDest.append("price", price);
      patchData.price = price;
      patchData.photo = photo?.preview;
      photo?.preview && formDataDest.append("file", photo);
      await formDataApi
        .patch(`/topdestination/${id}`, formDataDest)
        .catch((e) => {
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
