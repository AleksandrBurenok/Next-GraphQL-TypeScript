import { useMemo, useRef, MutableRefObject, useState } from 'react';
import { useIntl } from 'react-intl';
import dynamic from 'next/dynamic';

import { Sections } from 'enums/path';

import { useOnScreen } from 'hooks';

import Seo from 'components/Seo';
import Page from 'components/Page/Root';
import Sidebar from 'components/Page/Sidebar';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import { Mobile as PopupBannerMobile } from 'components/Banners/PopupBanner';

import { getPriorityLeagues, Props } from '../helpers';

import styles from './styles.module.scss';

const QuickLinks = dynamic(() => import('../../../Shared/QuickLinks'));
const Tab = dynamic(() => import('../../../Tabs/Tab'));
const Tabs = dynamic(() => import('../../../Tabs/Mobile'));
const TopHighlights = dynamic(() => import('../../../TopHighlights'));
const NewsWidget = dynamic(() => import('../../../Shared/Widget/News'));
const SeoBlock = dynamic(() => import('../../../SeoBlock'));
const RightSidebarBanners = dynamic(
  () => import('../../../Banners/RightSidebarBanners')
);
const TopBannersMobile = dynamic(
  () => import('../../../Banners/TopBanners/Mobile')
);
const ClientPosts = dynamic(() => import('../../../Pages/Posts/Client'), {
  ssr: false,
});

export const Mobile = ({
  page,
  banners,
  highlights,
  priorityLeagues,
  leagues,
}: Props) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const belowTophighlightssRef = useRef() as MutableRefObject<HTMLDivElement>;

  const showBelowTopHighlights = useOnScreen(belowTophighlightssRef);

  const { messages } = useIntl();

  const leaguesNews = useMemo(
    () => getPriorityLeagues(priorityLeagues, leagues),
    [priorityLeagues, leagues]
  );

  return (
    <>
      {page && (
        <>
          <Seo {...page.seo} path={''} />
          <Page>
            <QuickLinks />
            <TopBannersMobile {...banners} />
            <TopHighlights highlights={highlights} banners={banners} isMobile />

            <div ref={belowTophighlightssRef}>
              <Grid>
                <MainContainer className={styles.main}>
                  {showBelowTopHighlights && (
                    <>
                      <ClientPosts
                        categoryID="9"
                        title={messages.latestNews}
                        pageSize={5}
                        className={styles.posts}
                        isBigImage
                        isBig
                        isMoreNews
                        isFullTitle
                        slug={Sections.footballNews}
                      />
                      <ClientPosts
                        categoryID={page.home_page.categoryId}
                        title={page.home_page.categoryTitle}
                        pageSize={5}
                        className={styles.posts}
                        isBigImage
                        isBig
                        isMoreNews
                        isFullTitle
                        slug={page.home_page.categorySlug}
                      />

                      {leaguesNews && (
                        <Tabs
                          tabsInLine={5}
                          selectedTab={selectedTab}
                          setSelectedTab={setSelectedTab}
                        >
                          {leaguesNews.map((league) => (
                            <Tab key={league.id} image={league.logo_path}>
                              <ClientPosts
                                key={league.category_id}
                                categoryID={String(league.category_id)}
                                title={league.translate.th.name}
                                pageSize={8}
                                isTabPosts
                                slug={`${Sections.footballNews}/${league.slug}`}
                              />
                            </Tab>
                          ))}
                        </Tabs>
                      )}
                    </>
                  )}

                  <SeoBlock
                    title={page.title}
                    content={page.content}
                    className={styles.seo}
                  />
                </MainContainer>

                {showBelowTopHighlights && (
                  <Sidebar>
                    <RightSidebarBanners rightSidebar={banners.rightSidebar} />
                    <NewsWidget />
                  </Sidebar>
                )}
              </Grid>
            </div>
          </Page>
          <PopupBannerMobile banners={banners} />
        </>
      )}
    </>
  );
};

export default Mobile;
