import { createAsyncThunk } from "@reduxjs/toolkit";
import { LANGUAGES } from "../create-main-page/patch";
import { formDataApi } from "../../utils/api";
import { setError } from "../notifs";

export const sendTopDestination = createAsyncThunk(
  "post top destinations",
  async (data, thunk) => {
    try {
      const { title, description, destination, price, photo } = data;
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
      const id = await formDataApi
        .post("/topdestination", formDataDest)
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
