import { createAsyncThunk } from "@reduxjs/toolkit";
import { formDataApi } from "../../utils/api";
import { setError } from "../notifs";
import { LANGUAGES } from "../create-main-page/patch";

export const patchJournal = createAsyncThunk(
  "patch journal",
  async (data, thunk) => {
    try {
      const { details, journal, id } = data;
      const formDataJournal = new FormData();
      const patchData = {};
      LANGUAGES.forEach((lang) => {
        formDataJournal.append(`details_${lang}`, details[lang]);
        patchData[`details_${lang}`] = details[lang];
      });
      patchData.journal = journal?.preview || journal;
      journal.preview && formDataJournal.append("file", journal);
      await formDataApi.patch(`/journal/${id}`, formDataJournal).catch((e) => {
        thunk.dispatch(
          setError(
            e?.response?.data?.error ||
              e?.response?.data?.message ||
              e?.response?.data?.message,
          ),
        );
        throw new Error(e);
      });
      patchData.id = id;
      return { data: patchData, id };
    } catch (e) {
      return null;
    }
  },
);
