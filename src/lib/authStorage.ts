import type { PersistedAuth } from "../types/auth";
import { AUTH_STORAGE_KEY } from "../types/auth";

export function getStoredAuth(): PersistedAuth | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedAuth;
    if (!parsed?.token || !parsed?.user) return null;
    if (parsed.expiresAt != null && Date.now() > parsed.expiresAt) {
      clearStoredAuth();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function getStoredToken(): string | null {
  return getStoredAuth()?.token ?? null;
}

export function setStoredAuth(auth: PersistedAuth): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
}

export function clearStoredAuth(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
