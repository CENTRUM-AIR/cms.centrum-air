import { createAsyncThunk } from "@reduxjs/toolkit";
import { MAINPAGE } from "../../constants";
import api from "../../utils/api";
import { setError } from "../notifs";

export const fetchMainPage = createAsyncThunk(MAINPAGE, async (data, thunk) => {
  const response = await api.get("/mainpage").catch((e) => {
    thunk.dispatch(
      setError(e?.response?.data?.error || e?.response?.data?.message)
    );
    throw new Error(e);
  });
  return response.data;
});
