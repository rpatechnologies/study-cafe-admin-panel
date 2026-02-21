import { useNavigate } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import TestimonialForm, { type TestimonialFormData } from "./TestimonialForm";

export default function TestimonialCreate() {
  const navigate = useNavigate();

  const handleSubmit = (formData: TestimonialFormData) => {
    // TODO: Integrate with API when backend is ready
    console.log("Create testimonial", formData);
    navigate("/testimonials");
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
      <TestimonialForm mode="create" onSubmit={handleSubmit} />
    </>
  );
}
