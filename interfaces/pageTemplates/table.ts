import { Keys } from 'enums/pageTemplates/table';

import { Post } from 'interfaces/post';

import { Seo } from '../seo';

export interface Faq {
  faq: {
    answer: string;
    question: string;
  }[];
}

export interface TablePageTemplate {
  [Keys.title]: string;
  [Keys.seo]: Seo;
  [Keys.content]: string;
  [Keys.id]: string;
  [Keys.uri]: string;
  [Keys.slug]: string;
  [Keys.link]: string;
  tags: {
    edges: { node: Post }[];
  };
  children: {
    edges: { node: Post }[];
  };
  livescore: Faq;
  football_results: {
    topContent: string;
  };
  football_tables: {
    topContent: string;
  };
  home_page: {
    categoryId: string;
    categoryTitle: string;
    categorySlug: string;
  };
  featuredImage: {
    node: {
      guid: string;
      altText: string;
    };
  };
  faq: Faq;
}

export interface TableEdgesNodeResponse {
  pages: {
    edges: { node: TablePageTemplate }[];
  };
}
