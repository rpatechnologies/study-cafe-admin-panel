import { useNavigate } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import BackLink from "../../components/common/BackLink";
import SEOMetadataForm, { type SEOMetadataFormData } from "./SEOMetadataForm";

export default function SEOMetadataCreate() {
  const navigate = useNavigate();

  const handleSubmit = (formData: SEOMetadataFormData) => {
    // TODO: Integrate with API when backend is ready
    console.log("Create SEO metadata", formData);
    navigate("/seo-metadata");
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
      <SEOMetadataForm mode="create" onSubmit={handleSubmit} />
    </>
  );
}
