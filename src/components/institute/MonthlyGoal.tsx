export default function MonthlyGoal() {
  return (
    <div className="space-y-4">
      {/* Membership Overview */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-5 sm:py-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Membership Overview
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Free vs paid members and new signups
        </p>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/5">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Free
            </p>
            <p className="mt-1 text-xl font-bold text-gray-800 dark:text-white/90">
              8,234
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/5">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Paid
            </p>
            <p className="mt-1 text-xl font-bold text-gray-800 dark:text-white/90">
              4,613
            </p>
          </div>
          <div className="rounded-xl border border-success-100 bg-success-50/50 p-4 dark:border-success-500/20 dark:bg-success-500/10">
            <p className="text-xs font-medium text-success-600 dark:text-success-500">
              New this month
            </p>
            <p className="mt-1 text-xl font-bold text-success-600 dark:text-success-500">
              245
            </p>
          </div>
        </div>
      </div>

      {/* Top Courses */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-5 sm:py-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Top Courses
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Most enrolled this month
        </p>
        <ul className="mt-4 space-y-3">
          {[
            { name: "GST Returns Filing Certification", enrollments: 1248 },
            { name: "CA Foundation Batch 2026", enrollments: 892 },
            { name: "Tally With AI Masterclass", enrollments: 756 },
            { name: "GSTR-9 & GSTR-9C with AI", enrollments: 534 },
            { name: "Income Tax Practical Filing", enrollments: 421 },
          ].map((course, i) => (
            <li
              key={course.name}
              className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2 dark:border-gray-800"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                  {i + 1}
                </span>
                <span className="truncate text-sm font-medium text-gray-800 dark:text-white/90">
                  {course.name}
                </span>
              </div>
              <span className="ml-2 shrink-0 text-sm font-semibold text-gray-600 dark:text-gray-400">
                {course.enrollments.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Top Articles */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-5 sm:py-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Top Articles
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Most viewed this month
        </p>
        <ul className="mt-4 space-y-3">
          {[
            { title: "Madras HC Upholds Rs. 1.5 Cr Income Tax Penalty", views: "2.4K" },
            { title: "Hospital Charges Under GST - AAR Ruling", views: "1.8K" },
            { title: "GST On Employee Canteen Facility", views: "1.5K" },
            { title: "ITAT Deletes Section 68 Addition", views: "1.2K" },
            { title: "ROC Penalises Directors for Board Meetings", views: "986" },
          ].map((article) => (
            <li
              key={article.title}
              className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 px-3 py-2 dark:border-gray-800"
            >
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800 dark:text-white/90">
                {article.title}
              </span>
              <span className="ml-2 shrink-0 text-xs font-semibold text-gray-500 dark:text-gray-400">
                {article.views} views
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
