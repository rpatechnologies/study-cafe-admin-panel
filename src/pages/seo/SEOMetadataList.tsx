import { useState } from "react";
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
import { EyeIcon, PencilIcon, TrashBinIcon } from "../../icons";
import { useModal } from "../../hooks/useModal";
import { RequirePermission } from "../../components/auth/RequirePermission";
import { PERM_SEO_CREATE, PERM_SEO_EDIT, PERM_SEO_DELETE } from "../../constants/permissions";

export interface SEOMetadata {
  id: number;
  pageName: string;
  pageSlug: string;
  metaTitle: string;
  metaDescription: string;
  robots: string;
}

const mockSEOMetadata: SEOMetadata[] = [
  {
    id: 1,
    pageName: "Home",
    pageSlug: "/",
    metaTitle: "StudyCafe – CA, CS, CWA | GST, Income Tax & Professional Courses",
    metaDescription:
      "Studycafe.in – Your trusted platform for CA, CS, CWA exam preparation, GST, Income Tax, and Business News.",
    robots: "index, follow",
  },
  {
    id: 2,
    pageName: "About",
    pageSlug: "/about",
    metaTitle: "About StudyCafe | CA, CS, CWA Courses",
    metaDescription:
      "Learn about StudyCafe – your trusted platform for CA, CS, CWA exam preparation.",
    robots: "index, follow",
  },
  {
    id: 3,
    pageName: "Privacy Policy",
    pageSlug: "/privacy-policy",
    metaTitle: "Privacy Policy | StudyCafe",
    metaDescription:
      "Read our privacy policy to understand how we collect, use, and protect your information.",
    robots: "index, follow",
  },
];

export default function SEOMetadataList() {
  const [entries, setEntries] = useState<SEOMetadata[]>(mockSEOMetadata);
  const [deleteTarget, setDeleteTarget] = useState<SEOMetadata | null>(null);
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

  const handleDeleteClick = (entry: SEOMetadata) => {
    setDeleteTarget(entry);
    openDeleteModal();
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setEntries((prev) => prev.filter((e) => e.id !== deleteTarget.id));
      setDeleteTarget(null);
      closeDeleteModal();
    }
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
    closeDeleteModal();
  };

  return (
    <>
      <PageMeta
        title="SEO Metadata | StudyCafe Admin"
        description="Manage SEO metadata for studycafe.in"
      />
      <PageBreadcrumb
        pageTitle="SEO Metadata"
        actions={
          <RequirePermission permissions={[PERM_SEO_CREATE]} fallback={null}>
            <Link
              to="/seo-metadata/create"
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
                    Page
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Meta Title
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Meta Description
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Robots
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
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="px-5 py-4 text-start">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {entry.pageName}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {entry.pageSlug}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90 max-w-xs">
                      <span className="line-clamp-2">{entry.metaTitle}</span>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400 max-w-md">
                      <span className="line-clamp-2">{entry.metaDescription}</span>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                      {entry.robots}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-end">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/seo-metadata/${entry.id}`}
                          className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                          title="View"
                        >
                          <EyeIcon className="size-4 shrink-0 fill-current" />
                          View
                        </Link>
                        <RequirePermission permissions={[PERM_SEO_EDIT]} fallback={null}>
                          <Link
                            to={`/seo-metadata/${entry.id}/edit`}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                            title="Edit"
                          >
                            <PencilIcon className="size-4 shrink-0 fill-current" />
                            Edit
                          </Link>
                        </RequirePermission>
                        <RequirePermission permissions={[PERM_SEO_DELETE]} fallback={null}>
                          <button
                            type="button"
                            onClick={() => handleDeleteClick(entry)}
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
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete SEO Metadata"
        itemName={deleteTarget?.pageName}
      />
    </>
  );
}
