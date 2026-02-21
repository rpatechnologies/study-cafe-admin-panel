import Input from "../../form/input/InputField";
import type { HeadingBlockData } from "../types";

interface BlockHeadingEditorProps {
  data: HeadingBlockData;
  onChange: (data: HeadingBlockData) => void;
}

export default function BlockHeadingEditor({
  data,
  onChange,
}: BlockHeadingEditorProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={data.level}
        onChange={(e) =>
          onChange({ ...data, level: Number(e.target.value) as 1 | 2 | 3 })
        }
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
      >
        <option value={1}>H1</option>
        <option value={2}>H2</option>
        <option value={3}>H3</option>
      </select>
      <Input
        value={data.text}
        onChange={(e) => onChange({ ...data, text: e.target.value })}
        placeholder="Heading text..."
        className="flex-1 min-w-[200px]"
      />
    </div>
  );
}
