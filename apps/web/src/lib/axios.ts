import axios from "axios";
import { env } from "@/config/env";
import { registerAuthInterceptors } from "./auth/auth-interceptors";

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

registerAuthInterceptors(apiClient);