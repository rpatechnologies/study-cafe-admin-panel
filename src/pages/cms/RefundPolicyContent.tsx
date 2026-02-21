import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import RichTextEditor from "../../components/form/RichTextEditor";
import Button from "../../components/ui/button/Button";

export default function RefundPolicyContent() {
  const [content, setContent] = useState({
    title: "Refund Policy",
    heading: "Refund Policy",
    body: "We want you to be satisfied with your purchase. Please review our refund policy for memberships and courses.",
  });

  const handleSave = () => {
    // TODO: Integrate with API when backend is ready
    console.log("Save", content);
  };

  return (
    <>
      <PageMeta
        title="Refund Policy Content | StudyCafe Admin"
        description="Update Refund Policy content for studycafe.in"
      />
      <PageBreadcrumb pageTitle="Refund Policy" />
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
            Refund Policy Content
          </h3>
          <div className="space-y-4">
            <div>
              <Label>Page Title</Label>
              <Input
                value={content.title}
                onChange={(e) =>
                  setContent((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Refund Policy"
              />
            </div>
            <div>
              <Label>Main Heading</Label>
              <Input
                value={content.heading}
                onChange={(e) =>
                  setContent((prev) => ({ ...prev, heading: e.target.value }))
                }
                placeholder="Enter main heading"
              />
            </div>
            <div>
              <Label>Content</Label>
              <RichTextEditor
                value={content.body}
                onChange={(value) =>
                  setContent((prev) => ({ ...prev, body: value }))
                }
                placeholder="Enter refund policy content"
                minHeight="300px"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave} size="sm">
            Save Changes
          </Button>
        </div>
      </div>
    </>
  );
}
