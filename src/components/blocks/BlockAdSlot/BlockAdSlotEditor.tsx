import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import type { AdSlotBlockData } from "../types";

interface BlockAdSlotEditorProps {
  data: AdSlotBlockData;
  onChange: (data: AdSlotBlockData) => void;
}

const AD_SLOT_TYPES: AdSlotBlockData["type"][] = [
  "leaderboard",
  "rectangle",
  "sidebar",
  "inline",
];

export default function BlockAdSlotEditor({
  data,
  onChange,
}: BlockAdSlotEditorProps) {
  return (
    <div className="space-y-3">
      <div>
        <Label>Ad Unit ID</Label>
        <Input
          value={data.adUnitId}
          onChange={(e) => onChange({ ...data, adUnitId: e.target.value })}
          placeholder="ca-pub-xxxxx/slot-xxxxx"
        />
      </div>
      <div>
        <Label>Slot type</Label>
        <select
          value={data.type}
          onChange={(e) =>
            onChange({
              ...data,
              type: e.target.value as AdSlotBlockData["type"],
            })
          }
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
        >
          {AD_SLOT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
