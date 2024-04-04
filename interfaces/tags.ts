import { Post } from './post';

export interface Tags {
  tags: {
    edges: { node: Post }[];
  };
}
