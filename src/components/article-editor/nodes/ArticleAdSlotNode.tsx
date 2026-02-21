import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ArticleAdSlotView from "./ArticleAdSlotView";

export type ArticleAdSlotType = "leaderboard" | "rectangle" | "sidebar" | "inline";

export interface ArticleAdSlotAttrs {
  adUnitId: string;
  type: ArticleAdSlotType;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    articleAdSlot: {
      setArticleAdSlot: (attrs?: Partial<ArticleAdSlotAttrs>) => ReturnType;
    };
  }
}

export const ArticleAdSlotNode = Node.create({
  name: "articleAdSlot",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      adUnitId: { default: "" },
      type: { default: "leaderboard" },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="article-ad-slot"]' }];
  },

  renderHTML() {
    return ["div", { "data-type": "article-ad-slot" }];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ArticleAdSlotView);
  },

  addCommands() {
    return {
      setArticleAdSlot:
        (attrs = {}) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { adUnitId: "", type: "leaderboard", ...attrs },
          });
        },
    };
  },
});
