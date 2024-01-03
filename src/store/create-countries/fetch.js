import { createAsyncThunk } from "@reduxjs/toolkit";
import { COUNTRIES } from "../../constants";
import api from "../../utils/api";
import { setError } from "../notifs";

export const fetchCountries = createAsyncThunk(
  COUNTRIES,
  async (data, thunk) => {
    const response = await api.get("/countries").catch((e) => {
      thunk.dispatch(
        setError(e?.response?.data?.error || e?.response?.data?.message)
      );
      throw new Error(e);
    });
    return response.data;
  }
);
