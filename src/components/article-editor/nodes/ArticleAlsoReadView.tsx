import { NodeViewWrapper, type ReactNodeViewProps } from "@tiptap/react";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import type { ArticleAlsoReadAttrs } from "./ArticleAlsoReadNode";

export default function ArticleAlsoReadView({
  node,
  updateAttributes,
  deleteNode,
}: ReactNodeViewProps) {
  const { title = "", url = "" } = node.attrs as unknown as ArticleAlsoReadAttrs;

  return (
    <NodeViewWrapper className="my-4">
      {/* Preview */}
      <div className="mb-3 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
        <div className="flex items-start gap-2">
          <span className="shrink-0 font-semibold text-blue-700 dark:text-blue-400">
            Also Read:
          </span>
          {title ? (
            <a
              href={url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {title}
            </a>
          ) : (
            <span className="italic text-gray-400">Enter article title below</span>
          )}
        </div>
      </div>

      {/* Editor fields */}
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-900/30">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
            Also Read
          </span>
          <button
            type="button"
            onClick={deleteNode}
            className="rounded p-1 text-gray-400 hover:bg-error-50 hover:text-error-500 dark:hover:bg-error-500/10 dark:hover:text-error-400"
            title="Remove"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <Label>Article title</Label>
            <Input
              value={title}
              onChange={(e) => updateAttributes({ title: e.target.value })}
              placeholder="ITAT Quashes Section 154 Rectification..."
            />
          </div>
          <div>
            <Label>Article URL</Label>
            <Input
              value={url}
              onChange={(e) => updateAttributes({ url: e.target.value })}
              placeholder="https://studycafe.in/article/..."
            />
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
}
