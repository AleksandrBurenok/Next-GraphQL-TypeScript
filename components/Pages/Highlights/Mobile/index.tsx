import dynamic from 'next/dynamic';

import { Sections } from 'enums/path';

import Page from 'components/Page/Root';
import Seo from 'components/Seo';
import Sidebar from 'components/Page/Sidebar';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import { Mobile as PopupBannerMobile } from 'components/Banners/PopupBanner';

import { Props } from '../helpers';

const LoadMorePosts = dynamic(() => import('../../../Shared/LoadMorePosts'));
const SeoBlock = dynamic(() => import('../../../SeoBlock'));
const NewsWidget = dynamic(() => import('../../../Shared/Widget/News'));
const SocialWidget = dynamic(
  () => import('../../../Shared/Socials/SocialWidget')
);
const RightSidebarBanners = dynamic(
  () => import('../../../Banners/RightSidebarBanners')
);
const TopBannersMobile = dynamic(
  () => import('../../../Banners/TopBanners/Mobile')
);

const Mobile = ({ category, banners }: Props) => {
  const { edges } = category.posts;

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
          <TopBannersMobile {...banners} />

          <Grid>
            <MainContainer>
              <LoadMorePosts
                posts={category.posts}
                uri={category.uri}
                title={category.title}
                numberPosts={20}
                oneColumn
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
        <PopupBannerMobile banners={banners} />
      </>
    )
  );
};

export default Mobile;
