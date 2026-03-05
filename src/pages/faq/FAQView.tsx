import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { ConfirmDeleteModal } from "../../components/ui/modal/ConfirmDeleteModal";
import { useModal } from "../../hooks/useModal";
import { RequirePermission } from "../../components/auth/RequirePermission";
import { PERM_FAQ_EDIT, PERM_FAQ_DELETE } from "../../constants/permissions";
import { fetchFaq, deleteFaq, Faq } from "../../api/faqs";

export default function FAQView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [faq, setFaq] = useState<Faq | null>(null);
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

  useEffect(() => {
    if (id) {
      loadFaq(Number(id));
    }
  }, [id]);

  const loadFaq = async (faqId: number) => {
    try {
      setLoading(true);
      const data = await fetchFaq(faqId);
      setFaq(data);
    } catch (err) {
      console.error("Failed to load FAQ details", err);
      alert("Failed to load FAQ details. It may not exist.");
      navigate("/faq");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!id) return;
    try {
      await deleteFaq(Number(id));
      closeDeleteModal();
      navigate("/faq");
    } catch (err: any) {
      console.error("Failed to delete FAQ", err);
      alert(err.response?.data?.message || "Failed to delete FAQ");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <p className="text-gray-500">Loading FAQ data...</p>
      </div>
    );
  }

  if (!faq) {
    return (
      <div className="flex items-center justify-center p-20">
        <p className="text-red-500">FAQ not found.</p>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title={`${faq.question} | StudyCafe Admin`}
        description="View FAQ for studycafe.in"
      />
      <PageBreadcrumb
        pageTitle={faq.question}
        compact
        actions={
          <div className="flex items-center gap-2">
            <RequirePermission permissions={[PERM_FAQ_EDIT]} fallback={null}>
              <Link
                to={`/faq/${id}/edit`}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition bg-brand-500 shadow-theme-xs hover:bg-brand-600"
              >
                Edit
              </Link>
            </RequirePermission>
            <RequirePermission permissions={[PERM_FAQ_DELETE]} fallback={null}>
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
                Question
              </p>
              <p className="mt-1 text-gray-800 dark:text-white/90">
                {faq.question}
              </p>
            </div>
            {faq.sort_order !== undefined && (
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Sort Order
                </p>
                <p className="mt-1 text-gray-800 dark:text-white/90">
                  {faq.sort_order}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Answer
              </p>
              <div
                className="mt-1 prose prose-sm dark:prose-invert max-w-none text-gray-800 dark:text-white/90"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        title="Delete FAQ"
        itemName={faq.question}
      />
    </>
  );
}
