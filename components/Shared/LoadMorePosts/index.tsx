import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useLazyQuery, ApolloError } from '@apollo/client';
import { GraphQLErrors } from '@apollo/client/errors';
import clsx from 'clsx';

import { PER_PAGE_FIRST } from 'constants/pagination';

import { GET_CATEGORY } from 'queries/categories';

import Preloader from 'icons/Preloader';

import { SubCategory as SubCategoryI } from 'interfaces/categories';
import { Posts as PostsI } from 'interfaces/post';
import { Banner as BannerI } from 'interfaces/banners';

import Posts from '../Posts';

import Button from '../Button';

import styles from './styles.module.scss';

interface Props extends SubCategoryI {
  twoColumns?: boolean;
  isCentral?: boolean;
  numberPosts?: number;
  oneColumn?: boolean;
  banners?: BannerI[];
  isHighlights?: boolean;
  className?: string;
}

const LoadMorePosts = ({
  posts,
  title,
  uri,
  isCentral = false,
  twoColumns = false,
  oneColumn = false,
  numberPosts = 6,
  banners,
  isHighlights,
  className,
}: Props) => {
  const { messages } = useIntl();

  const slicePosts = (posts: PostsI) => {
    return posts.edges.slice(isCentral ? 1 : 0, numberPosts);
  };

  const [postsData, setPostsData] = useState(slicePosts(posts));
  const [pageInfo, setPageInfo] = useState(posts.pageInfo);
  const [error, setError] = useState<GraphQLErrors>();

  const setPosts = (posts: PostsI) => {
    const newPosts = postsData.concat(posts.edges);
    setPostsData(newPosts);
    setPageInfo({ ...posts.pageInfo });
  };

  const [fetchPosts, { loading }] = useLazyQuery(GET_CATEGORY, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setPosts(data.category.posts);
    },
    onError: ({ graphQLErrors }: ApolloError) => {
      setError(graphQLErrors);
    },
  });

  const loadMoreItems = (endCursor: string | null) => {
    fetchPosts({
      variables: {
        id: uri,
        first: PER_PAGE_FIRST,
        after: endCursor,
      },
    });
  };

  const { endCursor, hasNextPage } = pageInfo;

  useEffect(() => {
    setPostsData(slicePosts(posts));
  }, [posts]);

  return (
    <div className={clsx(styles.wrapper, className)}>
      {title && isHighlights ? (
        <h1 className="red-left-flag">{title}</h1>
      ) : (
        title && <h2 className="red-left-flag">{title}</h2>
      )}

      {postsData && (
        <Posts
          posts={postsData}
          isCentral={isCentral}
          twoColumns={twoColumns}
          oneColumn={oneColumn}
          banners={banners}
          isHighlights={isHighlights}
        />
      )}

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

export default LoadMorePosts;
