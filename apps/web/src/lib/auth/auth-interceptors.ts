import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { tokenManager } from "./token-manager";
import { apiClient } from "../axios";
import { refreshAccessToken } from "@/features/auth/api/refresh.api";
import { refreshManager } from "./refresh-manager";
import { logout } from "@/features/auth/api";

const AUTH_EXCLUDED_PATHS = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
];

function onRequest(
  config: InternalAxiosRequestConfig,
) {
  const token =
    tokenManager.getAccessToken();

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
}

function onRequestError(
  error: unknown,
) {
  return Promise.reject(error);
}

function onResponse(response: AxiosResponse) {
  return response;
}

async function onResponseError(
  error: AxiosError,
) {
  const status = error.response?.status;

  if (status !== 401) {
    return Promise.reject(error);
  }

  const originalRequest = error.config;

  if (!originalRequest) {
    return Promise.reject(error);
  }

  const shouldSkip =
    AUTH_EXCLUDED_PATHS.some(path =>
      originalRequest.url?.includes(path),
    );

  if (shouldSkip) {
    return Promise.reject(error);
  }

  if (originalRequest._retry) {
    return Promise.reject(error);
  }

  originalRequest._retry = true;

  try {
    const accessToken = await refreshManager.refresh();

    tokenManager.setAccessToken(
      accessToken,
    );

    originalRequest.headers.Authorization =
      `Bearer ${accessToken}`;

    return apiClient(originalRequest);
  } catch (refreshError) {
    tokenManager.clear();

    // logoutUser();
    logout();

    return Promise.reject(refreshError);
  }
}


export function registerAuthInterceptors(
  apiClient: AxiosInstance,
) {
  apiClient.interceptors.request.use(
    onRequest,
    onRequestError,
  );
  apiClient.interceptors.response.use(
    onResponse,
    onResponseError,
  );
}