import {
  useMemo,
  useRef,
  MutableRefObject,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useIntl } from 'react-intl';
import dynamic from 'next/dynamic';

import { Sections } from 'enums/path';

import { useOnScreen } from 'hooks';

import Seo from 'components/Seo';
import Page from 'components/Page/Root';
import { Desktop as TopBannersDesktop } from 'components/Banners/TopBanners';
import Sidebar from 'components/Page/Sidebar';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import SeoBlock from 'components/SeoBlock';
import RightSidebarBanners from 'components/Banners/RightSidebarBanners';
import NewsWidget from 'components/Shared/Widget/News';
import TopHighlights from 'components/TopHighlights';
import Tabs from 'components/Tabs/Desktop';
import Tab from 'components/Tabs/Tab';
import { Desktop as PopupBannerDesktop } from 'components/Banners/PopupBanner';

import { getPriorityLeagues, Props } from '../helpers';

import styles from './styles.module.scss';

const ClientPosts = dynamic(() => import('../../../Pages/Posts/Client'), {
  ssr: false,
});

export const Desktop = ({
  page,
  banners,
  highlights,
  priorityLeagues,
  leagues,
}: Props) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const belowPostsRef = useRef() as MutableRefObject<HTMLDivElement>;

  const showBelowPosts = useOnScreen(belowPostsRef);

  const { messages } = useIntl();

  const leaguesNews = useMemo(
    () => getPriorityLeagues(priorityLeagues, leagues),
    [priorityLeagues, leagues]
  );

  const [s, setS] = useState();

  const functionF = useCallback(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((data) => data.json())
      .then((data) => setS(data));
  }, []);

  useEffect(() => {
    functionF();
  }, [functionF]);

  return (
    <>
      {page && (
        <>
          <Seo {...page.seo} path={''} />
          <Page>
            {/* <TopBannersDesktop {...banners} />
            <TopHighlights highlights={highlights} banners={banners} /> */}
            <Grid>
              <MainContainer className={styles.main}>
                <div className={styles.firstPosts}>
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
                </div>
                <div ref={belowPostsRef}>
                  {showBelowPosts && (
                    <>
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
                </div>
                <SeoBlock
                  title={page.title}
                  content={page.content}
                  className={styles.seo}
                />
              </MainContainer>

              <Sidebar>
                {/* <RightSidebarBanners rightSidebar={banners.rightSidebar} /> */}
                {showBelowPosts && <NewsWidget />}
              </Sidebar>
            </Grid>
          </Page>
          {/* <PopupBannerDesktop banners={banners} /> */}
        </>
      )}
    </>
  );
};

export default Desktop;
