import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ArticleAlsoReadView from "./ArticleAlsoReadView";

export interface ArticleAlsoReadAttrs {
  /** Article title for display */
  title: string;
  /** URL to the article */
  url: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    articleAlsoRead: {
      setArticleAlsoRead: (attrs?: Partial<ArticleAlsoReadAttrs>) => ReturnType;
    };
  }
}

export const ArticleAlsoReadNode = Node.create({
  name: "articleAlsoRead",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      title: { default: "" },
      url: { default: "" },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="article-also-read"]' }];
  },

  renderHTML({ node }) {
    return [
      "div",
      {
        "data-type": "article-also-read",
        "data-title": node.attrs.title,
        "data-url": node.attrs.url,
      },
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ArticleAlsoReadView);
  },

  addCommands() {
    return {
      setArticleAlsoRead:
        (attrs = {}) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { title: "", url: "", ...attrs },
          });
        },
    };
  },
});
