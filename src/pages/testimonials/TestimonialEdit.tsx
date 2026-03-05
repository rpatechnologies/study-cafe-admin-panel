import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import TestimonialForm, { type TestimonialFormData } from "./TestimonialForm";
import { fetchTestimonial, updateTestimonial, Testimonial } from "../../api/testimonials";

export default function TestimonialEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<Testimonial | null>(null);

  useEffect(() => {
    if (id) {
      loadTestimonial(Number(id));
    }
  }, [id]);

  const loadTestimonial = async (testimonialId: number) => {
    try {
      setLoading(true);
      const testimonial = await fetchTestimonial(testimonialId);
      setData(testimonial);
    } catch (err) {
      console.error("Failed to load testimonial", err);
      alert("Failed to load testimonial or it does not exist.");
      navigate("/testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: TestimonialFormData) => {
    if (!id) return;
    try {
      setSaving(true);
      await updateTestimonial(Number(id), {
        ...formData,
        rating: formData.rating ? Number(formData.rating) : undefined,
        sort_order: formData.sort_order ? Number(formData.sort_order) : 0,
      });
      navigate("/testimonials");
    } catch (err: any) {
      console.error("Failed to update testimonial", err);
      alert(err.response?.data?.message || "Failed to update testimonial");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center p-20">
        <p className="text-gray-500">Loading testimonial...</p>
      </div>
    );
  }

  const defaultValues: TestimonialFormData = {
    content: data.content,
    author_name: data.author_name,
    author_role: data.author_role || "",
    rating: data.rating ? String(data.rating) : "",
    sort_order: String(data.sort_order),
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
        loading={saving}
        onSubmit={handleSubmit}
      />
    </>
  );
}
