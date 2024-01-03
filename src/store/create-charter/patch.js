import { createAsyncThunk } from "@reduxjs/toolkit";
import { LANGUAGES } from "../create-main-page/patch";
import api from "../../utils/api";
import { setError } from "../notifs";

export const patchCharters = createAsyncThunk(
  "patch charters",
  async (data, thunk) => {
    try {
      const { fromCity, toCity, phoneNumber, id } = data;
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
      await api.patch(`/charters/${id}`, requestBody).catch((e) => {
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
