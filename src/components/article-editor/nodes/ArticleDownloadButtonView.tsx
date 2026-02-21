import { NodeViewWrapper, type ReactNodeViewProps } from "@tiptap/react";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import type { ArticleDownloadButtonAttrs } from "./ArticleDownloadButtonNode";

export default function ArticleDownloadButtonView({
  node,
  updateAttributes,
  deleteNode,
}: ReactNodeViewProps) {
  const { label = "Download Judgment", fileUrl = "" } =
    node.attrs as unknown as ArticleDownloadButtonAttrs;

  return (
    <NodeViewWrapper className="my-4">
      {/* Preview */}
      <div className="mb-3 flex justify-center">
        <a
          href={fileUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-6 py-3 text-sm font-medium text-white shadow-md transition hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          {label || "Download"}
        </a>
      </div>

      {/* Editor fields */}
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-900/30">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
            Download Button
          </span>
          <button
            type="button"
            onClick={deleteNode}
            className="rounded p-1 text-gray-400 hover:bg-error-50 hover:text-error-500 dark:hover:bg-error-500/10 dark:hover:text-error-400"
            title="Remove"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-[150px] flex-1">
            <Label>Button label</Label>
            <Input
              value={label}
              onChange={(e) => updateAttributes({ label: e.target.value })}
              placeholder="Download Judgment"
            />
          </div>
          <div className="min-w-[200px] flex-[2]">
            <Label>File URL</Label>
            <Input
              value={fileUrl}
              onChange={(e) => updateAttributes({ fileUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
}
