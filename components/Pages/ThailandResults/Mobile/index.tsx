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
import SeoBlock from 'components/SeoBlock';
import TagArrows from 'components/TagArrows';
import SocialButtons from 'components/Shared/Socials/SocialButtons';
import ThailandResultsTable from 'components/Tables/ThailandResults';
import SocialWidget from 'components/Shared/Socials/SocialWidget';
import { Mobile as PopupBannerMobile } from 'components/Banners/PopupBanner';

import { getLeaguesResults, getSocialUrl, Props } from '../helpers';

import styles from './styles.module.scss';

export const Mobile = ({
  page,
  priorityLeagues,
  banners,
  leagues,
  isLeagues,
}: Props) => {
  const { query } = useRouter();

  const leaguesResults = useMemo(
    () => getLeaguesResults(leagues, query.league as string),
    [leagues, query.league]
  );

  const socialUrl = useMemo(
    () => getSocialUrl(leaguesResults, isLeagues, page.slug),
    [page.slug, isLeagues, leaguesResults]
  );

  return (
    <>
      {page && (
        <>
          <Seo
            {...(isLeagues ? leaguesResults.node.seo : page.seo)}
            path={`${Sections.football}/${Sections.thaiResults}/${
              isLeagues ? leaguesResults.node.slug : ''
            }`}
          />
          <Page>
            <TopBannersMobile {...banners} />
            <Grid>
              <MainContainer>
                <SeoBlock
                  title={
                    isLeagues && leaguesResults
                      ? leaguesResults.node.title
                      : page.title
                  }
                  content={
                    isLeagues &&
                    leaguesResults.node.football_results?.topContent
                      ? leaguesResults.node.football_results.topContent
                      : page.football_results?.topContent
                  }
                  isResults
                  className={styles.topResults}
                />
                <ThailandResultsTable
                  priorityLeagues={priorityLeagues}
                  isMobile
                />
                <SocialButtons url={socialUrl} />
                <TagArrows
                  tags={
                    isLeagues && leaguesResults
                      ? leaguesResults.node.tags
                      : page.tags
                  }
                />
                <SeoBlock
                  title={
                    isLeagues && leaguesResults
                      ? leaguesResults.node.title
                      : page.title
                  }
                  content={
                    isLeagues && leaguesResults
                      ? leaguesResults.node.content
                      : page.content
                  }
                  className={styles.bottomResults}
                />
              </MainContainer>

              <Sidebar>
                <MoreNews />
                <SocialWidget />
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
