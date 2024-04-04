import { CategoryPostsEdgesNodeResponse as CategoryPostsEdgesNodeResponseI } from 'interfaces/categories';

import { Post as PostI } from 'interfaces/post';

export const handleCategoryPostsResponse = (
  data: CategoryPostsEdgesNodeResponseI
) =>
  data
    ? data.category.posts.edges.map(({ node }: { node: PostI }) => node)
    : [];
