import { createAsyncThunk } from "@reduxjs/toolkit";
import { LANGUAGES } from "../create-main-page/patch";
import api, { formDataApi } from "../../utils/api";
import { setError } from "../notifs";

export const patchSetting = createAsyncThunk(
  "patch setting",
  async (data, thunk) => {
    try {
      const { key, value, id } = data;
      const formDataSetting = new FormData();
      const patchData = {};
      const items = [];

      const requestBody = {};
      LANGUAGES.forEach((lang) => {
        requestBody[`key`] = key;
        patchData[`key`] = key;
        requestBody[`value`] = value;
        patchData[`value`] = value;
      });
      formDataSetting.append("value", value);
      formDataSetting.append("key", key);

      //       const idExist = (element) => element.id == id;

      // const filterItem = items.findIndex(idExist)
      //   items.splice(items.length - 1, 0, requestBody);
      items.push(requestBody);
      const newId = await api
        .post("/setting", { items: items })

        .catch((e) => {
          thunk.dispatch(
            setError(e?.response?.data?.error || e?.response?.data?.message)
          );
          throw new Error(e);
        });
      patchData.id = newId;
      return patchData;
    } catch (e) {
      return null;
    }
  }
);
