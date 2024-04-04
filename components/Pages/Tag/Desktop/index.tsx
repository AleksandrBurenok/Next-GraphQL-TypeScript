import { Sections } from 'enums/path';

import Page from 'components/Page/Root';
import Seo from 'components/Seo';
import Breadcrumbs from 'components/Shared/Breadcrumbs';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import LoadMoreTags from 'components/Shared/LoadMoreTags';
import { Desktop as PopupBannerDesktop } from 'components/Banners/PopupBanner';

import { Props } from '../helpers';

import styles from './styles.module.scss';

export const Desktop = ({ page, banners }: Props) => {
  const { edges } = page.posts;

  return (
    page &&
    edges && (
      <>
        <Seo {...page.seo} path={`${Sections.tag}/${page.slug}/`} />
        <Page>
          <Breadcrumbs
            slug={`/${Sections.tag}/`}
            parentTitle={Sections.tag}
            title={page.name}
          />

          <Grid>
            <MainContainer className={styles.root}>
              <LoadMoreTags
                posts={page.posts}
                slug={page.slug}
                title={page.name}
                numberPosts={15}
                description={page.description}
                isHighlights
              />
            </MainContainer>
          </Grid>
        </Page>
        <PopupBannerDesktop banners={banners} />
      </>
    )
  );
};

export default Desktop;
