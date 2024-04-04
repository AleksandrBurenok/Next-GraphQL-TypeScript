import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Sections } from 'enums/path';

import Page from 'components/Page/Root';
import Seo from 'components/Seo';
import { Mobile as TopBannersMobile } from 'components/Banners/TopBanners';
import Sidebar from 'components/Page/Sidebar';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import RightSidebarBanners from 'components/Banners/RightSidebarBanners';
import NewsWidget from 'components/Shared/Widget/News';
import MoreNews from 'components/Shared/MoreNews';
import TagArrows from 'components/TagArrows';
import SocialButtons from 'components/Shared/Socials/SocialButtons';
import RankingTable from 'components/Tables/Ranking';
import LeftSidebarBanners from 'components/Banners/LeftSidebarBanners';
import SeoBlock from 'components/SeoBlock';
import { Mobile as PopupBannerMobile } from 'components/Banners/PopupBanner';

import { getLeaguesRanking, getSocialUrl, Props } from '../helpers';

import styles from './styles.module.scss';

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
            path={`${Sections.football}/${Sections.ranking}/${
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
                <RankingTable priorityLeagues={priorityLeagues} />
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
