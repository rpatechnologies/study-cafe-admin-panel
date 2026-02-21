import { useNavigate } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import FAQForm, { type FAQFormData } from "./FAQForm";

export default function FAQCreate() {
  const navigate = useNavigate();

  const handleSubmit = (formData: FAQFormData) => {
    // TODO: Integrate with API when backend is ready
    console.log("Create FAQ", formData);
    navigate("/faq");
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
      <FAQForm mode="create" onSubmit={handleSubmit} />
    </>
  );
}
