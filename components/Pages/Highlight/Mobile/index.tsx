import { useIntl } from 'react-intl';
import dynamic from 'next/dynamic';

import { Sections } from 'enums/path';

import { useHighlight, useGtag } from 'hooks';

import Seo from 'components/Seo';
import Page from 'components/Page/Root';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import { Mobile as PopupBannerMobile } from 'components/Banners/PopupBanner';

import { Props } from '../helpers';

import styles from './styles.module.scss';

const TagArrows = dynamic(() => import('../../../TagArrows'));
const HighlightTopBannerMobile = dynamic(
  () => import('../../../Banners/HighlightsTopBanners/Mobile')
);
const HighlightBottomBannerMobile = dynamic(
  () => import('../../../Banners/HighlightsBottomBanners/Mobile')
);
const SocialButtons = dynamic(
  () => import('../../../Shared/Socials/SocialButtons')
);
const HighlightsWidget = dynamic(
  () => import('../../../Shared/Widget/Highlights')
);
const Button = dynamic(() => import('../../../Shared/Button'));
const Highlight = dynamic(() => import('../../../Shared/Highlight'));
const FacebookComments = dynamic(
  () => import('../../../Shared/FacebookComments'),
  {
    ssr: false,
  }
);

const Mobile = ({ page, banners }: Props) => {
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
            <Grid>
              <MainContainer>
                <HighlightTopBannerMobile
                  mobile={banners.highlightsPost.top.mobile}
                  className={styles.bannersTop}
                />
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
                <SocialButtons url={socialUrl} />
                <HighlightBottomBannerMobile
                  mobile={banners.highlightsPost.bottom.mobile}
                  className={styles.bannersBottom}
                />
                <HighlightsWidget
                  categorySlug={categorySlug}
                  pageId={page.id}
                  banners={banners}
                />
              </MainContainer>
            </Grid>
          </Page>
          <PopupBannerMobile banners={banners} />
        </>
      )}
    </>
  );
};

export default Mobile;
