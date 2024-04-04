import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { WORLDCUP_2022 } from 'constants/urls';

import ZoomIn from 'icons/ZoomIn';
import FinalPrizeIconLeft from 'icons/FinalPrizeIconLeft';
import FinalPrizeIconRight from 'icons/FinalPrizeIconRight';

import Page from 'components/Page/Root';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import Breadcrumbs from 'components/Shared/Breadcrumbs';
import Seo from 'components/Seo';
import Sidebar from 'components/Page/Sidebar';
import RightSidebarBanners from 'components/Banners/RightSidebarBanners';
import Dialog from 'components/Dialog';
import Slider from 'components/Slider';
import Icon from 'components/Icon';
import { Desktop as PopupBannerDesktop } from 'components/Banners/PopupBanner';

import { Props } from '../helpers';
import { useCampaignPrizes } from '../hooks';

import styles from './styles.module.scss';

export const Desktop = ({ page, banners }: Props) => {
  const { messages } = useIntl();

  const { openPrizePopup, closePrizePopup, prizeDialog, stage } =
    useCampaignPrizes(page.championship_winners.stages);

  return (
    page && (
      <>
        <Seo {...page.seo} path={page.slug} />
        <Page>
          <Breadcrumbs
            slug={WORLDCUP_2022}
            parentTitle={messages.worldCup2022}
            title={page.title}
          />
          <Grid>
            <MainContainer className={styles.main}>
              {page.title && (
                <h1 className={clsx('red-left-flag', styles.title)}>
                  {page.title}
                </h1>
              )}

              {page.championship_winners && (
                <div className={styles.wrapperPrizes}>
                  {page.championship_winners.stages
                    .slice(0, 4)
                    .map(
                      ({ stageName, winnerName, prizeName, rewardImage }) => {
                        return (
                          <div
                            key={stageName}
                            className={styles.wrapperPrizeStage}
                            onClick={() => openPrizePopup(stageName)}
                          >
                            <div className={styles.wrapperPrizeStageTop}>
                              <div className={styles.wrapperStageName}>
                                <span>{stageName}</span>
                              </div>

                              {rewardImage && (
                                <div className={styles.wrapperImage}>
                                  <Icon
                                    alt={
                                      rewardImage.altText ||
                                      messages.imageAltPlaceholder
                                    }
                                    src={rewardImage.guid}
                                  />
                                </div>
                              )}
                              <ZoomIn className={styles.wrapperZoomIcon} />
                              <span className={styles.prizeName}>
                                {prizeName}
                              </span>
                            </div>
                            <div className={styles.wrapperPrizeStageBottom}>
                              <p className={styles.currentWinner}>
                                {messages.winner}:
                              </p>
                              <span>{winnerName}</span>
                            </div>
                          </div>
                        );
                      }
                    )}

                  <div
                    className={styles.wrapperPrizeStage}
                    onClick={() =>
                      openPrizePopup(
                        page.championship_winners.stages[4].stageName
                      )
                    }
                  >
                    <div className={styles.wrapperPrizeStageTop}>
                      <FinalPrizeIconLeft
                        className={styles.finalPrizeIconLeft}
                      />
                      <FinalPrizeIconRight
                        className={styles.finalPrizeIconRight}
                      />
                      <div className={styles.wrapperStageName}>
                        <span>
                          {page.championship_winners.stages[4].stageName}
                        </span>
                      </div>

                      {page.championship_winners.stages[4].rewardImage && (
                        <div
                          className={clsx(
                            styles.wrapperImage,
                            styles.wrapperImageFinal
                          )}
                        >
                          <Icon
                            alt={
                              page.championship_winners.stages[4].rewardImage
                                .altText || messages.imageAltPlaceholder
                            }
                            src={
                              page.championship_winners.stages[4].rewardImage
                                .guid
                            }
                          />
                        </div>
                      )}
                      <ZoomIn className={styles.wrapperZoomIcon} />
                      <span className={styles.prizeName}>
                        {page.championship_winners.stages[4].prizeName}
                      </span>
                    </div>
                    <div className={styles.wrapperPrizeStageBottom}>
                      <p className={styles.currentWinner}>{messages.winner}:</p>
                      <span>
                        {page.championship_winners.stages[4].winnerName}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {page.content && (
                <div
                  dangerouslySetInnerHTML={{ __html: page.content }}
                  className={styles.content}
                />
              )}
            </MainContainer>

            <Sidebar>
              <RightSidebarBanners rightSidebar={banners.worldcupWinnersPage} />
            </Sidebar>
          </Grid>
        </Page>

        <PopupBannerDesktop banners={banners} />

        {prizeDialog && stage && (
          <Dialog
            open
            onClose={closePrizePopup}
            classes={{
              paper: styles.paper,
            }}
          >
            <Slider loop images={stage.rewardGalleryImage} />
          </Dialog>
        )}
      </>
    )
  );
};

export default Desktop;
