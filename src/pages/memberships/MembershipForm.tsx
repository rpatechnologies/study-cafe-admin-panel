import { useState, useEffect } from "react";
import { Link } from "react-router";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";
import { api } from "../../api/axios";

export interface CourseOption {
  id: number;
  title: string;
}

export interface CourseCatOption {
  id: number;
  name: string;
  slug: string;
}

export interface MembershipFormData {
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  duration_days: number;
  is_lifetime: boolean;
  features: string; // Kept as string for textarea editing, split by newline
  is_active: boolean;
  course_ids: number[];
  course_cat_ids: number[];
}

interface MembershipFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<MembershipFormData>;
  onSubmit: (data: MembershipFormData) => void;
  loading?: boolean;
}

const emptyFormData: MembershipFormData = {
  name: "",
  slug: "",
  description: "",
  price: 0,
  currency: "INR",
  duration_days: 30,
  is_lifetime: false,
  features: "",
  is_active: true,
  course_ids: [],
  course_cat_ids: [],
};

export default function MembershipForm({
  mode,
  defaultValues,
  onSubmit,
  loading = false,
}: MembershipFormProps) {
  const [formData, setFormData] = useState<MembershipFormData>({
    ...emptyFormData,
    ...defaultValues,
  });
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [courseCats, setCourseCats] = useState<CourseCatOption[]>([]);
  const [optionsLoading, setOptionsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setOptionsLoading(true);
      try {
        const [coursesRes, catsRes] = await Promise.all([
          api.get<CourseOption[]>("/admin/courses"),
          api.get<CourseCatOption[]>("/admin/course-cats"),
        ]);
        if (!cancelled) {
          setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : []);
          setCourseCats(Array.isArray(catsRes.data) ? catsRes.data : []);
        }
      } catch {
        if (!cancelled) { setCourses([]); setCourseCats([]); }
      } finally {
        if (!cancelled) setOptionsLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Effect to update state when defaultValues change (e.g. after data fetch)
  useEffect(() => {
    if (defaultValues) {
      setFormData((prev) => ({
        ...prev,
        ...defaultValues,
      }));
    }
  }, [defaultValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    // Only auto-generate slug in create mode or if slug is empty
    if (mode === "create" || !formData.slug) {
      setFormData((prev) => ({ ...prev, name, slug: generateSlug(name) }));
    } else {
      setFormData((prev) => ({ ...prev, name }));
    }
  };

  const submitLabel = loading
    ? "Saving..."
    : mode === "create" ? "Create Membership" : "Update Membership";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Name <span className="text-error-500">*</span></Label>
              <Input
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g. Lifetime Ultimate"
                required
              />
            </div>
            <div>
              <Label>Slug <span className="text-error-500">*</span></Label>
              <Input
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                placeholder="e.g. lifetime-ultimate"
                required
              />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <TextArea
              rows={3}
              value={formData.description}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
              placeholder="Brief description of the membership"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label>Price <span className="text-error-500">*</span></Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                <Input
                  type="number"
                  className="pl-8"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))
                  }
                  placeholder="0"
                  required
                />
              </div>
            </div>
            <div>
              <Label>Currency</Label>
              <Input
                value={formData.currency}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, currency: e.target.value }))
                }
                disabled // Fixed to INR for now
              />
            </div>
            <div>
              <Label>Duration (Days)</Label>
              <Input
                type="number"
                value={formData.duration_days}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, duration_days: Number(e.target.value) }))
                }
                placeholder="e.g. 30, 365"
                disabled={formData.is_lifetime}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_lifetime"
                checked={formData.is_lifetime}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    is_lifetime: e.target.checked,
                    ...(e.target.checked ? { duration_days: 3650 } : {}),
                  }))
                }
                className="rounded border-gray-300"
              />
              <Label htmlFor="is_lifetime" className="!mb-0">Lifetime plan</Label>
            </div>
          </div>
          {!optionsLoading && (courses.length > 0 || courseCats.length > 0) && (
            <div className="grid gap-4 sm:grid-cols-2">
              {courses.length > 0 && (
                <div>
                  <Label>Courses included (optional)</Label>
                  <select
                    multiple
                    value={formData.course_ids.map(String)}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, (o) => Number(o.value));
                      setFormData((prev) => ({ ...prev, course_ids: selected }));
                    }}
                    className="w-full rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 min-h-[120px]"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple.</p>
                </div>
              )}
              {courseCats.length > 0 && (
                <div>
                  <Label>Categories included – all courses under these (optional)</Label>
                  <select
                    multiple
                    value={formData.course_cat_ids.map(String)}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, (o) => Number(o.value));
                      setFormData((prev) => ({ ...prev, course_cat_ids: selected }));
                    }}
                    className="w-full rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 min-h-[120px]"
                  >
                    {courseCats.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple.</p>
                </div>
              )}
            </div>
          )}
          <div>
            <Label>Features (one per line)</Label>
            <TextArea
              rows={4}
              value={formData.features}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, features: value }))
              }
              placeholder="All courses&#10;Certificates&#10;Support"
            />
          </div>
          <div>
            <Label>Status</Label>
            <select
              value={formData.is_active ? "active" : "inactive"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  is_active: e.target.value === "active",
                }))
              }
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:opacity-50"
        >
          {submitLabel}
        </button>
        <Link to="/memberships">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}
