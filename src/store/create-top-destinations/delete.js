import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { setError } from "../notifs";

export const deleteTopDestination = createAsyncThunk(
  "delete top destination",
  async (data, thunk) => {
    try {
      const { id } = data;
      await api.delete(`/topdestinations/${id}`).catch((e) => {
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
