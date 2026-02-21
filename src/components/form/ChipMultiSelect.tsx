/**
 * Chip-style multi-select: selected items as removable chips + input with searchable dropdown.
 * Use for tags, categories, and any id+name taxonomy.
 */

import { useState, useRef, useEffect } from "react";
import Label from "./Label";

export interface ChipOption {
  id: number;
  name: string;
  slug?: string | null;
}

interface ChipMultiSelectProps {
  label: string;
  options: ChipOption[];
  value: number[];
  onChange: (ids: number[]) => void;
  placeholder?: string;
  disabled?: boolean;
  "aria-label"?: string;
}

export function ChipMultiSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Search or select…",
  disabled = false,
  "aria-label": ariaLabel,
}: ChipMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedIds = value ?? [];
  const selectedOptions = options.filter((o) => selectedIds.includes(o.id));
  const availableOptions = options.filter(
    (o) =>
      !selectedIds.includes(o.id) &&
      (query === "" || o.name.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  useEffect(() => {
    setHighlightIndex(0);
  }, [query, open]);

  const add = (id: number) => {
    if (selectedIds.includes(id)) return;
    onChange([...selectedIds, id]);
    setQuery("");
    inputRef.current?.focus();
  };

  const remove = (id: number) => {
    onChange(selectedIds.filter((i) => i !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      e.preventDefault();
      return;
    }
    if (open) {
      if (e.key === "Escape") {
        setOpen(false);
        e.preventDefault();
        return;
      }
      if (e.key === "ArrowDown") {
        setHighlightIndex((i) => (i < availableOptions.length - 1 ? i + 1 : 0));
        e.preventDefault();
        return;
      }
      if (e.key === "ArrowUp") {
        setHighlightIndex((i) => (i > 0 ? i - 1 : availableOptions.length - 1));
        e.preventDefault();
        return;
      }
      if (e.key === "Enter" && availableOptions[highlightIndex]) {
        add(availableOptions[highlightIndex].id);
        e.preventDefault();
      }
    }
  };

  return (
    <div ref={containerRef} className="w-full">
      <Label>{label}</Label>
      <div
        className={`flex min-h-[42px] flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 transition focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800 dark:focus-within:border-brand-500 ${
          disabled ? "cursor-not-allowed opacity-60" : ""
        }`}
      >
        {selectedOptions.map((opt) => (
          <span
            key={opt.id}
            className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-2.5 py-1 text-sm font-medium text-brand-800 dark:bg-brand-200/30 dark:text-brand-200"
          >
            {opt.name}
            {!disabled && (
              <button
                type="button"
                onClick={() => remove(opt.id)}
                className="rounded-full p-0.5 transition hover:bg-brand-200/50 dark:hover:bg-brand-300/30"
                aria-label={`Remove ${opt.name}`}
              >
                <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={selectedOptions.length === 0 ? placeholder : "Add more…"}
          aria-label={ariaLabel ?? label}
          className="min-w-[120px] flex-1 border-0 bg-transparent py-1 text-sm text-gray-800 placeholder-gray-400 outline-none dark:text-white/90 dark:placeholder-gray-500"
        />
      </div>
      {open && availableOptions.length > 0 && (
        <ul
          className="z-10 mt-1 max-h-[220px] overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800"
          role="listbox"
        >
          {availableOptions.map((opt, i) => (
            <li
              key={opt.id}
              role="option"
              aria-selected={highlightIndex === i}
              className={`cursor-pointer px-3 py-2 text-sm text-gray-800 dark:text-white/90 ${
                i === highlightIndex ? "bg-brand-50 dark:bg-brand-500/20" : "hover:bg-gray-50 dark:hover:bg-white/5"
              }`}
              onMouseEnter={() => setHighlightIndex(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                add(opt.id);
              }}
            >
              {opt.name}
            </li>
          ))}
        </ul>
      )}
      {open && query && availableOptions.length === 0 && (
        <p className="mt-1 px-2 text-xs text-gray-500 dark:text-gray-400">No matches. Type to search.</p>
      )}
    </div>
  );
}

export default ChipMultiSelect;
