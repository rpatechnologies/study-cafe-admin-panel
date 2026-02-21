import { useNavigate } from "react-router";
import MembershipForm, { type MembershipFormData } from "./MembershipForm";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { plansApi } from "../../api/plans";
import { useState } from "react";

export default function MembershipCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: MembershipFormData) => {
    try {
      setLoading(true);
      // Transform form data to match API expectations
      const payload = {
        ...formData,
        features: formData.features.split("\n").filter((f) => f.trim() !== ""),
        price: Number(formData.price),
        duration_days: Number(formData.duration_days),
        is_lifetime: formData.is_lifetime,
        course_ids: formData.course_ids,
        course_cat_ids: formData.course_cat_ids,
      };

      await plansApi.create(payload);
      navigate("/memberships");
    } catch (err) {
      console.error("Failed to create membership", err);
      // You might want to show a toast/alert here
      alert("Failed to create membership");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageMeta
        title="Create Membership | StudyCafe Admin"
        description="Create a new membership plan"
      />
      <PageBreadcrumb pageTitle="Create Membership" />
      <MembershipForm mode="create" onSubmit={handleSubmit} loading={loading} />
    </>
  );
}
