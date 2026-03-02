import { api } from "./axios";

export interface Course {
  id: number;
  title: string;
  short_title: string | null;
  slug: string | null;
  brief_description: string | null;
  description: string | null;
  curriculum: string | null;
  learn_outcomes: string | null;
  requirements: string | null;
  terms_conditions: string | null;
  price: number | string;
  sale_price: number | string | null;
  thumbnail_url: string | null;
  youtube_url: string | null;
  language: string | null;
  course_type: string | null;
  taxable: boolean;
  keywords: string | null;
  faqs: string | null;
  feedback: string | null;
  includes_info: string | null;
  certifications: string | null;
  gateway: string | null;
  is_published: boolean;
  status: string;
  start_date: string | null;
  end_date: string | null;
  created_at?: string;
}

export interface CourseCat {
  id: number;
  name: string;
  slug: string | null;
}

export async function fetchCourses(): Promise<Course[]> {
  const res = await api.get<Course[]>("/admin/courses");
  return Array.isArray(res.data) ? res.data : [];
}

export async function fetchCourseCats(): Promise<CourseCat[]> {
  const res = await api.get<CourseCat[]>("/admin/course-cats");
  return Array.isArray(res.data) ? res.data : [];
}

export async function fetchCourse(id: string): Promise<Course | null> {
  try {
    const res = await api.get<Course>(`/admin/courses/${id}`);
    return res.data ?? null;
  } catch {
    return null;
  }
}

export async function createCourse(payload: Partial<Course>): Promise<Course> {
  const res = await api.post<Course>("/admin/courses", payload);
  return res.data;
}

export async function updateCourse(id: string, payload: Partial<Course>): Promise<Course> {
  const res = await api.put<Course>(`/admin/courses/${id}`, payload);
  return res.data;
}

// ─── Course content: batches → sessions → recordings ────────────────────────

export interface RecordingRecord {
  id: number;
  url: string;
  source: string | null;
}

export interface SessionRecord {
  id: number;
  batch_id: number;
  day_number: number;
  title: string | null;
  scheduled_at: string | null;
  meet_link: string | null;
  recordings: RecordingRecord[];
}

export interface BatchRecord {
  id: number;
  name: string;
  start_date: string | null;
  end_date: string | null;
  meet_link: string | null;
  sessions: SessionRecord[];
}

export async function fetchCourseSessions(courseId: string): Promise<BatchRecord[]> {
  try {
    const res = await api.get<BatchRecord[]>(`/admin/courses/${courseId}/sessions`);
    return Array.isArray(res.data) ? res.data : [];
  } catch {
    return [];
  }
}

export async function updateRecording(recordingId: number, payload: { url?: string; source?: string | null }): Promise<RecordingRecord> {
  const res = await api.put<RecordingRecord>(`/admin/recordings/${recordingId}`, payload);
  return res.data;
}

export async function addRecording(sessionId: number, payload: { url: string; source?: string | null }): Promise<RecordingRecord> {
  const res = await api.post<RecordingRecord>(`/admin/sessions/${sessionId}/recordings`, payload);
  return res.data;
}
