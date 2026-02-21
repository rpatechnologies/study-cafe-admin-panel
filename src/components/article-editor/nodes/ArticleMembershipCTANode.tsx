import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ArticleMembershipCTAView from "./ArticleMembershipCTAView";

export interface ArticleMembershipCTAAttrs {
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  /** Background style: gradient or solid */
  style: "gradient" | "solid";
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    articleMembershipCTA: {
      setArticleMembershipCTA: (attrs?: Partial<ArticleMembershipCTAAttrs>) => ReturnType;
    };
  }
}

export const ArticleMembershipCTANode = Node.create({
  name: "articleMembershipCTA",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      heading: { default: "StudyCafe Membership" },
      description: { default: "Join StudyCafe Membership. For More details about Membership Click Join Membership Button" },
      buttonText: { default: "Join Membership" },
      buttonUrl: { default: "" },
      style: { default: "gradient" },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="article-membership-cta"]' }];
  },

  renderHTML({ node }) {
    return [
      "div",
      {
        "data-type": "article-membership-cta",
        "data-heading": node.attrs.heading,
        "data-description": node.attrs.description,
        "data-button-text": node.attrs.buttonText,
        "data-button-url": node.attrs.buttonUrl,
        "data-style": node.attrs.style,
      },
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ArticleMembershipCTAView);
  },

  addCommands() {
    return {
      setArticleMembershipCTA:
        (attrs = {}) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              heading: "StudyCafe Membership",
              description: "Join StudyCafe Membership. For More details about Membership Click Join Membership Button",
              buttonText: "Join Membership",
              buttonUrl: "",
              style: "gradient",
              ...attrs,
            },
          });
        },
    };
  },
});
