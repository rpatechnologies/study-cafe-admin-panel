import { useState } from "react";
import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";
import { ConfirmDeleteModal } from "../../components/ui/modal/ConfirmDeleteModal";
import { useModal } from "../../hooks/useModal";

interface Testimonial {
  id: number;
  quote: string;
  authorName: string;
  authorRole: string;
}

export default function TestimonialContent() {
  const [sectionTitle, setSectionTitle] = useState("What Our Students Say");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      quote:
        "Studycafe has been instrumental in my CA preparation. The quality of content and courses is exceptional.",
      authorName: "Priya Sharma",
      authorRole: "CA Final Student",
    },
    {
      id: 2,
      quote:
        "The GST and Income Tax articles are always up to date. Great resource for professionals.",
      authorName: "Rahul Gupta",
      authorRole: "CA, Practicing",
    },
    {
      id: 3,
      quote:
        "Best platform for CA, CS, and CWA exam preparation. Highly recommended!",
      authorName: "Anita Singh",
      authorRole: "CS Executive",
    },
  ]);

  const updateTestimonial = (id: number, field: keyof Testimonial, value: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

  const handleRemoveClick = (testimonial: Testimonial) => {
    setDeleteTarget(testimonial);
    openDeleteModal();
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setTestimonials((prev) => prev.filter((t) => t.id !== deleteTarget.id));
      setDeleteTarget(null);
      closeDeleteModal();
    }
  };

  const handleSave = () => {
    // TODO: Integrate with API when backend is ready
    console.log("Save", { sectionTitle, testimonials });
  };

  return (
    <>
      <PageMeta
        title="Testimonial Content | StudyCafe Admin"
        description="Manage testimonials section for studycafe.in"
      />
      <PageBreadcrumb pageTitle="Testimonial Content" />
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Testimonial Section
            </h3>
            <div className="flex gap-2">
              <Link
                to="/content/testimonial/create"
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
              placeholder="What Our Students Say"
            />
          </div>

          <div className="space-y-6">
            <Label>Testimonials</Label>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-white/[0.03]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Testimonial #{testimonials.indexOf(testimonial) + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveClick(testimonial)}
                    className="text-sm text-error-500 hover:text-error-600"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Quote</Label>
                    <TextArea
                      rows={3}
                      value={testimonial.quote}
                      onChange={(value) =>
                        updateTestimonial(testimonial.id, "quote", value)
                      }
                      placeholder="Enter testimonial quote"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Author Name</Label>
                      <Input
                        value={testimonial.authorName}
                        onChange={(e) =>
                          updateTestimonial(testimonial.id, "authorName", e.target.value)
                        }
                        placeholder="e.g. Priya Sharma"
                      />
                    </div>
                    <div>
                      <Label>Author Role / Designation</Label>
                      <Input
                        value={testimonial.authorRole}
                        onChange={(e) =>
                          updateTestimonial(testimonial.id, "authorRole", e.target.value)
                        }
                        placeholder="e.g. CA Final Student"
                      />
                    </div>
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
        title="Remove Testimonial"
        itemName={deleteTarget?.authorName}
        message="Are you sure you want to remove this testimonial? This action cannot be undone."
      />
    </>
  );
}
