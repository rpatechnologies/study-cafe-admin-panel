import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ContentBlock } from "../types";

interface BlockWrapperProps {
  block: ContentBlock;
  onDelete: () => void;
  children: React.ReactNode;
}

export default function BlockWrapper({
  block,
  onDelete,
  children,
}: BlockWrapperProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex gap-2 rounded-lg border border-gray-200 bg-white transition dark:border-gray-800 dark:bg-white/[0.03] ${
        isDragging ? "z-10 opacity-80 shadow-lg" : ""
      }`}
    >
      <div
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className="flex shrink-0 cursor-grab touch-none items-center justify-center self-stretch px-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 active:cursor-grabbing dark:hover:bg-gray-800 dark:hover:text-gray-300"
        title="Drag to reorder"
      >
        <svg
          className="size-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8h16M4 16h16"
          />
        </svg>
      </div>
      <div className="min-w-0 flex-1 py-2 pr-2">{children}</div>
      <button
        type="button"
        onClick={onDelete}
        className="flex shrink-0 items-center justify-center self-start rounded p-2 text-gray-400 opacity-0 transition hover:bg-error-50 hover:text-error-500 group-hover:opacity-100 group-focus-within:opacity-100 dark:hover:bg-error-500/10 dark:hover:text-error-400"
        title="Delete block"
      >
        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}
