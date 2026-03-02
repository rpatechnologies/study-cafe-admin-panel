import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { OrdersTable } from "../../components/tables";

export default function OrderList() {
  return (
    <>
      <PageMeta title="Orders | StudyCafe Admin" description="View orders" />
      <PageBreadcrumb pageTitle="Orders" />
      <div className="space-y-6">
        <OrdersTable />
      </div>
    </>
  );
}
