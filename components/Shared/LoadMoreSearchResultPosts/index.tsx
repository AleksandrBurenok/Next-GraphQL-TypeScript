import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useLazyQuery, ApolloError } from '@apollo/client';
import { GraphQLErrors } from '@apollo/client/errors';

import { GET_SEARCH_RESULTS } from 'queries/search';

import { Posts as PostsI } from 'interfaces/post';

import Preloader from 'icons/Preloader';

import Posts from '../Posts';

import Button from '../Button';

import styles from './styles.module.scss';

interface Props {
  searchQuery: string;
  posts: PostsI;
  isSearch: boolean;
}

const LoadMoreSearchResultPosts = ({ posts, searchQuery, isSearch }: Props) => {
  const { messages } = useIntl();

  const [postsData, setPostsData] = useState(posts?.edges);
  const [pageInfo, setPageInfo] = useState(posts?.pageInfo);
  const [error, setError] = useState<GraphQLErrors>();

  const setPosts = (posts: PostsI) => {
    const newPosts = postsData.concat(posts?.edges.slice(1));
    setPostsData(newPosts);
    setPageInfo({ ...posts?.pageInfo });
  };

  const [fetchPosts, { loading }] = useLazyQuery(GET_SEARCH_RESULTS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setPosts(data?.posts);
    },
    onError: ({ graphQLErrors }: ApolloError) => {
      setError(graphQLErrors);
    },
  });

  const loadMoreItems = (endCursor: string | null) => {
    fetchPosts({
      variables: {
        first: 16,
        after: endCursor,
        query: searchQuery,
      },
    });
  };

  const { endCursor, hasNextPage } = pageInfo || {};

  useEffect(() => {
    setPostsData(posts?.edges);
    setPageInfo(posts?.pageInfo);
  }, [posts?.edges, posts?.pageInfo]);

  return (
    <div className={styles.wrapper}>
      {postsData && <Posts isSearch={isSearch} posts={postsData} />}

      {hasNextPage ? (
        <div className={styles.btnWrapper}>
          {loading ? (
            <Preloader />
          ) : (
            <Button type="button" onClick={() => loadMoreItems(endCursor)}>
              {messages.loadMore}
            </Button>
          )}
        </div>
      ) : null}

      {error && (
        <div className={styles.error}>{messages.noArticlesAvailable}</div>
      )}
    </div>
  );
};

export default LoadMoreSearchResultPosts;
