import { useState } from "react";
import { Link } from "react-router";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";

export interface TestimonialFormData {
  quote: string;
  authorName: string;
  authorRole: string;
}

interface TestimonialFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<TestimonialFormData>;
  onSubmit: (data: TestimonialFormData) => void;
}

const emptyFormData: TestimonialFormData = {
  quote: "",
  authorName: "",
  authorRole: "",
};

export default function TestimonialForm({
  mode,
  defaultValues,
  onSubmit,
}: TestimonialFormProps) {
  const [formData, setFormData] = useState<TestimonialFormData>({
    ...emptyFormData,
    ...defaultValues,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const submitLabel = mode === "create" ? "Create Testimonial" : "Update Testimonial";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
        <div className="space-y-4">
          <div>
            <Label>Quote <span className="text-error-500">*</span></Label>
            <TextArea
              rows={4}
              value={formData.quote}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, quote: value }))
              }
              placeholder="Enter testimonial quote"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Author Name <span className="text-error-500">*</span></Label>
              <Input
                value={formData.authorName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, authorName: e.target.value }))
                }
                placeholder="e.g. Priya Sharma"
              />
            </div>
            <div>
              <Label>Author Role / Designation</Label>
              <Input
                value={formData.authorRole}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, authorRole: e.target.value }))
                }
                placeholder="e.g. CA Final Student"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition bg-brand-500 shadow-theme-xs hover:bg-brand-600"
        >
          {submitLabel}
        </button>
        <Link to="/testimonials">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}
