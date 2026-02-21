import { api } from "./axios";

const AUTH_BASE = "/auth";

export interface AdminPanelUser {
  id: number;
  email: string;
  name: string;
  role_id: number;
  role: string;
  is_active: boolean;
}

export interface AdminPanelUserDetail extends AdminPanelUser {
  permissions: string[];
  /** Extra permissions granted on top of role (editable in admin) */
  permission_overrides?: string[];
}

export interface Role {
  id: number;
  name: string;
}

export interface CreateAdminUserPayload {
  email: string;
  password: string;
  name?: string;
  role_id: number;
  permission_overrides?: string[];
}

export interface UpdateAdminUserPayload {
  name?: string;
  role_id?: number;
  is_active?: boolean;
  password?: string;
  permission_overrides?: string[];
}

export const adminUsersApi = {
  async getRoles(): Promise<Role[]> {
    const { data } = await api.get<Role[]>(`${AUTH_BASE}/admin/roles`);
    return data;
  },

  async list(): Promise<AdminPanelUser[]> {
    const { data } = await api.get<AdminPanelUser[]>(`${AUTH_BASE}/admin/users`);
    return data;
  },

  async getOne(id: number): Promise<AdminPanelUserDetail> {
    const { data } = await api.get<AdminPanelUserDetail>(`${AUTH_BASE}/admin/users/${id}`);
    return data;
  },

  async create(payload: CreateAdminUserPayload): Promise<AdminPanelUserDetail> {
    const { data } = await api.post<AdminPanelUserDetail>(`${AUTH_BASE}/admin/users`, payload);
    return data;
  },

  async update(id: number, payload: UpdateAdminUserPayload): Promise<AdminPanelUserDetail> {
    const { data } = await api.patch<AdminPanelUserDetail>(`${AUTH_BASE}/admin/users/${id}`, payload);
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`${AUTH_BASE}/admin/users/${id}`);
  },
};
