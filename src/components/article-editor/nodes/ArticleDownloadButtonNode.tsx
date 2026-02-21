import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ArticleDownloadButtonView from "./ArticleDownloadButtonView";

export interface ArticleDownloadButtonAttrs {
  label: string;
  fileUrl: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    articleDownloadButton: {
      setArticleDownloadButton: (attrs?: Partial<ArticleDownloadButtonAttrs>) => ReturnType;
    };
  }
}

export const ArticleDownloadButtonNode = Node.create({
  name: "articleDownloadButton",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      label: { default: "Download Judgment" },
      fileUrl: { default: "" },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="article-download-button"]' }];
  },

  renderHTML({ node }) {
    return [
      "div",
      {
        "data-type": "article-download-button",
        "data-label": node.attrs.label,
        "data-file-url": node.attrs.fileUrl,
      },
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ArticleDownloadButtonView);
  },

  addCommands() {
    return {
      setArticleDownloadButton:
        (attrs = {}) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { label: "Download Judgment", fileUrl: "", ...attrs },
          });
        },
    };
  },
});
