import { api } from "./axios";
import type { LoginCredentials, LoginResponse, AdminUser } from "../types/auth";

const AUTH_BASE = "/auth";

export const authApi = {
  /**
   * Admin login. Returns token and user with roles/permissions.
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>(`${AUTH_BASE}/login`, credentials);
    return data;
  },

  /**
   * Logout (optional: call backend to invalidate token).
   */
  async logout(): Promise<void> {
    try {
      await api.post(`${AUTH_BASE}/logout`);
    } catch {
      // Ignore; we clear local state anyway
    }
  },

  /**
   * Get current user (e.g. to refresh permissions or validate token).
   */
  async getMe(): Promise<AdminUser> {
    const { data } = await api.get<AdminUser>(`${AUTH_BASE}/me`);
    return data;
  },
};
