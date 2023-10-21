import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { formDataApi } from "../../utils/api";
import { addInfo } from "../get-api-info";
import {
  CHARTERS,
  COUNTRIES,
  FAQ,
  MAINPAGE,
  NEWS,
  OFFERS,
  SERVICES,
  USERS,
} from "../../constants";
import { setIsDone as setIsDoneMainpage } from "../create-main-page";
import { setIsDone as setIsDoneAS } from "../create-additional-service";
import { setIsDone as setIsDoneDestinations } from "../create-destinations";
import { setIsDone as setIsDoneCountries } from "../create-countries";
import { setIsDone as setIsDoneCharters } from "../create-charter";
import { setIsDone as setIsDoneNews } from "../create-news";
import { setIsDone as setIsDoneUser } from "../create-user";
import { setIsDone as setIsDoneFaq } from "../create-faq";

const initialState = {
  loading: false,
  sent: false,
  error: null,
};

const fireAlert = () => {
  window.alert(
    "Что-то пошло не так! \nПроверьте все данные, они либо совпадают с данными в датабазе, либо у вас пустые поля"
  );
};

export const sendMainPage = createAsyncThunk(
  MAINPAGE,
  async (data, apiThunk) => {
    try {
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
      apiThunk.dispatch(setIsDoneMainpage(true));
      apiThunk.dispatch(addInfo({ type: MAINPAGE, data: reduxPrepInfo }));
    } catch (e) {
      apiThunk.dispatch(setIsDoneMainpage(false));
      fireAlert();
    }
  }
);
export const sendOffers = createAsyncThunk(OFFERS, async (data, apiThunk) => {
  try {
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
    apiThunk.dispatch(setIsDoneDestinations(true));
  } catch (e) {
    apiThunk.dispatch(setIsDoneDestinations(false));
    fireAlert();
  }
});
export const sendServices = createAsyncThunk(
  SERVICES,
  async (data, apiThunk) => {
    try {
      const { createService } = apiThunk.getState();
      const { photo, isDone, ...service } = createService;
      const requestBody = {
        ...service,
        icon: photo?.photo.preview,
      };
      const id = await api
        .post("/services", requestBody)
        .then((res) => res.data);
      const reduxPrepInfo = {
        id,
        ...service,
        isDone,
        icon: photo?.photo.preview,
      };
      apiThunk.dispatch(addInfo({ type: SERVICES, data: reduxPrepInfo }));
      apiThunk.dispatch(setIsDoneAS(true));
    } catch (e) {
      apiThunk.dispatch(setIsDoneAS(false));
      fireAlert();
    }
  }
);
export const sendCountries = createAsyncThunk(
  COUNTRIES,
  async (data, apiThunk) => {
    try {
      const { createCountries } = apiThunk.getState();
      const id = await api
        .post("/countries", createCountries)
        .then((res) => res.data);
      const reduxPrepInfo = {
        id,
        ...createCountries,
      };
      apiThunk.dispatch(addInfo({ type: COUNTRIES, data: reduxPrepInfo }));
      apiThunk.dispatch(setIsDoneCountries(true));
    } catch (e) {
      apiThunk.dispatch(setIsDoneCountries(false));
      fireAlert();
    }
  }
);
export const sendCharters = createAsyncThunk(
  CHARTERS,
  async (data, apiThunk) => {
    try {
      const { createCharters } = apiThunk.getState();
      const { isDone, ...charters } = createCharters;
      const id = await api.post("/charters", charters).then((res) => res.data);
      const reduxPrepInfo = {
        id,
        ...createCharters,
      };
      apiThunk.dispatch(addInfo({ type: CHARTERS, data: reduxPrepInfo }));
      apiThunk.dispatch(setIsDoneCharters(true));
    } catch (e) {
      apiThunk.dispatch(setIsDoneCharters(false));
      fireAlert();
    }
  }
);
export const sendUsers = createAsyncThunk(USERS, async (data, apiThunk) => {
  try {
    const id = await api.post("/users/create", data).then((res) => res.data);
    const reduxPrepInfo = {
      id,
      ...data,
    };
    apiThunk.dispatch(addInfo({ type: USERS, data: reduxPrepInfo }));
    apiThunk.dispatch(setIsDoneUser(true));
  } catch (e) {
    apiThunk.dispatch(setIsDoneUser(false));
    fireAlert();
  }
});
export const sendNews = createAsyncThunk(NEWS, async (data, apiThunk) => {
  try {
    const { createNews } = apiThunk.getState();
    const {
      title_uz,
      title_ru,
      title_en,
      description_en,
      description_ru,
      description_uz,
      small_description_en,
      small_description_ru,
      small_description_uz,
      photo,
    } = createNews;
    const formDataNews = new FormData();
    formDataNews.append("title_ru", title_ru);
    formDataNews.append("title_en", title_en);
    formDataNews.append("title_uz", title_uz);
    formDataNews.append("description_en", description_en);
    formDataNews.append("description_ru", description_ru);
    formDataNews.append("description_uz", description_uz);
    formDataNews.append("small_description_en", small_description_en);
    formDataNews.append("small_description_ru", small_description_ru);
    formDataNews.append("small_description_uz", small_description_uz);
    formDataNews.append("file", photo?.photo);
    const id = await formDataApi
      .post("/news", formDataNews)
      .then((res) => res.data);
    const reduxPrepInfo = {
      title_uz,
      title_ru,
      title_en,
      description_en,
      description_ru,
      description_uz,
      small_description_en,
      small_description_ru,
      small_description_uz,
      updated_at: new Date().toDateString(),
      photo_url: photo?.photo.preview,
      id: id.toString(),
    };
    apiThunk.dispatch(addInfo({ type: NEWS, data: reduxPrepInfo }));
    apiThunk.dispatch(setIsDoneNews(true));
  } catch (e) {
    apiThunk.dispatch(setIsDoneNews(false));
    fireAlert();
  }
});

export const sendFaq = createAsyncThunk(FAQ, async (data, apiThunk) => {
  try {
    const { question, answer } = data;
    const requestBody = {
      question_uz: question.uz,
      question_ru: question.ru,
      question_en: question.en,
      answer_uz: answer.uz,
      answer_ru: answer.ru,
      answer_en: answer.en,
    };
    const id = await api.post("/faq", requestBody).then((res) => res.data);
    const reduxPrepInfo = {
      id: id.toString(),
      ...requestBody,
    };
    apiThunk.dispatch(addInfo({ type: FAQ, data: reduxPrepInfo }));
    apiThunk.dispatch(setIsDoneFaq(true));
  } catch (e) {
    apiThunk.dispatch(setIsDoneFaq(false));
    fireAlert();
  }
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
    builder.addCase(sendFaq.fulfilled, (state, action) => {
      state.sent = true;
      state.error = false;
    });
    builder.addCase(sendFaq.rejected, (state, action) => {
      state.error = true;
      state.sent = false;
    });
    builder.addCase(sendNews.fulfilled, (state, action) => {
      state.sent = true;
      state.error = false;
    });
    builder.addCase(sendNews.rejected, (state, action) => {
      state.error = true;
      state.sent = false;
    });
  },
});

export default sendInfoSlice.reducer;
