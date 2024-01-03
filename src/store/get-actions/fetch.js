import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { setError } from "../notifs";

export const fetchLogs = createAsyncThunk("fetch logs", async (data, thunk) => {
  try {
    const response = await api.get("/logger").catch((e) => {
      thunk.dispatch(
        setError(e?.response?.data?.error || e?.response?.data?.message)
      );
      throw new Error(e);
    });
    return response.data;
  } catch (e) {
    return null;
  }
});
