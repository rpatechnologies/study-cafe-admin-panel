import { DataTableFetchParams, DataTableFetchResult } from "../components/tables/data-table/DataTable.types";

/**
 * Wraps an API call that returns a full unpaginated array
 * into a paginated provider for DataTable.
 */
export function withClientPagination<T>(
    fetchAll: () => Promise<T[]>,
    searchKeys?: (keyof T)[]
): (params: DataTableFetchParams) => Promise<DataTableFetchResult<T>> {
    return async (params: DataTableFetchParams) => {
        let data = await fetchAll();

        // 1. Search locally
        if (params.search && searchKeys && searchKeys.length > 0) {
            const lowerSearch = params.search.toLowerCase();
            data = data.filter((item) =>
                searchKeys.some((key) => {
                    const val = item[key];
                    return val != null && String(val).toLowerCase().includes(lowerSearch);
                })
            );
        }

        // 2. Sort locally
        if (params.sortBy) {
            const { sortBy, sortOrder } = params;
            data = [...data].sort((a, b) => {
                const valA = a[sortBy as keyof T];
                const valB = b[sortBy as keyof T];

                if (typeof valA === 'string' && typeof valB === 'string') {
                    return sortOrder === "DESC"
                        ? valB.localeCompare(valA)
                        : valA.localeCompare(valB);
                }

                if (valA < valB) return sortOrder === "DESC" ? 1 : -1;
                if (valA > valB) return sortOrder === "DESC" ? -1 : 1;
                return 0;
            });
        }

        // 3. Paginate locally
        const limit = params.limit || 10;
        const page = params.page || 1;
        const total = data.length;
        const totalPages = Math.max(1, Math.ceil(total / limit));

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedData = data.slice(startIndex, endIndex);

        return {
            data: paginatedData,
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    };
}
