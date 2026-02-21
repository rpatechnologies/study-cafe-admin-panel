import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import RichTextEditor from "../../components/form/RichTextEditor";
import Button from "../../components/ui/button/Button";

export default function ContactContent() {
  const [content, setContent] = useState({
    title: "Contact Us",
    heading: "Get In Touch",
    description:
      "Have questions or feedback? Reach out to us. We'd love to hear from you.",
    email: "info@studycafe.in",
    phone: "+91 1234567890",
    address:
      "Studycafe Private Limited, New Delhi, India",
    submitButtonText: "Send Message",
  });

  const handleSave = () => {
    // TODO: Integrate with API when backend is ready
    console.log("Save", content);
  };

  return (
    <>
      <PageMeta
        title="Contact Page Content | StudyCafe Admin"
        description="Update Contact page content for studycafe.in"
      />
      <PageBreadcrumb pageTitle="Contact Page Content" />
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
            Contact Page Content
          </h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Page Title</Label>
                <Input
                  value={content.title}
                  onChange={(e) =>
                    setContent((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Contact Us"
                />
              </div>
              <div>
                <Label>Main Heading</Label>
                <Input
                  value={content.heading}
                  onChange={(e) =>
                    setContent((prev) => ({ ...prev, heading: e.target.value }))
                  }
                  placeholder="Get In Touch"
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <RichTextEditor
                value={content.description}
                onChange={(value) =>
                  setContent((prev) => ({ ...prev, description: value }))
                }
                placeholder="Enter description"
                minHeight="120px"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={content.email}
                  onChange={(e) =>
                    setContent((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="info@studycafe.in"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  type="text"
                  value={content.phone}
                  onChange={(e) =>
                    setContent((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="+91 1234567890"
                />
              </div>
            </div>
            <div>
              <Label>Address</Label>
              <TextArea
                rows={2}
                value={content.address}
                onChange={(value) =>
                  setContent((prev) => ({ ...prev, address: value }))
                }
                placeholder="Enter address"
              />
            </div>
            <div>
              <Label>Submit Button Text</Label>
              <Input
                value={content.submitButtonText}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    submitButtonText: e.target.value,
                  }))
                }
                placeholder="Send Message"
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
