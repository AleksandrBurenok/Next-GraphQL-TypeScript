import { ApolloQueryResult } from '@apollo/client';

import { CategoryPostsEdgesNodeResponse as CategoryPostsEdgesNodeResponseI } from 'interfaces/categories';

export const handleCategoryResponse = (data: CategoryPostsEdgesNodeResponseI) =>
  data ? data.category : [];

export const handleRssResponse = (
  res: ApolloQueryResult<CategoryPostsEdgesNodeResponseI>
) => {
  return handleCategoryResponse(res.data);
};
