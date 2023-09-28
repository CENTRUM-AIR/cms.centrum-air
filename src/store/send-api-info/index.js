import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { formDataApi } from "../../utils/api";
import { addInfo } from "../get-api-info";
import {
  CHARTERS,
  COUNTRIES,
  MAINPAGE,
  NEWS,
  OFFERS,
  SERVICES,
  USERS,
} from "../../constants";

const initialState = {
  loading: false,
  sent: false,
  error: null,
};

export const sendMainPage = createAsyncThunk(
  MAINPAGE,
  async (data, apiThunk) => {
    const { createMainPage } = apiThunk.getState();
    const { photo, title_uz, title_ru, title_en } = createMainPage;
    const formDataMainPage = new FormData();
    formDataMainPage.append("title_ru", title_ru);
    formDataMainPage.append("title_en", title_en);
    formDataMainPage.append("title_uz", title_uz);
    formDataMainPage.append("file", photo?.photo);

    const id = await formDataApi
      .post("/mainpage", formDataMainPage)
      .then((res) => res.data);
    const reduxPrepInfo = {
      id,
      title_ru,
      title_en,
      title_uz,
      photo_url: photo?.photo.preview,
    };
    apiThunk.dispatch(addInfo({ type: MAINPAGE, data: reduxPrepInfo }));
  }
);
export const sendOffers = createAsyncThunk(OFFERS, async (data, apiThunk) => {
  const { createDestinations } = apiThunk.getState();
  const {
    title_en,
    title_uz,
    title_ru,
    description_en,
    description_uz,
    description_ru,
    destination_en,
    destination_uz,
    destination_ru,
    price,
    photo,
  } = createDestinations;
  const formDataDest = new FormData();
  formDataDest.append("title_ru", title_ru);
  formDataDest.append("title_en", title_en);
  formDataDest.append("title_uz", title_uz);
  formDataDest.append("description_en", description_en);
  formDataDest.append("description_ru", description_ru);
  formDataDest.append("description_uz", description_uz);
  formDataDest.append("destination_ru", destination_ru);
  formDataDest.append("destination_en", destination_en);
  formDataDest.append("destination_uz", destination_uz);
  formDataDest.append("file", photo?.photo);
  formDataDest.append("price", price?.price);
  const id = await formDataApi
    .post("/offers", formDataDest)
    .then((res) => res.data);
  const reduxPrepInfo = {
    id,
    title_ru,
    title_en,
    title_uz,
    description_en,
    description_ru,
    description_uz,
    destination_ru,
    destination_en,
    destination_uz,
    photo_url: photo?.photo.preview,
    price: price?.price,
  };
  apiThunk.dispatch(addInfo({ type: OFFERS, data: reduxPrepInfo }));
});
export const sendServices = createAsyncThunk(
  SERVICES,
  async (data, apiThunk) => {
    const { createService } = apiThunk.getState();
    const { photo, ...service } = createService;
    const requestBody = {
      ...service,
      icon: photo?.photo.preview,
    };
    const id = await api.post("/services", requestBody).then((res) => res.data);
    const reduxPrepInfo = {
      id,
      ...service,
      icon: photo?.photo.preview,
    };
    apiThunk.dispatch(addInfo({ type: SERVICES, data: reduxPrepInfo }));
  }
);
export const sendCountries = createAsyncThunk(
  COUNTRIES,
  async (data, apiThunk) => {
    const { countries } = apiThunk.getState();
    const id = await api.post("/countries", countries).then((res) => res.data);
    const reduxPrepInfo = {
      id,
      ...countries,
    };
    apiThunk.dispatch(addInfo({ type: COUNTRIES, data: reduxPrepInfo }));
  }
);
export const sendCharters = createAsyncThunk(
  CHARTERS,
  async (data, apiThunk) => {
    const { charters } = apiThunk.getState();
    const id = await api.post("/charters", charters).then((res) => res.data);
    const reduxPrepInfo = {
      id,
      ...charters,
    };
    apiThunk.dispatch(addInfo({ type: CHARTERS, data: reduxPrepInfo }));
  }
);
export const sendUsers = createAsyncThunk(USERS, async (data, apiThunk) => {
  const id = await api.post("/users/create", data).then((res) => res.data);
  const reduxPrepInfo = {
    id,
    ...data,
  };
  apiThunk.dispatch(addInfo({ type: USERS, data: reduxPrepInfo }));
});
export const sendNews = createAsyncThunk(NEWS, async (data, apiThunk) => {
  // const { news } = data;
  // const id = await api.post("/news", data).then((res) => res.data);
  // const reduxPrepInfo = {
  //   id,
  //   ...data,
  // };
  // apiThunk.dispatch(addInfo({ type: NEWS, data: reduxPrepInfo }));
});

const sendInfoSlice = createSlice({
  name: "send-all-info",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(sendMainPage.fulfilled, (state, action) => {
      state.sent = true;
      state.error = false;
    });
    builder.addCase(sendMainPage.rejected, (state, action) => {
      state.error = true;
      state.sent = false;
    });
    builder.addCase(sendOffers.fulfilled, (state, action) => {
      state.sent = true;
      state.error = false;
    });
    builder.addCase(sendOffers.rejected, (state, action) => {
      state.error = true;
      state.sent = false;
    });
    builder.addCase(sendServices.fulfilled, (state, action) => {
      state.sent = true;
      state.error = false;
    });
    builder.addCase(sendServices.rejected, (state, action) => {
      state.error = true;
      state.sent = false;
    });
    builder.addCase(sendCountries.fulfilled, (state, action) => {
      state.sent = true;
      state.error = false;
    });
    builder.addCase(sendCountries.rejected, (state, action) => {
      state.error = true;
      state.sent = false;
    });
    builder.addCase(sendCharters.fulfilled, (state, action) => {
      state.sent = true;
      state.error = false;
    });
    builder.addCase(sendCharters.rejected, (state, action) => {
      state.error = true;
      state.sent = false;
    });
    builder.addCase(sendUsers.fulfilled, (state, action) => {
      state.sent = true;
      state.error = false;
    });
    builder.addCase(sendUsers.rejected, (state, action) => {
      state.error = true;
      state.sent = false;
    });
  },
});

export default sendInfoSlice.reducer;
