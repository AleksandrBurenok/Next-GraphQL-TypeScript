import { useIntl } from 'react-intl';
import dynamic from 'next/dynamic';

import { Sections } from 'enums/path';

import { useHighlight, useGtag } from 'hooks';

import Seo from 'components/Seo';
import Page from 'components/Page/Root';
import Breadcrumbs from 'components/Shared/Breadcrumbs';
import Sidebar from 'components/Page/Sidebar';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import HighlightsWidget from 'components/Shared/Widget/Highlights';
import { Desktop as HighlightTopBannerDesktop } from 'components/Banners/HighlightsTopBanners';
import { Desktop as HighlightBottomBannerDesktop } from 'components/Banners/HighlightsBottomBanners';
import SocialButtons from 'components/Shared/Socials/SocialButtons';
import TagArrows from 'components/TagArrows';
import Highlight from 'components/Shared/Highlight';
import Button from 'components/Shared/Button';
import { Desktop as PopupBannerDesktop } from 'components/Banners/PopupBanner';

const FacebookComments = dynamic(
  () => import('../../../Shared/FacebookComments'),
  {
    ssr: false,
  }
);

import { Props } from '../helpers';

import styles from './styles.module.scss';

const Desktop = ({ page, banners }: Props) => {
  const { messages } = useIntl();

  const {
    files: [chooseFile1, chooseFile2, chooseFile3],
    socialUrl,
    categoryName,
    categoryUrl,
    categorySlug,
    handleVideoChange1,
    handleVideoChange2,
  } = useHighlight({ page });

  useGtag(page.author.node.name);

  return (
    <>
      {page && (
        <>
          <Seo {...page.seo} path={`${Sections.highlights}/${page.slug}/`} />
          <Page>
            <Breadcrumbs
              slug={`/${categoryUrl}/`}
              parentTitle={categoryName}
              title={page.title}
            />
            <HighlightTopBannerDesktop
              desktop={banners.highlightsPost.top.desktop}
            />
            <Grid>
              <Sidebar>
                <HighlightsWidget
                  categorySlug={categorySlug}
                  pageId={page.id}
                  banners={banners}
                />
              </Sidebar>

              <MainContainer>
                <Highlight
                  image={page.featuredImage?.node.guid}
                  title={page.title}
                  text={page.content}
                  date={page.date}
                  author={page.author.node.name}
                  categoryName={categoryName}
                  categoryUrl={categoryUrl}
                  videoFile={chooseFile3}
                  videoIframe={chooseFile1 || chooseFile2}
                />
                <div className={styles.buttonsWrapper}>
                  {page.highlights.reserveEmbed1 && (
                    <Button
                      type="button"
                      className={styles.button}
                      onClick={handleVideoChange1}
                    >
                      {messages.backupVideo1}
                    </Button>
                  )}
                  {page.highlights.reserveEmbed2 && (
                    <Button
                      type="button"
                      className={styles.button}
                      onClick={handleVideoChange2}
                    >
                      {messages.backupVideo2}
                    </Button>
                  )}
                </div>
                <FacebookComments url={`${Sections.highlights}/${page.slug}`} />
                <TagArrows tags={page.tags} />
                <SocialButtons url={socialUrl} className={styles.socials} />
                <HighlightBottomBannerDesktop
                  desktop={banners.highlightsPost.bottom.desktop}
                />
              </MainContainer>
            </Grid>
          </Page>
          <PopupBannerDesktop banners={banners} />
        </>
      )}
    </>
  );
};

export default Desktop;
