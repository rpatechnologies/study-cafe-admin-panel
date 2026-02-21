import axios, { type InternalAxiosRequestConfig } from "axios";
import { getStoredToken, clearStoredAuth } from "../lib/authStorage";

const baseURL =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL
    ? String(import.meta.env.VITE_API_BASE_URL).replace(/\/$/, "")
    : "/api";

export const api = axios.create({
  baseURL,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor: add auth token from storage.
 */
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Response interceptor: on 401 clear auth and redirect to sign-in.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      clearStoredAuth();
      const redirect = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `/signin?redirect=${redirect}`;
    }
    return Promise.reject(error);
  }
);

export default api;
