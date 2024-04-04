import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery, ApolloError } from '@apollo/client';
import { GraphQLErrors } from '@apollo/client/errors';

import { GET_SEARCH_RESULTS_WITH_TOTAL_PAGES } from 'queries/search';

import { Posts as PostsI } from 'interfaces/post';

const useSearch = () => {
  const { query } = useRouter();

  const searchQueryString = query.q as string;

  const [searchQuery, setSearchQuery] = useState(searchQueryString);
  const [searchError, setSearchError] = useState<GraphQLErrors>();
  const [queryResultPosts, setQueryResultPosts] = useState<PostsI>();

  const totalPostResultCount =
    queryResultPosts?.pageInfo?.offsetPagination?.total;

  const [fetchPosts, { loading }] = useLazyQuery(
    GET_SEARCH_RESULTS_WITH_TOTAL_PAGES,
    {
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        setQueryResultPosts(data.posts);
      },
      onError: ({ graphQLErrors }: ApolloError) => {
        setSearchError(graphQLErrors);
      },
    }
  );

  useEffect(() => {
    if (searchQueryString) {
      setSearchQuery(searchQueryString);
      fetchPosts({
        variables: {
          first: 15,
          after: null,
          query: searchQueryString,
        },
      });
    }
  }, [searchQueryString, fetchPosts, searchQuery]);

  return {
    searchQuery,
    loading,
    queryResultPosts,
    totalPostResultCount,
    searchError,
  };
};

export default useSearch;
