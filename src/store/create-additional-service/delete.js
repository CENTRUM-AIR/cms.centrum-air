import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const deleteService = createAsyncThunk(
  "delete service",
  async (data) => {
    try {
      const { id } = data;
      await api.delete(`/services/${id}`);
      return id;
    } catch (e) {
      return null;
    }
  }
);
