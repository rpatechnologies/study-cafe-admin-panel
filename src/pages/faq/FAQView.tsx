import { Link, useNavigate, useParams } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { ConfirmDeleteModal } from "../../components/ui/modal/ConfirmDeleteModal";
import { useModal } from "../../hooks/useModal";
import type { FAQ } from "./FAQList";
import { RequirePermission } from "../../components/auth/RequirePermission";
import { PERM_FAQ_EDIT, PERM_FAQ_DELETE } from "../../constants/permissions";

const mockFAQ: FAQ = {
  id: 1,
  question: "How do I access StudyCafe courses?",
  answer:
    "After purchasing a course, you can access it from your dashboard. Log in with your credentials and navigate to the Courses section.",
};

export default function FAQView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const faq = mockFAQ; // TODO: Fetch by id when API is ready
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

  const handleDeleteConfirm = () => {
    // TODO: Integrate with API when backend is ready
    console.log("Delete FAQ", id);
    closeDeleteModal();
    navigate("/faq");
  };

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
