import { createAsyncThunk } from "@reduxjs/toolkit";
import { LANGUAGES } from "../create-main-page/patch";
import api from "../../utils/api";
import { setError } from "../notifs";

export const patchFaq = createAsyncThunk("patch faq", async (data, thunk) => {
  try {
    const { question, answer, id, entity, entityId } = data;

    const requestBody = {};
    const patchData = {};
    LANGUAGES.forEach((lang) => {
      requestBody[`question_${lang}`] = question[lang];
      patchData[`question_${lang}`] = question[lang];
      requestBody[`answer_${lang}`] = answer[lang];
      patchData[`answer_${lang}`] = answer[lang];
      requestBody[`entity`] = entity;
      patchData[`entity`] = entity;
      requestBody[`entity_id`] = parseInt(entityId);
      patchData[`entity_id`] = parseInt(entityId);
    });
    await api.patch(`/faq/${id}`, requestBody).catch((e) => {
      thunk.dispatch(
        setError(e?.response?.data?.error || e?.response?.data?.message)
      );
      throw new Error(e);
    });
    patchData.id = id;
    return { data: patchData, id };
  } catch (e) {
    return null;
  }
});
