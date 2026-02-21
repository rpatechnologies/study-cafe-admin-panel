import { useNavigate, useParams } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import BackLink from "../../components/common/BackLink";
import SEOMetadataForm, { type SEOMetadataFormData } from "./SEOMetadataForm";
import type { SEOMetadata } from "./SEOMetadataList";

const mockEntry: SEOMetadata & { metaKeywords?: string; canonicalUrl?: string; ogTitle?: string; ogDescription?: string; ogImageUrl?: string } = {
  id: 1,
  pageName: "Home",
  pageSlug: "/",
  metaTitle: "StudyCafe – CA, CS, CWA | GST, Income Tax & Professional Courses",
  metaDescription:
    "Studycafe.in – Your trusted platform for CA, CS, CWA exam preparation, GST, Income Tax, and Business News.",
  robots: "index, follow",
  metaKeywords: "CA, CS, CWA, GST, Income Tax, studycafe",
  canonicalUrl: "https://studycafe.in",
  ogTitle: "StudyCafe – CA, CS, CWA | GST, Income Tax",
  ogDescription: "Your trusted platform for CA, CS, CWA exam preparation.",
  ogImageUrl: "",
};

export default function SEOMetadataEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const defaultValues: SEOMetadataFormData = {
    pageName: mockEntry.pageName,
    pageSlug: mockEntry.pageSlug,
    metaTitle: mockEntry.metaTitle,
    metaDescription: mockEntry.metaDescription,
    metaKeywords: mockEntry.metaKeywords ?? "",
    canonicalUrl: mockEntry.canonicalUrl ?? "",
    ogTitle: mockEntry.ogTitle ?? "",
    ogDescription: mockEntry.ogDescription ?? "",
    ogImageUrl: mockEntry.ogImageUrl ?? "",
    robots: "index, follow",
  };

  const handleSubmit = (formData: SEOMetadataFormData) => {
    // TODO: Integrate with API when backend is ready
    console.log("Update SEO metadata", id, formData);
    navigate("/seo-metadata");
  };

  return (
    <>
      <PageMeta
        title="Edit SEO Metadata | StudyCafe Admin"
        description="Edit SEO metadata for studycafe.in"
      />
      <PageBreadcrumb
        pageTitle="Edit SEO Metadata"
        compact
        actions={
          <BackLink to="/seo-metadata">Back to SEO Metadata</BackLink>
        }
      />
      <SEOMetadataForm
        mode="edit"
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      />
    </>
  );
}
