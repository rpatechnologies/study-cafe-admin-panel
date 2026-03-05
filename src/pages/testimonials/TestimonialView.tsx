import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { ConfirmDeleteModal } from "../../components/ui/modal/ConfirmDeleteModal";
import { useModal } from "../../hooks/useModal";
import { RequirePermission } from "../../components/auth/RequirePermission";
import { PERM_TESTIMONIALS_EDIT, PERM_TESTIMONIALS_DELETE } from "../../constants/permissions";
import { fetchTestimonial, deleteTestimonial, Testimonial } from "../../api/testimonials";

export default function TestimonialView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  useEffect(() => {
    if (id) {
      loadTestimonial(Number(id));
    }
  }, [id]);

  const loadTestimonial = async (testimonialId: number) => {
    try {
      setLoading(true);
      const data = await fetchTestimonial(testimonialId);
      setTestimonial(data);
    } catch (err) {
      console.error("Failed to load testimonial", err);
      alert("Failed to load testimonial or it does not exist.");
      navigate("/testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!id) return;
    try {
      setIsDeleting(true);
      await deleteTestimonial(Number(id));
      closeDeleteModal();
      navigate("/testimonials");
    } catch (err: any) {
      console.error("Failed to delete testimonial", err);
      alert(err.response?.data?.message || "Failed to delete testimonial");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading || !testimonial) {
    return (
      <div className="flex items-center justify-center p-20">
        <p className="text-gray-500">Loading testimonial...</p>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title={`${testimonial.author_name} | StudyCafe Admin`}
        description="View testimonial for studycafe.in"
      />
      <PageBreadcrumb
        pageTitle={testimonial.author_name}
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
                disabled={isDeleting}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition bg-error-500 shadow-theme-xs hover:bg-error-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Deleting..." : "Delete"}
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
                Quote / Content
              </p>
              <p className="mt-1 text-gray-800 dark:text-white/90 italic">
                "{testimonial.content}"
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Author
              </p>
              <p className="text-gray-800 dark:text-white/90">
                {testimonial.author_name}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Role / Designation
              </p>
              <p className="text-gray-800 dark:text-white/90">
                {testimonial.author_role}
              </p>
            </div>
            <div className="flex gap-10">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Rating
                </p>
                <p className="text-gray-800 dark:text-white/90">
                  {testimonial.rating || "-"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Sort Order
                </p>
                <p className="text-gray-800 dark:text-white/90">
                  {testimonial.sort_order}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        title="Delete Testimonial"
        itemName={testimonial.author_name}
      />
    </>
  );
}
