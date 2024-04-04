import { Keys } from 'enums/post';

import { Post } from './post';

export interface Highlight {
  node: {
    [Keys.title]: string;
    [Keys.id]: string;
    [Keys.slug]: string;
    featuredImage: {
      node: {
        altText: string;
        guid: string;
      };
    };
    tags: {
      edges: { node: Post }[];
    };
  };
}
