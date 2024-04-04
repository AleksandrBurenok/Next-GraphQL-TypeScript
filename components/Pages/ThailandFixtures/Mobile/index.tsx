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
import ThailandFixturesTable from 'components/Tables/ThailandFixtures';
import SocialWidget from 'components/Shared/Socials/SocialWidget';
import LeftSidebarBanners from 'components/Banners/LeftSidebarBanners';
import SeoBlock from 'components/SeoBlock';
import { Mobile as PopupBannerMobile } from 'components/Banners/PopupBanner';

import { getLeaguesFixtures, getSocialUrl, Props } from '../helpers';

export const Mobile = ({
  page,
  priorityLeagues,
  banners,
  leagues,
  isLeagues,
}: Props) => {
  const { query } = useRouter();

  const leaguesFixtures = useMemo(
    () => getLeaguesFixtures(leagues, query.league as string),
    [leagues, query.league]
  );

  const socialUrl = useMemo(
    () => getSocialUrl(leaguesFixtures, isLeagues, page.slug),
    [page.slug, isLeagues, leaguesFixtures]
  );

  return (
    <>
      {page && (
        <>
          <Seo
            {...(isLeagues ? leaguesFixtures.node.seo : page.seo)}
            path={`${Sections.football}/${Sections.thaiFixtures}/${
              isLeagues && `${leaguesFixtures.node.slug}/`
            }`}
          />
          <Page>
            <TopBannersMobile {...banners} />
            <Grid>
              <MainContainer>
                <ThailandFixturesTable
                  priorityLeagues={priorityLeagues}
                  title={
                    isLeagues && leaguesFixtures
                      ? leaguesFixtures.node.title
                      : page.title
                  }
                  isMobile
                />
                <SocialButtons url={socialUrl} />
                <SeoBlock
                  title={
                    isLeagues && leaguesFixtures
                      ? leaguesFixtures.node.title
                      : page.title
                  }
                  content={
                    isLeagues && leaguesFixtures
                      ? leaguesFixtures.node.content
                      : page.content
                  }
                />
                <TagArrows
                  tags={
                    isLeagues && leaguesFixtures
                      ? leaguesFixtures.node.tags
                      : page.tags
                  }
                />
              </MainContainer>

              <Sidebar>
                <MoreNews />
                <LeftSidebarBanners leftSidebar={banners.leftSidebar} />
                <RightSidebarBanners rightSidebar={banners.rightSidebar} />
                <NewsWidget />
                <SocialWidget />
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
