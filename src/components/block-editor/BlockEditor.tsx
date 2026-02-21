import { useCallback, useRef, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import BlockWrapper from "./BlockWrapper";
import BlockTypePicker from "./BlockTypePicker";
import type { ContentBlock, ContentBlockData, ContentBlockType } from "../blocks/types";

function generateBlockId() {
  return crypto.randomUUID?.() ?? `block-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
  renderBlock: (block: ContentBlock, onDataChange: (data: ContentBlockData) => void) => React.ReactNode;
}

const EMPTY_BLOCK_DATA: Record<ContentBlockType, ContentBlockData> = {
  rich_text: { html: "" },
  heading: { level: 1, text: "" },
  ad_slot: { adUnitId: "", type: "leaderboard" },
  cta: { variant: "promotion" },
  image_with_link: { imageUrl: "" },
  download_button: { label: "", fileUrl: "" },
  also_read: { articleIds: [] },
  membership_cta: { heading: "", buttonText: "", buttonUrl: "" },
};

export default function BlockEditor({
  blocks,
  onChange,
  renderBlock,
}: BlockEditorProps) {
  const [pickerOpenAt, setPickerOpenAt] = useState<number | null>(null);
  const plusButtonRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(blocks, oldIndex, newIndex).map((b, i) => ({
        ...b,
        order: i,
      }));
      onChange(reordered);
    },
    [blocks, onChange]
  );

  const insertBlockAt = useCallback(
    (index: number, type: ContentBlockType) => {
      const newBlock: ContentBlock = {
        id: generateBlockId(),
        type,
        order: index,
        data: { ...EMPTY_BLOCK_DATA[type] } as ContentBlockData,
      };
      const before = blocks.slice(0, index);
      const after = blocks.slice(index).map((b) => ({ ...b, order: b.order + 1 }));
      onChange(
        [...before, newBlock, ...after].map((b, i) => ({ ...b, order: i }))
      );
      setPickerOpenAt(null);
    },
    [blocks, onChange]
  );

  const deleteBlock = useCallback(
    (id: string) => {
      const filtered = blocks
        .filter((b) => b.id !== id)
        .map((b, i) => ({ ...b, order: i }));
      onChange(filtered);
    },
    [blocks, onChange]
  );

  const updateBlockData = useCallback(
    (id: string, data: ContentBlockData) => {
      onChange(
        blocks.map((b) => (b.id === id ? { ...b, data } : b))
      );
    },
    [blocks, onChange]
  );

  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);
  const blockIds = sortedBlocks.map((b) => b.id);

  return (
    <div className="space-y-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={blockIds} strategy={verticalListSortingStrategy}>
          {sortedBlocks.map((block, index) => (
            <div key={block.id} className="space-y-2">
              <PlusButtonRow
                index={index}
                pickerOpenAt={pickerOpenAt}
                setPickerOpenAt={setPickerOpenAt}
                plusButtonRefs={plusButtonRefs}
                insertBlockAt={insertBlockAt}
                totalCount={sortedBlocks.length}
              />
              <BlockWrapper
                block={block}
                onDelete={() => deleteBlock(block.id)}
              >
                {renderBlock(block, (data) => updateBlockData(block.id, data))}
              </BlockWrapper>
            </div>
          ))}
          <PlusButtonRow
            index={sortedBlocks.length}
            pickerOpenAt={pickerOpenAt}
            setPickerOpenAt={setPickerOpenAt}
            plusButtonRefs={plusButtonRefs}
            insertBlockAt={insertBlockAt}
            totalCount={sortedBlocks.length}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
}

interface PlusButtonRowProps {
  index: number;
  pickerOpenAt: number | null;
  setPickerOpenAt: React.Dispatch<React.SetStateAction<number | null>>;
  plusButtonRefs: React.MutableRefObject<Map<number, HTMLButtonElement>>;
  insertBlockAt: (index: number, type: ContentBlockType) => void;
  totalCount: number;
}

function PlusButtonRow({
  index,
  pickerOpenAt,
  setPickerOpenAt,
  plusButtonRefs,
  insertBlockAt,
}: PlusButtonRowProps) {
  const isActive = pickerOpenAt === index;
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="relative flex justify-center">
      <button
        ref={(el) => {
          anchorRef.current = el;
          if (el) plusButtonRefs.current.set(index, el);
        }}
        type="button"
        onClick={() => setPickerOpenAt((prev) => (prev === index ? null : index))}
        className={`flex items-center justify-center rounded-full p-1.5 transition ${
          isActive
            ? "bg-brand-500 text-white"
            : "text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        }`}
        title="Add block"
      >
        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      <BlockTypePicker
        isOpen={pickerOpenAt === index}
        onClose={() => setPickerOpenAt(null)}
        onSelect={(type) => insertBlockAt(index, type)}
        anchorRef={anchorRef}
      />
    </div>
  );
}
