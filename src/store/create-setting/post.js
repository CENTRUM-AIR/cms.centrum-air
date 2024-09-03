import { createAsyncThunk } from "@reduxjs/toolkit";
import { LANGUAGES } from "../create-main-page/patch";
import { formDataApi } from "../../utils/api";
import { setError } from "../notifs";

export const sendSetting = createAsyncThunk(
  "post setting",
  async (data, thunk) => {
    try {
      const {
        title,
        subDescription,
        description,
        lat,
        lng,
        code,
        FaqList,
        photoUrl,
        departures,
        photo,
      } = data;

      const formDataDest = new FormData();
      const patchData = {};
      LANGUAGES.forEach((lang) => {
        formDataDest.append(`title_${lang}`, title[lang]);
        patchData[`title_${lang}`] = title[lang];
        formDataDest.append(`sub_description_${lang}`, subDescription[lang]);
        patchData[`sub_description_${lang}`] = subDescription[lang];
        formDataDest.append(`description_${lang}`, description[lang]);
        patchData[`description_${lang}`] = description[lang];
      });

      formDataDest.append("lat", lat);
      patchData.lat = parseFloat(lat);
      formDataDest.append("lng", lng);
      patchData.lng = parseFloat(lng);
      formDataDest.append("code", code);
      patchData.code = code;
      // formDataDest.append("faqs", FaqList);
      // patchData.faqs = FaqList;
      formDataDest.append("departures", departures);
      patchData.departures = departures;
      patchData.photo_url = encodeURI(photoUrl);

      const { topDestination } = await formDataApi
        .post("/topdestinations", patchData)
        .then((res) => res.data)
        .catch((e) => {
          thunk.dispatch(
            setError(e?.response?.data?.error || e?.response?.data?.message)
          );
          throw new Error(e);
        });
      // patchData.id = id;
      return topDestination;
    } catch (e) {
      return null;
    }
  }
);
