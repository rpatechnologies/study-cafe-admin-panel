/**
 * Courses table using the reusable DataTable.
 * Client-side search (by title); single-page list (no backend pagination).
 */

import { Link } from "react-router";
import { DataTable } from "./data-table";
import Badge from "../ui/badge/Badge";
import { EyeIcon, PencilIcon } from "../../icons";
import { fetchCourses, type Course } from "../../api/courses";
import type { DataTableFetchParams, DataTableFetchResult } from "./data-table/DataTable.types";

function toMeta(total: number, page: number, limit: number): DataTableFetchResult<Course>["meta"] {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

async function fetchCoursesForTable(
  params: DataTableFetchParams
): Promise<DataTableFetchResult<Course>> {
  const all = await fetchCourses();
  const search = (params.search ?? "").trim().toLowerCase();
  const filtered = search
    ? all.filter(
        (c) =>
          (c.title && c.title.toLowerCase().includes(search)) ||
          (c.description && c.description.toLowerCase().includes(search))
      )
    : all;
  const { page, limit } = params;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);
  return {
    data,
    meta: toMeta(filtered.length, page, limit),
  };
}

const columns = [
  {
    key: "title",
    header: "Title",
    sortable: false,
    render: (row: Course) => (
      <div>
        <span className="block font-medium text-gray-800 dark:text-white/90">{row.title}</span>
        {row.description && (
          <span className="block line-clamp-1 text-theme-xs text-gray-500 dark:text-gray-400">
            {row.description}
          </span>
        )}
      </div>
    ),
  },
  {
    key: "price",
    header: "Price",
    sortable: false,
    align: "start" as const,
    render: (row: Course) => `₹${Number(row.price).toFixed(2)}`,
  },
  {
    key: "is_published",
    header: "Status",
    sortable: false,
    render: (row: Course) => (
      <Badge size="sm" color={row.is_published ? "success" : "error"}>
        {row.is_published ? "Published" : "Draft"}
      </Badge>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    align: "end" as const,
    sortable: false,
    render: (row: Course) => (
      <div className="flex items-center justify-end gap-2">
        <Link
          to={`/courses/${row.id}`}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          title="View"
        >
          <EyeIcon className="size-4 shrink-0 fill-current" />
          View
        </Link>
        <Link
          to={`/courses/${row.id}/edit`}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          title="Edit"
        >
          <PencilIcon className="size-4 shrink-0 fill-current" />
          Edit
        </Link>
      </div>
    ),
  },
];

export function CoursesTable() {
  return (
    <DataTable<Course>
      columns={columns}
      fetchData={fetchCoursesForTable}
      initialPageSize={20}
      pageSizeOptions={[10, 20, 50, 100]}
      enableSearch
      enableSorting={false}
      enablePagination
      searchPlaceholder="Search courses…"
      emptyMessage="No courses found."
    />
  );
}
