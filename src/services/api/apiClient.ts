// ============================================================
//  Alia Order API — Axios HTTP Client
//  Attaches Authorization & Accept-Language to every request
// ============================================================

import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { AUTH_STORAGE_KEYS, LANGUAGE_STORAGE_KEYS } from "../../utiles/keys";
// ── Storage keys ────────────────────────────────────────────

// ── Base URL — update to your real server ───────────────────
const BASE_URL = AUTH_STORAGE_KEYS.Base_URL || AUTH_STORAGE_KEYS; // Fallback to localhost if env variable is not set

// ── Create instance ─────────────────────────────────────────
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ── Request interceptor ─────────────────────────────────────
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // 1. Authorization
    const token = await localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    // 2. Accept-Language
    const language = await localStorage.getItem(LANGUAGE_STORAGE_KEYS.LANGUAGE);
    if (language) {
      config.headers.set("Accept-Language", language);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor (basic 401 guard) ──────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // Token expired — callers can hook into this to trigger logout / refresh
      // Emit a global event or call your auth store here if needed
      console.warn("[apiClient] 401 Unauthorized — token may be expired");
    }

    return Promise.reject(error);
  }
);

// ── Helpers for multipart requests ──────────────────────────
export function multipartConfig(
  extra?: AxiosRequestConfig
): AxiosRequestConfig {
  return {
    ...extra,
    headers: {
      ...extra?.headers,
      "Content-Type": "multipart/form-data",
    },
  };
}

export default apiClient;
