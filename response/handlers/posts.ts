import {
  PostEdgesNodeResponse as PostEdgesNodeResponseI,
  PostEdgesSlugNodeResponse as PostEdgesSlugNodeResponseI,
  PostsAmountResponse as PostsAmountResponseI,
} from 'interfaces/post';

export const handlePostsResponse = (data: PostEdgesNodeResponseI) =>
  data ? data.posts.edges.map(({ node }) => node) : [];

export const handlePostsSlugResponse = (data: PostEdgesSlugNodeResponseI) =>
  data ? data.posts.edges.map(({ node }) => node) : [];

export const handlePostsAmountResponse = (data: PostsAmountResponseI) =>
  data ? data.posts.pageInfo.offsetPagination.total : 0;
