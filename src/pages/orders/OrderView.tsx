import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Badge from "../../components/ui/badge/Badge";
import { fetchOrderByOrderId, type OrderRecord } from "../../api/orders";

export default function OrderView() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    fetchOrderByOrderId(orderId)
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading || !order) {
    return (
      <div className="flex items-center justify-center py-12">
        {loading ? "Loading..." : "Order not found."}
      </div>
    );
  }

  const statusColor = order.status === "paid" ? "success" : order.status === "pending" ? "warning" : "error";

  return (
    <>
      <PageMeta title={`Order ${order.order_id} | StudyCafe Admin`} description="Order details" />
      <PageBreadcrumb
        pageTitle={order.order_id}
        actions={
          <Link
            to="/orders"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Back to list
          </Link>
        }
      />
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-mono text-lg font-semibold text-gray-800 dark:text-white/90">{order.order_id}</h2>
            <Badge size="sm" color={statusColor}>
              {order.status}
            </Badge>
          </div>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-theme-xs text-gray-500 dark:text-gray-400">User ID</dt>
              <dd className="mt-0.5 text-gray-800 dark:text-white/90">{order.user_id ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-theme-xs text-gray-500 dark:text-gray-400">Type</dt>
              <dd className="mt-0.5 text-gray-800 dark:text-white/90">{order.type ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-theme-xs text-gray-500 dark:text-gray-400">Entity ID</dt>
              <dd className="mt-0.5 text-gray-800 dark:text-white/90">{order.entity_id ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-theme-xs text-gray-500 dark:text-gray-400">Amount</dt>
              <dd className="mt-0.5 text-gray-800 dark:text-white/90">
                {order.currency} {order.amount != null ? Number(order.amount).toFixed(2) : "—"}
              </dd>
            </div>
            {order.buyer_email && (
              <div>
                <dt className="text-theme-xs text-gray-500 dark:text-gray-400">Buyer email</dt>
                <dd className="mt-0.5 text-gray-800 dark:text-white/90">{order.buyer_email}</dd>
              </div>
            )}
            {order.created_at && (
              <div>
                <dt className="text-theme-xs text-gray-500 dark:text-gray-400">Created</dt>
                <dd className="mt-0.5 text-gray-800 dark:text-white/90">
                  {new Date(order.created_at).toLocaleString()}
                </dd>
              </div>
            )}
            {"payment_id" in order && order.payment_id && (
              <div>
                <dt className="text-theme-xs text-gray-500 dark:text-gray-400">Payment ID</dt>
                <dd className="mt-0.5 font-mono text-theme-sm text-gray-800 dark:text-white/90">
                  {String(order.payment_id)}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </>
  );
}
