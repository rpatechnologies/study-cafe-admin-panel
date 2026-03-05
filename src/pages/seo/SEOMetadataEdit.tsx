import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import BackLink from "../../components/common/BackLink";
import SEOMetadataForm, { type SEOMetadataFormData } from "./SEOMetadataForm";
import { fetchSeoMetadataById, updateSeoMetadata } from "../../api/seo";

export default function SEOMetadataEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [defaultValues, setDefaultValues] = useState<SEOMetadataFormData | null>(null);

  useEffect(() => {
    if (id) {
      loadSeoMetadata(parseInt(id, 10));
    }
  }, [id]);

  const loadSeoMetadata = async (metadataId: number) => {
    try {
      setLoading(true);
      const data = await fetchSeoMetadataById(metadataId);
      setDefaultValues({
        pageName: data.pageName,
        pageSlug: data.pageSlug,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        canonicalUrl: data.canonicalUrl,
        ogTitle: data.ogTitle,
        ogDescription: data.ogDescription,
        ogImageUrl: data.ogImageUrl,
        robots: (data.robots as any) || "index, follow",
      });
      setError(null);
    } catch (err: any) {
      console.error("Failed to load SEO metadata", err);
      setError("Failed to load SEO metadata");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: SEOMetadataFormData) => {
    if (!id) return;
    try {
      setSaving(true);
      await updateSeoMetadata(parseInt(id, 10), {
        pageName: formData.pageName,
        pageSlug: formData.pageSlug,
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        metaKeywords: formData.metaKeywords,
        canonicalUrl: formData.canonicalUrl,
        ogTitle: formData.ogTitle,
        ogDescription: formData.ogDescription,
        ogImageUrl: formData.ogImageUrl,
        robots: formData.robots,
      });
      navigate("/seo-metadata");
    } catch (err: any) {
      console.error("Failed to update SEO metadata", err);
      alert(err.response?.data?.message || "Failed to update SEO metadata");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <p className="text-gray-500">Loading SEO metadata...</p>
      </div>
    );
  }

  if (error || !defaultValues) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <p className="text-red-500">{error || "SEO Metadata not found"}</p>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Edit SEO Metadata | StudyCafe Admin"
        description="Edit SEO metadata for studycafe.in"
      />
      <PageBreadcrumb
        pageTitle="Edit SEO Metadata"
        compact
        actions={<BackLink to="/seo-metadata">Back to SEO Metadata</BackLink>}
      />
      <SEOMetadataForm
        mode="edit"
        defaultValues={defaultValues}
        loading={saving}
        onSubmit={handleSubmit}
      />
    </>
  );
}
