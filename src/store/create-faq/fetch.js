import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchFaq = createAsyncThunk("fetch faq", async (data, thunk) => {
  const response = await api.get("/faq");
  return response.data;
});
