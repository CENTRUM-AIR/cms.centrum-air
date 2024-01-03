import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { LANGUAGES } from "../create-main-page/patch";
import { setError } from "../notifs";

export const sendCharters = createAsyncThunk(
  "post charters",
  async (data, thunk) => {
    try {
      const { fromCity, toCity, phoneNumber } = data;
      const requestBody = {};
      const patchData = {};
      LANGUAGES.forEach((lang) => {
        requestBody[`from_city_${lang}`] = fromCity[lang];
        patchData[`from_city_${lang}`] = fromCity[lang];
        requestBody[`to_city_${lang}`] = toCity[lang];
        patchData[`to_city_${lang}`] = toCity[lang];
      });
      requestBody.phone_number = phoneNumber;
      patchData.phone_number = phoneNumber;
      const id = await api
        .post("/charters", requestBody)
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
