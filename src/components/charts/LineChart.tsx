import PageBreadcrumb from "../common/PageBreadCrumb";
import ComponentCard from "../common/ComponentCard";
import LineChartOne from "./line/LineChartOne";
import PageMeta from "../common/PageMeta";

export default function LineChart() {
  return (
    <>
      <PageMeta
        title="Line Chart | StudyCafe Admin"
        description="Line chart analytics for StudyCafe Admin - studycafe.in management console"
      />
      <PageBreadcrumb pageTitle="Line Chart" />
      <div className="space-y-6">
        <ComponentCard title="Line Chart 1">
          <LineChartOne />
        </ComponentCard>
      </div>
    </>
  );
}
