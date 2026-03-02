import { api } from "./axios";

export async function fetchCoursePageSettings(): Promise<Record<string, string | null>> {
    const res = await api.get<Record<string, string | null>>("/admin/course-page-settings");
    return res.data ?? {};
}

export async function updateCoursePageSetting(key: string, value: string | null): Promise<void> {
    await api.put(`/admin/course-page-settings/${encodeURIComponent(key)}`, { value });
}
