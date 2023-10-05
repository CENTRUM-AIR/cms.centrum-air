import axios from "axios";

axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER,

  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_BEARER}`,
  },
});

export const formDataApi = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_BEARER}`,
  },
});
export default api;
