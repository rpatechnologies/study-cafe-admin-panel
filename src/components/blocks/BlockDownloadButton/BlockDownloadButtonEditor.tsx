import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import type { DownloadButtonBlockData } from "../types";

interface BlockDownloadButtonEditorProps {
  data: DownloadButtonBlockData;
  onChange: (data: DownloadButtonBlockData) => void;
}

export default function BlockDownloadButtonEditor({
  data,
  onChange,
}: BlockDownloadButtonEditorProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex-1 min-w-[150px]">
        <Label>Button label</Label>
        <Input
          value={data.label}
          onChange={(e) => onChange({ ...data, label: e.target.value })}
          placeholder="Download PDF"
        />
      </div>
      <div className="flex-[2] min-w-[200px]">
        <Label>File URL</Label>
        <Input
          value={data.fileUrl}
          onChange={(e) => onChange({ ...data, fileUrl: e.target.value })}
          placeholder="https://..."
        />
      </div>
    </div>
  );
}
