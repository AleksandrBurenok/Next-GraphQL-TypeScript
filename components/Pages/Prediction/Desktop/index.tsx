import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { Sections } from 'enums/path';

import { SITE_URL } from 'constants/env';

import Page from 'components/Page/Root';
import Seo from 'components/Seo';
import Breadcrumbs from 'components/Shared/Breadcrumbs';
import Sidebar from 'components/Page/Sidebar';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import RightSidebarBanners from 'components/Banners/RightSidebarBanners';
import SocialButtons from 'components/Shared/Socials/SocialButtons';
import PredictionGameShare from 'components/PredictionGame/Share';
import { Desktop as PopupBannerDesktop } from 'components/Banners/PopupBanner';

import { Props } from '../helpers';
import { useUserPredictions } from '../hooks';

import styles from './styles.module.scss';

export const Desktop = ({ page, championship, banners, id }: Props) => {
  const { messages } = useIntl();

  const { userPredictions } = useUserPredictions(championship.slug);

  return (
    <>
      {page && (
        <>
          <Seo
            {...page.seo}
            path={`${Sections.worldCup2022}/${Sections.prediction}/${id}/`}
          />
          <Page>
            <Breadcrumbs
              slug={`/${Sections.worldCup2022}/`}
              parentTitle={messages.worldCup2022}
              title={page.title}
            />
            <Grid>
              <MainContainer className={styles.main}>
                <h1 className={clsx('red-left-flag', styles.title)}>
                  {page.title}
                </h1>
                <p className={styles.predictionId}>
                  {id} {messages.predictions}
                </p>

                <PredictionGameShare
                  championship={championship}
                  userPredictions={userPredictions}
                />

                <SocialButtons
                  url={`${SITE_URL}/${Sections.worldCup2022}/${Sections.prediction}/${id}/`}
                />
                <div
                  dangerouslySetInnerHTML={{ __html: page.content }}
                  className={styles.content}
                />
              </MainContainer>

              <Sidebar>
                <RightSidebarBanners
                  rightSidebar={banners.worldcupWinnersPage}
                />
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
