import { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import RichTextEditor from "../../components/form/RichTextEditor";
import Button from "../../components/ui/button/Button";
import { fetchCmsPageBySlug, updateCmsPage } from "../../api/cmsPages";

const SLUG = "terms-of-use";

const defaultContent = {
  title: "Terms of Use",
  heading: "Terms of Use",
  body: "Please read these terms of use carefully before using our platform and services.",
};

export default function TermsOfUseContent() {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchCmsPageBySlug(SLUG)
      .then((data) => {
        if (cancelled || !data) return;
        setContent({
          title: data.title ?? defaultContent.title,
          heading: (data.meta as Record<string, unknown>)?.heading as string ?? defaultContent.heading,
          body: data.content ?? defaultContent.body,
        });
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const handleSave = () => {
    setSaving(true);
    updateCmsPage(SLUG, {
      title: content.title,
      content: content.body,
      meta: { heading: content.heading },
    })
      .then(() => { setSaving(false); })
      .catch(() => { setSaving(false); });
  };

  return (
    <>
      <PageMeta
        title="Terms of Use Content | StudyCafe Admin"
        description="Update Terms of Use content for studycafe.in"
      />
      <PageBreadcrumb pageTitle="Terms of Use" />
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
            Terms of Use Content
          </h3>
          <div className="space-y-4">
            <div>
              <Label>Page Title</Label>
              <Input
                value={content.title}
                onChange={(e) =>
                  setContent((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Terms of Use"
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
                placeholder="Enter terms of use content"
                minHeight="300px"
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
