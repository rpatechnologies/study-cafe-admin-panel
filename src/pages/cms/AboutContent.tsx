import { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import RichTextEditor from "../../components/form/RichTextEditor";
import Button from "../../components/ui/button/Button";
import { fetchCmsPageBySlug, updateCmsPage } from "../../api/cmsPages";

const SLUG = "about";

const defaultContent = {
  title: "About StudyCafe",
  heading: "One Stop Solution For CA CS CWA",
  description:
    "Studycafe is your trusted platform for CA, CS, CWA exam preparation, Direct & Indirect Tax, GST, Income Tax, and Business News. We provide quality content, courses, and resources.",
  mission:
    "To empower professionals and students with the latest updates and knowledge in finance, taxation, and corporate laws.",
  vision:
    "To be the most trusted source for CA, CS, CWA and tax-related content in India.",
};

export default function AboutContent() {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchCmsPageBySlug(SLUG)
      .then((data) => {
        if (cancelled || !data) return;
        const m = (data.meta || {}) as Record<string, unknown>;
        setContent({
          title: data.title ?? defaultContent.title,
          heading: (m.heading as string) ?? defaultContent.heading,
          description: data.content ?? defaultContent.description,
          mission: (m.mission as string) ?? defaultContent.mission,
          vision: (m.vision as string) ?? defaultContent.vision,
        });
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const handleSave = () => {
    setSaving(true);
    updateCmsPage(SLUG, {
      title: content.title,
      content: content.description,
      meta: { heading: content.heading, mission: content.mission, vision: content.vision },
    })
      .then(() => { setSaving(false); })
      .catch(() => { setSaving(false); });
  };

  return (
    <>
      <PageMeta
        title="About Page Content | StudyCafe Admin"
        description="Update About page content for studycafe.in"
      />
      <PageBreadcrumb pageTitle="About Page Content" />
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
            About Page Content
          </h3>
          <div className="space-y-4">
            <div>
              <Label>Page Title</Label>
              <Input
                value={content.title}
                onChange={(e) =>
                  setContent((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="About StudyCafe"
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
              <Label>Description</Label>
              <RichTextEditor
                value={content.description}
                onChange={(value) =>
                  setContent((prev) => ({ ...prev, description: value }))
                }
                placeholder="Enter page description"
                minHeight="180px"
              />
            </div>
            <div>
              <Label>Mission</Label>
              <RichTextEditor
                value={content.mission}
                onChange={(value) =>
                  setContent((prev) => ({ ...prev, mission: value }))
                }
                placeholder="Enter mission statement"
                minHeight="100px"
              />
            </div>
            <div>
              <Label>Vision</Label>
              <RichTextEditor
                value={content.vision}
                onChange={(value) =>
                  setContent((prev) => ({ ...prev, vision: value }))
                }
                placeholder="Enter vision statement"
                minHeight="100px"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} size="sm" disabled={loading || saving}>
            {saving ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </div>
    </>
  );
}
