import { Seo } from './seo';

import { Keys } from 'enums/category';

import { Posts } from 'interfaces/post';

export interface Category {
  [Keys.title]: string;
  [Keys.seo]: Seo;
  [Keys.key]: string;
  [Keys.uri]: string;
  [Keys.slug]: string;
  description: string;
  posts: Posts;
  category_fields: {
    subCategories: SubCategory[];
  };
  data: {
    posts: Posts;
  };
  parent: {
    node: {
      name: string;
      slug: string;
      uri: string;
    };
  };
}

export interface SubCategory {
  key?: string;
  posts: Posts;
  title?: string;
  uri: string;
}

export interface CategoryEdgesNodeResponse {
  categories: {
    edges: { node: Category }[];
  };
}

export interface CategoryPostsEdgesNodeResponse {
  category: {
    [Keys.title]: string;
    [Keys.uri]: string;
    description: string;
    posts: Posts;
  };
}

export interface CategorySlugLeaguesResponse {
  category: {
    posts: Posts;
    category_fields: {
      subCategories: {
        posts: Posts;
        slug: string;
      }[];
    };
  };
}
