import { useEffect, useRef } from "react";
import type { ContentBlockType } from "../types";

export interface BlockTypeOption {
  type: ContentBlockType;
  label: string;
}

const BLOCK_TYPE_OPTIONS: BlockTypeOption[] = [
  { type: "rich_text", label: "Paragraph" },
  { type: "heading", label: "Heading" },
  { type: "ad_slot", label: "Ad Slot" },
  { type: "cta", label: "CTA" },
  { type: "image_with_link", label: "Image" },
  { type: "download_button", label: "Download" },
  { type: "also_read", label: "Also Read" },
  { type: "membership_cta", label: "Membership CTA" },
];

interface BlockTypePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: ContentBlockType) => void;
  anchorRef: React.RefObject<HTMLElement | null>;
}

export default function BlockTypePicker({
  isOpen,
  onClose,
  onSelect,
  anchorRef,
}: BlockTypePickerProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        anchorRef.current &&
        !anchorRef.current.contains(target)
      ) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className="absolute left-1/2 top-full z-50 mt-2 min-w-[180px] -translate-x-1/2 rounded-xl border border-gray-200 bg-white py-2 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900"
    >
      {BLOCK_TYPE_OPTIONS.map(({ type, label }) => (
        <button
          key={type}
          type="button"
          onClick={() => onSelect(type)}
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
