import { Link, useNavigate, useParams } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { ConfirmDeleteModal } from "../../components/ui/modal/ConfirmDeleteModal";
import { useModal } from "../../hooks/useModal";
import type { Testimonial } from "./TestimonialList";
import { RequirePermission } from "../../components/auth/RequirePermission";
import { PERM_TESTIMONIALS_EDIT, PERM_TESTIMONIALS_DELETE } from "../../constants/permissions";

const mockTestimonial: Testimonial = {
  id: 1,
  quote:
    "Studycafe has been instrumental in my CA preparation. The quality of content and courses is exceptional.",
  authorName: "Priya Sharma",
  authorRole: "CA Final Student",
};

export default function TestimonialView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const testimonial = mockTestimonial; // TODO: Fetch by id when API is ready
  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const handleDeleteConfirm = () => {
    // TODO: Integrate with API when backend is ready
    console.log("Delete testimonial", id);
    closeDeleteModal();
    navigate("/testimonials");
  };

  return (
    <>
      <PageMeta
        title={`${testimonial.authorName} | StudyCafe Admin`}
        description="View testimonial for studycafe.in"
      />
      <PageBreadcrumb
        pageTitle={testimonial.authorName}
        compact
        actions={
          <div className="flex items-center gap-2">
            <RequirePermission permissions={[PERM_TESTIMONIALS_EDIT]} fallback={null}>
              <Link
                to={`/testimonials/${id}/edit`}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition bg-brand-500 shadow-theme-xs hover:bg-brand-600"
              >
                Edit
              </Link>
            </RequirePermission>
            <RequirePermission permissions={[PERM_TESTIMONIALS_DELETE]} fallback={null}>
              <button
                type="button"
                onClick={openDeleteModal}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition bg-error-500 shadow-theme-xs hover:bg-error-600"
              >
                Delete
              </button>
            </RequirePermission>
          </div>
        }
      />

      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Quote
              </p>
              <p className="mt-1 text-gray-800 dark:text-white/90 italic">
                "{testimonial.quote}"
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Author
              </p>
              <p className="text-gray-800 dark:text-white/90">
                {testimonial.authorName}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Role / Designation
              </p>
              <p className="text-gray-800 dark:text-white/90">
                {testimonial.authorRole}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        title="Delete Testimonial"
        itemName={testimonial.authorName}
      />
    </>
  );
}
