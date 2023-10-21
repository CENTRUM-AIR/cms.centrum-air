import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { formDataApi } from "../../utils/api";
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
import { updateInfo } from "../get-api-info";
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
const LANGUAGES = ["ru", "en", "uz"];

const fireAlert = () => {
  window.alert(
    "Что-то пошло не так! \nПроверьте все данные, они либо совпадают с данными в датабазе, либо у вас пустые поля"
  );
};

export const patchMainPage = createAsyncThunk(
  MAINPAGE,
  async (data, apiThunk) => {
    try {
      const { createMainPage } = apiThunk.getState();
      const { title, photo: newPhoto, id } = data;
      const formDataMainPage = new FormData();
      const patchData = {};
      LANGUAGES.forEach((lang) => {
        if (title[lang] !== createMainPage?.[`title_${lang}`]) {
          formDataMainPage.append(`title_${lang}`, title[lang]);
          patchData[`title_${lang}`] = title[lang];
        } else {
          formDataMainPage.append(
            `title_${lang}`,
            createMainPage?.[`title_${lang}`]
          );
        }
      });
      if (newPhoto?.photo !== createMainPage?.photo?.photo) {
        patchData.photo = newPhoto?.photo;
        formDataMainPage.append("file", newPhoto?.photo);
      }
      if (!Object.keys(patchData).length) {
        window.alert("Ничего не было изменено");
        apiThunk.dispatch(setIsDoneMainpage(false));
        return;
      }
      apiThunk.dispatch(updateInfo({ type: MAINPAGE, id, data: patchData }));
      await formDataApi.patch(`/mainpage/${id}`, formDataMainPage);
      apiThunk.dispatch(setIsDoneMainpage(true));
    } catch (e) {
      apiThunk.dispatch(setIsDoneMainpage(false));
      fireAlert();
    }
  }
);

export const patchOffers = createAsyncThunk(OFFERS, async (data, apiThunk) => {
  try {
    const { createDestinations } = apiThunk.getState();
    const { title, description, destination, price, photo, id } = data;
    const formDataDest = new FormData();
    const patchData = {};
    LANGUAGES.forEach((lang) => {
      if (title[lang] !== createDestinations?.[`title_${lang}`]) {
        formDataDest.append(`title_${lang}`, title[lang]);
        patchData[`title_${lang}`] = title[lang];
      } else {
        formDataDest.append(
          `title_${lang}`,
          createDestinations?.[`title_${lang}`]
        );
      }
      if (description[lang] !== createDestinations?.[`description_${lang}`]) {
        formDataDest.append(`description_${lang}`, description[lang]);
        patchData[`description_${lang}`] = description[lang];
      } else {
        formDataDest.append(
          `description_${lang}`,
          createDestinations?.[`description_${lang}`]
        );
      }
      if (destination[lang] !== createDestinations?.[`destination_${lang}`]) {
        formDataDest.append(`destination_${lang}`, destination[lang]);
        patchData[`destination_${lang}`] = destination[lang];
      } else {
        formDataDest.append(
          `destination_${lang}`,
          createDestinations?.[`destination_${lang}`]
        );
      }
    });

    if (price !== createDestinations?.price?.price) {
      formDataDest.append("price", price);
      patchData.price = price;
    } else {
      formDataDest.append("price", createDestinations?.price?.price);
    }
    if (photo?.photo !== createDestinations?.photo?.photo) {
      patchData.photo = photo?.photo;
      formDataDest.append("file", photo?.photo);
    }
    if (!Object.keys(patchData).length) {
      window.alert("Ничего не было изменено");
      apiThunk.dispatch(setIsDoneDestinations(false));
      return;
    }
    apiThunk.dispatch(updateInfo({ type: OFFERS, id, data: patchData }));
    await formDataApi.patch(`/offers/${id}`, formDataDest);
    apiThunk.dispatch(setIsDoneDestinations(true));
  } catch (e) {
    apiThunk.dispatch(setIsDoneDestinations(false));
    fireAlert();
  }
});

export const patchServices = createAsyncThunk(
  SERVICES,
  async (data, apiThunk) => {
    try {
      const { createService } = apiThunk.getState();
      const { title, description, small_description, photo, id } = data;
      const requestBody = {};
      const patchData = {};

      LANGUAGES.forEach((lang) => {
        if (title[lang] !== createService?.[`title_${lang}`]) {
          requestBody[`title_${lang}`] = title[lang];
          patchData[`title_${lang}`] = title[lang];
        } else {
          requestBody[`title_${lang}`] = createService?.[`title_${lang}`];
        }
        if (description[lang] !== createService?.[`description_${lang}`]) {
          requestBody[`description_${lang}`] = description[lang];
          patchData[`description_${lang}`] = description[lang];
        } else {
          requestBody[`description_${lang}`] =
            createService?.[`description_${lang}`];
        }
        if (
          small_description[lang] !==
          createService?.[`small_description_${lang}`]
        ) {
          patchData[`small_description_${lang}`] = small_description[lang];
          requestBody[`small_description_${lang}`] = small_description[lang];
        } else {
          requestBody[`small_description_${lang}`] =
            createService?.[`small_description_${lang}`];
        }
      });
      requestBody.icon = photo?.photo;
      patchData.icon = photo?.photo;
      if (!Object.keys(patchData).length) {
        window.alert("Ничего не было изменено");
        apiThunk.dispatch(setIsDoneAS(false));
        return;
      }
      apiThunk.dispatch(updateInfo({ type: SERVICES, id, data: patchData }));
      await api.patch(`/services/${id}`, requestBody);
      apiThunk.dispatch(setIsDoneAS(true));
    } catch (e) {
      apiThunk.dispatch(setIsDoneAS(false));
      fireAlert();
    }
  }
);
export const patchCountries = createAsyncThunk(
  COUNTRIES,
  async (data, apiThunk) => {
    try {
      const { createCountries } = apiThunk.getState();
      const { city_code, city, country, id } = data;
      const requestBody = {};
      const patchData = {};

      LANGUAGES.forEach((lang) => {
        if (city[lang] !== createCountries?.[`city_${lang}`]) {
          requestBody[`city_${lang}`] = city[lang];
          patchData[`city_${lang}`] = city[lang];
        } else {
          requestBody[`city_${lang}`] = createCountries?.[`city_${lang}`];
        }
        if (country !== createCountries?.[`country_${lang}`]) {
          requestBody[`country_${lang}`] = country[lang];
          patchData[`country_${lang}`] = country[lang];
        } else {
          requestBody[`country_${lang}`] = createCountries?.[`country_${lang}`];
        }
      });
      if (city_code !== createCountries?.city_code) {
        requestBody.city_code = city_code;
        patchData.city_code = city_code;
      } else {
        requestBody.city_code = createCountries?.city_code;
      }
      if (!Object.keys(patchData).length) {
        window.alert("Ничего не было изменено");
        apiThunk.dispatch(setIsDoneCountries(false));
        return;
      }
      apiThunk.dispatch(updateInfo({ type: COUNTRIES, id, data: patchData }));
      await api.patch(`/countries/${id}`, requestBody);
      apiThunk.dispatch(setIsDoneCountries(true));
    } catch (e) {
      apiThunk.dispatch(setIsDoneCountries(false));
      fireAlert();
    }
  }
);

export const patchCharters = createAsyncThunk(
  CHARTERS,
  async (data, apiThunk) => {
    try {
      const { createCharters } = apiThunk.getState();
      const { from_city, to_city, phone_number, id } = data;
      const requestBody = {};
      const patchData = {};

      LANGUAGES.forEach((lang) => {
        if (from_city[lang] !== createCharters?.[`from_city_${lang}`]) {
          requestBody[`from_city_${lang}`] = from_city[lang];
          patchData[`from_city_${lang}`] = from_city[lang];
        } else {
          requestBody[`from_city_${lang}`] =
            createCharters?.[`from_city_${lang}`];
        }
        if (to_city[lang] !== createCharters?.[`to_city_${lang}`]) {
          requestBody[`to_city_${lang}`] = to_city[lang];
          patchData[`to_city_${lang}`] = to_city[lang];
        } else {
          requestBody[`to_city_${lang}`] = createCharters?.[`to_city_${lang}`];
        }
      });
      if (phone_number !== createCharters?.phone_number) {
        requestBody.phone_number = phone_number;
        patchData.phone_number = phone_number;
      } else {
        requestBody.phone_number = createCharters?.phone_number;
      }
      if (!Object.keys(patchData).length) {
        window.alert("Ничего не было изменено");
        apiThunk.dispatch(setIsDoneCharters(false));
        return;
      }
      apiThunk.dispatch(updateInfo({ type: CHARTERS, id, data: patchData }));
      await api.patch(`/charters/${id}`, requestBody);
      apiThunk.dispatch(setIsDoneCharters(true));
    } catch (e) {
      apiThunk.dispatch(setIsDoneCharters(false));
      fireAlert();
    }
  }
);

export const patchUser = createAsyncThunk(USERS, async (data, apiThunk) => {
  try {
    const { newUser } = apiThunk.getState();
    const { login, password, role } = data;
    if (!password && login === newUser?.login && role === newUser?.role) {
      window.alert("Ничего не было изменено");
      apiThunk.dispatch(setIsDoneUser(false));
      return;
    }
    const { id, ...info } = data;
    apiThunk.dispatch(updateInfo({ type: USERS, id, data: info }));
    await api.patch(`/users/update/${id}`, info);
    apiThunk.dispatch(setIsDoneUser(true));
  } catch (e) {
    apiThunk.dispatch(setIsDoneUser(false));
    fireAlert();
  }
});
export const patchFaq = createAsyncThunk(FAQ, async (data, apiThunk) => {
  try {
    const { question, answer } = data;
    const { createFaq } = apiThunk.getState();
    const requestBody = {};
    const patchData = {};
    LANGUAGES.forEach((lang) => {
      if (question[lang] !== createFaq?.[`question_${lang}`]) {
        requestBody[`question_${lang}`] = question[lang];
        patchData[`question_${lang}`] = question[lang];
      } else {
        requestBody[`question_${lang}`] = createFaq?.[`question_${lang}`];
      }
      if (answer[lang] !== createFaq?.[`answer_${lang}`]) {
        requestBody[`answer_${lang}`] = answer[lang];
        patchData[`answer_${lang}`] = answer[lang];
      } else {
        requestBody[`answer_${lang}`] = createFaq?.[`answer_${lang}`];
      }
    });
    if (!Object.keys(patchData).length) {
      window.alert("Ничего не было изменено");
      apiThunk.dispatch(setIsDoneFaq(false));
      return null;
    }
    apiThunk.dispatch(
      updateInfo({ type: FAQ, id: createFaq?.id, data: patchData })
    );
    await api.patch(`/faq/${createFaq?.id}`, requestBody);
    apiThunk.dispatch(setIsDoneFaq(true));
  } catch (e) {
    apiThunk.dispatch(setIsDoneFaq(false));
    fireAlert();
  }
});

export const patchNews = createAsyncThunk(NEWS, async (data, apiThunk) => {
  try {
    const { title, description, small_description, photo, id } = data;
    const { createNews } = apiThunk.getState();
    const formDataNews = new FormData();
    const patchData = {};
    LANGUAGES.forEach((lang) => {
      if (title[lang] !== createNews?.[`title_${lang}`]) {
        formDataNews.append(`title_${lang}`, title[lang]);
        patchData[`title_${lang}`] = title[lang];
      } else {
        formDataNews.append(`title_${lang}`, createNews?.[`title_${lang}`]);
      }
      if (description[lang] !== createNews?.[`description_${lang}`]) {
        formDataNews.append(`description_${lang}`, description[lang]);
        patchData[`description_${lang}`] = description[lang];
      } else {
        formDataNews.append(
          `description_${lang}`,
          createNews?.[`description_${lang}`]
        );
      }
      if (
        small_description[lang] !== createNews?.[`small_description_${lang}`]
      ) {
        formDataNews.append(
          `small_description_${lang}`,
          small_description[lang]
        );
        patchData[`small_description_${lang}`] = small_description[lang];
      } else {
        formDataNews.append(
          `small_description_${lang}`,
          createNews?.[`small_description_${lang}`]
        );
      }
    });
    if (photo?.photo !== createNews?.photo?.photo) {
      patchData.photo_url = photo?.photo;
      formDataNews.append("file", photo?.photo);
    }
    if (!Object.keys(patchData).length) {
      window.alert("Ничего не было изменено");
      apiThunk.dispatch(setIsDoneNews(false));
      return;
    }
    await formDataApi.patch(`/news/${id}`, formDataNews);
    apiThunk.dispatch(updateInfo({ type: NEWS, id, data: patchData }));
    apiThunk.dispatch(setIsDoneNews(true));
  } catch (e) {
    apiThunk.dispatch(setIsDoneNews(false));
    fireAlert();
  }
});

const patchInfoSlice = createSlice({
  name: "patch-all-info",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(patchMainPage.fulfilled, (state, action) => {
      state.sent = true;
      state.error = false;
    });
    builder.addCase(patchMainPage.rejected, (state, action) => {
      state.error = true;
      state.sent = false;
    });
    builder.addCase(patchOffers.fulfilled, (state, action) => {
      state.sent = true;
      state.error = false;
    });
    builder.addCase(patchOffers.rejected, (state, action) => {
      state.error = true;
      state.sent = false;
    });
    builder.addCase(patchServices.fulfilled, (state, action) => {
      state.sent = true;
      state.error = false;
    });
    builder.addCase(patchServices.rejected, (state, action) => {
      state.error = true;
      state.sent = false;
    });
    builder.addCase(patchCountries.fulfilled, (state, action) => {
      state.sent = true;
      state.error = false;
    });
    builder.addCase(patchCountries.rejected, (state, action) => {
      state.error = true;
      state.sent = false;
    });
    builder.addCase(patchCharters.fulfilled, (state, action) => {
      state.sent = true;
      state.error = false;
    });
    builder.addCase(patchCharters.rejected, (state, action) => {
      state.error = true;
      state.sent = false;
    });
    builder.addCase(patchUser.fulfilled, (state, action) => {
      state.sent = true;
      state.error = false;
    });
    builder.addCase(patchUser.rejected, (state, action) => {
      state.error = true;
      state.sent = false;
    });
    builder.addCase(patchFaq.fulfilled, (state, action) => {
      state.sent = true;
      state.error = false;
    });
    builder.addCase(patchFaq.rejected, (state, action) => {
      state.error = true;
      state.sent = false;
    });
    builder.addCase(patchNews.fulfilled, (state, action) => {
      state.sent = true;
      state.error = false;
    });
    builder.addCase(patchNews.rejected, (state, action) => {
      state.error = true;
      state.sent = false;
    });
  },
});

export default patchInfoSlice.reducer;
