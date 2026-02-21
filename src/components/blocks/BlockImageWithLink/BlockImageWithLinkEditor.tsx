import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";
import ImageUpload from "../../form/ImageUpload";
import type { ImageWithLinkBlockData } from "../types";

interface BlockImageWithLinkEditorProps {
  data: ImageWithLinkBlockData;
  onChange: (data: ImageWithLinkBlockData) => void;
}

export default function BlockImageWithLinkEditor({
  data,
  onChange,
}: BlockImageWithLinkEditorProps) {
  return (
    <div className="space-y-3">
      <div>
        <ImageUpload
          label="Image"
          value={data.imageUrl}
          onChange={(imageUrl) => onChange({ ...data, imageUrl })}
          placeholder="Drop or select an image"
        />
      </div>
      <div>
        <Label>Link URL (optional)</Label>
        <Input
          value={data.linkUrl ?? ""}
          onChange={(e) => onChange({ ...data, linkUrl: e.target.value })}
          placeholder="https://..."
        />
      </div>
      <div>
        <Label>Alt text (optional)</Label>
        <Input
          value={data.alt ?? ""}
          onChange={(e) => onChange({ ...data, alt: e.target.value })}
          placeholder="Describe the image"
        />
      </div>
      <div>
        <Label>Caption (optional)</Label>
        <TextArea
          rows={2}
          value={data.caption ?? ""}
          onChange={(value) => onChange({ ...data, caption: value })}
          placeholder="Image caption"
        />
      </div>
    </div>
  );
}
