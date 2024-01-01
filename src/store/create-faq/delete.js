import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { setError } from "../notifs";

export const deleteFaq = createAsyncThunk("delete faq", async (data, thunk) => {
  try {
    const { id } = data;
    await api.delete(`/faq/${id}`).catch((e) => {
      thunk.dispatch(setError(e?.response?.data?.error));
      throw new Error(e);
    });
    return id;
  } catch (e) {
    return null;
  }
});
