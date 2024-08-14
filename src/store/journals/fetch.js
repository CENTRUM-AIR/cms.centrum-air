import { createAsyncThunk } from "@reduxjs/toolkit";
import { JOURNALS } from "../../constants";
import api from "../../utils/api";
import { setError } from "../notifs";

export const fetchJournal = createAsyncThunk(JOURNALS, async (data, thunk) => {
  const response = await api.get("/journal").catch((e) => {
    thunk.dispatch(
      setError(e?.response?.data?.error || e?.response?.data?.message)
    );
    throw new Error(e);
  });
  return response.data;
});
