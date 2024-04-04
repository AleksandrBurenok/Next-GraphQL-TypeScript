import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useLazyQuery, ApolloError } from '@apollo/client';
import { GraphQLErrors } from '@apollo/client/errors';

import { PER_PAGE_FIRST } from 'constants/pagination';

import { postsByTag } from 'queries/tag';

import Preloader from 'icons/Preloader';

import { Posts as PostsI } from 'interfaces/post';

import Posts from '../Posts';

import Button from '../Button';

import styles from './styles.module.scss';

interface Props {
  numberPosts?: number;
  oneColumn?: boolean;
  posts: PostsI;
  title: string;
  slug: string;
  description: string;
  isHighlights?: boolean;
}

const LoadMorePosts = ({
  posts,
  title,
  slug,
  oneColumn = false,
  numberPosts = 6,
  description,
  isHighlights = false,
}: Props) => {
  const { messages } = useIntl();

  const [postsData, setPostsData] = useState(posts.edges.slice(0, numberPosts));
  const [pageInfo, setPageInfo] = useState(posts.pageInfo);
  const [error, setError] = useState<GraphQLErrors>();

  const setPosts = (posts: PostsI) => {
    const newPosts = postsData.concat(posts.edges);
    setPostsData(newPosts);
    setPageInfo({ ...posts.pageInfo });
  };

  const [fetchPosts, { loading }] = useLazyQuery(postsByTag, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setPosts(data.tags.edges[0].node.posts);
    },
    onError: ({ graphQLErrors }: ApolloError) => {
      setError(graphQLErrors);
    },
  });

  const loadMoreItems = (endCursor: string | null) => {
    fetchPosts({
      variables: {
        first: PER_PAGE_FIRST,
        slug: slug,
        after: endCursor,
      },
    });
  };

  const { endCursor, hasNextPage } = pageInfo;

  return (
    <div className={styles.wrapper}>
      {title && (
        <h1 className="red-left-flag">{`${messages.tag}: ${title}`}</h1>
      )}

      {postsData && (
        <Posts
          posts={postsData}
          oneColumn={oneColumn}
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

      {description && (
        <div className={styles.wrapperDesc}>
          <h2
            className={styles.desc}
          >{`${messages.tag} ${messages.description}`}</h2>
          {description}
        </div>
      )}
    </div>
  );
};

export default LoadMorePosts;
