import clsx from 'clsx';

import Page from 'components/Page/Root';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import Breadcrumbs from 'components/Shared/Breadcrumbs';
import Seo from 'components/Seo';
import Sidebar from 'components/Page/Sidebar';
import RightSidebarBanners from 'components/Banners/RightSidebarBanners';
import NewsWidget from 'components/Shared/Widget/News';
import SocialWidget from 'components/Shared/Socials/SocialWidget';
import Icon from 'components/Icon';
import LoadMorePosts from 'components/Shared/LoadMorePosts';
import PredictionGame from 'components/PredictionGame';
import { Mobile as PopupBannerMobile } from 'components/Banners/PopupBanner';

import { Props } from '../helpers';

import styles from './styles.module.scss';

export const Mobile = ({ championship, category, banners }: Props) => {
  return (
    championship && (
      <>
        <Seo {...championship.seo} path={championship.slug} />
        <Page>
          <Breadcrumbs slug="" parentTitle="" title={championship.title} />
          <Grid>
            <MainContainer className={styles.main}>
              <h1 className="red-left-flag">{championship.title}</h1>

              <div className={styles.wrapper}>
                <Icon
                  alt={championship.title}
                  src={championship.featuredImage}
                />
                <p className={clsx('red-left-flag', styles.wrapperTitle)}>
                  {championship.title}
                </p>
              </div>

              {championship.content && (
                <div
                  className={styles.content}
                  dangerouslySetInnerHTML={{ __html: championship.content }}
                />
              )}

              {championship.title_table && (
                <div
                  className={styles.titleTable}
                  dangerouslySetInnerHTML={{ __html: championship.title_table }}
                />
              )}

              <PredictionGame championship={championship} />

              <LoadMorePosts
                posts={category.posts}
                uri={category.uri}
                title={category.title}
                className={styles.posts}
                oneColumn
              />

              <div
                dangerouslySetInnerHTML={{ __html: championship.advanced_text }}
                className={clsx(styles.content, styles.seo)}
              />
            </MainContainer>

            <Sidebar>
              <NewsWidget />
              <SocialWidget />
              <RightSidebarBanners rightSidebar={banners.rightSidebar} />
            </Sidebar>
          </Grid>
        </Page>
        <PopupBannerMobile banners={banners} />
      </>
    )
  );
};

export default Mobile;
