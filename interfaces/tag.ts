import { Keys } from 'enums/tag';

import { Posts as PostsI } from './post';

import { Seo } from './seo';

export interface Tag {
  [Keys.description]: string;
  [Keys.name]: string;
  [Keys.seo]: Seo;
  [Keys.slug]: string;
  posts: PostsI;
}

export interface TagsEdgesNodeResponse {
  tags: {
    edges: { node: Tag }[];
  };
}
