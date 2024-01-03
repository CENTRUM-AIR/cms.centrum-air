import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { setError } from "../notifs";

export const fetchCharters = createAsyncThunk(
  "fetch charters",
  async (data, thunk) => {
    const response = await api.get("/charters").catch((e) => {
      thunk.dispatch(
        setError(e?.response?.data?.error || e?.response?.data?.message)
      );
      throw new Error(e);
    });
    return response.data;
  }
);
