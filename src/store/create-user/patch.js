import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { setError } from "../notifs";

export const patchUser = createAsyncThunk(
  "patch users",
  async (data, thunk) => {
    try {
      const { login, password, role, id } = data;
      const info = {
        login,
        role: role?.value,
      };
      password && (info.password = password);
      await api.patch(`/users/update/${id}`, info).catch((e) => {
        thunk.dispatch(
          setError(e?.response?.data?.error || e?.response?.data?.message)
        );
        throw new Error(e);
      });
      return {
        id,
        login,
        role: role?.value,
      };
    } catch (e) {
      return null;
    }
  }
);
