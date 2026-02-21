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
import { PERM_MEMBERSHIPS_CREATE, PERM_MEMBERSHIPS_EDIT, PERM_MEMBERSHIPS_DELETE } from "../../constants/permissions";
import { plansApi, type Plan } from "../../api/plans";

const formatDuration = (days: number) => {
  if (days >= 365) return `${(days / 365).toFixed(1).replace(/\.0$/, '')} year${days >= 730 ? 's' : ''}`;
  if (days >= 30) return `${(days / 30).toFixed(1).replace(/\.0$/, '')} month${days >= 60 ? 's' : ''}`;
  return `${days} day${days !== 1 ? 's' : ''}`;
};

export default function MembershipList() {
  const [memberships, setMemberships] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Plan | null>(null);
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

  const fetchMemberships = async () => {
    try {
      setLoading(true);
      const res = await plansApi.list();
      setMemberships(res.data);
    } catch (err) {
      console.error("Failed to fetch memberships", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const handleDeleteClick = (membership: Plan) => {
    setDeleteTarget(membership);
    openDeleteModal();
  };

  const handleDeleteConfirm = async () => {
    if (deleteTarget) {
      try {
        await plansApi.delete(deleteTarget.id);
        fetchMemberships();
        closeDeleteModal();
      } catch (err) {
        console.error("Failed to delete membership", err);
        alert("Failed to delete membership");
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
    closeDeleteModal();
  };

  return (
    <>
      <PageMeta
        title="Memberships | StudyCafe Admin"
        description="Manage memberships for studycafe.in"
      />
      <PageBreadcrumb
        pageTitle="Memberships"
        actions={
          <RequirePermission permissions={[PERM_MEMBERSHIPS_CREATE]} fallback={null}>
            <Link
              to="/memberships/create"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition bg-brand-500 shadow-theme-xs hover:bg-brand-600"
            >
              Create New
            </Link>
          </RequirePermission>
        }
      />
      <div className="space-y-6">
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
                    Price
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Duration
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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="px-5 py-8 text-center text-gray-500">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : memberships?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="px-5 py-8 text-center text-gray-500">
                      No memberships found.
                    </TableCell>
                  </TableRow>
                ) : (
                  memberships?.map((membership) => (
                    <TableRow key={membership.id}>
                      <TableCell className="px-5 py-4 text-start">
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {membership.name}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400 line-clamp-1">
                            {membership.description}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90">
                        {membership.currency} {membership.price}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                        {formatDuration(membership.duration_days)}
                      </TableCell>
                      <TableCell className="px-5 py-4">
                        <Badge
                          size="sm"
                          color={membership.is_active ? "success" : "error"}
                        >
                          {membership.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-end">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/memberships/${membership.id}`}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                            title="View"
                          >
                            <EyeIcon className="size-4 shrink-0 fill-current" />
                            View
                          </Link>
                          <RequirePermission permissions={[PERM_MEMBERSHIPS_EDIT]} fallback={null}>
                            <Link
                              to={`/memberships/${membership.id}/edit`}
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                              title="Edit"
                            >
                              <PencilIcon className="size-4 shrink-0 fill-current" />
                              Edit
                            </Link>
                          </RequirePermission>
                          <RequirePermission permissions={[PERM_MEMBERSHIPS_DELETE]} fallback={null}>
                            <button
                              type="button"
                              onClick={() => handleDeleteClick(membership)}
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
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Membership"
        itemName={deleteTarget?.name}
      />
    </>
  );
}
