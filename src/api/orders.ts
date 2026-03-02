import { api } from "./axios";

export interface OrderRecord {
  id: number;
  order_id: string;
  user_id: number | null;
  type: string | null;
  entity_id: string | null;
  amount: string | number | null;
  currency: string;
  status: string;
  buyer_email?: string | null;
  created_at?: string;
  payment_id?: string | null;
}

export async function fetchOrders(params?: { limit?: number; offset?: number }): Promise<OrderRecord[]> {
  const res = await api.get<OrderRecord[]>("/admin/orders", { params: params ?? {} });
  return Array.isArray(res.data) ? res.data : [];
}

export async function fetchOrderByOrderId(orderId: string): Promise<OrderRecord | null> {
  try {
    const res = await api.get<OrderRecord>(`/admin/orders/${encodeURIComponent(orderId)}`);
    return res.data ?? null;
  } catch {
    return null;
  }
}
