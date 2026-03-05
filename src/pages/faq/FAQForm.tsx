import { useState } from "react";
import { Link } from "react-router";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import RichTextEditor from "../../components/form/RichTextEditor";
import Button from "../../components/ui/button/Button";

export interface FAQFormData {
  question: string;
  answer: string;
  sort_order: string;
}

interface FAQFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<FAQFormData>;
  loading?: boolean;
  onSubmit: (data: FAQFormData) => void;
}

const emptyFormData: FAQFormData = {
  question: "",
  answer: "",
  sort_order: "",
};

export default function FAQForm({
  mode,
  defaultValues,
  loading = false,
  onSubmit,
}: FAQFormProps) {
  const [formData, setFormData] = useState<FAQFormData>({
    ...emptyFormData,
    ...defaultValues,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const submitLabel = mode === "create" ? "Create FAQ" : "Update FAQ";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
              required
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
          <div>
            <Label>Sort Order</Label>
            <Input
              type="number"
              value={formData.sort_order}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, sort_order: e.target.value }))
              }
              placeholder="0 (Optional)"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : submitLabel}
        </button>
        <Link to="/faq">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}
