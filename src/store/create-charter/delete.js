import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { setError } from "../notifs";

export const deleteCharter = createAsyncThunk(
  "delete charter",
  async (data, thunk) => {
    try {
      const { id } = data;
      await api.delete(`/charters/${id}`).catch((e) => {
        thunk.dispatch(setError(e?.response?.data?.error));
        throw new Error(e);
      });
      return id;
    } catch (e) {
      return null;
    }
  }
);
