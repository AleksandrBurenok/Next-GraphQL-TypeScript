import { Sections } from 'enums/path';

import Page from 'components/Page/Root';
import Seo from 'components/Seo';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import LoadMoreTags from 'components/Shared/LoadMoreTags';
import { Mobile as PopupBannerMobile } from 'components/Banners/PopupBanner';

import { Props } from '../helpers';

const Mobile = ({ page, banners }: Props) => {
  const { edges } = page.posts;

  return (
    page &&
    edges && (
      <>
        <Seo {...page.seo} path={`${Sections.tag}/${page.slug}/`} />
        <Page>
          <Grid>
            <MainContainer>
              <LoadMoreTags
                posts={page.posts}
                slug={page.slug}
                title={page.name}
                numberPosts={15}
                description={page.description}
                oneColumn
              />
            </MainContainer>
          </Grid>
        </Page>
        <PopupBannerMobile banners={banners} />
      </>
    )
  );
};

export default Mobile;
