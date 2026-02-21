import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";
import ImageUpload from "../../form/ImageUpload";
import type { CTABlockData } from "../types";

interface BlockCTAEditorProps {
  data: CTABlockData;
  onChange: (data: CTABlockData) => void;
}

const CTA_VARIANTS: CTABlockData["variant"][] = [
  "promotion",
  "course",
  "membership",
];

export default function BlockCTAEditor({
  data,
  onChange,
}: BlockCTAEditorProps) {
  return (
    <div className="space-y-3">
      <div>
        <Label>Variant</Label>
        <select
          value={data.variant}
          onChange={(e) =>
            onChange({
              ...data,
              variant: e.target.value as CTABlockData["variant"],
            })
          }
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
        >
          {CTA_VARIANTS.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label>Title</Label>
        <Input
          value={data.title ?? ""}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          placeholder="CTA title"
        />
      </div>
      <div>
        <Label>Description</Label>
        <TextArea
          rows={2}
          value={data.description ?? ""}
          onChange={(value) => onChange({ ...data, description: value })}
          placeholder="Brief description"
        />
      </div>
      <div>
        <Label>Button text</Label>
        <Input
          value={data.buttonText ?? ""}
          onChange={(e) => onChange({ ...data, buttonText: e.target.value })}
          placeholder="Learn more"
        />
      </div>
      <div>
        <Label>Button URL</Label>
        <Input
          value={data.buttonUrl ?? ""}
          onChange={(e) => onChange({ ...data, buttonUrl: e.target.value })}
          placeholder="https://..."
        />
      </div>
      <div>
        <ImageUpload
          label="Image (optional)"
          value={data.imageUrl ?? ""}
          onChange={(imageUrl) => onChange({ ...data, imageUrl })}
          placeholder="Drop or select CTA image"
        />
      </div>
      {data.variant === "course" && (
        <div>
          <Label>Course ID / slug</Label>
          <Input
            value={data.courseId ?? ""}
            onChange={(e) => onChange({ ...data, courseId: e.target.value })}
            placeholder="course-slug"
          />
        </div>
      )}
      {data.variant === "promotion" && (
        <div>
          <Label>Promotion ID / slug</Label>
          <Input
            value={data.promotionId ?? ""}
            onChange={(e) => onChange({ ...data, promotionId: e.target.value })}
            placeholder="promotion-slug"
          />
        </div>
      )}
    </div>
  );
}
