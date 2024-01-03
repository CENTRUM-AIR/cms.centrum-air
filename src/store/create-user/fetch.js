import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { setError } from "../notifs";

export const fetchUsers = createAsyncThunk(
  "fetch users",
  async (data, thunk) => {
    try {
      const response = await api.get("/users/all").catch((e) => {
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
