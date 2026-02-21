import { NodeViewWrapper, type ReactNodeViewProps } from "@tiptap/react";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";
import ImageUpload from "../../form/ImageUpload";
import type { ArticleCTAAttrs, ArticleCTALayout, ArticleCTAVariant } from "./ArticleCTANode";

const VARIANTS: ArticleCTAVariant[] = ["promotion", "course", "membership"];
const LAYOUTS: { value: ArticleCTALayout; label: string }[] = [
  { value: "default", label: "Side-by-side (image left, text right)" },
  { value: "banner", label: "Banner (full-width image, text overlay)" },
];

export default function ArticleCTAView({
  node,
  updateAttributes,
  deleteNode,
}: ReactNodeViewProps) {
  const attrs = node.attrs as unknown as ArticleCTAAttrs;

  return (
    <NodeViewWrapper className="my-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
          CTA
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
          <Label>Layout</Label>
          <select
            value={attrs.layout ?? "default"}
            onChange={(e) =>
              updateAttributes({ layout: e.target.value as ArticleCTALayout })
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
          >
            {LAYOUTS.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label>Variant</Label>
          <select
            value={attrs.variant}
            onChange={(e) =>
              updateAttributes({ variant: e.target.value as ArticleCTAVariant })
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
          >
            {VARIANTS.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label>Title</Label>
          <Input
            value={attrs.title ?? ""}
            onChange={(e) => updateAttributes({ title: e.target.value })}
            placeholder="CTA title"
          />
        </div>
        <div>
          <Label>Description</Label>
          <TextArea
            rows={2}
            value={attrs.description ?? ""}
            onChange={(value) => updateAttributes({ description: value })}
            placeholder="Brief description"
          />
        </div>
        <div>
          <Label>Button text</Label>
          <Input
            value={attrs.buttonText ?? ""}
            onChange={(e) => updateAttributes({ buttonText: e.target.value })}
            placeholder="Learn more"
          />
        </div>
        <div>
          <Label>Button URL</Label>
          <Input
            value={attrs.buttonUrl ?? ""}
            onChange={(e) => updateAttributes({ buttonUrl: e.target.value })}
            placeholder="https://..."
          />
        </div>
        <div>
          <ImageUpload
            label="Image (optional)"
            value={attrs.imageUrl ?? ""}
            onChange={(imageUrl) => updateAttributes({ imageUrl })}
            placeholder="Drop or select image"
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
}
