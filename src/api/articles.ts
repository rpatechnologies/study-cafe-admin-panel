/**
 * Articles API (admin platform)
 * CRUD + taxonomy options for articles.
 */

import { createCrudApi } from "./apiFactory";
import { api } from "./axios";
import type { DataTableFetchParams, DataTableFetchResult } from "../components/data-table";

/** Resolved "Also Read" article from [related id="..."] shortcodes in legacy content */
export interface RelatedArticle {
  id: number;
  title: string;
  slug: string;
}

export interface ArticleRecord {
  id: number;
  title: string;
  slug: string | null;
  excerpt: string | null;
  content?: string | null;
  thumbnail_url: string | null;
  author_id: number | null;
  sub_heading?: string | null;
  status: string;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords?: string | null;
  created_at?: string;
  updated_at?: string;
  category_ids?: number[];
  tag_ids?: number[];
  article_type_ids?: number[];
  court_ids?: number[];
  /** Resolved from [related id="..."] in content (legacy shortcodes) */
  related_articles?: RelatedArticle[];
}

export interface ArticleListParams {
  status?: string;
  limit?: number;
  offset?: number;
  page?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export interface ArticlesPaginatedResponse {
  data: ArticleRecord[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export type { ListQuery as ListParams } from "./apiFactory";
export type { PaginatedResponse } from "./apiFactory";

const BASE_URL = "/admin/platform/articles";

export const articlesApi = createCrudApi<ArticleRecord>(BASE_URL);

/** Server-side paginated list for DataTable */
export async function fetchArticlesPaginated(
  params: DataTableFetchParams
): Promise<DataTableFetchResult<ArticleRecord>> {
  const { data } = await api.get<ArticlesPaginatedResponse>(BASE_URL, {
    params: {
      page: params.page,
      limit: params.limit,
      search: params.search || undefined,
      sortBy: params.sortBy || undefined,
      sortOrder: params.sortOrder,
    },
  });
  const resolved = (data as ArticlesPaginatedResponse)?.data !== undefined
    ? (data as ArticlesPaginatedResponse)
    : { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0, hasNextPage: false, hasPreviousPage: false } };
  return {
    data: resolved.data ?? [],
    meta: resolved.meta,
  };
}

/** Legacy: fetch list (no pagination meta). Prefer fetchArticlesPaginated for DataTable. */
export async function fetchArticles(params: ArticleListParams = {}) {
  const res = await fetchArticlesPaginated({
    page: params.page ?? 1,
    limit: params.limit ?? 200,
    search: params.search ?? "",
    sortBy: params.sortBy ?? "created_at",
    sortOrder: params.sortOrder ?? "DESC",
  });
  return res.data;
}

// Taxonomy option shape
export interface TaxonomyOption {
  id: number;
  name: string;
  slug: string | null;
}

const TAX_BASE = "/admin/platform";

export async function fetchArticleCategories(): Promise<TaxonomyOption[]> {
  const { data } = await api.get<TaxonomyOption[] | { data: TaxonomyOption[] }>(`${TAX_BASE}/article-categories`);
  return Array.isArray(data) ? data : (data as { data: TaxonomyOption[] })?.data ?? [];
}

export async function fetchTags(): Promise<TaxonomyOption[]> {
  const { data } = await api.get<TaxonomyOption[] | { data: TaxonomyOption[] }>(`${TAX_BASE}/tags`);
  return Array.isArray(data) ? data : (data as { data: TaxonomyOption[] })?.data ?? [];
}

export async function fetchArticleTypes(): Promise<TaxonomyOption[]> {
  const { data } = await api.get<TaxonomyOption[] | { data: TaxonomyOption[] }>(`${TAX_BASE}/article-types`);
  return Array.isArray(data) ? data : (data as { data: TaxonomyOption[] })?.data ?? [];
}

export async function fetchCourts(): Promise<TaxonomyOption[]> {
  const { data } = await api.get<TaxonomyOption[] | { data: TaxonomyOption[] }>(`${TAX_BASE}/courts`);
  return Array.isArray(data) ? data : (data as { data: TaxonomyOption[] })?.data ?? [];
}
