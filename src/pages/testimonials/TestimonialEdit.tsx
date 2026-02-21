import { useNavigate, useParams } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import TestimonialForm, { type TestimonialFormData } from "./TestimonialForm";
import type { Testimonial } from "./TestimonialList";

const mockTestimonial: Testimonial = {
  id: 1,
  quote:
    "Studycafe has been instrumental in my CA preparation. The quality of content and courses is exceptional.",
  authorName: "Priya Sharma",
  authorRole: "CA Final Student",
};

export default function TestimonialEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const defaultValues: TestimonialFormData = {
    quote: mockTestimonial.quote,
    authorName: mockTestimonial.authorName,
    authorRole: mockTestimonial.authorRole,
  };

  const handleSubmit = (formData: TestimonialFormData) => {
    // TODO: Integrate with API when backend is ready
    console.log("Update testimonial", id, formData);
    navigate("/testimonials");
  };

  return (
    <>
      <PageMeta
        title="Edit Testimonial | StudyCafe Admin"
        description="Edit testimonial for studycafe.in"
      />
      <PageBreadcrumb
        pageTitle="Edit Testimonial"
        compact
      />
      <TestimonialForm
        mode="edit"
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      />
    </>
  );
}
