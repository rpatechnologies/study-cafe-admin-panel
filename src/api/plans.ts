import { createCrudApi } from "./apiFactory";

export interface Plan {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string | number;
    currency: string;
    duration_days: number;
    is_lifetime?: boolean;
    features: string[]; // Handled as JSON array in backend
    sort_order: number;
    is_active: boolean;
    course_ids?: number[];
    course_cat_ids?: number[];
    created_at?: string;
    updated_at?: string;
}

// Re-export ListQuery from factory for convenience
export type { ListQuery as ListParams } from "./apiFactory";
export type { PaginatedResponse } from "./apiFactory";

// Base path for admin-accessible platform plans
const BASE_URL = '/admin/platform/plans';

export const plansApi = createCrudApi<Plan>(BASE_URL);
