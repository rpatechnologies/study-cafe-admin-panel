/**
 * DataTableToolbar — search input with modern, consistent styling.
 */

interface DataTableToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function DataTableToolbar({
  search,
  onSearchChange,
  placeholder = "Search…",
  disabled = false,
}: DataTableToolbarProps) {
  return (
    <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-800 sm:px-5">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="min-w-[200px] max-w-sm rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-500 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90 dark:placeholder-gray-400 disabled:opacity-50"
          aria-label="Search table"
        />
      </div>
    </div>
  );
}
