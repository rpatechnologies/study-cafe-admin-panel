import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import type { MembershipCTABlockData } from "../types";

interface BlockMembershipCTAEditorProps {
  data: MembershipCTABlockData;
  onChange: (data: MembershipCTABlockData) => void;
}

export default function BlockMembershipCTAEditor({
  data,
  onChange,
}: BlockMembershipCTAEditorProps) {
  return (
    <div className="space-y-3">
      <div>
        <Label>Heading</Label>
        <Input
          value={data.heading}
          onChange={(e) => onChange({ ...data, heading: e.target.value })}
          placeholder="Unlock full access"
        />
      </div>
      <div>
        <Label>Button text</Label>
        <Input
          value={data.buttonText}
          onChange={(e) => onChange({ ...data, buttonText: e.target.value })}
          placeholder="Join Now"
        />
      </div>
      <div>
        <Label>Button URL</Label>
        <Input
          value={data.buttonUrl}
          onChange={(e) => onChange({ ...data, buttonUrl: e.target.value })}
          placeholder="https://..."
        />
      </div>
    </div>
  );
}
