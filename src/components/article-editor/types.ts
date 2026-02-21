/**
 * Article body: stored as TipTap JSON document (single-document editor).
 * Used only for articles. Content Blocks remain for courses.
 */

export type ArticleBodyJSON = Record<string, unknown>;

export const ARTICLE_EDITOR_DOC_DEFAULT = {
  type: "doc",
  content: [{ type: "paragraph" }],
};
