import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { setError } from "../notifs";

export const fetchServices = createAsyncThunk(
  "fetch services",
  async (data, thunk) => {
    try {
      const response = await api.get("/services").catch((e) => {
        thunk.dispatch(setError(e?.response?.data?.error));
        throw new Error(e);
      });
      return response.data;
    } catch (e) {
      return null;
    }
  }
);
