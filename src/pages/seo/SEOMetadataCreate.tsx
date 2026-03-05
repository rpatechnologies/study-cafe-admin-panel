import { useState } from "react";
import { useNavigate } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import BackLink from "../../components/common/BackLink";
import SEOMetadataForm, { type SEOMetadataFormData } from "./SEOMetadataForm";
import { createSeoMetadata } from "../../api/seo";

export default function SEOMetadataCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: SEOMetadataFormData) => {
    try {
      setLoading(true);
      await createSeoMetadata({
        pageName: formData.pageName,
        pageSlug: formData.pageSlug,
        metaTitle: formData.metaTitle || formData.pageName,
        metaDescription: formData.metaDescription || "",
        metaKeywords: formData.metaKeywords || "",
        canonicalUrl: formData.canonicalUrl || "",
        ogTitle: formData.ogTitle || "",
        ogDescription: formData.ogDescription || "",
        ogImageUrl: formData.ogImageUrl || "",
        robots: formData.robots || "index, follow",
      });
      navigate("/seo-metadata");
    } catch (err: any) {
      console.error("Failed to create SEO metadata", err);
      alert(err.response?.data?.message || "Failed to create SEO metadata");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageMeta
        title="Create SEO Metadata | StudyCafe Admin"
        description="Add new SEO metadata for studycafe.in"
      />
      <PageBreadcrumb
        pageTitle="Create SEO Metadata"
        compact
        actions={
          <BackLink to="/seo-metadata">Back to SEO Metadata</BackLink>
        }
      />
      <SEOMetadataForm mode="create" loading={loading} onSubmit={handleSubmit} />
    </>
  );
}
