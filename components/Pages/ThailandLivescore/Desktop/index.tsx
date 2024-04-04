import { useMemo, MutableRefObject, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { Sections } from 'enums/path';

import {
  thaiLeagues,
  internationalLeagues,
  europeanLeagues,
  americanLeagues,
  asianLeagues,
  africaLeagues,
  oceaniaLeagues,
} from 'constants/livescore';

import { useOnScreen } from 'hooks';

import Page from 'components/Page/Root';
import Seo from 'components/Seo';
import Breadcrumbs from 'components/Shared/Breadcrumbs';
import { Desktop as TopBannersDesktop } from 'components/Banners/TopBanners';
import Sidebar from 'components/Page/Sidebar';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import LeftSidebarBanners from 'components/Banners/LeftSidebarBanners';
import RightSidebarBanners from 'components/Banners/RightSidebarBanners';
import NewsWidget from 'components/Shared/Widget/News';
import SeoBlock from 'components/SeoBlock';
import TagArrows from 'components/TagArrows';
import ThailandLivescoreTable from 'components/Tables/ThailandLivescore';
import LivescoreFaq from 'components/Shared/LivescoreFaq';
import SocialButtons from 'components/Shared/Socials/SocialButtons';
import LivescoreTables from 'components/Shared/LivescoreTables';
import { Desktop as PopupBannerDesktop } from 'components/Banners/PopupBanner';

import {
  Props,
  getLeaguesLivescore,
  getSocialUrl,
  getFilteredLeaguesLivescore,
} from '../helpers';

const ClientPosts = dynamic(() => import('../../../Pages/Posts/Client'), {
  ssr: false,
});

const Desktop = ({
  page,
  priorityLeagues,
  banners,
  leagues,
  leaguesThai,
  isLeagues,
  countries,
}: Props) => {
  const belowClientPostsRef = useRef() as MutableRefObject<HTMLDivElement>;

  const showBelowClientPosts = useOnScreen(belowClientPostsRef);

  const { query } = useRouter();

  const { messages } = useIntl();

  const leaguesLivescore = useMemo(
    () => getLeaguesLivescore(leaguesThai, query.league as string),
    [leaguesThai, query.league]
  );

  const socialUrl = useMemo(
    () => getSocialUrl(leaguesLivescore, isLeagues, page.slug),
    [page.slug, isLeagues, leaguesLivescore]
  );

  const tableThaiLeagues = useMemo(
    () => getFilteredLeaguesLivescore(leaguesThai, thaiLeagues),
    [leaguesThai]
  );

  const internationalFootballLeagues = useMemo(
    () => getFilteredLeaguesLivescore(leagues, internationalLeagues),
    [leagues]
  );

  const europeanFootballLeagues = useMemo(
    () => getFilteredLeaguesLivescore(countries, europeanLeagues),
    [countries]
  );

  const americanFootballLeagues = useMemo(
    () => getFilteredLeaguesLivescore(countries, americanLeagues),
    [countries]
  );

  const asianFootballLeagues = useMemo(
    () => getFilteredLeaguesLivescore(countries, asianLeagues),
    [countries]
  );

  const africaFootballLeagues = useMemo(
    () => getFilteredLeaguesLivescore(countries, africaLeagues),
    [countries]
  );

  const oceaniaFootballLeagues = useMemo(
    () => getFilteredLeaguesLivescore(countries, oceaniaLeagues),
    [countries]
  );

  return (
    <>
      {page && (
        <>
          <Seo
            {...(isLeagues ? leaguesLivescore.node.seo : page.seo)}
            path={`${Sections.football}/${Sections.thaiLivescore}/${
              isLeagues ? `${leaguesLivescore.node.slug}/` : ''
            }`}
          />
          <Page>
            <Breadcrumbs
              slug={`/${Sections.football}/${Sections.thaiLivescore}/`}
              parentTitle={isLeagues ? page.title : ''}
              title={
                isLeagues && leaguesLivescore
                  ? leaguesLivescore.node.title
                  : page.title
              }
            />

            <TopBannersDesktop {...banners} />

            <Grid>
              <Sidebar>
                <h3 className="red-left-flag">{messages.livescoreLinks}</h3>
                <LivescoreTables
                  title={messages.thaiFootballLivescore}
                  tables={tableThaiLeagues}
                  isThai
                />
                <LivescoreTables
                  title={messages.internationalFootballLivescore}
                  tables={internationalFootballLeagues}
                />
                <LivescoreTables
                  title={messages.europeanFootballLivescore}
                  tables={europeanFootballLeagues}
                />

                <LivescoreTables
                  title={messages.americanFootballLivescore}
                  tables={americanFootballLeagues}
                />
                <LivescoreTables
                  title={messages.asianFootballLivescore}
                  tables={asianFootballLeagues}
                />
                <LivescoreTables
                  title={messages.africaFootballLivescore}
                  tables={africaFootballLeagues}
                />
                <LivescoreTables
                  title={messages.oceaniaFootballLivescore}
                  tables={oceaniaFootballLeagues}
                />
              </Sidebar>

              <MainContainer>
                <ThailandLivescoreTable priorityLeagues={priorityLeagues} />

                <LivescoreFaq
                  faq={
                    isLeagues && leaguesLivescore
                      ? leaguesLivescore.node.livescore
                      : page.livescore
                  }
                />

                <SocialButtons url={socialUrl} />

                <SeoBlock
                  title={
                    isLeagues && leaguesLivescore
                      ? leaguesLivescore.node.title
                      : page.title
                  }
                  content={
                    isLeagues && leaguesLivescore
                      ? leaguesLivescore.node.content
                      : page.content
                  }
                />

                <div ref={belowClientPostsRef}>
                  {showBelowClientPosts && (
                    <ClientPosts
                      categoryID="172584"
                      title={messages.lastNews}
                      pageSize={6}
                    />
                  )}
                </div>

                <TagArrows
                  tags={
                    isLeagues && leaguesLivescore
                      ? leaguesLivescore.node.tags
                      : page.tags
                  }
                />
              </MainContainer>

              <Sidebar>
                <RightSidebarBanners rightSidebar={banners.rightSidebar} />
                {showBelowClientPosts && <NewsWidget />}
                <LeftSidebarBanners leftSidebar={banners.leftSidebar} />
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
