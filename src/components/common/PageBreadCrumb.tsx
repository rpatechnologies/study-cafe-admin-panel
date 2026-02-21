import { Link } from "react-router";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  pageTitle: string;
  /** Custom breadcrumb trail items (excluding Home which is always shown) */
  items?: BreadcrumbItem[];
  /** When true, hide current page from breadcrumb trail (avoids double heading on create pages) */
  compact?: boolean;
  /** Optional actions to show on the right (e.g. Back link) */
  actions?: React.ReactNode;
}

const ChevronIcon = () => (
  <svg
    className="stroke-current"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
      stroke=""
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({
  pageTitle,
  items,
  compact = false,
  actions,
}) => {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              to="/"
            >
              Home
              <ChevronIcon />
            </Link>
          </li>
          {items?.map((item, index) => (
            <li key={index}>
              {item.path ? (
                <Link
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  to={item.path}
                >
                  {item.label}
                  <ChevronIcon />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  {item.label}
                  <ChevronIcon />
                </span>
              )}
            </li>
          ))}
          {!compact && (
          <li
            className="text-sm font-semibold text-gray-800 dark:text-white/90"
            aria-current="page"
          >
            {pageTitle}
          </li>
          )}
        </ol>
      </nav>
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageBreadcrumb;
