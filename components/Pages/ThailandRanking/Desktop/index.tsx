import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Sections } from 'enums/path';

import Page from 'components/Page/Root';
import Seo from 'components/Seo';
import Breadcrumbs from 'components/Shared/Breadcrumbs';
import { Desktop as TopBannersDesktop } from 'components/Banners/TopBanners';
import Sidebar from 'components/Page/Sidebar';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import RightSidebarBanners from 'components/Banners/RightSidebarBanners';
import NewsWidget from 'components/Shared/Widget/News';
import MoreNews from 'components/Shared/MoreNews';
import TagArrows from 'components/TagArrows';
import SocialButtons from 'components/Shared/Socials/SocialButtons';
import ThailandRankingTable from 'components/Tables/ThailandRanking';
import LeftSidebarBanners from 'components/Banners/LeftSidebarBanners';
import SeoBlock from 'components/SeoBlock';
import { Desktop as PopupBannerDesktop } from 'components/Banners/PopupBanner';

import { getLeaguesRanking, getSocialUrl, Props } from '../helpers';

import styles from './styles.module.scss';

export const Desktop = ({
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
            <Breadcrumbs
              slug={`/${Sections.football}/${Sections.thailandRanking}/`}
              parentTitle={isLeagues ? page.title : ''}
              title={
                isLeagues && leaguesRanking
                  ? leaguesRanking.node.title
                  : page.title
              }
            />
            <TopBannersDesktop {...banners} />
            <Grid>
              <Sidebar>
                <MoreNews />
                <LeftSidebarBanners leftSidebar={banners.leftSidebar} />
              </Sidebar>

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
                <RightSidebarBanners rightSidebar={banners.rightSidebar} />
                <NewsWidget />
              </Sidebar>
            </Grid>
          </Page>
          <PopupBannerDesktop banners={banners} />
        </>
      )}
    </>
  );
};

export default Desktop;
