import { NodeViewWrapper, type ReactNodeViewProps } from "@tiptap/react";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";
import type { ArticleMembershipCTAAttrs } from "./ArticleMembershipCTANode";

export default function ArticleMembershipCTAView({
  node,
  updateAttributes,
  deleteNode,
}: ReactNodeViewProps) {
  const {
    heading = "StudyCafe Membership",
    description = "",
    buttonText = "Join Membership",
    buttonUrl = "",
    style = "gradient",
  } = node.attrs as unknown as ArticleMembershipCTAAttrs;

  const bgClass =
    style === "gradient"
      ? "bg-gradient-to-r from-blue-600 to-blue-800"
      : "bg-blue-600";

  return (
    <NodeViewWrapper className="my-4">
      {/* Preview */}
      <div
        className={`mb-3 rounded-xl ${bgClass} p-6 text-center text-white shadow-lg`}
      >
        <h3 className="mb-2 text-xl font-bold">{heading}</h3>
        {description && (
          <p className="mb-4 text-sm text-blue-100">{description}</p>
        )}
        <a
          href={buttonUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-blue-600 shadow transition hover:bg-blue-50"
        >
          {buttonText}
        </a>
        <p className="mt-3 text-xs text-blue-200">
          In case of any Doubt regarding Membership you can mail us at contact@studycafe.in
        </p>
      </div>

      {/* Editor fields */}
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-900/30">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
            Membership CTA
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
        <div className="space-y-3">
          <div>
            <Label>Heading</Label>
            <Input
              value={heading}
              onChange={(e) => updateAttributes({ heading: e.target.value })}
              placeholder="StudyCafe Membership"
            />
          </div>
          <div>
            <Label>Description</Label>
            <TextArea
              rows={2}
              value={description}
              onChange={(value) => updateAttributes({ description: value })}
              placeholder="Join StudyCafe Membership..."
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="min-w-[150px] flex-1">
              <Label>Button text</Label>
              <Input
                value={buttonText}
                onChange={(e) => updateAttributes({ buttonText: e.target.value })}
                placeholder="Join Membership"
              />
            </div>
            <div className="min-w-[200px] flex-[2]">
              <Label>Button URL</Label>
              <Input
                value={buttonUrl}
                onChange={(e) => updateAttributes({ buttonUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>
          <div>
            <Label>Style</Label>
            <select
              value={style}
              onChange={(e) =>
                updateAttributes({ style: e.target.value as "gradient" | "solid" })
              }
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
            >
              <option value="gradient">Gradient</option>
              <option value="solid">Solid</option>
            </select>
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
}
