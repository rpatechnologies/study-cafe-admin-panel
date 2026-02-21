import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { adminUsersApi, type AdminPanelUserDetail } from "../../api/adminUsers";
import { RequirePermission } from "../../components/auth/RequirePermission";
import { PERM_ADMIN_USERS_VIEW } from "../../constants/permissions";
import Badge from "../../components/ui/badge/Badge";

export default function AdminUserView() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<AdminPanelUserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    adminUsersApi
      .getOne(parseInt(id, 10))
      .then(setUser)
      .catch(() => setError("User not found"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <RequirePermission permissions={[PERM_ADMIN_USERS_VIEW]}>
      <PageMeta
        title={user ? `${user.name || user.email} | Admin Users` : "Admin User | StudyCafe Admin"}
        description="View admin user details"
      />
      <PageBreadcrumb
        pageTitle="View Admin User"
        items={[{ label: "Admin Users", path: "/admin-users" }]}
        actions={
          <RequirePermission permissions={["admin_users:edit"]} fallback={null}>
            <Link
              to={`/admin-users/${id}/edit`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Edit
            </Link>
          </RequirePermission>
        }
      />
      <div className="space-y-6">
        {error && (
          <div className="rounded-lg border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700 dark:border-error-800 dark:bg-error-500/10 dark:text-error-400">
            {error}
          </div>
        )}
        {loading && <p className="text-gray-500 dark:text-gray-400">Loading...</p>}
        {user && !loading && (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
            <dl className="grid gap-4 sm:grid-cols-1">
              <div>
                <dt className="text-theme-xs font-medium text-gray-500 dark:text-gray-400">Email</dt>
                <dd className="mt-1 text-theme-sm text-gray-800 dark:text-white/90">{user.email}</dd>
              </div>
              <div>
                <dt className="text-theme-xs font-medium text-gray-500 dark:text-gray-400">Name</dt>
                <dd className="mt-1 text-theme-sm text-gray-800 dark:text-white/90">{user.name || "—"}</dd>
              </div>
              <div>
                <dt className="text-theme-xs font-medium text-gray-500 dark:text-gray-400">Role</dt>
                <dd className="mt-1">
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-theme-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    {user.role}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-theme-xs font-medium text-gray-500 dark:text-gray-400">Status</dt>
                <dd className="mt-1">
                  <Badge size="sm" color={user.is_active ? "success" : "error"}>
                    {user.is_active ? "Active" : "Inactive"}
                  </Badge>
                </dd>
              </div>
              <div>
                <dt className="text-theme-xs font-medium text-gray-500 dark:text-gray-400">Permissions</dt>
                <dd className="mt-1 flex flex-wrap gap-1">
                  {user.permissions?.length ? (
                    user.permissions.map((p) => (
                      <span
                        key={p}
                        className="rounded bg-gray-100 px-1.5 py-0.5 text-theme-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      >
                        {p}
                      </span>
                    ))
                  ) : (
                    <span className="text-theme-sm text-gray-500 dark:text-gray-400">None</span>
                  )}
                </dd>
                {user.permission_overrides?.length ? (
                  <dd className="mt-2 text-theme-xs text-gray-500 dark:text-gray-400">
                    Additionally granted: {user.permission_overrides.join(", ")}
                  </dd>
                ) : null}
              </div>
            </dl>
          </div>
        )}
      </div>
    </RequirePermission>
  );
}
