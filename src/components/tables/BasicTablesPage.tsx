import PageBreadcrumb from "../common/PageBreadCrumb";
import ComponentCard from "../common/ComponentCard";
import PageMeta from "../common/PageMeta";
import BasicTableOne from "./BasicTables/BasicTableOne";

export default function BasicTablesPage() {
  return (
    <>
      <PageMeta
        title="Tables | StudyCafe Admin"
        description="Data tables for StudyCafe Admin - studycafe.in management console"
      />
      <PageBreadcrumb pageTitle="Basic Tables" />
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
