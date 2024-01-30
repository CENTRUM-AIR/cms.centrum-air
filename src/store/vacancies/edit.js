import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { setError } from "../notifs";
import { LANGUAGES } from "../create-main-page/patch";

export const patchVacancy = createAsyncThunk(
  "patch vacancy",
  async (data, thunk) => {
    try {
      const {
        vacancy,
        department,
        mustKnow,
        responsibilities,
        requirements,
        skills,
        id,
      } = data;
      const payloadData = {};
      LANGUAGES.forEach((lang) => {
        payloadData[`vacancy_${lang}`] = vacancy[lang];
        payloadData[`department_${lang}`] = department[lang];
        payloadData[`must_know_${lang}`] = mustKnow[lang];
        payloadData[`responsibilities_${lang}`] = responsibilities[lang];
        payloadData[`requirements_${lang}`] = requirements[lang];
        payloadData[`skills_${lang}`] = skills[lang];
      });
      await api.patch(`/vacancies/${id}`, payloadData).catch((e) => {
        thunk.dispatch(
          setError(
            e?.response?.data?.error ||
              e?.response?.data?.message ||
              e?.response?.data?.message
          )
        );
        throw new Error(e);
      });
      payloadData.id = id;
      return { data: payloadData, id };
    } catch (e) {
      return null;
    }
  }
);
