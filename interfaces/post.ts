import { Keys } from 'enums/post';

import { Banner as BannerI } from './banners';
import { Faq as FaqI } from './pageTemplates/table';

import { Seo } from './seo';

export interface Post {
  [Keys.title]: string;
  [Keys.seo]: Seo;
  [Keys.content]: string;
  [Keys.id]: string;
  [Keys.uri]: string;
  [Keys.slug]: string;
  [Keys.date]: Date;
  [Keys.excerpt]: string;
  [Keys.name]: string;
  featuredImage: {
    node: {
      guid: string;
      altText: string;
      fileSize: number;
    };
  };
  tags: {
    edges: { node: Post }[];
  };
  author: {
    node: {
      name: string;
    };
  };
  livescoreOther: {
    iframeUrl: string;
    iframeImage: {
      altText: string;
      guid: string;
    };
    titlePage: string;
    content2: string;
  };
  football_results: {
    topContent: string;
  };
  football_tables: {
    topContent: string;
  };
  categories: {
    edges: { node: Post }[];
  };
  banner: BannerI;
  highlights: {
    reserveEmbed1: string;
    reserveEmbed2: string;
    reserveEmbed3: string;
  };
  livescore: FaqI;
  pageFields: {
    leagues: string;
    shortTitle: string;
  };
}

export interface Posts {
  edges: { node: Post }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    offsetPagination: {
      total: number;
    };
  };
}

export interface PostEdgesNodeResponse {
  posts: {
    edges: { node: Post }[];
  };
}

export interface PostsSlug {
  slug: string;
}

export interface PostEdgesSlugNodeResponse {
  posts: {
    edges: { node: PostsSlug }[];
  };
}

export interface PostsAmountResponse {
  posts: {
    pageInfo: {
      offsetPagination: {
        total: number;
      };
    };
  };
}
