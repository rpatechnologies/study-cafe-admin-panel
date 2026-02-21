import { useState } from "react";
import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import RichTextEditor from "../../components/form/RichTextEditor";
import Button from "../../components/ui/button/Button";
import { ConfirmDeleteModal } from "../../components/ui/modal/ConfirmDeleteModal";
import { useModal } from "../../hooks/useModal";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQContent() {
  const [sectionTitle, setSectionTitle] = useState("Frequently Asked Questions");
  const [faqs, setFaqs] = useState<FAQItem[]>([
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
  ]);


  const updateFAQ = (id: number, field: keyof FAQItem, value: string) => {
    setFaqs((prev) =>
      prev.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq))
    );
  };

  const [deleteTarget, setDeleteTarget] = useState<FAQItem | null>(null);
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

  const handleRemoveClick = (faq: FAQItem) => {
    setDeleteTarget(faq);
    openDeleteModal();
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setFaqs((prev) => prev.filter((faq) => faq.id !== deleteTarget.id));
      setDeleteTarget(null);
      closeDeleteModal();
    }
  };

  const handleSave = () => {
    // TODO: Integrate with API when backend is ready
    console.log("Save", { sectionTitle, faqs });
  };

  return (
    <>
      <PageMeta
        title="FAQ Content | StudyCafe Admin"
        description="Manage FAQ section for studycafe.in"
      />
      <PageBreadcrumb pageTitle="FAQ Content" />
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              FAQ Section
            </h3>
            <div className="flex gap-2">
              <Link
                to="/content/faq/create"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition bg-brand-500 shadow-theme-xs hover:bg-brand-600"
              >
                Create New
              </Link>
            </div>
          </div>
          <div className="mb-6">
            <Label>Section Title</Label>
            <Input
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              placeholder="Frequently Asked Questions"
            />
          </div>

          <div className="space-y-6">
            <Label>FAQ Items</Label>
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-white/[0.03]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    FAQ #{faqs.indexOf(faq) + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveClick(faq)}
                    className="text-sm text-error-500 hover:text-error-600"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Question</Label>
                    <Input
                      value={faq.question}
                      onChange={(e) =>
                        updateFAQ(faq.id, "question", e.target.value)
                      }
                      placeholder="Enter question"
                    />
                  </div>
                  <div>
                    <Label>Answer</Label>
                    <RichTextEditor
                      value={faq.answer}
                      onChange={(value) => updateFAQ(faq.id, "answer", value)}
                      placeholder="Enter answer"
                      minHeight="120px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <Button onClick={handleSave} size="sm">
            Save Changes
          </Button>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => { setDeleteTarget(null); closeDeleteModal(); }}
        onConfirm={handleDeleteConfirm}
        title="Remove FAQ"
        itemName={deleteTarget?.question}
        message="Are you sure you want to remove this FAQ item? This action cannot be undone."
      />
    </>
  );
}
