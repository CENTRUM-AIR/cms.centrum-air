import { createAsyncThunk } from "@reduxjs/toolkit";
import { LANGUAGES } from "../create-main-page/patch";
import api from "../../utils/api";
import { setError } from "../notifs";

export const sendSetting = createAsyncThunk(
  "post Setting",
  async (data, thunk) => {
    try {
      const { key, value } = data;
      const items = [];
      const requestBody = {};
      const patchData = {};
      LANGUAGES.forEach((lang) => {
        requestBody[`key`] = key;
        patchData[`key`] = key;
        requestBody[`value`] = value;
        patchData[`value`] = value;
      });
      items.splice(items.length - 1, 0, requestBody);

      console.log(items, "item");
      const id = await api
        .post("/setting", { items: items })
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
