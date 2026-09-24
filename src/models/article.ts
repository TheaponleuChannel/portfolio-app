/**
 * A single block of article body copy. Authored as data rather than Markdown so
 * the reading view stays dependency-free and every block is type-checked.
 */
export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'code'; code: string; language?: string };

export interface Article {
  id: number;
  /** URL segment for /articles/:slug. */
  slug: string;
  title: string;
  /** Short teaser shown on cards, in the spotlight and as the article's lead paragraph. */
  summary: string;
  /** Must match an ArticleCategory.name — drives the accent color & icon. */
  category: string;
  tags: string[];
  /** Display date, e.g. 'Mar 2026'. */
  date: string;
  readTime: string;
  body: ArticleBlock[];
  featured?: boolean;
  /** Optional cover image; falls back to a themed gradient cover when omitted. */
  image?: string;
}

export interface ArticleCategory {
  name: string;
  /** Hex accent used for badges, icons and gradient covers. */
  color: string;
  /** PrimeIcons class suffix, e.g. 'pi-bolt'. */
  icon: string;
}
