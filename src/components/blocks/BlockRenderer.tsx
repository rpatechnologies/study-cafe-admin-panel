import type { ContentBlock, ContentBlockData } from "./types";
import BlockRichTextEditor from "./BlockRichText/BlockRichTextEditor";
import BlockHeadingEditor from "./BlockHeading/BlockHeadingEditor";
import BlockAdSlotEditor from "./BlockAdSlot/BlockAdSlotEditor";
import BlockCTAEditor from "./BlockCTA/BlockCTAEditor";
import BlockImageWithLinkEditor from "./BlockImageWithLink/BlockImageWithLinkEditor";
import BlockDownloadButtonEditor from "./BlockDownloadButton/BlockDownloadButtonEditor";
import BlockAlsoReadEditor, { type ArticleOption } from "./BlockAlsoRead/BlockAlsoReadEditor";
import BlockMembershipCTAEditor from "./BlockMembershipCTA/BlockMembershipCTAEditor";
import {
  isRichTextBlockData,
  isHeadingBlockData,
  isAdSlotBlockData,
  isCTABlockData,
  isImageWithLinkBlockData,
  isDownloadButtonBlockData,
  isAlsoReadBlockData,
  isMembershipCTABlockData,
} from "./types";

export type { ArticleOption };

export interface BlockRendererProps {
  block: ContentBlock;
  onDataChange: (data: ContentBlockData) => void;
  /** Articles for BlockAlsoRead (when type is also_read) */
  articles?: ArticleOption[];
}

export default function BlockRenderer({
  block,
  onDataChange,
  articles = [],
}: BlockRendererProps) {
  const { type, data } = block;

  if (type === "rich_text" && isRichTextBlockData(data)) {
    return (
      <BlockRichTextEditor data={data} onChange={onDataChange} />
    );
  }
  if (type === "heading" && isHeadingBlockData(data)) {
    return (
      <BlockHeadingEditor data={data} onChange={onDataChange} />
    );
  }
  if (type === "ad_slot" && isAdSlotBlockData(data)) {
    return (
      <BlockAdSlotEditor data={data} onChange={onDataChange} />
    );
  }
  if (type === "cta" && isCTABlockData(data)) {
    return (
      <BlockCTAEditor data={data} onChange={onDataChange} />
    );
  }
  if (type === "image_with_link" && isImageWithLinkBlockData(data)) {
    return (
      <BlockImageWithLinkEditor data={data} onChange={onDataChange} />
    );
  }
  if (type === "download_button" && isDownloadButtonBlockData(data)) {
    return (
      <BlockDownloadButtonEditor data={data} onChange={onDataChange} />
    );
  }
  if (type === "also_read" && isAlsoReadBlockData(data)) {
    return (
      <BlockAlsoReadEditor
        data={data}
        onChange={onDataChange}
        articles={articles}
      />
    );
  }
  if (type === "membership_cta" && isMembershipCTABlockData(data)) {
    return (
      <BlockMembershipCTAEditor data={data} onChange={onDataChange} />
    );
  }

  return (
    <div className="rounded border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
      Unknown block type: {type}
    </div>
  );
}
