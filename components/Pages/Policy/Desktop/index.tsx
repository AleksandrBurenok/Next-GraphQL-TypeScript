import Seo from 'components/Seo';
import Page from 'components/Page/Root';
import Grid from 'components/Page/Grid';
import MainContainer from 'components/Page/MainContainer';
import Breadcrumbs from 'components/Shared/Breadcrumbs';
import SocialBottom from 'components/Shared/Socials/SocialBottom';
import { Desktop as PopupBannerDesktop } from 'components/Banners/PopupBanner';

import { Props } from '../helpers';

import styles from './styles.module.scss';

export const Desktop = ({ page, banners }: Props) => {
  return (
    <>
      {page && (
        <>
          <Seo {...page.seo} path={`${page.slug}/`} />
          <Page>
            <Breadcrumbs slug={page.slug} parentTitle="" title={page.title} />
            <Grid>
              <MainContainer className={styles.main}>
                <h1 className={styles.title}>{page.title}</h1>
                <div className={styles.wrapper}>
                  <>
                    {page.content && (
                      <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: page.content }}
                      />
                    )}
                    <SocialBottom />
                  </>
                </div>
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
