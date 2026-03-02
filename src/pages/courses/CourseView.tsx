import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Badge from "../../components/ui/badge/Badge";
import {
  fetchCourse,
  fetchCourseSessions,
  updateRecording as updateRecordingApi,
  addRecording as addRecordingApi,
  type Course,
  type BatchRecord,
  type RecordingRecord,
} from "../../api/courses";

const safeJsonParse = (str: string | null | undefined, fallback: any = []) => {
  if (!str) return fallback;
  try { return JSON.parse(str); } catch { return fallback; }
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
      <dd className="mt-0.5 text-gray-800 dark:text-white/90">{children}</dd>
    </div>
  );
}

function JsonList({ label, items }: { label: string; items: any[] }) {
  if (!items?.length) return null;
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <ul className="space-y-1 list-disc pl-5">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: typeof item === "string" ? item : item.title || item.question || item.name || JSON.stringify(item) }} />
        ))}
      </ul>
    </div>
  );
}

function RecordingRow({
  recording,
  onUpdated,
}: {
  recording: RecordingRecord;
  onUpdated: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [url, setUrl] = useState(recording.url);
  const [source, setSource] = useState(recording.source ?? "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateRecordingApi(recording.id, { url: url || undefined, source: source || null });
      onUpdated();
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-1.5 text-sm">
      {editing ? (
        <>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Recording URL"
            className="min-w-[200px] rounded border border-gray-300 bg-white px-2 py-1 dark:border-gray-600 dark:bg-gray-800"
          />
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Source (e.g. YouTube)"
            className="w-24 rounded border border-gray-300 bg-white px-2 py-1 dark:border-gray-600 dark:bg-gray-800"
          />
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !url}
            className="rounded bg-brand-500 px-2 py-1 text-white hover:bg-brand-600 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button type="button" onClick={() => setEditing(false)} className="rounded border px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">
            Cancel
          </button>
        </>
      ) : (
        <>
          <a
            href={recording.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:underline dark:text-brand-400"
          >
            {recording.url.length > 60 ? recording.url.slice(0, 60) + "…" : recording.url}
          </a>
          {recording.source && (
            <span className="text-gray-500 dark:text-gray-400">({recording.source})</span>
          )}
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded border px-2 py-0.5 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Edit link
          </button>
        </>
      )}
    </div>
  );
}

function AddRecordingForm({ sessionId, onAdded }: { sessionId: number; onAdded: () => void }) {
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!url.trim()) return;
    setSaving(true);
    try {
      await addRecordingApi(sessionId, { url: url.trim(), source: source || null });
      onAdded();
      setUrl("");
      setSource("");
      setShow(false);
    } finally {
      setSaving(false);
    }
  };

  if (!show) {
    return (
      <button
        type="button"
        onClick={() => setShow(true)}
        className="text-sm text-brand-600 hover:underline dark:text-brand-400"
      >
        + Add recording link
      </button>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-2 py-1.5 text-sm">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Recording URL"
        className="min-w-[200px] rounded border border-gray-300 bg-white px-2 py-1 dark:border-gray-600 dark:bg-gray-800"
      />
      <input
        type="text"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        placeholder="Source (optional)"
        className="w-24 rounded border border-gray-300 bg-white px-2 py-1 dark:border-gray-600 dark:bg-gray-800"
      />
      <button
        type="button"
        onClick={handleAdd}
        disabled={saving || !url.trim()}
        className="rounded bg-brand-500 px-2 py-1 text-white hover:bg-brand-600 disabled:opacity-50"
      >
        {saving ? "Adding..." : "Add"}
      </button>
      <button type="button" onClick={() => setShow(false)} className="rounded border px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">
        Cancel
      </button>
    </div>
  );
}

/** Single section: curriculum sections with day-wise recording links (no separate Batches & Recordings). */
function CurriculumAndRecordings({
  curriculum,
  batches,
  loadingSessions,
  onRecordingUpdated,
}: {
  curriculum: any[];
  batches: BatchRecord[];
  loadingSessions: boolean;
  onRecordingUpdated: () => void;
}) {
  const sessionsWithBatch = batches.flatMap((b) =>
    b.sessions.map((s) => ({ ...s, batchName: b.name }))
  );
  const dayNumbers = [...new Set(sessionsWithBatch.map((s) => s.day_number))].sort((a, b) => a - b);
  const maxDayFromSessions = dayNumbers.length ? Math.max(...dayNumbers) : 0;
  const dayCount = Math.max(curriculum.length, maxDayFromSessions, 1);
  const hasCurriculum = curriculum.length > 0;
  const hasSessions = sessionsWithBatch.length > 0;

  if (loadingSessions) {
    return (
      <Section title="Curriculum & Recordings">
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
      </Section>
    );
  }

  if (!hasCurriculum && !hasSessions) {
    return (
      <Section title="Curriculum & Recordings">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Add curriculum (course edit) and batches/sessions to show day-wise content and recording links here.
        </p>
      </Section>
    );
  }

  return (
    <Section title={`Curriculum & Recordings${hasCurriculum ? ` (${dayCount} day${dayCount !== 1 ? "s" : ""})` : ""}`}>
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {Array.from({ length: dayCount }, (_, i) => i + 1).map((dayNum) => {
          const curriculumItem = curriculum[dayNum - 1];
          const sessionsForDay = sessionsWithBatch.filter((s) => s.day_number === dayNum);
          const title = curriculumItem?.title || `Day ${dayNum}`;
          return (
            <div key={dayNum} className="py-4 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium text-gray-800 dark:text-white/90">
                  {hasCurriculum ? `Day ${dayNum}: ${title}` : title}
                </p>
                {curriculumItem?.minutes != null && (
                  <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {curriculumItem.minutes} min
                  </span>
                )}
              </div>
              {curriculumItem?.description && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{curriculumItem.description}</p>
              )}
              <div className="mt-2 pl-2 border-l-2 border-gray-200 dark:border-gray-700 space-y-1.5">
                {sessionsForDay.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No recording link for this day yet. Add a session with this day number in a batch to attach recordings.</p>
                ) : (
                  sessionsForDay.map((session) => (
                    <div key={session.id}>
                      {sessionsWithBatch.length > 1 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">{session.batchName} · </span>
                      )}
                      {session.recordings.map((rec) => (
                        <RecordingRow key={rec.id} recording={rec} onUpdated={onRecordingUpdated} />
                      ))}
                      {/* {!session.recordings.length && session.recordings.length > 1 && <AddRecordingForm sessionId={session.id} onAdded={onRecordingUpdated} />} */}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default function CourseView() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [batches, setBatches] = useState<BatchRecord[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchCourse(id)
      .then(setCourse)
      .finally(() => setLoading(false));
  }, [id]);

  const loadSessions = useCallback(() => {
    if (!id) return;
    setLoadingSessions(true);
    fetchCourseSessions(id)
      .then(setBatches)
      .finally(() => setLoadingSessions(false));
  }, [id]);

  useEffect(() => {
    if (!id || !course) return;
    loadSessions();
  }, [id, course?.id, loadSessions]);

  if (loading || !course) {
    return (
      <div className="flex items-center justify-center py-12">
        {loading ? "Loading..." : "Course not found."}
      </div>
    );
  }

  const curriculum = safeJsonParse(course.curriculum, []);
  const learnOutcomes = safeJsonParse(course.learn_outcomes, []);
  const faqs = safeJsonParse(course.faqs, []);
  const feedback = safeJsonParse(course.feedback, []);
  const termsConditions = safeJsonParse(course.terms_conditions, []);
  const includesInfo = safeJsonParse(course.includes_info, []);

  return (
    <>
      <PageMeta title={`${course.title} | StudyCafe Admin`} description="Course details" />
      <PageBreadcrumb
        pageTitle={course.title}
        items={[{ label: "Courses", path: "/courses" }]}
        actions={
          <div className="flex items-center gap-2">
            <Link
              to={`/courses/${id}/edit`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
            >
              Edit
            </Link>
          </div>
        }
      />

      <div className="space-y-6">
        {/* Header Info */}
        <Section title="Course Details">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge size="sm" color={course.is_published ? "success" : "error"}>
              {course.is_published ? "Published" : "Draft"}
            </Badge>
            <Badge size="sm" color="info">{course.status}</Badge>
            {course.course_type && <Badge size="sm" color="warning">{course.course_type}</Badge>}
          </div>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Title">{course.title}</Field>
            {course.short_title && <Field label="Short Title">{course.short_title}</Field>}
            {course.slug && <Field label="Slug">/{course.slug}</Field>}
            <Field label="Price">₹{Number(course.price).toFixed(2)}</Field>
            {course.sale_price && <Field label="Sale Price">₹{Number(course.sale_price).toFixed(2)}</Field>}
            {course.language && <Field label="Language">{course.language}</Field>}
            {course.gateway && <Field label="Gateway">{course.gateway}</Field>}
            <Field label="Taxable">{course.taxable ? "Yes" : "No"}</Field>
            {course.created_at && <Field label="Created">{new Date(course.created_at).toLocaleDateString()}</Field>}
          </dl>
          {course.brief_description && (
            <div className="mt-4">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Brief Description</dt>
              <dd className="mt-1 text-gray-700 dark:text-gray-300">{course.brief_description}</dd>
            </div>
          )}
        </Section>

        {/* Thumbnail */}
        {course.thumbnail_url && (
          <Section title="Thumbnail">
            <img src={course.thumbnail_url} alt={course.title} className="max-w-md rounded-lg" referrerPolicy="no-referrer" loading="lazy" />
          </Section>
        )}

        {/* Description */}
        {course.description && (
          <Section title="Full Description">
            <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: course.description }} />
          </Section>
        )}

        {/* Key Features */}
        {learnOutcomes.length > 0 && (
          <Section title="Key Features (Learn Outcomes)">
            <ul className="space-y-2">
              {learnOutcomes.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="mt-0.5 text-brand-500">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Curriculum & Recordings: one section, day-wise curriculum + recording links */}
        <CurriculumAndRecordings
          curriculum={curriculum}
          batches={batches}
          loadingSessions={loadingSessions}
          onRecordingUpdated={loadSessions}
        />

        {/* Includes */}
        {includesInfo.length > 0 && (
          <Section title="This Course Includes">
            <ul className="space-y-2">
              {includesInfo.map((item: any, i: number) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-brand-500">•</span>
                  <span dangerouslySetInnerHTML={{ __html: item.title }} />
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* FAQs */}
        {faqs.length > 0 && (
          <Section title={`FAQs (${faqs.length})`}>
            <div className="space-y-4">
              {faqs.map((faq: any, i: number) => (
                <div key={i}>
                  <p className="font-medium text-gray-800 dark:text-white/90">{faq.question}</p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Feedback */}
        {feedback.length > 0 && (
          <Section title={`Reviews (${feedback.length})`}>
            <div className="grid gap-4 sm:grid-cols-2">
              {feedback.map((fb: any, i: number) => (
                <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{fb.review}"</p>
                  <div className="mt-2 flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">{fb.name}</p>
                    {fb.designation && <span className="text-xs text-gray-500">• {fb.designation}</span>}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Terms & Conditions */}
        {termsConditions.length > 0 && (
          <Section title="Terms & Conditions">
            <JsonList label="" items={termsConditions} />
          </Section>
        )}

        {/* Requirements & Certifications */}
        {(course.requirements || course.certifications || course.keywords) && (
          <Section title="Additional Info">
            <dl className="space-y-3">
              {course.requirements && <Field label="Requirements">{course.requirements}</Field>}
              {course.certifications && <Field label="Certifications">{course.certifications}</Field>}
              {course.keywords && <Field label="Keywords"><span className="text-sm">{course.keywords}</span></Field>}
            </dl>
          </Section>
        )}
      </div>
    </>
  );
}
