import { createAsyncThunk } from "@reduxjs/toolkit";
import { formDataApi } from "../../utils/api";
import { setError } from "../notifs";
import { LANGUAGES } from "../create-main-page/patch";

export const sendJournal = createAsyncThunk(
  "send journals",
  async (data, thunk) => {
    try {
      const { journal, details } = data;
      const formDataJournal = new FormData();
      const patchData = {};
      LANGUAGES.forEach((lang) => {
        formDataJournal.append(`details_${lang}`, details[lang]);
        patchData[`details_${lang}`] = details[lang];
      });
      patchData.journal = journal;
      formDataJournal.append("file", journal);

      const id = await formDataApi
        .post("/journal", formDataJournal)
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
