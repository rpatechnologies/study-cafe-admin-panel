import type { Article, ContentBlock } from "../../components/blocks/types";

/** Default empty TipTap doc for article body */
export const EMPTY_ARTICLE_BODY = JSON.stringify({
  type: "doc",
  content: [{ type: "paragraph" }],
});

/** Convert legacy content string to blocks (single rich_text block). Used for courses / legacy. */
export function contentToBlocks(content: string): ContentBlock[] {
  if (!content?.trim()) return [];
  return [
    {
      id: crypto.randomUUID?.() ?? `block-${Date.now()}`,
      type: "rich_text",
      order: 0,
      data: { html: content },
    },
  ];
}

/** Convert blocks to legacy content (for backward compatibility - first rich_text block) */
export function blocksToContent(blocks: ContentBlock[]): string {
  const richText = blocks.find((b) => b.type === "rich_text");
  if (!richText || !("html" in richText.data)) return "";
  return (richText.data as { html: string }).html;
}

export const mockArticles: Article[] = [
  {
    id: 1,
    meta: {
      title: "GST Update: Latest Changes in 2025",
      metaTitle: "GST Update 2025 | StudyCafe",
      metaDesc: "An overview of the latest GST amendments and their impact.",
      slug: "gst-update-2025",
    },
    featuredImage: {
      imageUrl: "",
      linkUrl: "",
      alt: "",
      caption: "",
    },
    body: JSON.stringify({
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "ITAT Upholds 10% DTAA Benefits for German Bank, Deletes Rs. 20 Crore Penalty for Alleged Concealment",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "The Deputy Commissioner of Income Tax (DCIT) has filed multiple appeals, and the DZ Bank India Representative Office has filed a cross-objection in the ITAT Mumbai bench. The case is related to the assessment years 2008-09 to 2010-11 and 2014-15.",
            },
          ],
        },
        { type: "paragraph" },
      ],
    }),
    blocks: [
      {
        id: "643498a8-db10-4bbd-888a-7cb8fdae5167",
        type: "rich_text",
        order: 0,
        data: {
          html: '<p>ITAT Upholds 10% DTAA Benefits for German Bank, Deletes Rs. 20 Crore Penalty for Alleged Concealment</p><p>The Deputy Commissioner of Income Tax (DCIT) has filed multiple appeals, and the DZ Bank India Representative Office has filed a cross-objection in the ITAT Mumbai bench, challenging separate orders, all dated the same, i.e., November 28, 2024, passed by the CIT(A) under section 250 of the Income Tax Act, 1961. The case is related to the assessment years 2008-09 to 2010-11 and 2014-15.</p><p>The key issue in the present case concerned penalty orders passed under section 271(1)(c) of the Act for concealment of income or furnishing inaccurate particulars that were correctly deleted by the Commissioner of Income Tax (Appeals) [CIT(A)]. Since all cases involved similar facts, the Tribunal treated AY 2008-09 as the lead case and applied its decision to the other years.</p><p>Read more at: <a target="_blank" rel="noopener noreferrer" href="https://studycafe.in/itat-upholds-10-dtaa-benefits-for-german-bank-deletes-rs-20-crore-penalty-for-alleged-concealment-409163.html">https://studycafe.in/itat-upholds-10-dtaa-benefits-for-german-bank-deletes-rs-20-crore-penalty-for-alleged-concealment-409163.html</a></p>',
        },
      },
      {
        id: "99ab2597-445f-4184-b9f6-3d4793f6128a",
        type: "rich_text",
        order: 1,
        data: {
          html: '<p>The assessee is a German bank that operates in India through a representative office. The assessee earned interest and related income from foreign currency loans given to Indian companies. Initially, the bank filed its income tax return (ITR) for the assessment year 2008-09, declaring NIL income, claiming that it was not required to file a tax return under Section 115A(5) since the tax had already been deducted at the source under Chapter XVIIB.</p><p>Later, assessment proceedings were initiated under Section 147 of the Act through a notice dated March 30, 2015. In response to the notice, the assessee filed its return, declaring an interest amounting to Rs. 72.28 crore taxable at 10% under the India-Germany DTAA. However, the AO treated the assessee’s Indian officer as a Permanent Establishment (PE) and taxed the assessee’s income at 40% and additionally imposed a penalty amounting to about Rs. 20 crore on the assessee, alleging tax concealment.</p><p>Read more at: <a target="_blank" rel="noopener noreferrer" href="https://studycafe.in/itat-upholds-10-dtaa-benefits-for-german-bank-deletes-rs-20-crore-penalty-for-alleged-concealment-409163.html">https://studycafe.in/itat-upholds-10-dtaa-benefits-for-german-bank-deletes-rs-20-crore-penalty-for-alleged-concealment-409163.html</a></p>',
        },
      },
      {
        id: "2b8c0773-b58e-4098-b0ce-1e537e05d689",
        type: "membership_cta",
        order: 2,
        data: {
          heading: "Unlock Full acceses",
          buttonText: "Join now ",
          buttonUrl: "google.com",
        },
      },
      {
        id: "237bdd0a-d1cd-4c6a-a32c-c7ad4a07dc75",
        type: "ad_slot",
        order: 3,
        data: {
          adUnitId: "Hello",
          type: "leaderboard",
        },
      },
      {
        id: "7175b72b-87e3-462c-bc0a-fae7704e75c3",
        type: "also_read",
        order: 4,
        data: {
          articleIds: [1, 2],
        },
      },
      {
        id: "5e3809c5-7491-464d-9388-c987b3476ff5",
        type: "download_button",
        order: 5,
        data: {
          label: "Download resources",
          fileUrl: "google.com",
        },
      },
    ],
    author: {
      name: "StudyCafe Team",
      role: "Editor",
      imageUrl: "",
      bio: "",
    },
    tags: ["GST", "Tax", "Finance"],
    shareEnabled: true,
    status: "Published",
  },
  {
    id: 2,
    meta: {
      title: "Income Tax Return Filing Guide for FY 2024-25",
      metaTitle: "ITR Filing Guide FY 2024-25 | StudyCafe",
      metaDesc: "Step-by-step guide for filing your ITR.",
      slug: "itr-filing-guide-fy24-25",
    },
    featuredImage: {
      imageUrl: "",
      linkUrl: "",
      alt: "",
      caption: "",
    },
    body: EMPTY_ARTICLE_BODY,
    blocks: contentToBlocks("<p>Article content here...</p>"),
    author: {
      name: "StudyCafe Team",
      role: "Editor",
      imageUrl: "",
      bio: "",
    },
    tags: ["Income Tax", "ITR", "Finance"],
    shareEnabled: true,
    status: "Published",
  },
  {
    id: 3,
    meta: {
      title: "CA Final Exam Preparation Tips",
      metaTitle: "CA Final Prep Tips | StudyCafe",
      metaDesc: "Effective strategies for CA Final preparation.",
      slug: "ca-final-prep-tips",
    },
    featuredImage: {
      imageUrl: "",
      linkUrl: "",
      alt: "",
      caption: "",
    },
    body: EMPTY_ARTICLE_BODY,
    blocks: contentToBlocks("<p>Article content here...</p>"),
    author: {
      name: "StudyCafe Team",
      role: "Editor",
      imageUrl: "",
      bio: "",
    },
    tags: ["CA", "Exams", "Preparation"],
    shareEnabled: true,
    status: "Draft",
  },
];
