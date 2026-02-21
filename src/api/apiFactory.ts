/**
 * API Factory — Generic CRUD client builder.
 * 
 * Generates type-safe list/get/create/update/delete methods for any resource.
 * Extend with custom methods by spreading:
 * 
 * Usage:
 *   const usersApi = createCrudApi<User>('/users', {
 *     customMethod: async () => { ... }
 *   });
 */

import { api } from "./axios";

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    pages: number;
}

export interface ListQuery {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
    [key: string]: unknown;
}

export function createCrudApi<T extends { id: string | number }>(
    basePath: string,
    extensions?: Record<string, (...args: any[]) => any>
) {
    return {
        async list(params: ListQuery = {}): Promise<PaginatedResponse<T>> {
            const { data } = await api.get<PaginatedResponse<T> | T[]>(basePath, { params });
            // Backend may return { data: T[], total, page, limit, pages } (paginated) or a bare array
            const list = Array.isArray(data) ? data : (data?.data ?? []);
            const total = typeof (data as PaginatedResponse<T>)?.total === 'number' ? (data as PaginatedResponse<T>).total : list.length;
            const page = typeof (data as PaginatedResponse<T>)?.page === 'number' ? (data as PaginatedResponse<T>).page : 1;
            const limit = typeof (data as PaginatedResponse<T>)?.limit === 'number' ? (data as PaginatedResponse<T>).limit : (total || 10);
            const pages = typeof (data as PaginatedResponse<T>)?.pages === 'number' ? (data as PaginatedResponse<T>).pages : (total ? Math.ceil(total / limit) || 1 : 0);
            return { data: list, total, page, limit, pages };
        },

        async get(id: string | number): Promise<T> {
            const { data } = await api.get<T>(`${basePath}/${id}`);
            return data;
        },

        async create(payload: Partial<T>): Promise<T> {
            const { data } = await api.post<T>(basePath, payload);
            return data;
        },

        async update(id: string | number, payload: Partial<T>): Promise<T> {
            const { data } = await api.put<T>(`${basePath}/${id}`, payload);
            return data;
        },

        async delete(id: string | number): Promise<void> {
            await api.delete(`${basePath}/${id}`);
        },

        // Spread any custom extensions
        ...extensions,
    };
}
