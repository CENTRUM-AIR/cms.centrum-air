import { createAsyncThunk } from "@reduxjs/toolkit";
import { NEWS } from "../../constants";
import api from "../../utils/api";
import { setError } from "../notifs";

export const fetchNews = createAsyncThunk(NEWS, async (data, thunk) => {
  const response = await api.get("/news").catch((e) => {
    thunk.dispatch(
      setError(e?.response?.data?.error || e?.response?.data?.message)
    );
    throw new Error(e);
  });
  return response.data;
});
