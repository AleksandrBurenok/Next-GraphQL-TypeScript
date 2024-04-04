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
import SeoBlock from 'components/SeoBlock';
import TagArrows from 'components/TagArrows';
import SocialButtons from 'components/Shared/Socials/SocialButtons';
import ThailandResultsTable from 'components/Tables/ThailandResults';
import SocialWidget from 'components/Shared/Socials/SocialWidget';
import { Desktop as PopupBannerDesktop } from 'components/Banners/PopupBanner';

import { getLeaguesResults, getSocialUrl, Props } from '../helpers';

import styles from './styles.module.scss';

export const Desktop = ({
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
            <Breadcrumbs
              slug={`/${Sections.football}/${Sections.thaiResults}/`}
              parentTitle={isLeagues ? page.title : ''}
              title={
                isLeagues && leaguesResults
                  ? leaguesResults.node.title
                  : page.title
              }
            />
            <TopBannersDesktop {...banners} />
            <Grid>
              <Sidebar>
                <MoreNews />
                <SocialWidget />
              </Sidebar>

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
                <ThailandResultsTable priorityLeagues={priorityLeagues} />
                <SocialButtons url={socialUrl} />
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
                <TagArrows
                  tags={
                    isLeagues && leaguesResults
                      ? leaguesResults.node.tags
                      : page.tags
                  }
                />
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
