import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import clsx from 'clsx';

import { categoryByID } from 'queries/categories';

import { handleCategoryPostsResponse } from 'response/handlers/categoryPosts';

import { Styles } from 'interfaces/props';

import Post from 'components/Shared/Post';
import Link from 'components/Link';

import styles from './styles.module.scss';

interface Props extends Styles {
  title?: string;
  categoryID: string;
  pageSize?: number;
  isBigImage?: boolean;
  isMoreNews?: boolean;
  isFullTitle?: boolean;
  isBig?: boolean;
  isTabPosts?: boolean;
  slug?: string;
}

const ClientPosts = ({
  categoryID,
  pageSize = 6,
  title,
  isBigImage = false,
  isMoreNews = false,
  isFullTitle = false,
  isBig = false,
  className,
  isTabPosts = false,
  slug,
}: Props) => {
  const { messages } = useIntl();

  const { data, loading } = useQuery(
    categoryByID({ id: categoryID, first: pageSize })
  );

  const postsMemo = useMemo(() => handleCategoryPostsResponse(data), [data]);

  if (loading) {
    return <div />;
  }

  return (
    <div className={clsx(styles.root, className)}>
      {title && (
        <div className={styles.wrapperTitle}>
          {!isTabPosts ? (
            <h2
              className={clsx(
                'red-left-flag',
                styles.titleSection,
                isTabPosts && styles.tabPostsTitle
              )}
            >
              {title}
            </h2>
          ) : (
            <h3
              className={clsx(
                'red-left-flag',
                styles.titleSection,
                isTabPosts && styles.tabPostsTitle
              )}
            >
              {title}
            </h3>
          )}
          {slug?.length && (
            <Link href={slug}>
              <span className={styles.showAll}>{messages.showAll}</span>
            </Link>
          )}
        </div>
      )}
      {!isBigImage ? (
        <div className={clsx(styles.grid, isTabPosts && styles.tabPosts)}>
          {postsMemo.map((post) => (
            <div key={post.id} className={styles.wrapper}>
              <Post
                path={post.slug}
                image={post.featuredImage?.node}
                title={post.title}
                text={post.excerpt}
                tag={post.tags?.edges[0]?.node?.name}
                date={post.date}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.wrapperIsBig}>
          <div className={styles.wrapperPost}>
            <div key={postsMemo[0].id} className={styles.wrapper}>
              <Post
                path={postsMemo[0].slug}
                image={postsMemo[0].featuredImage?.node}
                title={postsMemo[0].title}
                text={postsMemo[0].excerpt}
                tag={postsMemo[0].tags?.edges[0]?.node?.name}
                date={postsMemo[0].date}
                author={postsMemo[0].author.node.name}
                isBig={isBig}
              />
            </div>
          </div>
          <div className={styles.wrapperPosts}>
            {postsMemo.slice(1).map((post) => (
              <div key={post.id} className={styles.wrapper}>
                <Post
                  path={post.slug}
                  image={post.featuredImage?.node}
                  title={post.title}
                  text={post.excerpt}
                  tag={post.tags?.edges[0]?.node?.name}
                  date={post.date}
                  author={post.author.node.name}
                  isMoreNews={isMoreNews}
                  isFullTitle={isFullTitle}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientPosts;
