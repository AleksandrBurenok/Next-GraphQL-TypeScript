import dynamic from 'next/dynamic';

import { SubCategory as SubCategoryI } from 'interfaces/categories';

import Page from 'components/Page/Root';
import Seo from 'components/Seo';
import Sidebar from 'components/Page/Sidebar';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import CentralPost from 'components/Shared/CentralPost';
import { Mobile as PopupBannerMobile } from 'components/Banners/PopupBanner';

import { Props } from '../helpers';

const SocialWidget = dynamic(
  () => import('../../../Shared/Socials/SocialWidget')
);
const MoreNews = dynamic(() => import('../../../Shared/MoreNews'));
const LoadMorePosts = dynamic(() => import('../../../Shared/LoadMorePosts'));
const NewsWidget = dynamic(() => import('../../../Shared/Widget/News'));
const SeoBlock = dynamic(() => import('../../../SeoBlock'));
const RightSidebarBanners = dynamic(
  () => import('../../../Banners/RightSidebarBanners')
);
const LeftSidebarBanners = dynamic(
  () => import('../../../Banners/LeftSidebarBanners')
);
const TopBannersMobile = dynamic(
  () => import('../../../Banners/TopBanners/Mobile')
);

const Mobile = ({ category, banners }: Props) => {
  const { edges } = category.posts;
  const { subCategories } = category.category_fields;

  return (
    category &&
    edges && (
      <>
        <Seo {...category.seo} path={`${category.slug}/`} />
        <Page>
          <TopBannersMobile {...banners} />

          <Grid>
            <MainContainer>
              <CentralPost post={edges[0]} title={category.title} />

              <LoadMorePosts
                posts={category.posts}
                uri={category.uri}
                isCentral
                numberPosts={7}
              />

              {subCategories &&
                subCategories
                  .slice(0, 5)
                  .map(({ key, posts, title, uri }: SubCategoryI) => (
                    <LoadMorePosts
                      key={key}
                      posts={posts}
                      title={title}
                      uri={uri}
                    />
                  ))}
              <SeoBlock
                title={category.title}
                content={category.seo.opengraphDescription}
              />
            </MainContainer>

            <Sidebar>
              <NewsWidget />
              <SocialWidget />
              <MoreNews />
              <LeftSidebarBanners leftSidebar={banners.leftSidebar} />
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
