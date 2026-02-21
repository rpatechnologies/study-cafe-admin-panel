/**
 * DataTablePagination — Show X entries, "Showing X to Y of Z", First / Prev / page numbers / Next / Last.
 * Modern, smooth styling with numbered page navigation.
 */

import type { DataTableMeta } from "./DataTable.types";

const MAX_VISIBLE_PAGES = 5;

interface DataTablePaginationProps {
  meta: DataTableMeta;
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (limit: number) => void;
  disabled?: boolean;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 0) return [];
  if (total <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const half = Math.floor(MAX_VISIBLE_PAGES / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(total, start + MAX_VISIBLE_PAGES - 1);
  if (end - start + 1 < MAX_VISIBLE_PAGES) {
    start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
  }
  const pages: (number | "ellipsis")[] = [];
  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("ellipsis");
  }
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total) {
    if (end < total - 1) pages.push("ellipsis");
    pages.push(total);
  }
  return pages;
}

export function DataTablePagination({
  meta,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  disabled = false,
}: DataTablePaginationProps) {
  const { page, limit, totalPages, total, hasNextPage, hasPreviousPage } = meta;
  const startRecord = total === 0 ? 0 : (page - 1) * limit + 1;
  const endRecord = Math.min(page * limit, total);
  const pageNumbers = getPageNumbers(page, totalPages);

  const btnBase =
    "inline-flex min-w-[36px] items-center justify-center rounded-lg border px-2.5 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-500/30 disabled:pointer-events-none disabled:opacity-50";
  const btnDefault =
    "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700";
  const btnActive =
    "border-brand-500 bg-brand-500 text-white hover:bg-brand-600 dark:border-brand-500 dark:bg-brand-500 dark:hover:bg-brand-600";

  return (
    <div className="flex flex-col gap-4 border-t border-gray-200 px-4 py-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Show</span>
          <select
            value={limit}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            disabled={disabled}
            className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90 disabled:opacity-50"
            aria-label="Rows per page"
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-500 dark:text-gray-400">entries</span>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {total === 0
            ? "No entries"
            : `Showing ${startRecord} to ${endRecord} of ${total} entries`}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-1">
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={disabled || !hasPreviousPage}
          className={`${btnBase} ${btnDefault}`}
          aria-label="First page"
        >
          First
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={disabled || !hasPreviousPage}
          className={`${btnBase} ${btnDefault}`}
          aria-label="Previous page"
        >
          Previous
        </button>
        <div className="flex items-center gap-1">
          {pageNumbers.map((p, i) =>
            p === "ellipsis" ? (
              <span
                key={`ellipsis-${i}`}
                className="flex min-w-[36px] items-center justify-center px-1 text-sm text-gray-500"
              >
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                disabled={disabled}
                className={`${btnBase} min-w-[36px] ${page === p ? btnActive : btnDefault}`}
                aria-label={`Page ${p}`}
                aria-current={page === p ? "page" : undefined}
              >
                {p}
              </button>
            )
          )}
        </div>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={disabled || !hasNextPage}
          className={`${btnBase} ${btnDefault}`}
          aria-label="Next page"
        >
          Next
        </button>
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={disabled || !hasNextPage || totalPages === 0}
          className={`${btnBase} ${btnDefault}`}
          aria-label="Last page"
        >
          Last
        </button>
      </div>
    </div>
  );
}
