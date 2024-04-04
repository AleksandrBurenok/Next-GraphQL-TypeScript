import { SubCategory as SubCategoryI } from 'interfaces/categories';

import { removeCategoryFromUri } from 'helpers/uri';

import Page from 'components/Page/Root';
import Seo from 'components/Seo';
import Breadcrumbs from 'components/Shared/Breadcrumbs';
import { Desktop as TopBannersDesktop } from 'components/Banners/TopBanners';
import Sidebar from 'components/Page/Sidebar';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import LeftSidebarBanners from 'components/Banners/LeftSidebarBanners';
import RightSidebarBanners from 'components/Banners/RightSidebarBanners';
import SocialWidget from 'components/Shared/Socials/SocialWidget';
import NewsWidget from 'components/Shared/Widget/News';
import LoadMorePosts from 'components/Shared/LoadMorePosts';
import CentralPost from 'components/Shared/CentralPost';
import MoreNews from 'components/Shared/MoreNews';
import SeoBlock from 'components/SeoBlock';
import { Desktop as PopupBannerDesktop } from 'components/Banners/PopupBanner';

import { Props } from '../helpers';

export const Desktop = ({ category, banners }: Props) => {
  const { edges } = category.posts;
  const { subCategories } = category.category_fields;
  const slug = !category.parent
    ? `/${category.slug}/`
    : `/${removeCategoryFromUri(category.parent.node.uri)}`;
  const parentTitle = !category.parent ? '' : category.parent.node.name;

  return (
    category &&
    edges && (
      <>
        <Seo
          {...category.seo}
          path={`${removeCategoryFromUri(category.uri)}`}
        />
        <Page>
          <Breadcrumbs
            slug={`${slug}`}
            parentTitle={parentTitle}
            title={category.title}
          />

          <TopBannersDesktop {...banners} />
          <Grid>
            <Sidebar>
              <MoreNews />
              <LeftSidebarBanners leftSidebar={banners.leftSidebar} />
            </Sidebar>

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
              <RightSidebarBanners rightSidebar={banners.rightSidebar} />
            </Sidebar>
          </Grid>
        </Page>
        <PopupBannerDesktop banners={banners} />
      </>
    )
  );
};

export default Desktop;
