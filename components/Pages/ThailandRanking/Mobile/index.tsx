import { useMemo } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { Sections } from 'enums/path';

import Page from 'components/Page/Root';
import Seo from 'components/Seo';
import Sidebar from 'components/Page/Sidebar';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import { Mobile as PopupBannerMobile } from 'components/Banners/PopupBanner';

import { getLeaguesRanking, getSocialUrl, Props } from '../helpers';

import styles from './styles.module.scss';

const SocialButtons = dynamic(
  () => import('../../../Shared/Socials/SocialButtons')
);
const SeoBlock = dynamic(() => import('../../../SeoBlock'));
const TagArrows = dynamic(() => import('../../../TagArrows'));
const TopBannersMobile = dynamic(
  () => import('../../../Banners/TopBanners/Mobile')
);
const LeftSidebarBanners = dynamic(
  () => import('../../../Banners/LeftSidebarBanners')
);
const RightSidebarBanners = dynamic(
  () => import('../../../Banners/RightSidebarBanners')
);
const ThailandRankingTable = dynamic(
  () => import('../../../Tables/ThailandRanking')
);
const NewsWidget = dynamic(() => import('../../../Shared/Widget/News'));
const MoreNews = dynamic(() => import('../../../Shared/MoreNews'));

export const Mobile = ({
  page,
  priorityLeagues,
  banners,
  leagues,
  isLeagues,
}: Props) => {
  const { query } = useRouter();

  const leaguesRanking = useMemo(
    () => getLeaguesRanking(leagues, query.league as string),
    [leagues, query.league]
  );

  const socialUrl = useMemo(
    () => getSocialUrl(leaguesRanking, isLeagues, page.slug),
    [page.slug, isLeagues, leaguesRanking]
  );

  return (
    <>
      {page && (
        <>
          <Seo
            {...(isLeagues ? leaguesRanking.node.seo : page.seo)}
            path={`${Sections.football}/${Sections.thailandRanking}/${
              isLeagues ? leaguesRanking.node.slug : ''
            }`}
          />
          <Page>
            <TopBannersMobile {...banners} />
            <Grid>
              <MainContainer>
                <SeoBlock
                  title={
                    isLeagues && leaguesRanking
                      ? leaguesRanking.node.title
                      : page.title
                  }
                  content={
                    !isLeagues && !leaguesRanking
                      ? page.football_tables.topContent
                      : leaguesRanking.node.football_tables?.topContent
                  }
                  className={styles.topTables}
                />
                <ThailandRankingTable priorityLeagues={priorityLeagues} />
                <SeoBlock
                  title={
                    isLeagues && leaguesRanking
                      ? leaguesRanking.node.title
                      : page.title
                  }
                  content={
                    isLeagues && leaguesRanking
                      ? leaguesRanking.node.content
                      : page.content
                  }
                  className={styles.bottomTables}
                />
                <TagArrows
                  tags={
                    isLeagues && leaguesRanking
                      ? leaguesRanking.node.tags
                      : page.tags
                  }
                />
                <SocialButtons url={socialUrl} />
              </MainContainer>

              <Sidebar>
                <MoreNews />
                <LeftSidebarBanners leftSidebar={banners.leftSidebar} />
                <RightSidebarBanners rightSidebar={banners.rightSidebar} />
                <NewsWidget />
              </Sidebar>
            </Grid>
          </Page>
          <PopupBannerMobile banners={banners} />
        </>
      )}
    </>
  );
};

export default Mobile;
