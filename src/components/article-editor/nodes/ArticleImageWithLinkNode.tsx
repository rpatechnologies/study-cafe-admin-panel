import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ArticleImageWithLinkView from "./ArticleImageWithLinkView";

export interface ArticleImageWithLinkAttrs {
  imageUrl: string;
  linkUrl?: string;
  alt?: string;
  caption?: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    articleImageWithLink: {
      setArticleImageWithLink: (attrs: Partial<ArticleImageWithLinkAttrs>) => ReturnType;
    };
  }
}

export const ArticleImageWithLinkNode = Node.create({
  name: "articleImageWithLink",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      imageUrl: { default: "" },
      linkUrl: { default: "" },
      alt: { default: "" },
      caption: { default: "" },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="article-image-with-link"]',
      },
    ];
  },

  renderHTML({ node }) {
    return [
      "div",
      {
        "data-type": "article-image-with-link",
        "data-image-url": node.attrs.imageUrl,
        "data-link-url": node.attrs.linkUrl ?? "",
        "data-alt": node.attrs.alt ?? "",
        "data-caption": node.attrs.caption ?? "",
      },
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ArticleImageWithLinkView);
  },

  addCommands() {
    return {
      setArticleImageWithLink:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { imageUrl: "", linkUrl: "", alt: "", caption: "", ...attrs },
          });
        },
    };
  },
});
