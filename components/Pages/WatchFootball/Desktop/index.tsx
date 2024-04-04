import { SITE_URL } from 'constants/env';

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
import SeoBlock from 'components/SeoBlock';
import { Desktop as PopupBannerDesktop } from 'components/Banners/PopupBanner';
import SocialButtons from 'components/Shared/Socials/SocialButtons';
import TagArrows from 'components/TagArrows';
import WatchTable from 'forms/Tables/Watch';

import { Props } from '../helpers';

import styles from './styles.module.scss';

export const Desktop = ({ page, banners }: Props) => {
  return (
    page && (
      <>
        <Seo {...page.seo} path={`${page.slug}/`} />
        <Page>
          <Breadcrumbs slug={page.slug} parentTitle="" title={page.title} />
          <TopBannersDesktop {...banners} />

          <Grid>
            <MainContainer className={styles.main}>
              <SeoBlock
                title={page.title}
                content={page.football_tables.topContent}
                className={styles.topTables}
              />
              <WatchTable />
              <TagArrows tags={page.tags} />
              <SocialButtons url={`${SITE_URL}/${page.slug}/`} />
              <SeoBlock content={page.content} className={styles.topTables} />
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
