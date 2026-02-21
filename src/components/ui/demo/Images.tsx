import PageBreadcrumb from "../../common/PageBreadCrumb";
import ResponsiveImage from "../images/ResponsiveImage";
import TwoColumnImageGrid from "../images/TwoColumnImageGrid";
import ThreeColumnImageGrid from "../images/ThreeColumnImageGrid";
import ComponentCard from "../../common/ComponentCard";
import PageMeta from "../../common/PageMeta";

export default function Images() {
  return (
    <>
      <PageMeta
        title="Images | StudyCafe Admin"
        description="Image management for StudyCafe Admin - studycafe.in management console"
      />
      <PageBreadcrumb pageTitle="Images" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Responsive image">
          <ResponsiveImage />
        </ComponentCard>
        <ComponentCard title="Image in 2 Grid">
          <TwoColumnImageGrid />
        </ComponentCard>
        <ComponentCard title="Image in 3 Grid">
          <ThreeColumnImageGrid />
        </ComponentCard>
      </div>
    </>
  );
}
