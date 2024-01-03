import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { setError } from "../notifs";

export const sendUsers = createAsyncThunk("send users", async (data, thunk) => {
  try {
    const { users } = thunk.getState();
    const { info } = data;

    if (users?.data?.find((user) => user.login === info.login)) {
      thunk.dispatch(setError("Пользователь с таким логином уже существует"));
      throw new Error("Пользователь с таким логином уже существует");
    }
    const requestBody = {
      login: info.login,
      password: info.password,
      role: info.role?.value,
    };
    const id = await api
      .post("/users/create", requestBody)
      .then((res) => res.data)
      .catch((e) => {
        thunk.dispatch(
          setError(e?.response?.data?.error || e?.response?.data?.message)
        );
        throw new Error(e);
      });

    const reduxPrepInfo = {
      id: id.toString(),
      login: info.login,
      role: info.role?.value,
    };
    return reduxPrepInfo;
  } catch (e) {
    return null;
  }
});
