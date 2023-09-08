import axios from "axios";

axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: "https://node.centrum-air.com",
  // baseURL: "http://localhost:13000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const formDataApi = axios.create({
  baseURL: "https://node.centrum-air.com",
  // baseURL: "http://localhost:13000",
  withCredentials: true,
});
export default api;
