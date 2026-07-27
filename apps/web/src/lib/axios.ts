import axios from "axios";
import { env } from "@/config/env";

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response?.status) {
      case 401:
        // Future: clear session and redirect to login
        break;

      case 403:
        // Future: show access denied
        break;

      case 404:
        // Future: handle not found
        break;

      case 500:
        // Future: log unexpected server errors
        break;
    }

    return Promise.reject(error);
  }
);