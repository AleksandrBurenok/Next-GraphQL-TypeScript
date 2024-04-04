import { Sections } from 'enums/path';

import Page from 'components/Page/Root';
import Seo from 'components/Seo';
import Breadcrumbs from 'components/Shared/Breadcrumbs';
import { Desktop as TopBannersDesktop } from 'components/Banners/TopBanners';
import Sidebar from 'components/Page/Sidebar';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import RightSidebarBanners from 'components/Banners/RightSidebarBanners';
import SocialWidget from 'components/Shared/Socials/SocialWidget';
import NewsWidget from 'components/Shared/Widget/News';
import LoadMorePosts from 'components/Shared/LoadMorePosts';
import SeoBlock from 'components/SeoBlock';
import { Desktop as PopupBannerDesktop } from 'components/Banners/PopupBanner';

import { Props } from '../helpers';

import styles from './styles.module.scss';

export const Desktop = ({ category, banners }: Props) => {
  const { edges } = category.posts;
  const parentTitle = !category.parent ? '' : category.parent.node.name;

  return (
    category &&
    edges && (
      <>
        <Seo
          {...category.seo}
          path={
            category.slug === Sections.footballHighlights
              ? `${Sections.footballHighlights}/`
              : `${Sections.footballHighlights}/${category.slug}/`
          }
        />
        <Page>
          <Breadcrumbs
            slug={`/${Sections.footballHighlights}/`}
            parentTitle={parentTitle}
            title={category.title}
          />
          <TopBannersDesktop {...banners} />

          <Grid>
            <MainContainer className={styles.main}>
              <LoadMorePosts
                posts={category.posts}
                uri={category.uri}
                title={category.title}
                numberPosts={20}
                twoColumns
                banners={banners.highlightsPage}
                isHighlights
              />
              <SeoBlock title={category.title} content={category.description} />
            </MainContainer>

            <Sidebar>
              <RightSidebarBanners rightSidebar={banners.rightSidebar} />
              <NewsWidget />
              <SocialWidget />
            </Sidebar>
          </Grid>
        </Page>
        <PopupBannerDesktop banners={banners} />
      </>
    )
  );
};

export default Desktop;
