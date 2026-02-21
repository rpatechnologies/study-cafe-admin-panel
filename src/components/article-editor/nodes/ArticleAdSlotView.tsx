import { NodeViewWrapper, type ReactNodeViewProps } from "@tiptap/react";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import type { ArticleAdSlotAttrs, ArticleAdSlotType } from "./ArticleAdSlotNode";

const TYPES: ArticleAdSlotType[] = ["leaderboard", "rectangle", "sidebar", "inline"];

export default function ArticleAdSlotView({
  node,
  updateAttributes,
  deleteNode,
}: ReactNodeViewProps) {
  const { adUnitId = "", type = "leaderboard" } = node.attrs as unknown as ArticleAdSlotAttrs;

  return (
    <NodeViewWrapper className="my-4 rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-900/30">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
          Ad slot
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
          <Label>Ad Unit ID</Label>
          <Input
            value={adUnitId ?? ""}
            onChange={(e) => updateAttributes({ adUnitId: e.target.value })}
            placeholder="ca-pub-xxxxx/slot-xxxxx"
          />
        </div>
        <div>
          <Label>Slot type</Label>
          <select
            value={type ?? "leaderboard"}
            onChange={(e) =>
              updateAttributes({ type: e.target.value as ArticleAdSlotType })
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
    </NodeViewWrapper>
  );
}
