import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface Activity {
  id: number;
  title: string;
  type: "Course" | "Article" | "Enrollment" | "Membership";
  category: string;
  date: string;
  status: "Published" | "Draft" | "Enrolled" | "Active";
}

const tableData: Activity[] = [
  {
    id: 1,
    title: "GST Returns Filing Certification",
    type: "Course",
    category: "GST",
    date: "Feb 7, 2026",
    status: "Published",
  },
  {
    id: 2,
    title: "Madras HC Upholds Income Tax Penalty",
    type: "Article",
    category: "Income Tax",
    date: "Feb 7, 2026",
    status: "Published",
  },
  {
    id: 3,
    title: "CA Foundation Batch 2026",
    type: "Enrollment",
    category: "CA",
    date: "Feb 6, 2026",
    status: "Enrolled",
  },
  {
    id: 4,
    title: "Hospital Charges Under GST - AAR Ruling",
    type: "Article",
    category: "GST",
    date: "Feb 6, 2026",
    status: "Published",
  },
  {
    id: 5,
    title: "Lifetime Ultimate Membership",
    type: "Membership",
    category: "Membership",
    date: "Feb 5, 2026",
    status: "Active",
  },
];

export default function RecentActivity() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Activity
          </h3>
        </div>

      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Title
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Type
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Category
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Date
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="py-3">
                  <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {activity.title}
                  </p>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {activity.type}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {activity.category}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {activity.date}
                </TableCell>
                <TableCell className="py-3">
                  <Badge
                    size="sm"
                    color={
                      activity.status === "Published" || activity.status === "Active"
                        ? "success"
                        : activity.status === "Enrolled"
                        ? "warning"
                        : "error"
                    }
                  >
                    {activity.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
