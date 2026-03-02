/**
 * CMS page content API (admin).
 * GET list, GET by slug, PUT by slug. Data is stored in cms_pages (preserved across WP migration).
 */

import { api } from "./axios";

export interface CmsPageRecord {
  id: number;
  slug: string;
  title: string | null;
  content: string | null;
  meta: Record<string, unknown> | null;
  created_at?: string;
  updated_at?: string;
}

export interface CmsPageUpdatePayload {
  title?: string | null;
  content?: string | null;
  meta?: Record<string, unknown> | null;
}

export async function fetchCmsPages(): Promise<CmsPageRecord[]> {
  const res = await api.get<CmsPageRecord[]>("/admin/platform/cms-pages");
  return Array.isArray(res.data) ? res.data : [];
}

export async function fetchCmsPageBySlug(slug: string): Promise<CmsPageRecord | null> {
  try {
    const res = await api.get<CmsPageRecord>(`/admin/platform/cms-pages/${encodeURIComponent(slug)}`);
    return res.data ?? null;
  } catch (e: unknown) {
    if (e && typeof e === "object" && "response" in e) {
      const ax = e as { response?: { status?: number } };
      if (ax.response?.status === 404) return null;
    }
    throw e;
  }
}

export async function updateCmsPage(slug: string, payload: CmsPageUpdatePayload): Promise<CmsPageRecord> {
  const res = await api.put<CmsPageRecord>(`/admin/platform/cms-pages/${encodeURIComponent(slug)}`, payload);
  return res.data;
}
