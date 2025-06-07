import axios from "axios";

const BASE_URL = "https://e-pharmacy-k31y.onrender.com";
// const BASE_URL = "http://localhost:3000";

const instance = axios.create({
  baseURL: BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = "";
};

export default instance;
