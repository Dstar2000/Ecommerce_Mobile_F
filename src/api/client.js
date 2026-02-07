import axios from "axios";
import ENV from "../config/env";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* AXIOS INSTANCE */
export const client = axios.create({
  baseURL: ENV.API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

/* REQUEST INTERCEPTOR */
client.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

/* RESPONSE INTERCEPTOR */
client.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("accessToken");
    }

    return Promise.reject(error);
  }
);

/* ===============================
   HTTP METHODS
================================ */

const api = {
  get: (url, params = {}, config = {}) =>
    client.get(url, { params, ...config }),

  post: (url, data = {}, config = {}) =>
    client.post(url, data, config),

  put: (url, data = {}, config = {}) =>
    client.put(url, data, config),

  patch: (url, data = {}, config = {}) =>
    client.patch(url, data, config),

  delete: (url, config = {}) =>
    client.delete(url, config)
};

export default api;
