import PageBreadcrumb from "../common/PageBreadCrumb";
import ComponentCard from "../common/ComponentCard";
import BarChartOne from "./bar/BarChartOne";
import PageMeta from "../common/PageMeta";

export default function BarChart() {
  return (
    <div>
      <PageMeta
        title="Bar Chart | StudyCafe Admin"
        description="Bar chart analytics for StudyCafe Admin - studycafe.in management console"
      />
      <PageBreadcrumb pageTitle="Bar Chart" />
      <div className="space-y-6">
        <ComponentCard title="Bar Chart 1">
          <BarChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
