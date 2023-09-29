import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import {
  CHARTERS,
  CONTENTMANAGER,
  COUNTRIES,
  FAQ,
  MAINPAGE,
  NEWS,
  OFFERS,
  PRESSCENTER,
  SERVICES,
  SUPERADMIN,
  USERS,
} from "../../constants";

const initialState = {
  mainpage: [],
  services: [],
  offers: [],
  countries: [],
  charters: [],
  users: [],
  news: [],
  faq: [],
  faqFetched: false,
  mainpageFetched: false,
  servicesFetched: false,
  offersFetched: false,
  countriesFetched: false,
  chartersFetched: false,
  usersFetched: false,
  newsFetched: false,
  loading: false,
};

export const fetchMainPage = createAsyncThunk(MAINPAGE, async (data, thunk) => {
  const { role } = thunk.getState().isAuth;
  if (role === SUPERADMIN || role === CONTENTMANAGER) {
    const response = await api.get("/mainpage");
    return response.data;
  }
  return [];
});
export const fetchOffers = createAsyncThunk(OFFERS, async (data, thunk) => {
  const { role } = thunk.getState().isAuth;
  if (role === SUPERADMIN || role === CONTENTMANAGER) {
    const response = await api.get("/offers");
    return response.data;
  }
  return [];
});
export const fetchServices = createAsyncThunk(SERVICES, async (data, thunk) => {
  const { role } = thunk.getState().isAuth;
  if (role === SUPERADMIN || role === CONTENTMANAGER) {
    const response = await api.get("/services");
    return response.data;
  }
  return [];
});
export const fetchCountries = createAsyncThunk(
  COUNTRIES,
  async (data, thunk) => {
    const { role } = thunk.getState().isAuth;
    if (role === SUPERADMIN || role === CONTENTMANAGER) {
      const response = await api.get("/countries");
      return response.data;
    }
    return [];
  }
);
export const fetchCharters = createAsyncThunk(CHARTERS, async (data, thunk) => {
  const { role } = thunk.getState().isAuth;
  if (role === SUPERADMIN || role === CONTENTMANAGER) {
    const response = await api.get("/charters");
    return response.data;
  }
  return [];
});
export const fetchUsers = createAsyncThunk(USERS, async (data, thunk) => {
  const { role } = thunk.getState().isAuth;
  if (role === SUPERADMIN) {
    const response = await api.get("/users/all");
    return response.data;
  }
  return [];
});
export const fetchNews = createAsyncThunk(NEWS, async (data, thunk) => {
  const { role } = thunk.getState().isAuth;
  if (role === SUPERADMIN || role === PRESSCENTER) {
    const response = await api.get("/news");
    return response.data;
  }
  return [];
});
export const fetchFaq = createAsyncThunk(FAQ, async (data, thunk) => {
  const { role } = thunk.getState().isAuth;
  if (role === SUPERADMIN || role === PRESSCENTER) {
    const response = await api.get("/faq");
    return response.data;
  }
  return [];
});

const infoSlice = createSlice({
  name: "all-info",
  initialState,
  reducers: {
    addInfo: (state, action) => {
      const { type, data } = action.payload;
      state[type] = state[type].concat(data);
    },
    deleteInfo: (state, action) => {
      const { type, id } = action.payload;
      state[type] = state[type].filter((item) => item.id !== id);
    },
    updateInfo: (state, action) => {
      const { type, id, data } = action.payload;
      state[type] = state[type].map((item) => {
        if (item.id === id) {
          return { ...item, ...data };
        }
        return item;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMainPage.fulfilled, (state, action) => {
      state.loading = false;
      if (!state.mainpageFetched) {
        state.mainpage = action.payload;
        state.mainpageFetched = true;
      }
    });
    builder.addCase(fetchMainPage.pending, (state, action) => {
      if (!state.mainpageFetched) state.loading = true;
    });
    builder.addCase(fetchOffers.fulfilled, (state, action) => {
      state.loading = false;
      if (!state.offersFetched) {
        state.offers = action.payload;
        state.offersFetched = true;
      }
    });
    builder.addCase(fetchOffers.pending, (state, action) => {
      if (!state.offersFetched) state.loading = true;
    });
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.loading = false;
      if (!state.servicesFetched) {
        state.services = action.payload;
        state.servicesFetched = true;
      }
    });
    builder.addCase(fetchServices.pending, (state, action) => {
      if (!state.servicesFetched) state.loading = true;
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.loading = false;
      if (!state.countriesFetched) {
        state.countries = action.payload;
        state.countriesFetched = true;
      }
    });
    builder.addCase(fetchCountries.pending, (state, action) => {
      if (!state.countriesFetched) state.loading = true;
    });
    builder.addCase(fetchCharters.fulfilled, (state, action) => {
      state.loading = false;
      if (!state.chartersFetched) {
        state.charters = action.payload;
        state.chartersFetched = true;
      }
    });
    builder.addCase(fetchCharters.pending, (state, action) => {
      if (!state.chartersFetched) state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      if (!state.usersFetched) {
        state.users = action.payload;
        state.usersFetched = true;
      }
    });
    builder.addCase(fetchUsers.pending, (state, action) => {
      if (!state.usersFetched) state.loading = true;
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.loading = false;
      if (!state.newsFetched) {
        state.news = action.payload;
        state.newsFetched = true;
      }
    });
    builder.addCase(fetchNews.pending, (state, action) => {
      if (!state.newsFetched) state.loading = true;
    });
    builder.addCase(fetchFaq.fulfilled, (state, action) => {
      state.loading = false;
      if (!state.faqFetched) {
        state.faq = action.payload;
        state.faqFetched = true;
      }
    });
    builder.addCase(fetchFaq.pending, (state, action) => {
      if (!state.faqFetched) state.loading = true;
    });
  },
});

export const { deleteInfo, addInfo, updateInfo } = infoSlice.actions;

export default infoSlice.reducer;
