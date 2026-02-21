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
import { PERM_TESTIMONIALS_CREATE, PERM_TESTIMONIALS_EDIT, PERM_TESTIMONIALS_DELETE } from "../../constants/permissions";

export interface Testimonial {
  id: number;
  quote: string;
  authorName: string;
  authorRole: string;
}

const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Studycafe has been instrumental in my CA preparation. The quality of content and courses is exceptional.",
    authorName: "Priya Sharma",
    authorRole: "CA Final Student",
  },
  {
    id: 2,
    quote:
      "The GST and Income Tax articles are always up to date. Great resource for professionals.",
    authorName: "Rahul Gupta",
    authorRole: "CA, Practicing",
  },
  {
    id: 3,
    quote:
      "Best platform for CA, CS, and CWA exam preparation. Highly recommended!",
    authorName: "Anita Singh",
    authorRole: "CS Executive",
  },
];

export default function TestimonialList() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

  const handleDeleteClick = (testimonial: Testimonial) => {
    setDeleteTarget(testimonial);
    openDeleteModal();
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setTestimonials((prev) => prev.filter((t) => t.id !== deleteTarget.id));
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
        title="Testimonials | StudyCafe Admin"
        description="Manage testimonials for studycafe.in"
      />
      <PageBreadcrumb
        pageTitle="Testimonials"
        actions={
          <RequirePermission permissions={[PERM_TESTIMONIALS_CREATE]} fallback={null}>
            <Link
              to="/testimonials/create"
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
                    Author
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Quote
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
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell className="px-5 py-4 text-start">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {testimonial.authorName}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {testimonial.authorRole}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400 line-clamp-2 max-w-md">
                      {testimonial.quote}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-end">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/testimonials/${testimonial.id}`}
                          className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                          title="View"
                        >
                          <EyeIcon className="size-4 shrink-0 fill-current" />
                          View
                        </Link>
                        <RequirePermission permissions={[PERM_TESTIMONIALS_EDIT]} fallback={null}>
                          <Link
                            to={`/testimonials/${testimonial.id}/edit`}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                            title="Edit"
                          >
                            <PencilIcon className="size-4 shrink-0 fill-current" />
                            Edit
                          </Link>
                        </RequirePermission>
                        <RequirePermission permissions={[PERM_TESTIMONIALS_DELETE]} fallback={null}>
                          <button
                            type="button"
                            onClick={() => handleDeleteClick(testimonial)}
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
        title="Delete Testimonial"
        itemName={deleteTarget?.authorName}
      />
    </>
  );
}
