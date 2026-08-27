export interface Resource {
  id: number;
  title: string;
  description: string;
  /** Must match a ResourceCategory.name — drives the accent color & icon. */
  category: string;
  link: string;
  author?: string;
  readTime?: string;
  date?: string;
  tags?: string[];
  featured?: boolean;
  /** Optional cover image; falls back to a themed gradient cover when omitted. */
  image?: string;
}

export interface ResourceCategory {
  name: string;
  /** Hex accent used for badges, icons and gradient covers. */
  color: string;
  /** PrimeIcons class suffix, e.g. 'pi-file-edit'. */
  icon: string;
}
