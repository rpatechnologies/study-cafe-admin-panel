import RichTextEditor from "../../form/RichTextEditor";
import type { RichTextBlockData } from "../types";

interface BlockRichTextEditorProps {
  data: RichTextBlockData;
  onChange: (data: RichTextBlockData) => void;
}

export default function BlockRichTextEditor({
  data,
  onChange,
}: BlockRichTextEditorProps) {
  return (
    <RichTextEditor
      value={data.html}
      onChange={(html) => onChange({ ...data, html })}
      placeholder="Write a paragraph..."
      minHeight="120px"
    />
  );
}
