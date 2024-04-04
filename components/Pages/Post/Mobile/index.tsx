import { useMemo } from 'react';
import dynamic from 'next/dynamic';

import { useGtag } from 'hooks';

import Seo from 'components/Seo';
import Page from 'components/Page/Root';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import PostWidget from 'components/Shared/Widget/Post';
import { Mobile as DefaultPostTopBannersMobile } from 'components/Banners/DefaultPostTopBanners';
import { Mobile as TopBannersMobile } from 'components/Banners/TopBanners';
import SocialButtons from 'components/Shared/Socials/SocialButtons';
import TagArrows from 'components/TagArrows';
import { Mobile as ArticleMobile } from 'components/Shared/Article';
import { Mobile as PopupBannerMobile } from 'components/Banners/PopupBanner';

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

const Mobile = ({ page, banners }: Props) => {
  const socialUrl = useMemo(() => getSocialUrl(page.slug), [page.slug]);

  const categoryName = getCategoryName(page);

  const categoryUrl = getCategoryUrl(page);

  const categorySlug = getCategorySlug(page);

  useGtag(page.author.node.name);

  return (
    <>
      <Seo {...page.seo} path={`${page.slug}/`} />
      <Page>
        <Grid>
          <MainContainer>
            <DefaultPostTopBannersMobile {...banners} />
            <ArticleMobile
              image={page.featuredImage?.node}
              title={page.title}
              text={page.content}
              date={page.date}
              author={page.author.node.name}
              categoryName={categoryName}
              categoryUrl={categoryUrl}
            />
            <FacebookComments url={page.slug} />
            <TopBannersMobile {...banners} />
            <TagArrows tags={page.tags} />
            <SocialButtons url={socialUrl} />
            <PostWidget
              categorySlug={categorySlug}
              pageId={page.id}
              banners={banners}
            />
          </MainContainer>
        </Grid>
      </Page>
      <PopupBannerMobile banners={banners} />
    </>
  );
};

export default Mobile;
