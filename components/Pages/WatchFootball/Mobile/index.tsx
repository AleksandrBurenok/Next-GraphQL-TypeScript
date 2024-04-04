import dynamic from 'next/dynamic';

import { SITE_URL } from 'constants/env';

import Page from 'components/Page/Root';
import Seo from 'components/Seo';
import Sidebar from 'components/Page/Sidebar';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import { Mobile as PopupBannerMobile } from 'components/Banners/PopupBanner';
import SocialButtons from 'components/Shared/Socials/SocialButtons';
import TagArrows from 'components/TagArrows';
import WatchTable from 'forms/Tables/Watch';
import SeoBlock from 'components/SeoBlock';

import { Props } from '../helpers';

import styles from './styles.module.scss';

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

const Mobile = ({ page, banners }: Props) => {
  return (
    page && (
      <>
        <Seo {...page.seo} path={`${page.slug}/`} />
        <Page>
          <TopBannersMobile {...banners} />

          <Grid>
            <MainContainer>
              <SeoBlock
                title={page.title}
                content={page.football_tables.topContent}
                className={styles.topTables}
              />
              <WatchTable isMobile />
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
        <PopupBannerMobile banners={banners} />
      </>
    )
  );
};

export default Mobile;
