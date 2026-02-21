import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import type { Editor } from "@tiptap/core";
import {
  ArticleImageWithLinkNode,
  ArticleCTANode,
  ArticleAdSlotNode,
  ArticleAlsoReadNode,
  ArticleDownloadButtonNode,
  ArticleMembershipCTANode,
} from "./nodes";
import {
  ARTICLE_EDITOR_DOC_DEFAULT,
  type ArticleBodyJSON,
} from "./types";

interface ArticleEditorProps {
  value?: string;
  onChange?: (json: string) => void;
  placeholder?: string;
  minHeight?: string | number;
  editable?: boolean;
  className?: string;
}

function ArticleEditorToolbar({
  editor,
  onInsertImage,
  onInsertCTA,
  onInsertAdSlot,
  onInsertAlsoRead,
  onInsertDownloadButton,
  onInsertMembershipCTA,
}: {
  editor: Editor | null;
  onInsertImage: () => void;
  onInsertCTA: () => void;
  onInsertAdSlot: () => void;
  onInsertAlsoRead: () => void;
  onInsertDownloadButton: () => void;
  onInsertMembershipCTA: () => void;
}) {
  const [showInsert, setShowInsert] = useState(false);
  const insertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showInsert) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (insertRef.current && !insertRef.current.contains(e.target as Node)) {
        setShowInsert(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showInsert]);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2 dark:border-gray-800 dark:bg-white/[0.03]">
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="rounded p-1.5 text-gray-600 transition hover:bg-gray-200 disabled:opacity-40 dark:text-gray-400 dark:hover:bg-white/10"
        title="Undo"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="rounded p-1.5 text-gray-600 transition hover:bg-gray-200 disabled:opacity-40 dark:text-gray-400 dark:hover:bg-white/10"
        title="Redo"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
        </svg>
      </button>
      <span className="mx-0.5 w-px self-stretch bg-gray-200 dark:bg-gray-700" />
      {[1, 2, 3].map((level) => (
        <button
          key={level}
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 }).run()
          }
          className={`rounded px-2 py-1 text-sm font-medium transition ${
            editor.isActive("heading", { level: level as 1 | 2 | 3 })
              ? "bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400"
              : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-white/10"
          }`}
          title={`Heading ${level}`}
        >
          H{level}
        </button>
      ))}
      <span className="mx-0.5 w-px self-stretch bg-gray-200 dark:bg-gray-700" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`rounded p-1.5 transition ${
          editor.isActive("bulletList")
            ? "bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400"
            : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-white/10"
        }`}
        title="Bullet list"
      >
        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 6h2v2H4V6zm0 5h2v2H4v-2zm0 5h2v2H4v-2zm4-10h12v2H8V6zm0 5h12v2H8v-2zm0 5h12v2H8v-2z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`rounded p-1.5 transition ${
          editor.isActive("orderedList")
            ? "bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400"
            : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-white/10"
        }`}
        title="Ordered list"
      >
        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 5h2v2H3V5zm0 5h2v2H3v-2zm0 5h2v2H3v-2zm4-8h14v2H7V2zm0 5h14v2H7V7zm0 5h14v2H7v-2z" />
        </svg>
      </button>
      <span className="mx-0.5 w-px self-stretch bg-gray-200 dark:bg-gray-700" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`rounded px-2 py-1 text-sm font-medium transition ${
          editor.isActive("bold")
            ? "bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400"
            : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-white/10"
        }`}
        title="Bold"
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`rounded px-2 py-1 text-sm font-medium italic transition ${
          editor.isActive("italic")
            ? "bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400"
            : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-white/10"
        }`}
        title="Italic"
      >
        I
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`rounded px-2 py-1 text-sm font-medium transition line-through ${
          editor.isActive("strike")
            ? "bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400"
            : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-white/10"
        }`}
        title="Strike"
      >
        S
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`rounded p-1.5 transition ${
          editor.isActive("blockquote")
            ? "bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400"
            : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-white/10"
        }`}
        title="Blockquote"
      >
        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
        </svg>
      </button>
      <span className="mx-0.5 w-px self-stretch bg-gray-200 dark:bg-gray-700" />
      <div className="relative" ref={insertRef}>
        <button
          type="button"
          onClick={() => setShowInsert((v) => !v)}
          className="rounded px-2 py-1 text-sm font-medium text-gray-600 transition hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-white/10"
          title="Insert block"
        >
          Insert
        </button>
        {showInsert && (
          <div className="absolute left-0 top-full z-50 mt-1 min-w-[160px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-800 dark:bg-gray-900">
            <button
              type="button"
              onClick={() => {
                onInsertImage();
                setShowInsert(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Image
            </button>
            <button
              type="button"
              onClick={() => {
                onInsertCTA();
                setShowInsert(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              CTA
            </button>
            <button
              type="button"
              onClick={() => {
                onInsertAdSlot();
                setShowInsert(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Ad slot
            </button>
            <hr className="my-1 border-gray-200 dark:border-gray-700" />
            <button
              type="button"
              onClick={() => {
                onInsertAlsoRead();
                setShowInsert(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Also Read
            </button>
            <button
              type="button"
              onClick={() => {
                onInsertDownloadButton();
                setShowInsert(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Download Button
            </button>
            <button
              type="button"
              onClick={() => {
                onInsertMembershipCTA();
                setShowInsert(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Membership CTA
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ArticleEditor({
  value = "",
  onChange,
  placeholder = "Write your article… Paste from Word, Google Docs, or any editor.",
  minHeight = "400px",
  editable = true,
  className = "",
}: ArticleEditorProps) {
  const initialContent = (() => {
    if (!value?.trim()) return ARTICLE_EDITOR_DOC_DEFAULT;
    try {
      const parsed = JSON.parse(value) as ArticleBodyJSON;
      if (parsed && typeof parsed === "object" && parsed.type === "doc") {
        return parsed;
      }
    } catch {
      // fallback: empty doc
    }
    return ARTICLE_EDITOR_DOC_DEFAULT;
  })();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" },
      }),
      Highlight.configure({ multicolor: false }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      ArticleImageWithLinkNode,
      ArticleCTANode,
      ArticleAdSlotNode,
      ArticleAlsoReadNode,
      ArticleDownloadButtonNode,
      ArticleMembershipCTANode,
    ],
    content: initialContent,
    editable,
    immediatelyRender: false,
    onUpdate: ({ editor: e }) => {
      onChange?.(JSON.stringify(e.getJSON()));
    },
    editorProps: {
      attributes: {
        class: "px-4 py-3 min-h-[200px] focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (!editor || value === undefined) return;
    const trimmed = typeof value === "string" ? value.trim() : "";
    if (!trimmed) return;
    try {
      const parsed = JSON.parse(trimmed) as ArticleBodyJSON;
      if (parsed && typeof parsed === "object" && parsed.type === "doc") {
        const current = editor.getJSON();
        if (JSON.stringify(current) !== trimmed) {
          editor.commands.setContent(parsed, { emitUpdate: false });
        }
        return;
      }
    } catch {
      // not JSON
    }
    // Legacy: value is HTML (e.g. from WordPress migration). TipTap setContent accepts HTML.
    try {
      editor.commands.setContent(trimmed, { emitUpdate: false });
    } catch {
      // schema may reject some HTML; show as plain text in a paragraph
      editor.commands.setContent({ type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: trimmed.slice(0, 5000) }] }] }, { emitUpdate: false });
    }
  }, [value, editor]);

  const handleInsertImage = () => {
    editor?.chain().focus().setArticleImageWithLink({}).run();
  };
  const handleInsertCTA = () => {
    editor?.chain().focus().setArticleCTA({}).run();
  };
  const handleInsertAdSlot = () => {
    editor?.chain().focus().setArticleAdSlot({}).run();
  };
  const handleInsertAlsoRead = () => {
    editor?.chain().focus().setArticleAlsoRead({}).run();
  };
  const handleInsertDownloadButton = () => {
    editor?.chain().focus().setArticleDownloadButton({}).run();
  };
  const handleInsertMembershipCTA = () => {
    editor?.chain().focus().setArticleMembershipCTA({}).run();
  };

  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 ${className}`}
    >
      {editable && (
        <ArticleEditorToolbar
          editor={editor}
          onInsertImage={handleInsertImage}
          onInsertCTA={handleInsertCTA}
          onInsertAdSlot={handleInsertAdSlot}
          onInsertAlsoRead={handleInsertAlsoRead}
          onInsertDownloadButton={handleInsertDownloadButton}
          onInsertMembershipCTA={handleInsertMembershipCTA}
        />
      )}
      <div
        className="rich-text-editor-content"
        style={{
          minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight,
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
