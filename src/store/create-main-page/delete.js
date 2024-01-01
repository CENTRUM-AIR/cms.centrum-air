import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { setError } from "../notifs";

export const deleteMainPage = createAsyncThunk(
  "delete mainpage",
  async (data, thunk) => {
    try {
      const { id } = data;
      await api.delete(`/mainpage/${id}`).catch((e) => {
        thunk.dispatch(setError(e?.response?.data?.error));
        throw new Error(e);
      });
      return id;
    } catch (e) {
      return null;
    }
  }
);
