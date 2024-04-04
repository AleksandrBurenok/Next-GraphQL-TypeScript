import { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';

import { categoryHighlightsBySlug } from 'queries/categories';

import { handleCategoryPostsResponse } from 'response/handlers/categoryPosts';

import { Post as PostI } from 'interfaces/post';
import { PageBanners as PageBannerI } from 'interfaces/banners';

import { Sections } from 'enums/path';

import { formatDateTime } from 'helpers/date';

import Play from 'icons/Play';

import LeftSidebarBanners from 'components/Banners/LeftSidebarBanners';
import Icon from 'components/Icon';

import InfiniteScrollComponent from '../../InfiniteScrollComponent';

import styles from './styles.module.scss';

interface Props {
  categorySlug: string;
  pageId: string;
  banners: PageBannerI;
}

const HighlightsWidget = ({ categorySlug, pageId, banners }: Props) => {
  const { data, error, loading } = useQuery(
    categoryHighlightsBySlug({ slug: categorySlug, first: 200 })
  );

  const highlights = useMemo(() => handleCategoryPostsResponse(data), [data]);

  const [displayHighlights, setDisplayHighlights] = useState<PostI[]>([]);

  const firstHighlight = highlights[0];

  const { messages } = useIntl();

  if (error) {
    return <div />;
  }

  if (loading) {
    return <div />;
  }

  return (
    <>
      {!!highlights.length && (
        <div className={styles.widget}>
          <p className={clsx('red-left-flag', styles.widgetTitle)}>
            {messages.highlights}
          </p>
          <div className={styles.wrapper}>
            <div key={firstHighlight.id} className={styles.widgetItem}>
              <a href={`/${Sections.highlights}/${firstHighlight.slug}`}>
                <div className={styles.widgetLink}>
                  <div>
                    <Play className={styles.icon} />
                    {firstHighlight.featuredImage && (
                      <Icon
                        alt={
                          firstHighlight.featuredImage.node.altText ||
                          messages.imageAltPlaceholder
                        }
                        src={firstHighlight.featuredImage.node.guid}
                      />
                    )}
                  </div>
                  <span
                    className={clsx(
                      styles.titleItem,
                      firstHighlight.id === pageId && styles.active
                    )}
                  >
                    {firstHighlight.title}
                  </span>
                  <span className={styles.timeItem}>
                    {formatDateTime(firstHighlight.date)}
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
              data={highlights}
              displayPosts={displayHighlights}
              setDisplayPosts={setDisplayHighlights}
              target="scrollableDiv"
              skipFirst
            >
              {displayHighlights.map(
                ({ id, slug, title, date, featuredImage }: PostI) => (
                  <div key={id} className={styles.widgetItem}>
                    <a href={`/${Sections.highlights}/${slug}`}>
                      <div className={styles.widgetLink}>
                        <div>
                          <Play className={styles.icon} />
                          {featuredImage && (
                            <Icon
                              alt={
                                featuredImage.node.altText ||
                                messages.imageAltPlaceholder
                              }
                              src={featuredImage.node.guid}
                            />
                          )}
                        </div>
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
                )
              )}
            </InfiniteScrollComponent>
          </div>
        </div>
      )}
    </>
  );
};

export default HighlightsWidget;
