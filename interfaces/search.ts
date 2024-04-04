export interface Search {
  title: string;
  description: string;
  publishedDate: string;
  tags: string[];
}

export interface CachedPost {
  frontMatter: Search;
  slug: string;
}
