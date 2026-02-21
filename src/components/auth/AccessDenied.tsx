import { Link } from "react-router";

/**
 * Shown when the user is authenticated but lacks permission for a module/sub-module.
 */
export function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Access denied
      </h2>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
        You don’t have permission to view this section.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white hover:bg-brand-600"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
