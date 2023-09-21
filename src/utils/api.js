import axios from "axios";

axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER,

  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const formDataApi = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
});
export default api;
