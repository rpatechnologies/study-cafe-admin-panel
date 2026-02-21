import { useState, useEffect } from "react";
import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { ConfirmDeleteModal } from "../../components/ui/modal/ConfirmDeleteModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import { EyeIcon, PencilIcon, TrashBinIcon } from "../../icons";
import { useModal } from "../../hooks/useModal";
import { RequirePermission } from "../../components/auth/RequirePermission";
import { adminUsersApi, type AdminPanelUser } from "../../api/adminUsers";
import { PERM_ADMIN_USERS_LIST, PERM_ADMIN_USERS_VIEW, PERM_ADMIN_USERS_EDIT, PERM_ADMIN_USERS_DELETE } from "../../constants/permissions";

export default function AdminUserList() {
  const [users, setUsers] = useState<AdminPanelUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminPanelUser | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

  useEffect(() => {
    adminUsersApi
      .list()
      .then(setUsers)
      .catch((err) => setError(err.response?.data?.error || "Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteClick = (user: AdminPanelUser) => {
    setDeleteTarget(user);
    openDeleteModal();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminUsersApi.delete(deleteTarget.id);
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      setDeleteTarget(null);
      closeDeleteModal();
    } catch (err: unknown) {
      setError((err as { response?: { data?: { error?: string } } })?.response?.data?.error || "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
    closeDeleteModal();
  };

  return (
    <RequirePermission permissions={[PERM_ADMIN_USERS_LIST]}>
      <PageMeta
        title="Admin Users | StudyCafe Admin"
        description="Manage admin panel users and permissions"
      />
      <PageBreadcrumb
        pageTitle="Admin Users"
        actions={
          <RequirePermission permissions={["admin_users:create"]}>
            <Link
              to="/admin-users/create"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition bg-brand-500 shadow-theme-xs hover:bg-brand-600"
            >
              Create Admin User
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
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Name
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Email
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Role
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Status
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="px-5 py-4 font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {user.name || "—"}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-600 text-theme-sm dark:text-gray-300">
                        {user.email}
                      </TableCell>
                      <TableCell className="px-5 py-4">
                        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-theme-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4">
                        <Badge
                          size="sm"
                          color={user.is_active ? "success" : "error"}
                        >
                          {user.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-end">
                        <div className="flex items-center justify-end gap-2">
                          <RequirePermission permissions={[PERM_ADMIN_USERS_VIEW, PERM_ADMIN_USERS_EDIT]}>
                            <Link
                              to={`/admin-users/${user.id}`}
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                              title="View"
                            >
                              <EyeIcon className="size-4 shrink-0 fill-current" />
                              View
                            </Link>
                            <Link
                              to={`/admin-users/${user.id}/edit`}
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                              title="Edit"
                            >
                              <PencilIcon className="size-4 shrink-0 fill-current" />
                              Edit
                            </Link>
                          </RequirePermission>
                          <RequirePermission permissions={[PERM_ADMIN_USERS_DELETE]}>
                            <button
                              type="button"
                              onClick={() => handleDeleteClick(user)}
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-gray-600 transition hover:bg-error-50 hover:text-error-500 dark:text-gray-400 dark:hover:bg-error-500/10 dark:hover:text-error-400"
                              title="Delete"
                            >
                              <TrashBinIcon className="size-4 shrink-0 fill-current" />
                              Delete
                            </button>
                          </RequirePermission>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {users.length === 0 && !loading && (
              <div className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                No admin users yet. Create one to get started.
              </div>
            )}
          </div>
        )}
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Admin User"
        itemName={deleteTarget?.email}
        isLoading={deleting}
      />
    </RequirePermission>
  );
}
