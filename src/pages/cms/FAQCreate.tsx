import { useState } from "react";
import { Link, useNavigate } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import RichTextEditor from "../../components/form/RichTextEditor";
import Button from "../../components/ui/button/Button";

export default function FAQCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with API when backend is ready
    console.log("Create FAQ", formData);
    navigate("/content/faq");
  };

  return (
    <>
      <PageMeta
        title="Create FAQ | StudyCafe Admin"
        description="Add new FAQ for studycafe.in"
      />
      <PageBreadcrumb
        pageTitle="Create FAQ"
        compact
      />

      <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
            <div className="space-y-4">
              <div>
                <Label>Question <span className="text-error-500">*</span></Label>
                <Input
                  value={formData.question}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, question: e.target.value }))
                  }
                  placeholder="Enter question"
                />
              </div>
              <div>
                <Label>Answer <span className="text-error-500">*</span></Label>
                <RichTextEditor
                  value={formData.answer}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, answer: value }))
                  }
                  placeholder="Enter answer"
                  minHeight="200px"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition bg-brand-500 shadow-theme-xs hover:bg-brand-600"
            >
              Create FAQ
            </button>
            <Link to="/content/faq">
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
    </>
  );
}
