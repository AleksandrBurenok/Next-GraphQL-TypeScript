import { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';

import { pagesListQuery } from 'queries/posts';

import { handlePostsResponse } from 'response/handlers/posts';

import { Post as PostI } from 'interfaces/post';

import { formatDateOnlyTime } from 'helpers/date';

import InfiniteScrollComponent from '../../InfiniteScrollComponent';

import styles from './styles.module.scss';

const NewsWidget = () => {
  const { data, error, loading } = useQuery(pagesListQuery({ first: 100 }));

  const posts = useMemo(() => handlePostsResponse(data), [data]);

  const [displayPosts, setDisplayPosts] = useState<PostI[]>([]);

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
          <div id="scrollable" className={styles.widgetList}>
            <InfiniteScrollComponent
              data={posts}
              displayPosts={displayPosts}
              setDisplayPosts={setDisplayPosts}
              numberPosts={10}
              target="scrollable"
            >
              {displayPosts.map(({ id, slug, title, date }) => (
                <div key={id} className={styles.widgetItem}>
                  <a href={`/${slug}`}>
                    <div className={styles.widgetLink}>
                      <span className={styles.titleItem}>{title}</span>
                      <span className={styles.timeItem}>
                        {formatDateOnlyTime(date, true)}
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

export default NewsWidget;
