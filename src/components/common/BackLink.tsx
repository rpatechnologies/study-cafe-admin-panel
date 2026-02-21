import { Link } from "react-router";
import { ChevronLeftIcon } from "../../icons";

interface BackLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export default function BackLink({ to, children, className = "" }: BackLinkProps) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 ${className}`}
    >
      <ChevronLeftIcon className="size-4 shrink-0" aria-hidden />
      {children}
    </Link>
  );
}
