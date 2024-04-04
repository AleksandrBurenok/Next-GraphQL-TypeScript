import { useMemo } from 'react';
import dynamic from 'next/dynamic';

import { useGtag } from 'hooks';

import Seo from 'components/Seo';
import Page from 'components/Page/Root';
import Breadcrumbs from 'components/Shared/Breadcrumbs';
import Sidebar from 'components/Page/Sidebar';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import PostWidget from 'components/Shared/Widget/Post';
import { Desktop as DefaultPostTopBannersDesktop } from 'components/Banners/DefaultPostTopBanners';
import { Desktop as TopBannersDesktop } from 'components/Banners/TopBanners';
import SocialButtons from 'components/Shared/Socials/SocialButtons';
import TagArrows from 'components/TagArrows';
import { Desktop as ArticleDesktop } from 'components/Shared/Article';
import { Desktop as PopupBannerDesktop } from 'components/Banners/PopupBanner';

const FacebookComments = dynamic(
  () => import('../../../Shared/FacebookComments'),
  {
    ssr: false,
  }
);

import {
  Props,
  getSocialUrl,
  getCategoryName,
  getCategoryUrl,
  getCategorySlug,
} from '../helpers';

const Desktop = ({ page, banners }: Props) => {
  const socialUrl = useMemo(() => getSocialUrl(page.slug), [page.slug]);

  const categoryName = getCategoryName(page);

  const categoryUrl = getCategoryUrl(page);

  const categorySlug = getCategorySlug(page);

  useGtag(page.author.node.name);

  return (
    <>
      <Seo {...page.seo} path={`${page.slug}/`} />
      <Page>
        <Breadcrumbs
          slug={`/${categoryUrl}/`}
          parentTitle={categoryName}
          title={page.title}
        />
        <Grid>
          <Sidebar>
            <PostWidget
              categorySlug={categorySlug}
              pageId={page.id}
              banners={banners}
            />
          </Sidebar>

          <MainContainer>
            <DefaultPostTopBannersDesktop {...banners} />
            <ArticleDesktop
              image={page.featuredImage?.node}
              title={page.title}
              text={page.content}
              date={page.date}
              author={page.author.node.name}
              categoryName={categoryName}
              categoryUrl={categoryUrl}
            />
            <FacebookComments url={page.slug} />
            <TopBannersDesktop {...banners} />
            <TagArrows tags={page.tags} />
            <SocialButtons url={socialUrl} />
          </MainContainer>
        </Grid>
      </Page>
      <PopupBannerDesktop banners={banners} />
    </>
  );
};

export default Desktop;
