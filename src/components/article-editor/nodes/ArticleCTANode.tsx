import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ArticleCTAView from "./ArticleCTAView";

export type ArticleCTAVariant = "promotion" | "course" | "membership";
/** "banner" = full-width image background with overlay text + CTA (e.g. masterclass promo) */
export type ArticleCTALayout = "default" | "banner";

export interface ArticleCTAAttrs {
  variant: ArticleCTAVariant;
  layout: ArticleCTALayout;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  imageUrl: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    articleCTA: {
      setArticleCTA: (attrs?: Partial<ArticleCTAAttrs>) => ReturnType;
    };
  }
}

export const ArticleCTANode = Node.create({
  name: "articleCTA",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      variant: { default: "promotion" },
      layout: { default: "default" },
      title: { default: "" },
      description: { default: "" },
      buttonText: { default: "" },
      buttonUrl: { default: "" },
      imageUrl: { default: "" },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="article-cta"]' }];
  },

  renderHTML() {
    return ["div", { "data-type": "article-cta" }];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ArticleCTAView);
  },

  addCommands() {
    return {
      setArticleCTA:
        (attrs = {}) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              variant: "promotion",
              layout: "default",
              title: "",
              description: "",
              buttonText: "",
              buttonUrl: "",
              imageUrl: "",
              ...attrs,
            },
          });
        },
    };
  },
});
