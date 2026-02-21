/**
 * Decode a slug for display in the UI (e.g. Hindi/Unicode stored or sent as percent-encoded).
 * Use this whenever showing a slug to the user so they see readable text, not %e0%a4%...
 */
export function decodeSlugForDisplay(slug: string | null | undefined): string {
  if (slug == null || slug === "") return "";
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}
