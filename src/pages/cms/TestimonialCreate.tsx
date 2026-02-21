import { useState } from "react";
import { Link, useNavigate } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";

export default function TestimonialCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    quote: "",
    authorName: "",
    authorRole: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with API when backend is ready
    console.log("Create testimonial", formData);
    navigate("/content/testimonial");
  };

  return (
    <>
      <PageMeta
        title="Create Testimonial | StudyCafe Admin"
        description="Add new testimonial for studycafe.in"
      />
      <PageBreadcrumb
        pageTitle="Create Testimonial"
        compact
      />

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

          <div className="mt-6 flex gap-3">
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition bg-brand-500 shadow-theme-xs hover:bg-brand-600">
              Create Testimonial
            </button>
            <Link to="/content/testimonial">
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
    </>
  );
}
