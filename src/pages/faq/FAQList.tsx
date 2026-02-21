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
import { PERM_FAQ_CREATE, PERM_FAQ_EDIT, PERM_FAQ_DELETE } from "../../constants/permissions";

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const mockFAQs: FAQ[] = [
  {
    id: 1,
    question: "How do I access StudyCafe courses?",
    answer:
      "After purchasing a course, you can access it from your dashboard. Log in with your credentials and navigate to the Courses section.",
  },
  {
    id: 2,
    question: "Are the courses updated regularly?",
    answer:
      "Yes, we regularly update our courses to reflect the latest changes in CA, CS, CWA syllabus, GST, and Income Tax regulations.",
  },
  {
    id: 3,
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "Please refer to our Refund Policy. We offer refunds within a specified period for certain membership and course purchases.",
  },
];

export default function FAQList() {
  const [faqs, setFaqs] = useState<FAQ[]>(mockFAQs);
  const [deleteTarget, setDeleteTarget] = useState<FAQ | null>(null);
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

  const handleDeleteClick = (faq: FAQ) => {
    setDeleteTarget(faq);
    openDeleteModal();
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setFaqs((prev) => prev.filter((f) => f.id !== deleteTarget.id));
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
        title="FAQs | StudyCafe Admin"
        description="Manage FAQs for studycafe.in"
      />
      <PageBreadcrumb
        pageTitle="FAQs"
        actions={
          <RequirePermission permissions={[PERM_FAQ_CREATE]} fallback={null}>
            <Link
              to="/faq/create"
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
                    Question
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Answer
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
                {faqs.map((faq) => (
                  <TableRow key={faq.id}>
                    <TableCell className="px-5 py-4 text-start">
                      <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {faq.question}
                      </span>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400 line-clamp-2 max-w-md">
                      {(() => {
                      const text = faq.answer.replace(/<[^>]*>/g, "").trim();
                      return text.length > 150 ? `${text.slice(0, 150)}...` : text;
                    })()}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-end">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/faq/${faq.id}`}
                          className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                          title="View"
                        >
                          <EyeIcon className="size-4 shrink-0 fill-current" />
                          View
                        </Link>
                        <RequirePermission permissions={[PERM_FAQ_EDIT]} fallback={null}>
                          <Link
                            to={`/faq/${faq.id}/edit`}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                            title="Edit"
                          >
                            <PencilIcon className="size-4 shrink-0 fill-current" />
                            Edit
                          </Link>
                        </RequirePermission>
                        <RequirePermission permissions={[PERM_FAQ_DELETE]} fallback={null}>
                          <button
                            type="button"
                            onClick={() => handleDeleteClick(faq)}
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
        title="Delete FAQ"
        itemName={deleteTarget?.question}
      />
    </>
  );
}
