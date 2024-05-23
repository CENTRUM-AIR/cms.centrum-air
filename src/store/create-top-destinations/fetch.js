import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { setError } from "../notifs";

export const fetchTopDestinations = createAsyncThunk(
  "fetch top destinations",
  async (data, thunk) => {
    try {
      const response = await api.get("/topdestination").catch((e) => {
        thunk.dispatch(
          setError(e?.response?.data?.error || e?.response?.data?.message)
        );
        throw new Error(e);
      });
      return response.data;
    } catch (e) {
      return null;
    }
  }
);
