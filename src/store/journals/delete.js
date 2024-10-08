import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { setError } from "../notifs";

export const deleteJournal = createAsyncThunk(
  "delete journal",
  async (data, thunk) => {
    try {
      const { id } = data;
      await api.delete(`/journal/${id}`).catch((e) => {
        thunk.dispatch(
          setError(e?.response?.data?.error || e?.response?.data?.message)
        );
        throw new Error(e);
      });
      return id;
    } catch (e) {
      return null;
    }
  }
);
