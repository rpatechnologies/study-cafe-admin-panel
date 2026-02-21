import Label from "../../form/Label";
import type { AlsoReadBlockData } from "../types";

/** Article option for multi-select */
export interface ArticleOption {
  id: number;
  title: string;
}

interface BlockAlsoReadEditorProps {
  data: AlsoReadBlockData;
  onChange: (data: AlsoReadBlockData) => void;
  /** Available articles for selection (from ArticleList or API) */
  articles?: ArticleOption[];
}

export default function BlockAlsoReadEditor({
  data,
  onChange,
  articles = [],
}: BlockAlsoReadEditorProps) {
  const selectedIds = new Set(data.articleIds);
  const toggleArticle = (id: number) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange({ articleIds: Array.from(next) });
  };

  if (articles.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
        No articles available. Add articles in the Articles section first.
        <input
          type="text"
          value={data.articleIds.join(", ")}
          onChange={(e) => {
            const ids = e.target.value
              .split(",")
              .map((s) => parseInt(s.trim(), 10))
              .filter((n) => !Number.isNaN(n));
            onChange({ articleIds: ids });
          }}
          placeholder="Or enter article IDs: 1, 2, 3"
          className="mt-3 w-full rounded border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label>Select articles to recommend</Label>
      <div className="max-h-48 space-y-2 overflow-y-auto rounded-lg border border-gray-200 p-2 dark:border-gray-800">
        {articles.map((a) => (
          <label
            key={a.id}
            className="flex cursor-pointer items-center gap-2 rounded p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <input
              type="checkbox"
              checked={selectedIds.has(a.id)}
              onChange={() => toggleArticle(a.id)}
              className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
            />
            <span className="text-sm text-gray-800 dark:text-white/90">
              {a.title}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
