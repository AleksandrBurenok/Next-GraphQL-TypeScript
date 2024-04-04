import { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';

import { categoryBySlug } from 'queries/categories';

import { handleCategoryPostsResponse } from 'response/handlers/categoryPosts';

import { Post as PostI } from 'interfaces/post';
import { PageBanners as PageBannerI } from 'interfaces/banners';

import { formatDateTime } from 'helpers/date';

import LeftSidebarBanners from 'components/Banners/LeftSidebarBanners';

import InfiniteScrollComponent from '../../InfiniteScrollComponent';

import styles from './styles.module.scss';

interface Props {
  categorySlug: string;
  pageId: string;
  banners: PageBannerI;
}

const PostWidget = ({ categorySlug, pageId, banners }: Props) => {
  const { data, error, loading } = useQuery(
    categoryBySlug({ slug: categorySlug, first: 200 })
  );

  const posts = useMemo(() => handleCategoryPostsResponse(data), [data]);

  const [displayPosts, setDisplayPosts] = useState<PostI[]>([]);

  const firstPost = posts[0];

  const { messages } = useIntl();

  if (error) {
    return <div />;
  }

  if (loading) {
    return <div />;
  }

  return (
    <>
      {!!posts.length && (
        <div className={styles.widget}>
          <p className={clsx('red-left-flag', styles.widgetTitle)}>
            {messages.headlines}
          </p>
          <div className={styles.wrapper}>
            <div key={firstPost.id} className={styles.widgetItem}>
              <a href={`/${firstPost.slug}`}>
                <div className={styles.widgetLink}>
                  <span
                    className={clsx(
                      styles.titleItem,
                      firstPost.id === pageId && styles.active
                    )}
                  >
                    {firstPost.title}
                  </span>
                  <span className={styles.timeItem}>
                    {formatDateTime(firstPost.date)}
                  </span>
                </div>
              </a>
            </div>
          </div>

          <LeftSidebarBanners
            leftSidebar={banners?.leftSidebar}
            className={styles.banners}
          />

          <div id="scrollableDiv" className={styles.widgetList}>
            <InfiniteScrollComponent
              data={posts}
              displayPosts={displayPosts}
              setDisplayPosts={setDisplayPosts}
              target="scrollableDiv"
              skipFirst
            >
              {displayPosts.map(({ id, slug, title, date }: PostI) => (
                <div key={id} className={styles.widgetItem}>
                  <a href={`/${slug}`}>
                    <div className={styles.widgetLink}>
                      <span
                        className={clsx(
                          styles.titleItem,
                          id === pageId && styles.active
                        )}
                      >
                        {title}
                      </span>
                      <span className={styles.timeItem}>
                        {formatDateTime(date)}
                      </span>
                    </div>
                  </a>
                </div>
              ))}
            </InfiniteScrollComponent>
          </div>
        </div>
      )}
    </>
  );
};

export default PostWidget;
