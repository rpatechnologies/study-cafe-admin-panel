import { NodeViewWrapper, type ReactNodeViewProps } from "@tiptap/react";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";
import ImageUpload from "../../form/ImageUpload";
import type { ArticleImageWithLinkAttrs } from "./ArticleImageWithLinkNode";

export default function ArticleImageWithLinkView({
  node,
  updateAttributes,
  deleteNode,
}: ReactNodeViewProps) {
  const attrs = node.attrs as unknown as ArticleImageWithLinkAttrs;
  const { imageUrl = "", linkUrl = "", alt = "", caption = "" } = attrs;

  return (
    <NodeViewWrapper className="my-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
          Image with link
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
        <ImageUpload
          label="Image"
          value={imageUrl}
          onChange={(imageUrl) => updateAttributes({ imageUrl })}
          placeholder="Drop or select image"
        />
        <div>
          <Label>Link URL (optional)</Label>
          <Input
            value={linkUrl ?? ""}
            onChange={(e) => updateAttributes({ linkUrl: e.target.value })}
            placeholder="https://..."
          />
        </div>
        <div>
          <Label>Alt text (optional)</Label>
          <Input
            value={alt ?? ""}
            onChange={(e) => updateAttributes({ alt: e.target.value })}
            placeholder="Describe the image"
          />
        </div>
        <div>
          <Label>Caption (optional)</Label>
          <TextArea
            rows={2}
            value={caption ?? ""}
            onChange={(value) => updateAttributes({ caption: value })}
            placeholder="Image caption"
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
}
