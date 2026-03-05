import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import ImageUpload from "../../components/form/ImageUpload";
import Button from "../../components/ui/button/Button";
import ArticleEditor from "../../components/article-editor/ArticleEditor";
import { ArrayEditor } from "./components/ArrayEditor";
import { COURSE_PREVIEW_STATE_KEY, COURSE_RESTORE_STATE_KEY } from "./CoursePreview";
import type { Course } from "../../api/courses";

export interface CourseFormData {
  title: string;
  short_title: string;
  slug: string;
  brief_description: string;
  description: string;
  curriculum: any[];
  learn_outcomes: string[];
  requirements: string;
  terms_conditions: any[];
  price: string;
  sale_price: string;
  thumbnail_url: string;
  youtube_url: string;
  language: string;
  course_type: string;
  taxable: boolean;
  keywords: string;
  faqs: any[];
  includes_info: any[];
  feedback: any[];
  certifications: string;
  gateway: string;
  is_published: boolean;
}

const safeJsonParse = (str: string | null | undefined, fallback: any = []) => {
  if (!str) return fallback;
  try { return JSON.parse(str); } catch { return fallback; }
};

export default function CourseForm({ initial, onSubmit, loading = false }: { initial?: Course | null, onSubmit: (data: CourseFormData) => Promise<void>, loading?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const restoredData = location.state?.[COURSE_RESTORE_STATE_KEY] as CourseFormData | undefined;

  const [form, setForm] = useState<CourseFormData>(() => {
    if (restoredData) return restoredData;
    return {
      title: initial?.title ?? "",
      short_title: initial?.short_title ?? "",
      slug: initial?.slug ?? "",
      brief_description: initial?.brief_description ?? "",
      description: initial?.description ?? "",
      curriculum: safeJsonParse(initial?.curriculum, []),
      learn_outcomes: safeJsonParse(initial?.learn_outcomes, []),
      requirements: initial?.requirements ?? "",
      terms_conditions: safeJsonParse(initial?.terms_conditions, []),
      price: initial?.price != null ? String(initial.price) : "0",
      sale_price: initial?.sale_price != null ? String(initial.sale_price) : "",
      thumbnail_url: initial?.thumbnail_url ?? "",
      youtube_url: initial?.youtube_url ?? "",
      language: initial?.language ?? "",
      course_type: initial?.course_type ?? "",
      taxable: initial?.taxable ?? false,
      keywords: initial?.keywords ?? "",
      faqs: safeJsonParse(initial?.faqs, []),
      includes_info: safeJsonParse(initial?.includes_info, []),
      feedback: safeJsonParse(initial?.feedback, []),
      certifications: initial?.certifications ?? "",
      gateway: initial?.gateway ?? "",
      is_published: initial?.is_published ?? false,
    };
  });

  // Clear restore state from history after restoring
  useEffect(() => {
    if (restoredData) {
      window.history.replaceState({}, '');
    }
  }, [restoredData]);

  const handlePreview = () => {
    const returnPath = location.pathname;
    navigate('/courses/preview', {
      state: {
        [COURSE_PREVIEW_STATE_KEY]: form,
        returnPath,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const updateField = (field: keyof CourseFormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Information */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">General Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label>Title <span className="text-error-500">*</span></Label>
            <Input value={form.title} onChange={(e) => updateField('title', e.target.value)} required />
          </div>
          <div>
            <Label>Short Title</Label>
            <Input value={form.short_title} onChange={(e) => updateField('short_title', e.target.value)} />
          </div>
          <div>
            <Label>Slug</Label>
            <Input value={form.slug} onChange={(e) => updateField('slug', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label>Brief Description</Label>
            <TextArea rows={3} value={form.brief_description} onChange={(v) => updateField('brief_description', v)} />
          </div>
        </div>
      </div>

      {/* Pricing and Media */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Pricing & Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Regular Price (₹) <span className="text-error-500">*</span></Label>
            <Input type="number" min={0} step={0.01} value={form.price} onChange={(e) => updateField('price', e.target.value)} required />
          </div>
          <div>
            <Label>Sale Price (₹)</Label>
            <Input type="number" min={0} step={0.01} value={form.sale_price} onChange={(e) => updateField('sale_price', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <ImageUpload
              label="Thumbnail URL"
              value={form.thumbnail_url}
              onChange={(url) => updateField('thumbnail_url', url)}
              placeholder="Drop or select image"
            />
          </div>
          <div className="md:col-span-2">
            <Label>Promo Video URL (Youtube)</Label>
            <Input value={form.youtube_url} onChange={(e) => updateField('youtube_url', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Detailed Content */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Main Content</h3>
        <div className="space-y-4">
          <div>
            <Label>Full Description</Label>
            <ArticleEditor
              value={form.description}
              onChange={(html) => updateField('description', html)}
              placeholder="Course full description..."
              minHeight="300px"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Arrays */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Curriculum & Details</h3>
        <div className="space-y-8">
          <div>
            <Label>Key Features (Learn Outcomes)</Label>
            <ArrayEditor
              value={form.learn_outcomes}
              onChange={(v) => updateField('learn_outcomes', v)}
              defaultItem=""
              addButtonLabel="Add Feature"
              renderItem={(item, index) => (
                <Input value={item} onChange={(e) => {
                  const val = e.target.value;
                  const newVal = [...form.learn_outcomes];
                  newVal[index] = val;
                  updateField('learn_outcomes', newVal);
                }} placeholder="Feature text (HTML supported)" />
              )}
            />
          </div>

          <div>
            <Label>Includes Information Menu</Label>
            <ArrayEditor
              value={form.includes_info}
              onChange={(v) => updateField('includes_info', v)}
              defaultItem={{ icon: "star", title: "" }}
              addButtonLabel="Add Include Item"
              renderItem={(item: any, index, update) => (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label>Icon ID (e.g. language, video)</Label>
                    <Input value={item.icon || ''} onChange={e => update(index, { icon: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Title</Label>
                    <Input value={item.title || ''} onChange={e => update(index, { title: e.target.value })} />
                  </div>
                </div>
              )}
            />
          </div>

          <div>
            <Label>Curriculum</Label>
            <ArrayEditor
              value={form.curriculum}
              onChange={(v) => updateField('curriculum', v)}
              defaultItem={{ title: "", minutes: "", description: "", video: "", files: [] }}
              addButtonLabel="Add Curriculum Section"
              renderItem={(item: any, index, update) => (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-3">
                      <Label>Section Title</Label>
                      <Input value={item.title || ''} onChange={e => update(index, { title: e.target.value })} />
                    </div>
                    <div>
                      <Label>Minutes</Label>
                      <Input value={item.minutes || ''} onChange={e => update(index, { minutes: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Video ID (Vimeo)</Label>
                      <Input value={item.video || ''} onChange={e => update(index, { video: e.target.value })} placeholder="e.g. 538969956" />
                    </div>
                    <div>
                      <Label>File IDs (comma-separated)</Label>
                      <Input value={Array.isArray(item.files) ? item.files.join(', ') : (item.files || '')} onChange={e => {
                        const val = e.target.value;
                        const filesArr = val ? val.split(',').map((f: string) => f.trim()).filter(Boolean) : [];
                        update(index, { files: filesArr });
                      }} placeholder="e.g. 96620, 96621" />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <TextArea rows={2} value={item.description || ''} onChange={v => update(index, { description: v })} />
                  </div>
                </div>
              )}
            />
          </div>

          <div>
            <Label>FAQs</Label>
            <ArrayEditor
              value={form.faqs}
              onChange={(v) => updateField('faqs', v)}
              defaultItem={{ question: "", answer: "" }}
              addButtonLabel="Add FAQ"
              renderItem={(item: any, index, update) => (
                <div className="space-y-4">
                  <div>
                    <Label>Question</Label>
                    <Input value={item.question || ''} onChange={e => update(index, { question: e.target.value })} />
                  </div>
                  <div>
                    <Label>Answer</Label>
                    <TextArea rows={2} value={item.answer || ''} onChange={v => update(index, { answer: v })} />
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>

      {/* Feedback / Reviews */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Course Feedback / Reviews</h3>
        <ArrayEditor
          value={form.feedback}
          onChange={(v) => updateField('feedback', v)}
          defaultItem={{ name: "", designation: "Course Attendee", review: "" }}
          addButtonLabel="Add Review"
          renderItem={(item: any, index, update) => (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Reviewer Name</Label>
                  <Input value={item.name || ''} onChange={e => update(index, { name: e.target.value })} />
                </div>
                <div>
                  <Label>Designation</Label>
                  <Input value={item.designation || ''} onChange={e => update(index, { designation: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>Review</Label>
                <TextArea rows={3} value={item.review || ''} onChange={v => update(index, { review: v })} />
              </div>
            </div>
          )}
        />
      </div>

      {/* Other Info */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Additional Info</h3>
        <div className="space-y-6">
          <div>
            <Label>Requirements</Label>
            <TextArea rows={3} value={form.requirements} onChange={(v) => updateField('requirements', v)} />
          </div>
          <div>
            <Label>Terms and Conditions</Label>
            <ArrayEditor
              value={form.terms_conditions}
              onChange={(v) => updateField('terms_conditions', v)}
              defaultItem={{ title: "" }}
              addButtonLabel="Add Term"
              renderItem={(item: any, index, update) => (
                <div>
                  <Input value={item.title || ''} onChange={e => update(index, { title: e.target.value })} placeholder="Term / condition text" />
                </div>
              )}
            />
          </div>
          <div>
            <Label>Certifications</Label>
            <TextArea rows={2} value={form.certifications} onChange={(v) => updateField('certifications', v)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Language</Label>
              <Input value={form.language} onChange={(e) => updateField('language', e.target.value)} />
            </div>
            <div>
              <Label>Course Type</Label>
              <Input value={form.course_type} onChange={(e) => updateField('course_type', e.target.value)} />
            </div>
            <div>
              <Label>Keywords</Label>
              <Input value={form.keywords} onChange={(e) => updateField('keywords', e.target.value)} placeholder="Comma-separated keywords" />
            </div>
            <div>
              <Label>Gateway</Label>
              <Input value={form.gateway} onChange={(e) => updateField('gateway', e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {/* Settings Options */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Settings</h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_published"
              checked={form.is_published}
              onChange={(e) => updateField('is_published', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
            />
            <Label htmlFor="is_published" className="!mb-0 cursor-pointer">Published</Label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="taxable"
              checked={form.taxable}
              onChange={(e) => updateField('taxable', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
            />
            <Label htmlFor="taxable" className="!mb-0 cursor-pointer">Taxable</Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" size="sm" onClick={handlePreview}>
          Preview
        </Button>
        <Button type="submit" size="sm" disabled={loading}>
          {loading ? "Saving…" : "Save Course"}
        </Button>
      </div>
    </form>
  );
}
