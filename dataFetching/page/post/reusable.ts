import {
  PostEdgesSlugNodeResponse,
  PostsAmountResponse,
} from 'interfaces/post';

import { pagesSlugQuery, postsAmount } from 'queries/posts';
import { apolloClient } from 'queries/apolloClient';

import { apolloQuery } from 'helpers/apollo';

import {
  handlePostsSlugResponse,
  handlePostsAmountResponse,
} from 'response/handlers/posts';
import { ApolloQueryResult } from '@apollo/client';

export const getRequest = (offset = 0, size = 100) => {
  return apolloQuery({
    callback: () =>
      apolloClient.query({
        query: pagesSlugQuery({
          offset,
          size: size,
        }),
      }),
    helperText: 'dataFetching > page > post',
  });
};

export const getPostsAmount = () => {
  return apolloQuery({
    callback: () =>
      apolloClient.query({
        query: postsAmount(),
      }),
    helperText: 'dataFetching > page > post',
  });
};

export const handleResponse = (
  res: ApolloQueryResult<PostEdgesSlugNodeResponse>
) => {
  return handlePostsSlugResponse(res.data);
};

export const handleAmountResponse = (
  res: ApolloQueryResult<PostsAmountResponse>
) => {
  return handlePostsAmountResponse(res.data);
};
