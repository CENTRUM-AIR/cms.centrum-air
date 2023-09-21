import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { formDataApi } from "../../utils/api";
import {
  CHARTERS,
  COUNTRIES,
  MAINPAGE,
  OFFERS,
  SERVICES,
} from "../../constants";

const initialState = {
  loading: false,
  sent: false,
  error: null,
};
const LANGUAGES = ["ru", "en", "uz"];

export const patchMainPage = createAsyncThunk(
  MAINPAGE,
  async (data, apiThunk) => {
    const { createMainPage } = apiThunk.getState();
    const { title, photo: newPhoto, id } = data;
    const formDataMainPage = new FormData();
    LANGUAGES.forEach((lang) => {
      if (title[lang] !== createMainPage?.[`title_${lang}`]) {
        formDataMainPage.append(`title_${lang}`, title[lang]);
      } else {
        formDataMainPage.append(
          `title_${lang}`,
          createMainPage?.[`title_${lang}`]
        );
      }
    });
    if (newPhoto?.photo !== createMainPage?.photo?.photo) {
      formDataMainPage.append("file", newPhoto?.photo);
    }
    await formDataApi.patch(`/mainpage/${id}`, formDataMainPage);
  }
);

export const patchOffers = createAsyncThunk(OFFERS, async (data, apiThunk) => {
  const { createDestinations } = apiThunk.getState();
  const { title, description, destination, price, photo, id } = data;
  const formDataDest = new FormData();

  LANGUAGES.forEach((lang) => {
    if (title[lang] !== createDestinations?.[`title_${lang}`]) {
      formDataDest.append(`title_${lang}`, title[lang]);
    } else {
      formDataDest.append(
        `title_${lang}`,
        createDestinations?.[`title_${lang}`]
      );
    }
    if (description[lang] !== createDestinations?.[`description_${lang}`]) {
      formDataDest.append(`description_${lang}`, description[lang]);
    } else {
      formDataDest.append(
        `description_${lang}`,
        createDestinations?.[`description_${lang}`]
      );
    }
    if (destination[lang] !== createDestinations?.[`destination_${lang}`]) {
      formDataDest.append(`destination_${lang}`, destination[lang]);
    } else {
      formDataDest.append(
        `destination_${lang}`,
        createDestinations?.[`destination_${lang}`]
      );
    }
  });

  if (price !== createDestinations?.price?.price) {
    formDataDest.append("price", price);
  } else {
    formDataDest.append("price", createDestinations?.price?.price);
  }
  if (photo?.photo !== createDestinations?.photo?.photo) {
    formDataDest.append("file", photo?.photo);
  }
  await formDataApi.patch(`/offers/${id}`, formDataDest);
});

export const patchServices = createAsyncThunk(
  SERVICES,
  async (data, apiThunk) => {
    const { createService } = apiThunk.getState();
    const { title, description, small_description, photo, id } = data;
    const requestBody = {};

    LANGUAGES.forEach((lang) => {
      if (title[lang] !== createService?.[`title_${lang}`]) {
        requestBody[`title_${lang}`] = title[lang];
      } else {
        requestBody[`title_${lang}`] = createService?.[`title_${lang}`];
      }
      if (description[lang] !== createService?.[`description_${lang}`]) {
        requestBody[`description_${lang}`] = description[lang];
      } else {
        requestBody[`description_${lang}`] =
          createService?.[`description_${lang}`];
      }
      if (
        small_description[lang] !== createService?.[`small_description_${lang}`]
      ) {
        requestBody[`small_description_${lang}`] = small_description[lang];
      } else {
        requestBody[`small_description_${lang}`] =
          createService?.[`small_description_${lang}`];
      }
    });
    requestBody.icon = photo?.photo;

    await api.patch(`/services/${id}`, requestBody);
  }
);
export const patchCountries = createAsyncThunk(
  COUNTRIES,
  async (data, apiThunk) => {
    const { countries } = apiThunk.getState();
    const { city_code, city, country, id } = data;
    const requestBody = {};

    LANGUAGES.forEach((lang) => {
      if (city[lang] !== countries?.[`city_${lang}`]) {
        requestBody[`city_${lang}`] = city[lang];
      } else {
        requestBody[`city_${lang}`] = countries?.[`city_${lang}`];
      }
      if (country !== countries?.[`country_${lang}`]) {
        requestBody[`country_${lang}`] = country[lang];
      } else {
        requestBody[`country_${lang}`] = countries?.[`country_${lang}`];
      }
    });
    if (city_code !== countries?.city_code) {
      requestBody.city_code = city_code;
    } else {
      requestBody.city_code = countries?.city_code;
    }
    await api.patch(`/countries/${id}`, requestBody);
  }
);

export const patchCharters = createAsyncThunk(
  CHARTERS,
  async (data, apiThunk) => {
    const { charters } = apiThunk.getState();
    const { from_city, to_city, phone_number, id } = data;
    const requestBody = {};

    LANGUAGES.forEach((lang) => {
      if (from_city[lang] !== charters?.[`from_city_${lang}`]) {
        requestBody[`from_city_${lang}`] = from_city[lang];
      } else {
        requestBody[`from_city_${lang}`] = charters?.[`from_city_${lang}`];
      }
      if (to_city[lang] !== charters?.[`to_city_${lang}`]) {
        requestBody[`to_city_${lang}`] = to_city[lang];
      } else {
        requestBody[`to_city_${lang}`] = charters?.[`to_city_${lang}`];
      }
    });
    if (phone_number !== charters?.phone_number) {
      requestBody.phone_number = phone_number;
    } else {
      requestBody.phone_number = charters?.phone_number;
    }
    await api.patch(`/charters/${id}`, requestBody);
  }
);

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
  },
});

export default patchInfoSlice.reducer;
