import { useState } from "react";
import { useNavigate } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import FAQForm, { type FAQFormData } from "./FAQForm";
import { createFaq } from "../../api/faqs";

export default function FAQCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FAQFormData) => {
    try {
      setLoading(true);
      await createFaq({
        question: formData.question,
        answer: formData.answer,
        sort_order: formData.sort_order ? parseInt(formData.sort_order, 10) : 0,
        is_active: true,
      });
      navigate("/faq");
    } catch (err: any) {
      console.error("Failed to create FAQ", err);
      alert(err.response?.data?.message || "Failed to create FAQ");
    } finally {
      setLoading(false);
    }
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
      <FAQForm mode="create" loading={loading} onSubmit={handleSubmit} />
    </>
  );
}
